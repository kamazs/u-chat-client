import { State, ConnectionStatus } from "./state";
import { AppView } from "../App";

export const selectView = (state: State) => {
    if (state.connectionStatus === ConnectionStatus.Joined) {
        return AppView.Chat;
    }
    return AppView.Login;
};
