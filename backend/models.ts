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

export interface IPingPayload {
    clientId: string;
}