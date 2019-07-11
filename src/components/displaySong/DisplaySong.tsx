import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Affix } from "antd/lib"
import { VersionSelector } from './VersionSelector'
import { SongContent } from './SongContent'
import { AutoScrollConfig } from './AutoScrollConfig'
import { Link, animateScroll } from 'react-scroll'
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

    songContentRef?: SongContent | null
    isCurrentlyMounted: boolean = false

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
        setTimeout(this.updateAutoScroll)
    }
    componentWillUnmount() {
        this.isCurrentlyMounted = false
    }
    onSelectVersion = (selectedVersion: SongVersion) => {
        this.setState({
            selectedVersion
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

        if (this.state.autoScrollActive) {
            window.scrollBy(0, 1)
            setTimeout(this.updateAutoScroll, 50)
        } else
            setTimeout(this.updateAutoScroll, 100)
    }
    render() {
        const { song, returnToPrevious } = this.props
        const { selectedVersion, autoScrollActive, autoScrollSpeed } = this.state
        return <div>
            <Title>{song.artist}</Title>
            <Title level={2}>{song.name}</Title>
            <div>
                <VersionSelector
                    song={song}
                    defaultSelectedVersion={selectedVersion}
                    onSelectVersion={this.onSelectVersion}
                />
                <Affix
                    className='autoScrollConfigBox'
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
            <SongContent
                ref={(ref) => this.songContentRef = ref}
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
