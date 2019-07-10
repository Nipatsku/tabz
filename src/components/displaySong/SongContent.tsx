import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Row, Col } from "antd/lib"
const { Title, Text, Paragraph } = Typography

interface Props {
    song: Song
    version: SongVersion
}
interface State {}
export class SongContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { version } = this.props
        const contentRows = version.content.split('\n')
        return <div>
            {contentRows.map((row, i) => 
                <pre
                    key={i}
                    className='song-content'
                >
                    {row}
                </pre>
            )}
        </div>
    }
}