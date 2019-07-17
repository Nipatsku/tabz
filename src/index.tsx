import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SelectSong } from "./components/selectSong/SelectSong"
import "./styles.css";
import { DisplaySong } from "./components/displaySong/DisplaySong";
import { NotFound } from "./components/notFound/NotFound"

interface Props {}
interface State {
    bgUrl?: string
}
class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        // fetch("bg.png")
        //     .then((data) => {
        //         this.setState({
        //             bgUrl: data.url
        //         })
        //     })
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
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SelectSong}/>
                    <Route path="/error/:errorMsg" component={SelectSong}/>
                    <Route path="/song/:uri/:selectedVersionIndex?" component={DisplaySong}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter >
        </div>
    }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
