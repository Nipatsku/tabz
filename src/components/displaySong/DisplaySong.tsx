import * as React from "react";
import { SongInfo, Song } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input } from "antd/lib"
const { Title, Text } = Typography

interface Props {
    song: Song
}
interface State {}
export class DisplaySong extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { song } = this.props
        return <div>
            <Title>{song.artist}</Title>
            <Text>{song.name}</Text>
        </div>
    }
}
