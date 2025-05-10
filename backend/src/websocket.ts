import { getUid, parseEvent } from "./utils";
import WebSocket from 'ws';
import { IChatMessage, IClientJSON, IRoomJSON, IProgressMessage, ICreateRoomMessage, IJoinRoomMessage, IRoomStatusMessage, IStartGameMessage, IClientInfoMessage } from "./models";

/**
 * TODO:
 * - If host leaves a room, the room should be deleted and the clients should be notified
 */

const globalRooms: Record<string, Room> = {};
const globalClients: Record<string, Client> = {};

class Client {
    ws: WebSocket;
    id: string;
    name: string;
    rooms: Record<string, Room>;
    handlers: Record<string, (msg: any) => void> = {
        "whoAmI": this.handleWhoAmI.bind(this),
        "clientInfo": this.handleClientInfo.bind(this),
        "ping": this.handlePing.bind(this),
        "chat": this.handleChat.bind(this),
        "progress": this.handleProgress.bind(this),
        "listClients": this.handleListClients.bind(this),
        "listRooms": this.handleListRooms.bind(this),
        "createRoom": this.handleCreateRoom.bind(this),
        "joinRoom": this.handleJoinRoom.bind(this),
        "roomStatus": this.handleRoomStatus.bind(this),
        "startGame": this.handleStartGame.bind(this),
    };

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.ws.on("message", (message: unknown) => this.handleMessage(message));
        this.ws.on("close", () => this.handleClose());

