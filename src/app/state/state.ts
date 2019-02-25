export enum ConnectionStatus {
    Disconnected,
    Pending,
    Connected,
    Joined,
}

export type ChatMessage = {
    name: string;
    timestamp: number;
    message: string;
};

export type State = {
    userName: string;
    connectionStatus: ConnectionStatus;
    messages: ChatMessage[];
};

/** Set full app state */

const SET_STATE = "SET_STATE";

type SetStateAction = { type: typeof SET_STATE, payload: State };

export function setState(state: State): SetStateAction {
    return { type: SET_STATE, payload: state };
}

/** Set user name */

const SET_USER_NAME = "SET_USER_NAME";

type SetUserNameAction = { type: typeof SET_USER_NAME, payload: string };

export function setSetUserName(userName: string): SetUserNameAction {
    return { type: SET_USER_NAME, payload: userName };
}

/** Connect to chat server and start listening to socket */

export const CONNECT = "CONNECT";

type ConnectAction = { type: typeof CONNECT, payload: string };

export function connectToServer(host = "http://localhost:3000"): ConnectAction {
    return { type: CONNECT, payload: host };
}

/** Set user name */

const SET_CONNECTION_STATUS = "SET_CONNECTION_STATUS";

type SetConnectionStatusAction = { type: typeof SET_CONNECTION_STATUS, payload: ConnectionStatus };

export function setConnectionStatus(status: ConnectionStatus): SetConnectionStatusAction {
    return { type: SET_CONNECTION_STATUS, payload: status };
}

/** Join */

export const JOIN = "JOIN";

type JoinAction = { type: typeof JOIN, payload: string };

export function join(userName: string): JoinAction {
    return { type: JOIN, payload: userName };
}

/** Chat message */

export const ADD_MESSAGE = "ADD_MESSAGE";

type AddMessageAction = { type: typeof ADD_MESSAGE, payload: ChatMessage };

export function addMessage(message: ChatMessage): AddMessageAction {
    return { type: ADD_MESSAGE, payload: message };
}

/** Send chat message */

export const SEND_MESSAGE = "SEND_MESSAGE";

type SendMessageAction = { type: typeof SEND_MESSAGE, payload: ChatMessage };

export function sendMessage(message: ChatMessage): SendMessageAction {
    return { type: SEND_MESSAGE, payload: message };
}

/** Disconnect from server */

export const DISCONNECT = "DISCONNECT";

type DisconnectAction = { type: typeof DISCONNECT };

export function disconnect(): DisconnectAction {
    return { type: DISCONNECT };
}

/* All available actions */

export type UChatAction
    = SetStateAction
    | SetUserNameAction
    | ConnectAction
    | SetConnectionStatusAction
    | JoinAction
    | SendMessageAction
    | AddMessageAction
    | DisconnectAction
    ;

const initialState: State = {
    userName: "",
    connectionStatus: ConnectionStatus.Disconnected,
    messages: [],
};

/* Reducer */

export function reducer(state = initialState, action: UChatAction) {
    switch (action.type) {
        case SET_STATE:
            return action.payload;
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload,
            };
        case CONNECT:
            return {
                ...state,
                connectionStatus: ConnectionStatus.Pending,
            };
        case SET_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.payload,
            };
        case DISCONNECT:
            return {
                ...state,
                messages: [],
                userName: "",
                connectionStatus: ConnectionStatus.Disconnected,
            };
        case SEND_MESSAGE:
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};