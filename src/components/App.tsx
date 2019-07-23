import * as React from "react";
import { Route, Switch } from "react-router-dom"
import { SelectSong } from "./selectSong/SelectSong"
import { DisplaySong } from "./displaySong/DisplaySong"
import { NotFound } from "./NotFound"

interface Props {}
interface State {
    bgUrl?: string
}
export default class App extends React.Component<Props, State> {
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
            <Switch>
                <Route exact path="/" component={SelectSong}/>
                <Route path="/error/:errorMsg" component={SelectSong}/>
                <Route path="/song/:uri/:selectedVersionIndex?" component={DisplaySong}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    }
}