        this.id = getUid();
        this.name = "Anonymous";
        this.rooms = {};
        globalClients[this.id] = this;
    }

    sendMsg(topic: string, message?: {}) {
        this.ws.send(JSON.stringify({ topic, message }));
    }

    handleWhoAmI() {
        console.log("Sending client his/her info");
        this.sendMsg("whoAmIReceived", { client: this.toJSON(true) });
    }

    handleClientInfo(message: IClientInfoMessage) {
        const { name } = message;
        console.log(`Client with id ${this.id} has name ${name}`);

        this.name = name;
        this.handleWhoAmI();
        this.handleAllListClients();
    }

    handlePing() {
        this.sendMsg("pong");
    }
    
    handleChat(msg: IChatMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        console.log(`Client ${this.name} (${this.id}) sent chat message "${msg.text}" in room ${this.rooms[msg.roomId].name} (${msg.roomId})`);

        for (const client of Object.values(this.rooms[msg.roomId].clients)) {
            client.sendMsg(
                "chatReceived",
                {
                    client: this.toJSON(),
                    name: this.name,
                    text: msg.text
                }
            );
        }
    }
    
    handleProgress(msg: IProgressMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        console.log(`Client ${this.name} (${this.id}) sent progress ${msg.howManySolved} in room ${this.rooms[msg.roomId].name} (${msg.roomId})`);

        if (msg.clientId) {
            // The data has to be sent to a specific client
            const client = this.rooms[msg.roomId].clients[msg.clientId];
            if (client) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[msg.roomId].toJSON(),
                    client: this.toJSON(),
                    howManySolved: msg.howManySolved
                });
            }
        } else {
            // The data has to be sent to all clients
            for (const client of Object.values(this.rooms[msg.roomId].clients)) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[msg.roomId].toJSON(),
                    client: this.toJSON(),
                    howManySolved: msg.howManySolved
                });
            }
        }
    }

    handleAllListClients() {
        console.log("Sending clients to every client");
        for (const client of Object.values(globalClients)) {
            client.sendMsg("clientsListed", {
                clients: Object.values(globalClients)
                    .map(item => item.toJSON())
            });
        }
    }

    handleListClients() {
        console.log("Sending clients to requester");
        this.sendMsg("clientsListed", {
            clients: Object.values(globalClients)
                .map(item => item.toJSON())
        });
    }

    handleAllListRooms() {
        console.log("Sending rooms to every client");
        for (const client of Object.values(globalClients)) {
            client.sendMsg("roomsListed", {
                rooms: Object.values(globalRooms)
                    .map(item => item.toJSON())
            });
        }
    }
    
    handleListRooms() {
        console.log("Sending rooms to requester");
        this.sendMsg("roomsListed", {
            rooms: Object.values(globalRooms)
                .map(item => item.toJSON())
        });
    }

    handleCreateRoom(msg: ICreateRoomMessage) {
        console.log("Creating room", msg.name);

        const room = new Room(msg.name, this);
        room.host = this;
        this.rooms[room.id] = room;

        this.sendMsg("roomCreated", {
            room: room.toJSON()
        });

        this.handleAllListRooms();
    }

    handleJoinRoom(msg: IJoinRoomMessage) {
        if (!globalRooms[msg.roomId]) {
            return console.error("Room not defined");
        }
        
        console.log("User joining room", msg.roomId);

        globalRooms[msg.roomId].addClient(this);
        this.rooms[msg.roomId] = globalRooms[msg.roomId];

        for (const client of Object.values(globalRooms[msg.roomId].clients)) {
            client.sendMsg("clientJoinedRoom", {
                room: globalRooms[msg.roomId].toJSON(),
                client: this.toJSON()
            });
        }

        this.handleAllListRooms();
    }

    handleRoomStatus(msg: IRoomStatusMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[msg.roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        console.log("Room status of room", msg.roomId);

        this.sendMsg("roomStatusReceived", {
            room: this.rooms[msg.roomId].toJSON()
        });
    }

    handleStartGame(msg: IStartGameMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[msg.roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        if (this.rooms[msg.roomId].host !== this) {
            return console.error("Only the host can start the game");
        }

        console.log("Game starting in room", msg.roomId);

        this.rooms[msg.roomId].started = true;
        for (const client of Object.values(this.rooms[msg.roomId].clients)) {
            client.sendMsg("gameStarted", {
                room: this.rooms[msg.roomId].toJSON()
            });
        }

        this.handleListRooms();
    }

    handleMessage(event: any) {
        const { topic, message } = parseEvent(event);
        console.log(topic, message);

        if (!this.handlers[topic]) {
            return console.error("Topic not recognized");
        }

        this.handlers[topic](message);
    }

    handleOpen() {
        this.handleWhoAmI();
    }

    handleClose() {
        const rooms = Object.values(this.rooms);
        for (const room of rooms) {
            console.log(`Client ${this.name} (${this.id}) is leaving the room ${room.name} (${room.id})`);

            if (room.removeClient(this)) {
                for (const client of Object.values(room.clients)) {
                    client.sendMsg("clientLeftRoom", {
                        room: room.toJSON(),
                        client: this.toJSON()
                    });
                }
            }
        
            room.deleteFromGlobalIfEmpty();
        }

        if (rooms.length) {
            this.handleAllListRooms();
        }

        console.log(`Client ${this.name} (${this.id}) disconnected`);
        delete globalClients[this.id];

        this.handleAllListClients();
    }

    toJSON(includeRooms = true): IClientJSON {
        return {
            id: this.id,
            name: this.name,
            rooms: !includeRooms
                ? []
                : (Object.values(this.rooms) as Room[])
                    .map(room => room.toJSON(false))
        };
    }
}

class Room {
    id: string;
    name: string;
    started: boolean;
    host: Client;
    clients: Record<string, Client>;

    constructor(
        name: string,
        client: Client
    ) {
        this.id = getUid();
        this.name = name;
        this.started = false;
        this.host = client;
        this.clients = {
            [client.id]: client
        };
        globalRooms[this.id] = this;
    }

    addClient(client: Client) {
        if (this.clients[client.id]) {
            return console.error("Client already in room");
        }

        this.clients[client.id] = client;
    }

    removeClient(client: Client) {
        if (!this.clients[client.id]) {
            return false;
        }

        delete this.clients[client.id];
        return true;
    }

    deleteFromGlobalIfEmpty() {
        if (!Object.keys(this.clients).length) {
            delete globalRooms[this.id];
            return true;
        }
        return false;
    }

    toJSON(includeClients = true): IRoomJSON {
        return {
            id: this.id,
            name: this.name,
            started: this.started,
            host: this.host.toJSON(false),
            clients: !includeClients
                ? []
                : (Object.values(this.clients) as Client[])
                    .map(client => client.toJSON(false))
        };
    }
}

export function handleConnection(ws: WebSocket) {
    const client = new Client(ws);
    console.log(`Client with id ${client.id} connected`);
    client.handleWhoAmI();
    client.handleListClients();
    client.handleListRooms();
}