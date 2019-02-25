import * as React from "react";

import * as styles from "./UButton.css";

export enum ButtonTheme {
    Default = "",
    Round = "round",
}

export type UButtonProps = {
    caption: string;
    onClick: () => void;
    theme?: ButtonTheme;
};

export class UButton extends React.Component<UButtonProps> {
    public render() {
        return (
            <div
                className={`${styles.button} ${this.props.theme ? styles[this.props.theme] : ""}`}
                onClick={this.props.onClick}
            >
                {this.props.caption}
            </div>
        );
    }
}
