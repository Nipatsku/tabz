import * as React from "react";
import { SongInfo } from "../../datastructures/song"
import { Tree, Icon, List, Typography, Checkbox } from "antd/lib"
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const { TreeNode } = Tree
const { Text } = Typography

interface Props {
    songList: SongInfo[]
    searchString?: string
    onSelectSong: (songInfo: SongInfo) => void
}
interface State {
    groupByArtist: boolean
}
export class SongList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            // TODO: localStorage
            groupByArtist: true
        }
    }
    onSelectTreeNode = (selectedKeys: string[]) => {
        const { songList, onSelectSong } = this.props
        const selectedTreeNodeKey = selectedKeys[0]

        // Check if selected Node was a song.
        const selectedSong = songList.find((songInfo) =>
            songInfo.id === selectedTreeNodeKey
        )
        if (selectedSong)
            onSelectSong(selectedSong)
    }
    onSetGroupByArtist = (event: CheckboxChangeEvent) => {
        const { groupByArtist } = this.state
        this.setState({
            groupByArtist: !groupByArtist
        })
    }
    renderSongTree(songsByArtist: SongInfo[][]): JSX.Element {
        return <Tree
            showIcon
            switcherIcon={<Icon type="down" />}
            onSelect={this.onSelectTreeNode}
        >
            {songsByArtist.map((artistSongs, iArtist) => {
                const key = `${iArtist}`
                return <TreeNode
                    key={key}
                    title={`${artistSongs[0].artist} (${artistSongs.length})`}
                >
                    {artistSongs.map((song) =>
                        <TreeNode
                            key={song.id}
                            title={`${song.name}`}
                        />
                    )}
                </TreeNode>
            })}
        </Tree>
    }
    renderSongList(songs: SongInfo[]): JSX.Element {
        return <Tree
            showIcon
            onSelect={this.onSelectTreeNode}
        >
            {songs.map((song) => <TreeNode
                    key={song.id}
                    title={`${song.name} - ${song.artist}`}
            />)}
        </Tree>
    }
    render() {
        const { songList, searchString } = this.props
        const { groupByArtist } = this.state
        return <div>
            <div
                className="groupByArtistDiv"
            >
                <Checkbox
                    defaultChecked={groupByArtist}
                    onChange={this.onSetGroupByArtist}
                >
                    Group by artist
                </Checkbox>
            </div>
            {
                ((searchString === undefined) ? (
                    ((groupByArtist) ? (
                        this.renderSongTree(
                            mapSongsByArtist(songList)
                                .sort(sortArtistsByName)
                                .map((artistSongs) => artistSongs.sort(sortSongsByName))
                        )
                    ) : (
                        this.renderSongList(
                            songList.sort(sortSongsByName)
                        )
                    ))
                ) : (
                    this.renderSongList(
                        songList
                            // Copy Array.
                            .map((item) => item)
                            .sort(SearchStringSorter(searchString))
                    )
                ))
            }
        </div>
    }
}
const _songSimilarity = (songInfo: SongInfo, searchString: string): number => {
    const name = songInfo.name.toLowerCase()
    const artist = songInfo.artist.toLowerCase()
    return (name.startsWith(searchString)) ?
        4 :
        (artist.startsWith(searchString) ?
            3 :
            (name.includes(searchString) ?
                2 :
                (artist.includes(searchString) ?
                    1 :
                    0
                )
            )
        )
}
const SearchStringSorter = (_searchString: string) => {
    const searchString = _searchString.toLowerCase()
    return (a: SongInfo, b: SongInfo) => {
        const aScore = _songSimilarity(a, searchString)
        const bScore = _songSimilarity(b, searchString)
        return (aScore < bScore) ? 1 : (aScore > bScore) ? -1 : 0
    }
}
const mapSongsByArtist = (songs: SongInfo[]): SongInfo[][] => {
    const songsByArtist: SongInfo[][] = []
    for (const song of songs) {
        // Check for existing item with same artist.
        let added = false
        for (const artistSongs of songsByArtist)
            if (artistSongs[0].artist === song.artist) {
                artistSongs.push(song)
                added = true
            }
        if (!added)
            songsByArtist.push([song])
    }
    return songsByArtist
        .sort((a, b) => {
            const textA = a[0].artist.toUpperCase()
            const textB = b[0].artist.toUpperCase()
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
}
/**
 * Sorter factory for objects with names.
 */
const SortByName = function<T>(name: (o: T) => string) {
    return (a: T, b: T): -1 | 1 | 0 => {
        const textA = name(a).toUpperCase()
        const textB = name(b).toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    }
}
const sortSongsByName = SortByName<SongInfo>((songInfo) => songInfo.name)
const sortArtistsByName = SortByName<SongInfo[]>((artistSongs) => artistSongs[0].artist)
