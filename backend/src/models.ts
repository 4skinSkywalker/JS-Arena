//      ██╗      ██████╗  █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██████╗ 
//      ╚██╗     ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝████╗  ██║██╔══██╗
// █████╗╚██╗    ██████╔╝███████║██║     █████╔╝ █████╗  ██╔██╗ ██║██║  ██║
// ╚════╝██╔╝    ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║
//      ██╔╝     ██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║ ╚████║██████╔╝
//      ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝                                                                                                                           
export interface IClientToJSONOptions {
    includeRooms?: boolean;
}

export interface IRoomToJSONOptions {
    includeClients?: boolean;
    includeProblem?: boolean;
}

export interface ILogMessage {
    level: "log" | "warn" | "error";
    text: string;
}

export interface ITest {
    input: any;
    expectedOutput: any;
    status?: "running" | "passed" | "failed";
    output?: any;
    logs?: ILogMessage[];
}

export interface IProblem {
    description: string;
    tests: ITest[];
    rating: number;
}

export interface IClientJSON {
    id: string;
    name: string;
    rooms: IRoomJSON[];
}

export interface IRoomJSON {
    id: string;
    name: string;
    enableLateJoin: boolean;
    started: boolean;
    problem?: IProblem;
    host: IClientJSON;
    clients: IClientJSON[];
}

export interface IClientInfoMessage {
    name: string;
}

export interface IChatMessage {
    roomId: string;
    text: string;
}

export interface IProgressDetails {
    testsPassed?: number;
    charCount?: number;
    editorContent?: string;
}

export interface IProgressMessage extends IProgressDetails {
    roomId: string;
}

export interface ICreateRoomMessage {
    roomId?: string;
    name: string;
    enableLateJoin: boolean;
}

export interface IJoinRoomMessage {
    roomId: string;
}

export interface IRoomDetailsMessage {
    roomId: string;
}

export interface IStartGameMessage {
    roomId: string;
}

//      ██╗      ███████╗██████╗  ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗██████╗ 
//      ╚██╗     ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║██╔══██╗
// █████╗╚██╗    █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║██║  ██║
// ╚════╝██╔╝    ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║██║  ██║
//      ██╔╝     ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║██████╔╝
//      ╚═╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═════╝ 
export interface IWhoAmIReceivedMessage {
    client: IClientJSON;
}

export interface IClientsListedMessage {
    clients: IClientJSON[];
}

export interface IRoomsListedMessage {
    rooms: IRoomJSON[];
}

export interface IClientLeftRoomMessage {
    room: IRoomJSON;
    client: IClientJSON;
}

export interface IChatReceivedMessage {
    id: string;
    room: IRoomJSON;
    client: IClientJSON;
    time: string;
    text: string;
}

export interface IRoomDetailsReceivedMessage {
    room: IRoomJSON;
}

export interface IClientWithRoomMessage {
    client: IClientJSON;
    room: IRoomJSON;
}

export interface IProgressReceivedMessage extends IClientWithRoomMessage, IProgressDetails {}