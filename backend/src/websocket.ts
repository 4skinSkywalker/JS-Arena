import { getUid, parseMsg } from "./utils";
import WebSocket from 'ws';
import { IClientInfoReceivedMessage, IPingMessage, IChatMessage, IClientJSON, IRoomJSON, IProgressMessage, ICreateRoomMessage, IJoinRoomMessage, IRoomStatusMessage, IStartGameMessage } from "./models";

const globalRooms: Record<string, Room> = {};
const globalClients: Record<string, Client> = {};

class Client {
    private ws: WebSocket;
    public id: string;
    public name: string;
    public rooms: Record<string, Room>;

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

    handleClientInfoReceived(message: IClientInfoReceivedMessage) {
        const { name } = message;
        console.log("Client info received", name);

        this.name = name;

        for (const client of Object.values(globalClients)) {
            client.handleListClients();
        }
    }

    handlePing(message: IPingMessage) {
        const { clientId } = message;
        console.log("Ping received from", clientId);
        this.sendMsg("pong");
    }
    
    handleChat(message: IChatMessage) {
        const { roomId, text } = message;
        console.log(this.id, "sent chat message", text);

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }
    
        for (const client of Object.values(this.rooms[roomId].clients)) {
            client.sendMsg(
                "chatReceived",
                {
                    client: this.toJSON(),
                    name: this.name,
                    text
                }
            );
        }
    }
    
    handleProgress(msg: IProgressMessage) {
        console.log(this.id, "sent progress", msg.howManySolved);

        if (!this.rooms[msg.roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[msg.roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

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

    handleListClients() {
        this.sendMsg("clientListed", {
            rooms: Object.values(globalClients).map(item => item.toJSON())
        });
    }
    
    handleListRooms() {
        this.sendMsg("roomsListed", {
            rooms: Object.values(globalRooms).map(item => item.toJSON())
        });
    }

    handleCreateRoom(msg: ICreateRoomMessage) {
        console.log("Creating room", msg.name);

        const room = new Room(msg.name, this);
        room.host = this;
        this.sendMsg("roomCreated", {
            room: room.toJSON()
        });

        this.handleListRooms();
    }

    handleJoinRoom(msg: IJoinRoomMessage) {
        if (!globalRooms[msg.roomId]) {
            return console.error("Room not defined");
        }
        
        console.log("User joining room", msg.roomId);

        globalRooms[msg.roomId].addClient(this);
        for (const client of Object.values(globalRooms[msg.roomId].clients)) {
            client.sendMsg("clientJoinedRoom", {
                room: globalRooms[msg.roomId].toJSON(),
                client: this.toJSON()
            });
        }

        this.handleListRooms();
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
        const { topic, message } = parseMsg(event);
        console.log(topic, message);

        if (!this.handlers[topic]) {
            return console.error("Topic not recognized");
        }

        this.handlers[topic](message);
    }

    handleClose() {
        for (const room of Object.values(this.rooms)) {
            console.log(this.id, "is leaving room", room.id);

            if (room.removeClient(this)) {
                for (const client of Object.values(room.clients)) {
                    client.sendMsg("clientLeftRoom", {
                        client: this.toJSON()
                    });
                }
            }
        
            room.deleteFromGlobalIfEmpty();
        }

        console.log("Client disconnected", this.id, "with name", this.name);
        delete globalClients[this.id];
    }

    toJSON(): IClientJSON {
        return {
            id: this.id,
            name: this.name,
            rooms: (Object.values(this.rooms) as Room[])
                .map(room => room.toJSON())
        };
    }

    handlers: Record<string, (msg: any) => void> = {
        "clientInfoReceived": this.handleClientInfoReceived,
        "ping": this.handlePing,
        "chat": this.handleChat,
        "progress": this.handleProgress,
        "listClients": this.handleListClients,
        "listRooms": this.handleListRooms,
        "createRoom": this.handleCreateRoom,
        "joinRoom": this.handleJoinRoom,
        "roomStatus": this.handleRoomStatus,
        "startGame": this.handleStartGame,
    };
}

class Room {
    public id: string;
    public name: string;
    public started: boolean;
    public host: Client;
    public clients: Record<string, Client>;

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
        }
    }

    toJSON(): IRoomJSON {
        return {
            id: this.id,
            name: this.name,
            started: this.started,
            host: this.host.name,
            clients: (Object.values(this.clients) as Client[])
                .map(client => client.toJSON())
        };
    }
}

export function handleConnection(ws: WebSocket) {
    const client = new Client(ws);
    console.log("Client connected", client.id);

    client.sendMsg("setClientInfo");
}