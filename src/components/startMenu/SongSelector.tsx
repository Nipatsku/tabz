
import * as React from "react";
import { SongInfo } from '../../datastructures/song'
import { SongList } from './SongList'

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
export class SongSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    /**
     * TODO:
     * Search.
     * List.
     */
    render() {
        const { songList } = this.props
        return <SongList
            songList={songList}
        />
    }
}