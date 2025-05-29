import { getUid, parseEvent } from "./utils";
import WebSocket from 'ws';
import { IChatMessage, IClientJSON, IRoomJSON, IProgressMessage, ICreateRoomMessage, IJoinRoomMessage, IRoomDetailsMessage, IStartGameMessage, IClientInfoMessage, IProblem, IRoomToJSONOptions, IClientToJSONOptions } from "./models";
import { problems } from "./problems";

const globalRooms: Record<string, Room> = {};
const globalClients: Record<string, Client> = {};

function sendEverybodyClients() {
    console.log("Sending clients to every client");
    for (const client of Object.values(globalClients)) {
        client.sendMsg("clientsListed", {
            clients: Object.values(globalClients)
                .map(item => item.toJSON())
        });
    }
}

function sendEverybodyRooms() {
    console.log("Sending rooms to every client");
    for (const client of Object.values(globalClients)) {
        client.sendMsg("roomsListed", {
            rooms: Object.values(globalRooms)
                .map(item => item.toJSON())
        });
    }
}

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
        "roomDetails": this.handleRoomDetails.bind(this),
        "startGame": this.handleStartGame.bind(this),
        "restartGame": this.handleRestartGame.bind(this),
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

    getRoomsArray() {
        return Object.values(this.rooms);
    }

    sendMsg(topic: string, message?: {}) {
        this.ws.send(JSON.stringify({ topic, message }));
    }

    handleWhoAmI() {
        console.log("Sending client his/her info");
        this.sendMsg("whoAmIReceived", { client: this.toJSON({ includeRooms: true }) });
    }

    handleClientInfo(message: IClientInfoMessage) {
        const { name } = message;
        console.log(`Client with id ${this.id} has name ${name}`);

        this.name = name;
        this.handleWhoAmI();
        sendEverybodyClients();
    }

    handlePing() {
        this.sendMsg("pong");
    }
    
    handleChat(msg: IChatMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        this.rooms[msg.roomId].sendChatMessage(msg.text, this);
    }
    
    handleProgress(msg: IProgressMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        this.rooms[msg.roomId].sendProgress(this, msg.testsPassed, msg.charCount, msg.editorContent);
    }

    handleListClients() {
        console.log("Sending clients to requester");
        this.sendMsg("clientsListed", {
            clients: Object.values(globalClients)
                .map(item => item.toJSON())
        });
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

        const room = new Room({
            id: msg.roomId,
            name: msg.name,
            enableLateJoin: msg.enableLateJoin,
            client: this
        });
        room.host = this;
        this.rooms[room.id] = room;

        this.sendMsg("roomCreated", { room: room.toJSON() });

        sendEverybodyRooms();
    }

    handleJoinRoom(msg: IJoinRoomMessage) {
        if (!globalRooms[msg.roomId]) {
            console.error("Room not found, creating it");
            return this.handleCreateRoom({
                roomId: msg.roomId,
                name: "Untitled room",
                enableLateJoin: true
            });
        }
        
        console.log("User joining room", msg.roomId);

        this.rooms[msg.roomId] = globalRooms[msg.roomId];
        globalRooms[msg.roomId].addClient(this);
    }

    handleRoomDetails(msg: IRoomDetailsMessage) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        if (!this.rooms[msg.roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        console.log("Room status of room", msg.roomId);

        this.rooms[msg.roomId].sendRoomDetails(this);
    }

    handleStartGame(msg: IStartGameMessage, bypass?: boolean) {
        if (!this.rooms[msg.roomId]) {
            return console.error("Room not found");
        }

        if (!this.rooms[msg.roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        if (this.rooms[msg.roomId].host !== this) {
            return console.error("Only the host can start the game");
        }

        if (this.rooms[msg.roomId].started && !bypass) {
            return console.error("Game already started");
        }

        this.rooms[msg.roomId].setStarted(true);
    }

    handleRestartGame(msg: IStartGameMessage) {
        this.handleStartGame(msg, true);
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
        const rooms = this.getRoomsArray();
        for (const room of rooms) {
            console.log(`Client "${this.name}" (${this.id}) is leaving the room "${room.name}" (${room.id})`);

            room.removeClient(this);
        
            if (!room.deleteFromGlobalIfEmpty() && room.host.id === this.id) {
                room.passHostToNextClient();
            }
        }

        if (rooms.length) {
            sendEverybodyRooms();
        }

        console.log(`Client "${this.name}" (${this.id}) disconnected`);
        delete globalClients[this.id];

        sendEverybodyClients();
    }

    toJSON(opts?: IClientToJSONOptions): IClientJSON {
        opts = opts || {};
        opts.includeRooms = opts.includeRooms == null ? true : opts.includeRooms;

        return {
            id: this.id,
            name: this.name,
            rooms: !opts.includeRooms
                ? []
                : this.getRoomsArray()
                    .map(room => room.toJSON({ includeClients: false }))
        };
    }
}

class Room {
    id: string;
    name: string;
    enableLateJoin: boolean;
    started: boolean;
    problem: IProblem;
    host: Client;
    clients: Record<string, Client>;

    constructor(opts: {
        id?: string,
        name: string,
        enableLateJoin: boolean,
        client: Client
    }) {
        this.id = opts.id || getUid();
        this.name = opts.name;
        this.enableLateJoin = opts.enableLateJoin;
        this.started = false;
        this.problem = this.getRandomProblem();
        this.host = opts.client;
        this.clients = {
            [opts.client.id]: opts.client
        };
        globalRooms[this.id] = this;
    }

    getRandomProblem() {
        return problems[Math.floor(Math.random() * problems.length)];
    }

    getClientsArray() {
        return Object.values(this.clients);
    }

    setStarted(value: boolean) {
        console.log("Game starting in room", this.id);
        this.started = value;
        this.problem = this.getRandomProblem();

        for (const client of this.getClientsArray()) {
            client.sendMsg("gameStarted");
            this.sendRoomDetails(client);
        }

        sendEverybodyRooms();
    }

    sendChatMessage(text: string, client: Client) {
        console.log(`Client "${client.name}" (${client.id}) sent chat message "${text}" in room "${this.name}" (${this.id})`);
        for (const _client of this.getClientsArray()) {
            _client.sendMsg(
                "chatReceived",
                {
                    id: getUid(),
                    room: this.toJSON(),
                    client: client.toJSON(),
                    time: new Date().toLocaleTimeString(),
                    text
                }
            );
        }
    }

    sendProgress(client: Client, testsPassed?: number, charCount?: number, editorContent?: string) {
        for (const _client of this.getClientsArray()) {
            _client.sendMsg("progressReceived", {
                room: this.toJSON(),
                client: client.toJSON(),
                testsPassed,
                charCount,
                editorContent
            });
        }
    }

    sendRoomDetails(client?: Client) {
        if (client) {
            // Send to the client that requested the details
            client.sendMsg("roomDetailsReceived", {
                room: this.toJSON({ includeProblem: true })
            });
        } else {
            // Send to all clients in the room
            for (const client of this.getClientsArray()) {
                client.sendMsg("roomDetailsReceived", {
                    room: this.toJSON({ includeProblem: true })
                });
            }
        }
    }

    passHostToNextClient() {
        const clients = this.getClientsArray();
        if (!clients.length) {
            return console.error("Room has no clients");
        }

        const previousHost = this.host;
        this.host = clients[0];
        console.log(`Room "${this.name}" (${this.id}) host changed from ${previousHost.name} (${previousHost.id}) to ${this.host.name} (${this.host.id})`);
        
        this.sendRoomDetails();
    }

    addClient(client: Client) {
        if (this.clients[client.id]) {
            return console.error("Client already in room");
        }
        this.clients[client.id] = client;
        for (const _client of this.getClientsArray()) {
            _client.sendMsg("clientJoined", {
                room: this.toJSON({ includeClients: false }),
                client: client.toJSON({ includeRooms: false })
            });
        }
        this.sendRoomDetails();
    }

    removeClient(client: Client) {
        if (!this.clients[client.id]) {
            return false;
        }
        delete this.clients[client.id];
        for (const _client of this.getClientsArray()) {
            _client.sendMsg("clientLeft", {
                room: this.toJSON({ includeClients: false }),
                client: client.toJSON({ includeRooms: false })
            });
        }
        this.sendRoomDetails();
        return true;
    }

    deleteFromGlobalIfEmpty() {
        if (!Object.keys(this.clients).length) {
            delete globalRooms[this.id];
            sendEverybodyRooms();
            return true;
        }
        return false;
    }

    toJSON(opts?: IRoomToJSONOptions): IRoomJSON {
        opts = opts || {};
        opts.includeClients = opts.includeClients == null ? true : opts.includeClients;
        opts.includeProblem = opts.includeProblem == null ? false : opts.includeProblem;

        return {
            id: this.id,
            name: this.name,
            enableLateJoin: this.enableLateJoin,
            started: this.started,
            problem: (this.started && opts.includeProblem) ? this.problem : undefined,
            host: this.host.toJSON({ includeRooms: false }),
            clients: !opts.includeClients
                ? []
                : this.getClientsArray()
                    .map(client => client.toJSON({ includeRooms: false })),
        };
    }
}

export function handleConnection(ws: WebSocket) {
    const client = new Client(ws);
    console.log(`Client with id ${client.id} connected`);
}