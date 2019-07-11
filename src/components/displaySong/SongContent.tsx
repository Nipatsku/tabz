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
interface Point {
    x: number
    y: number
}
export class SongContent extends React.Component<Props, State> {

    divRef?: HTMLDivElement | null
    touchStartTime?: number
    touchStartLocation?: Point

    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    getDIV(): HTMLDivElement | undefined {
        return (this.divRef === null || this.divRef === undefined) ?
            undefined :
            this.divRef as HTMLDivElement
    }
    onDoubleClick = () => {
        this.props.onClick()
    }
    onTouchStart = (e: React.TouchEvent) => {
        this.touchStartTime = window.performance.now()
        this.touchStartLocation = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        }
    }
    onTouchEnd = (e: React.TouchEvent) => {
        // Differentiate between pokes and sweeps.
        const tDelta = window.performance.now() - (this.touchStartTime as number)
        const pDelta = {
            x: e.changedTouches[0].clientX - (this.touchStartLocation as Point ).x,
            y: e.changedTouches[0].clientY - (this.touchStartLocation as Point ).y
        }
        const pDeltaDist = Math.sqrt(Math.pow(pDelta.x, 2) + Math.pow(pDelta.y, 2))
        if (tDelta <= 150 && pDeltaDist <= 20) {
            // Poke.
            this.props.onClick()
        }
    }
    render() {
        const { version } = this.props
        const contentRows = version.content.split("\n")
        return <div
            ref={(ref) => this.divRef = ref}
            onDoubleClick={this.onDoubleClick}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
        >
            {contentRows.map((row, i) =>
                <pre
                    key={i}
                    className="songParagraph"
                >
                    {row}
                </pre>
            )}
        </div>
    }
}
