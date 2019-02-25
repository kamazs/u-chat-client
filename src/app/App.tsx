import * as React from "react";
import { LoginScreen } from "./login/LoginScreen";
import { connect } from "react-redux";
import { selectView } from "./state/selectors";
import { State } from "./state/state";
import { ChatScreen } from "./chat/ChatScreen";

export enum AppView {
    Login,
    Chat,
}

export type AppProps = {
    view: AppView;
}

export class AppComponent extends React.Component<AppProps> {
    public render() {
        switch(this.props.view) {
            case AppView.Login:
                return <LoginScreen />;
            case AppView.Chat:
                return <ChatScreen />;
            default:
                return null;
        }
    }
}

export const App = connect(
    (state: State) => ({ view: selectView(state) })
)(AppComponent);
