import * as React from "react";
import { join, connectToServer, State, ConnectionStatus, ChatMessage } from "../state/state";
import { connect } from "react-redux";
import { Key } from "ts-keycode-enum";

import * as styles from "./LoginScreen.css";
import { Logo } from "../components/logo/Logo";
import { LoginNotification } from "./LoginNotification";
import { UButton } from "../components/button/UButton";

type LoginScreenState = {
    userName: string;
};

type LoginScreenProps = {
    connectionStatus: ConnectionStatus;
    messages: ChatMessage[];
    connectToServer: typeof connectToServer;
    join: typeof join;
}

export class LoginScreenComponent extends React.Component<LoginScreenProps, LoginScreenState> {
    public state = { userName: "" };
    private pendingJoin = false;

    public render() {
        const lastMessage = this.props.messages.slice(-1)[0];
        return (
            <div className={styles.loginScreen}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>
                    <input
                        className={styles.input}
                        required
                        type="text"
                        placeholder={"Enter your nickname"}
                        value={this.state.userName}
                        onChange={this.onNameChange}
                        onKeyUp={this.submitOnEnter}
                        disabled={this.props.connectionStatus === ConnectionStatus.Pending}
                    />
                    <UButton caption="Join" onClick={this.onConnect} />
                </div>
                {lastMessage && lastMessage.message &&
                    <LoginNotification message={lastMessage.message} />}
            </div>
        );
    }

    public componentDidUpdate() {
        if (this.props.connectionStatus === ConnectionStatus.Connected
            && this.pendingJoin
        ) {
            this.join();
        }
    }

    private onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userName: e.target.value });
    }

    private submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === Key.Enter) {
            this.join();
        }
    }

    private onConnect = () => {
        if (this.props.connectionStatus === ConnectionStatus.Connected) {
            this.join();
        } else {
            this.connect();
        }
    }

    private connect = () => {
        this.props.connectToServer();
        this.pendingJoin = true;
    }

    private join = () => {
        this.pendingJoin = false;
        this.props.join(this.state.userName);
        this.setState({ userName: "" });
    }
}

export const LoginScreen = connect(
    (state: State) => ({
        connectionStatus: state.connectionStatus,
        messages: state.messages,
    }),
    { join, connectToServer },
)(LoginScreenComponent);
