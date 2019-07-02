import * as React from "react";
import { SongInfo } from '../../datastructures/song'
import { SongList } from './SongList'

/**
 * 
 */
interface Props {}
/**
 * 
 */
interface State {
    /**
     * 
     */
    songList?: Array<SongInfo>
}
/**
 *
 */
export class StartMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        // Read song list.
        fetch('content/list.json')
            .then((r) => r.json())
            .then((songList) => this.setState({ songList }))
        this.state = {}
    }
    render() {
        const { songList } = this.state
        return <div>
            <h1>Tabz for days - React version</h1>
            {songList?
                <SongList
                    songList={songList}
                />
                : undefined
            }
        </div>
    }
}
