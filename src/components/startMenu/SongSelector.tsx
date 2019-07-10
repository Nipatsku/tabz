
import * as React from "react";
import { SongInfo } from "datastructures/song"
import { SongList } from "components/startMenu/SongList"
import { Button, Layout, Typography, Icon, Input } from "antd/lib"

interface Props {
    songList: SongInfo[]
    onSelectSong: (songInfo: SongInfo) => void
}
interface State {
    searchString?: string
}
export class SongSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    onSearchSong = (value: string) => {
        this.setState({
            searchString: value.length > 0 ?
                value : undefined
        })
    }
    render() {
        const { songList, onSelectSong } = this.props
        const { searchString } = this.state
        return <div>
            <Typography.Title>Select song</Typography.Title>
            <Input.Search
                placeholder="Search text"
                enterButton="Search"
                size="default"
                onChange={(e) => this.onSearchSong(e.target.value)}
                allowClear={true}
            />
            <SongList
                songList={songList}
                searchString={searchString}
                onSelectSong={onSelectSong}
            />
        </div>
    }
}
