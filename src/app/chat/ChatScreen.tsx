import * as React from "react";
import { Key } from 'ts-keycode-enum';
import { State, sendMessage, ChatMessage } from "../state/state";
import { connect } from "react-redux";

import * as styles from "./ChatScreen.css";

type ChatScreenProps = {
    sendMessage: typeof sendMessage;
    userName: string;
    messages: ChatMessage[];
};

type ChatScreenState = {
    currentMessage: string;
};

export class ChatScreenComponent extends React.Component<ChatScreenProps, ChatScreenState> {
    public state = {
        currentMessage: "",
    };

    public render() {
        return (
            <div className={styles.chatScreen}>
                <div className={styles.messagesContainer}>
                    <ul className={styles.messages}>
                        {this.props.messages.map(msg =>
                            <li key={msg.timestamp}>[ {new Date(msg.timestamp).toLocaleTimeString()} ] <strong>{msg.name}: </strong>{msg.message}</li>
                        )}
                    </ul>
                </div>
                <input
                    required
                    type="text"
                    id="chat-input"
                    name="chat-input"
                    value={this.state.currentMessage}
                    onChange={this.onInputChange}
                    onKeyUp={this.sendOnEnter}
                    className={styles.input}
                />
            </div>
        );
    }

    private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ currentMessage: e.target.value });
    };

    private sendOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === Key.Enter) {
            this.send();
        }
    }

    private send = () => {
        this.props.sendMessage({
            name: this.props.userName,
            message: this.state.currentMessage,
            timestamp: Date.now(),
        });
        this.setState({ currentMessage: "" });
    }
}

export const ChatScreen = connect(
    (state: State) => ({
        userName: state.userName,
        messages: state.messages,
    }),
    { sendMessage },
)(ChatScreenComponent);
