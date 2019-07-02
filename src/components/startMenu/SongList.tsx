import * as React from "react";
import { SongInfo } from '../../datastructures/song'

/**
 * 
 */
interface Props {
    /**
     * 
     */
    songList: Array<SongInfo>}
/**
 * 
 */
interface State {}
/**
 * 
 */
export class SongList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { songList } = this.props
        return songList.map((song, i) => 
            <p key={i}>{`${song.artist} ${song.name}`}</p>
        )
    }
}