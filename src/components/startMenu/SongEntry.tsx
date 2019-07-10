import * as React from "react";
import { SongInfo } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input } from "antd/lib";

interface Props {
    songInfo: SongInfo
}
interface State {}
export class SongEntry extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { songInfo } = this.props
        return <Button>

        </Button>
    }
}
