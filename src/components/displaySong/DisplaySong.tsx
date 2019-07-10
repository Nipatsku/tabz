import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input, Affix } from "antd/lib"
import { VersionSelector } from './VersionSelector'
import { SongContent } from './SongContent'
import { AutoScrollConfig } from './AutoScrollConfig'
import { Link, animateScroll } from 'react-scroll'
const { Title, Text } = Typography

interface Props {
    song: Song
    returnToPrevious: () => void
}
interface State {
    selectedVersion: SongVersion
    autoScrollActive: boolean
}
export class DisplaySong extends React.Component<Props, State> {

    songContentRef?: SongContent | null
    m: boolean = false

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedVersion: this.props.song.versions[0],
            autoScrollActive: false
        }
    }
    componentDidMount() {
        this.m = true
        setTimeout(this.updateAutoScroll)
    }
    componentWillUnmount() {
        this.m = false
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
    updateAutoScroll = () => {
        if (!this.m)
            return

        if (this.state.autoScrollActive) {
            window.scrollBy(0, 1)
            setTimeout(this.updateAutoScroll, 50)
        } else
            setTimeout(this.updateAutoScroll, 100)
    }
    render() {
        const { song, returnToPrevious } = this.props
        const { selectedVersion, autoScrollActive } = this.state
        return <div>
            <Title>{song.artist}</Title>
            <Title level={2}>{song.name}</Title>
            <div>
                <VersionSelector
                    song={song}
                    defaultSelectedVersion={selectedVersion}
                    onSelectVersion={this.onSelectVersion}
                    style={{ display: 'inline-block' }}
                />
                <Affix
                    offsetTop={0}
                    style={{
                        float: 'right'
                    }}
                >
                    <AutoScrollConfig
                        enabled={autoScrollActive}
                        onToggle={this.onToggleAutoScroll}
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
