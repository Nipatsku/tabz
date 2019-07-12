import * as React from "react";
import { render } from "react-dom";
import { StartMenu } from "./components/startMenu/StartMenu"

import "./styles.css";
import { url } from "inspector";

interface Props {}
interface State {
    bgUrl?: string
}
class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        fetch("bg.png")
            .then((data) => {
                this.setState({
                    // bgUrl: data.url
                })
            })
        this.state = {}
    }
    render() {
        const { bgUrl } = this.state
        return <div
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : "",
                backgroundSize: "auto 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <StartMenu />
        </div>
    }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
