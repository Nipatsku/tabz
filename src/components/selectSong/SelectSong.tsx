
import * as React from "react";
import { SongInfo } from "../../datastructures/song"
import { SongList } from "./SongList"
import { Button, Layout, Typography, Icon, Input, message } from "antd/lib"
import { LoadingIndicator } from "../common/LoadingIndicator";
import { Navigatable } from "../common/navigation"

interface Props extends Navigatable<{
    /**
     * Optional error message, in case user was automatically redirected to this view, because of an error.
     */
    errorMsg?: string
}> {}
interface State {
    songList?: SongInfo[]
    searchString?: string
}
export class SelectSong extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        // Read song list.
        fetch(`${process.env.PUBLIC_URL}/content/list.json`)
            .then((r) => r.json())
            .then((songList) => this.setState({ songList }))
            // For development, auto traversal of GUI. OUTDATED, should use history to navigate.
            // .then(() => {
            //     const songList = this.state.songList as SongInfo[]
            //     const partialSongInfo = songList.find((songInfo) => songInfo.name.includes("Nice Guy")) as SongInfo
            //     this.getFullSongInfo(partialSongInfo)
            //         .then((song) => {
            //             this.setState({
            //                 subState: {
            //                     id: "display-song",
            //                     partialSongInfo,
            //                     song
            //                 }
            //             })
            //         })
            // })
        const errorMsg = this.props.match.params.errorMsg
        if (errorMsg !== undefined) {
            // Display error message as a popup, that disappears automatically.
            message.error(errorMsg)
        }
        this.state = {}
    }
    componentDidMount() {
        // Scroll to top of page always. TODO: Use decorator?
        window.scrollTo(0, 0)
    }
    onSearchSong = (value: string) => {
        this.setState({
            searchString: value.length > 0 ?
                value : undefined
        })
    }
    onSelectSong = (song: SongInfo) => {
        this.props.history.push("/song/" + `${song.url}`)
    }
    render() {
        const { songList } = this.state
        const { searchString } = this.state
        return songList === undefined ?
            <LoadingIndicator/>
            :
            <div>
                <Typography.Title>Select song ({songList.length})</Typography.Title>
                <Input.Search
                    placeholder="Search by artist / song name"
                    size="default"
                    onChange={(e) => this.onSearchSong(e.target.value)}
                    allowClear={true}
                />
                <SongList
                    songList={songList}
                    searchString={searchString}
                    onSelectSong={this.onSelectSong}
                />
            </div>
    }
}
