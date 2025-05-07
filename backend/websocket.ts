import { getUid, parseMsg, checkString, latinize } from "./utils";
import WebSocket from 'ws';
import { IClientJSON, IPingPayload, IRoomJSON } from "./models";

const globalRooms: Record<string, Room> = {};
const globalClients: Record<string, Client> = {};

class Client {
    private ws: WebSocket;
    public id: string;
    public name: string;
    public rooms: Record<string, Room>;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.ws.on("message", message => this.handleMessage(message));
        this.ws.on("close", () => this.handleClose());

        this.id = getUid();
        this.name = "Anonymous";
        this.rooms = {};
        globalClients[this.id] = this;
    }

    sendMsg(topic: string, message?: {}) {
        this.ws.send(JSON.stringify({ topic, message }));
    }

    handleClientInfoReceived(message) {
        const { name } = message;
        console.log("Client info received", name);

        this.name = name;

        for (const client of Object.values(globalClients)) {
            client.handleListClients();
        }
    }

    handlePing(message: IPingPayload) {
        const { clientId } = message;
        console.log("Ping received from", clientId);
        this.sendMsg("pong");
    }
    
    handleChat(message) {
        const { roomId, text } = message;
        console.log(this.id, "sent chat message", text);

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        checkString({ text });
    
        for (const client of this.rooms[roomId].clients) {
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
    
    handleProgress(message) {
        const { roomId, clientId, numOfProblemsSolved } = message;
        console.log(this.id, "sent progress", numOfProblemsSolved);

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }
    
        checkString({ numOfProblemsSolved });

        if (clientId) {
            // The data has to be sent to a specific client
            const client = this.rooms[roomId].clients.find(c => c.clientId === clientId);
            if (client) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[roomId].toJSON(),
                    client: this.toJSON(),
                    numOfProblemsSolved
                });
            }
        } else {
            // The data has to be sent to all clients
            for (const client of Object.values(this.rooms[roomId].clients)) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[roomId].toJSON(),
                    client: this.toJSON(),
                    numOfProblemsSolved
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

    handleCreateRoom(message) {
        const { name } = message;
        console.log("Creating room", name);

        const room = new Room(name);
        room.host = this;
        this.sendMsg("roomCreated", {
            room: room.toJSON()
        });

        this.handleListRooms();
    }

    handleJoinRoom(message) {
        const { roomId } = message;

        if (!globalRooms[roomId]) {
            return console.error("Room not defined");
        }
        
        console.log("User joining room", roomId);

        globalRooms[roomId].addClient(this);
        for (const client of Object.values(globalRooms[roomId].clients)) {
            client.sendMsg("clientJoinedRoom", {
                room: globalRooms[roomId].toJSON(),
                client: this.toJSON()
            });
        }

        this.handleListRooms();
    }

    handleRoomStatus(message) {
        const { roomId } = message;

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        console.log("Room status of room", roomId);

        this.sendMsg("roomStatusReceived", {
            room: this.rooms[roomId].toJSON()
        });
    }

    handleStartGame(message) {
        const { roomId } = message;

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        if (this.rooms[roomId].host !== this) {
            return console.error("Only the host can start the game");
        }

        console.log("Game starting in room", roomId);

        this.rooms[roomId].started = true;
        for (const client of Object.values(this.rooms[roomId].clients)) {
            client.sendMsg("gameStarted", {
                room: this.rooms[roomId].toJSON()
            });
        }

        this.handleListRooms();
    }

    handleMessage(messageWrap) {
        const { topic, message } = parseMsg(messageWrap);
        console.log(topic, message);
    
        switch (topic) {
            case "clientInfoReceived": {
                this.handleClientInfoReceived(message);
                break;
            }
            case "ping": {
                this.handlePing(message as IPingPayload);
                break;
            }
            case "chat": {
                this.handleChat(message);
                break;
            }
            case "progress": {
                this.handleProgress(message);
                break;
            }
            case "listClients": {
                this.handleListClients();
                break;
            }
            case "listRooms": {
                this.handleListRooms();
                break;
            }
            case "createRoom": {
                this.handleCreateRoom(message);
                break;
            }
            case "joinRoom": {
                this.handleJoinRoom(message);
                break;
            }
            case "roomStatus": {
                this.handleRoomStatus(message);
                break;
            }
            case "startGame": {
                this.handleStartGame(message);
                break;
            }
            default: {
                console.log("Unknown topic", topic);
            }
        }
    }

    handleClose() {
        for (const room of Object.values(this.rooms)) {
            console.log(this.id, "is leaving room", room.id);

            if (room.removeClient(this)) {
                for (const client of this.room.clients) {
                    client.sendMsg("clientLeftRoom", {
                        client: this.toJSON()
                    });
                }
            }
        
            this.room.deleteFromGlobal();
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

    deleteFromGlobal() {
        if (Object.keys(this.clients).length) {
            return console.error("Cannot destroy room", this.id, "with clients in it");
        }

        delete globalRooms[this.id];
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