import { getUid, parseMsg, checkString, latinize } from "/utils.js";

const globalRooms = {};
const globalClients = {};

class Client {
    constructor(ws) {
        this.ws = ws;
        ws.on("message", msg => this.handleMessage(ws, msg));
        ws.on("close", () => this.handleClose(ws));

        this.id = getUid();
        this.name = "Anonymous";
        this.rooms = {};
        globalClients[this.id] = this;
    }

    sendMsg(topic, message) {
        this.ws.send(JSON.stringify({ topic, message }));
    }

    handleClientInfoReceived(message) {
        const { name } = message;
        console.log("Client info received", name);

        this.name = name;

        for (client of Object.values(globalClients)) {
            client.handleListClients();
        }
    }

    handlePing(clientId) {
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
                handleClientInfoReceived(message);
                break;
            }
            case "ping": {
                handlePing(message);
                break;
            }
            case "chat": {
                handleChat(message);
                break;
            }
            case "progress": {
                handleProgress(message);
                break;
            }
            case "listClients": {
                handleListClients();
                break;
            }
            case "listRooms": {
                handleListRooms();
                break;
            }
            case "createRoom": {
                handleCreateRoom(message);
                break;
            }
            case "joinRoom": {
                handleJoinRoom(message);
                break;
            }
            case "roomStatus": {
                handleRoomStatus(message);
                break;
            }
            case "startGame": {
                handleStartGame(message);
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

        delete globalClients[this.id];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            rooms: Object.values(this.rooms).map(item => item.toJSON())
        };
    }
}

class Room {
    constructor(name, client) {
        this.id = getUid();
        this.name = name;
        this.started = false;
        this.host = client;
        this.clients = {
            [client.id]: client
        };
        globalRooms[this.id] = this;
    }

    addClient(client) {
        if (this.clients[client.id]) {
            return console.error("Client already in room");
        }

        this.clients[this.client.id] = client;
    }

    removeClient(client) {
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

        delete globalRooms[roomId];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            started: this.started,
            host: this.host.name,
            clients: Object.values(this.clients).map(item => item.toJSON())
        };
    }
}

function setClientInfo(client) {
    client.sendMsg("setClientInfo");
}

function handleConnection(ws) {
    const client = new Client(ws);
    console.log("Client connected", client.id);

    setClientInfo(client);
}

module.exports = {
    handleConnection
};