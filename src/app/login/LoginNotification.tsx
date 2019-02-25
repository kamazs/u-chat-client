import * as React from "react";
import * as styles from "./LoginNotification.css";

export type LoginNotificationProps = {
    message: string;
};

export class LoginNotification extends React.Component<LoginNotificationProps> {
    public render() {
        return (
            <div className={styles.notification} key={this.props.message} >
                {this.props.message}
            </div>
        );
    }
}
