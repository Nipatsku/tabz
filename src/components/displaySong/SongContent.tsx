import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Row, Col } from "antd/lib"
const { Title, Text, Paragraph } = Typography

interface Props {
    song: Song
    version: SongVersion
    onClick: () => void
}
interface State {}
export class SongContent extends React.Component<Props, State> {

    touchStartTime?: number

    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    onDoubleClick = () => {
        this.props.onClick()
    }
    onTouchStart = () => {
        this.touchStartTime = window.performance.now()
    }
    onTouchEnd = () => {
        const tDelta = window.performance.now() - (this.touchStartTime as number)
        if (tDelta <= 150) {
            this.props.onClick()
        }
    }
    render() {
        const { version } = this.props
        const contentRows = version.content.split('\n')
        return <div
            onDoubleClick={this.onDoubleClick}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
        >
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