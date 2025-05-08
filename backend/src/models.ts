export interface IClientJSON {
    id: string;
    name: string;
    rooms: IRoomJSON[];
}

export interface IRoomJSON {
    id: string;
    name: string;
    started: boolean;
    host: string;
    clients: IClientJSON[];
}

export interface IClientInfoReceivedMessage {
    name: string;
}

export interface IPingMessage {
    clientId: string;
}

export interface IChatMessage {
    roomId: string;
    text: string;
}

export interface IProgressMessage {
    roomId: string;
    clientId: string;
    howManySolved: number;
}

export interface ICreateRoomMessage {
    name: string;
}

export interface IJoinRoomMessage {
    roomId: string;
}

export interface IRoomStatusMessage {
    roomId: string;
}

export interface IStartGameMessage {
    roomId: string;
}