//      ██╗      ██████╗  █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██████╗ 
//      ╚██╗     ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝████╗  ██║██╔══██╗
// █████╗╚██╗    ██████╔╝███████║██║     █████╔╝ █████╗  ██╔██╗ ██║██║  ██║
// ╚════╝██╔╝    ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║
//      ██╔╝     ██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║ ╚████║██████╔╝
//      ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝                                                                                                                           
export enum EnumLang {
    JS = 'JS',
    SQL = 'SQL'
}

export interface IClientToJSONOptions {
    includeRoom?: boolean;
}

export interface IRoomToJSONOptions {
    includeClients?: boolean;
    includeProblem?: boolean;
}

export interface IAudioMessage {
    roomId: string;
    clientId: string;
    data: number[];
}

export interface ILogMessage {
    level: "log" | "warn" | "error";
    text: string;
}

export interface ITest {
    input: any;
    expectedOutput: any;
    scripts?: string[];
    status?: "running" | "passed" | "failed";
    output?: any;
    logs?: ILogMessage[];
}

export interface IProblem {
    filename: string;
    title: string;
    description: string;
    solution: string;
    tests: ITest[];
    rating: number;
    additionalTitle?: string;
}

export interface IClientJSON {
    id: string;
    name: string;
    room?: IRoomJSON;
}

export interface IRoomJSON {
    id: string;
    name: string;
    enableLateJoin: boolean;
    lang: EnumLang;
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
    isSystem?: boolean;
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
    lang: EnumLang;
}

export interface IJoinRoomMessage {
    roomId: string;
    lang: EnumLang;
}

export interface IRoomDetailsMessage {
    roomId: string;
}

export interface IStartGameMessage {
    roomId: string;
}

export interface IGetProblemMessage {
    filename: string;
    lang: EnumLang;
}

export interface IGetProblemTitlesMessage {
    lang: EnumLang;
}

export interface IListRoomsMessage {
    lang: EnumLang;
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
    isSystem?: boolean;
}

export interface IRoomDetailsReceivedMessage {
    room: IRoomJSON;
}

export interface IClientWithRoomMessage {
    client: IClientJSON;
    room: IRoomJSON;
}

export interface IProgressReceivedMessage extends IClientWithRoomMessage, IProgressDetails {}

export interface IProblemSnippet {
    filename: string;
    title: string;
    rating: number;
    additionalTitle?: string;
}

export interface IProblemTitlesReceivedMessage {
    problemTitles: Array<IProblemSnippet>;
}

export interface IProblemWithSurrounding extends IProblem {
    prevProblemFilename?: string | null;
    nextProblemFilename?: string | null;
}

export interface IGetProblemReceivedMessage {
    problem: IProblemWithSurrounding;
}