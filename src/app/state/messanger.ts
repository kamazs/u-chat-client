import { UChatAction, State, JOIN, CONNECT, DISCONNECT, setSetUserName, setConnectionStatus, ConnectionStatus, addMessage, SEND_MESSAGE } from "./state";
import { Dispatch, Store } from "redux";
import { log } from "../../utils/log";
import io from "socket.io-client";

type JoinResponse = { joined: true; userName: string; } | { joined: false; error: string; };

export function messenger() {
    let socket: SocketIOClient.Socket;
    return (store: Store<State>) => (next: Dispatch) => (action: UChatAction) => {
        switch (action.type) {
            case CONNECT:
                socket = io(`${action.payload}`);
                addServerListeners(socket, store);
                break;
            case JOIN:
                socket.emit("join", action.payload);
                break;
            case SEND_MESSAGE:
                socket.emit("message", action.payload.message);
                break;
            case DISCONNECT:
                socket.close();
                break;
            default:
        }
        return next(action);
    }
}

function addServerListeners(socket: SocketIOClient.Socket, store: Store<State>) {
    function onConnection() {
        store.dispatch(setConnectionStatus(ConnectionStatus.Connected));

        log("Connected to server");
    }

    function onJoin(raw: string) {
        const response = JSON.parse(raw) as JoinResponse;
        if (response.joined) {
            store.dispatch(setSetUserName(response.userName));
            store.dispatch(setConnectionStatus(ConnectionStatus.Joined));
            log("Join succesful");
            return;
        }
        log("Join failed :(");
    }

    function onMessage(raw: string) {
        log(`MSG: ${raw}`);

        // Simple protocol to avoid JSON-ing all the time:
        // first part of message, separated by :, is name of the user,
        // rest is the message body itself.
        // For example: "SomeBody2005:Heeey buddies!"
        const messageParts = raw.split(":", 2);

        const message = {
            name: messageParts[0],
            timestamp: Date.now(),
            message: messageParts[1],
        };

        store.dispatch(addMessage(message));
    }

    function onDisconnect() {
        log("Disconnected");

        store.dispatch(setConnectionStatus(ConnectionStatus.Disconnected));
    }

    socket.on("connect", onConnection);
    socket.on("join", onJoin);
    socket.on("message", onMessage);
    socket.on("disconnect", onDisconnect);
}
