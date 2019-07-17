import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Affix, Tag } from "antd/lib"
import { VersionSelector } from "./VersionSelector"
import { SongContent } from "./SongContent"
import { AutoScrollConfig } from "./AutoScrollConfig"
import { Link, animateScroll } from "react-scroll"
import { AutoScrollSpeed, AutoScrollValues, getSongAutoScrollSpeed } from "../../datastructures/autoScroll";
const { Title, Text } = Typography

interface Props {
    song: Song
    returnToPrevious: () => void
}
interface State {
    selectedVersion: SongVersion
    autoScrollActive: boolean
    autoScrollSpeed: AutoScrollSpeed
}
export class DisplaySong extends React.Component<Props, State> {

    scrollDivRef?: HTMLDivElement | null
    isCurrentlyMounted: boolean = false
    lastAutoScrollUpdate?: number
    scrollingFractions: number = 0

    constructor(props: Props) {
        super(props)
        const selectedVersion = this.props.song.versions[0]
        this.state = {
            selectedVersion,
            autoScrollActive: false,
            autoScrollSpeed: getSongAutoScrollSpeed(selectedVersion)
        }
    }
    componentDidMount() {
        this.isCurrentlyMounted = true
        window.requestAnimationFrame = window.requestAnimationFrame ||
            ((clbk: () => void) => window.setTimeout(clbk, 50))
        window.requestAnimationFrame(this.updateAutoScroll)
    }
    componentWillUnmount() {
        this.isCurrentlyMounted = false
    }
    onSelectVersion = (selectedVersion: SongVersion) => {
        this.setState({
            selectedVersion,
            autoScrollSpeed: getSongAutoScrollSpeed(selectedVersion)
        })
    }
    goToBeginning = () => {
        animateScroll.scrollToTop()
    }
    onToggleAutoScroll = () => {
        this.setState({
            autoScrollActive: !this.state.autoScrollActive
        })
    }
    onSetAutoScrollSpeed = (autoScrollSpeed: AutoScrollSpeed) => {
        this.setState({
            autoScrollSpeed
        })
    }
    updateAutoScroll = () => {
        if (!this.isCurrentlyMounted)
            return

        const tNow = window.performance.now()
        if (
            this.state.autoScrollActive &&
            this.scrollDivRef &&
            this.lastAutoScrollUpdate !== undefined
        ) {
            const { autoScrollSpeed } = this.state
            const div = this.scrollDivRef
            const divBounds = div.getBoundingClientRect()
            const divHeight = divBounds.bottom - divBounds.top
            const viewPortHeight = window.innerHeight
            const tDelta = (tNow - this.lastAutoScrollUpdate)
            const scrollAmount = (divHeight - viewPortHeight) * tDelta / (autoScrollSpeed * 1000)
                + this.scrollingFractions

            const scrollAmountInteger = Math.floor(scrollAmount)
            const scrollAmountFraction = scrollAmount - scrollAmountInteger
            this.scrollingFractions = scrollAmountFraction
            console.log(tDelta, autoScrollSpeed, scrollAmountInteger, "     ", divHeight, viewPortHeight)

            window.scrollBy(0, scrollAmountInteger)
            window.requestAnimationFrame(this.updateAutoScroll)
        } else {
            window.requestAnimationFrame(this.updateAutoScroll)
            this.scrollingFractions = 0
        }

        this.lastAutoScrollUpdate = tNow
    }
    render() {
        const { song, returnToPrevious } = this.props
        const { selectedVersion, autoScrollActive, autoScrollSpeed } = this.state
        return <div
            ref={(ref) => this.scrollDivRef = ref}
        >
            <Title>{song.artist}</Title>
            <Title level={2}>{song.name}</Title>
            <div>
                <VersionSelector
                    song={song}
                    defaultSelectedVersion={selectedVersion}
                    onSelectVersion={this.onSelectVersion}
                />
                <Affix
                    className="autoScrollConfigBox"
                    offsetTop={0}
                >
                    <AutoScrollConfig
                        songVersion={selectedVersion}
                        enabled={autoScrollActive}
                        autoScrollSpeed={autoScrollSpeed}
                        onToggle={this.onToggleAutoScroll}
                        onSetSpeed={this.onSetAutoScrollSpeed}
                    />
                </Affix>
            </div>
            <br/>
            <Tag color="blue">{selectedVersion.instrument}</Tag>
            {selectedVersion.instrument === "guitar" &&
                <Tag color="volcano">{selectedVersion.tuning}</Tag>
            }
            <SongContent
                song={song}
                version={selectedVersion}
                onClick={this.onToggleAutoScroll}
            />
            <br/>
            <div>
                <Button
                    onClick={this.goToBeginning}
                >
                    To beginning
                </Button>
                <Button
                    onClick={returnToPrevious}
                >
                    To song selection
                </Button>
            </div>
        </div>
    }
}
