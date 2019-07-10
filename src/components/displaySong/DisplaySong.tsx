import * as React from "react";
import { SongInfo, Song, SongVersion } from "../../datastructures/song"
import { Button, Layout, Typography, Icon, Input } from "antd/lib"
import { VersionSelector } from './VersionSelector'
import { SongContent } from './SongContent'
const { Title, Text } = Typography

interface Props {
    song: Song
    returnToPrevious: () => void
}
interface State {
    selectedVersion: SongVersion
}
export class DisplaySong extends React.Component<Props, State> {

    songContentRef?: SongContent | null

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedVersion: this.props.song.versions[0]
        }
    }
    onSelectVersion = (selectedVersion: SongVersion) => {
        this.setState({
            selectedVersion
        })
    }
    goToBeginning = () => {
        window.scrollTo(0, 0)
    }
    render() {
        const { song, returnToPrevious } = this.props
        const { selectedVersion } = this.state
        return <div>
            <Title>{song.artist}</Title>
            <Title level={2}>{song.name}</Title>
            <VersionSelector
                song={song}
                defaultSelectedVersion={selectedVersion}
                onSelectVersion={this.onSelectVersion}
            />
            <br/>
            <SongContent
                ref={(ref) => this.songContentRef = ref}
                song={song}
                version={selectedVersion}
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
