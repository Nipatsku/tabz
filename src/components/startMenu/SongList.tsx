import * as React from "react";
import { SongInfo } from "datastructures/song"
import { Tree, Icon, List } from "antd/lib"
import { compareTwoStrings } from "string-similarity"
const { TreeNode } = Tree

interface Props {
    songList: SongInfo[]
    searchString?: string
    onSelectSong: (songInfo: SongInfo) => void
}
interface State {}
type SongSorter = (a: SongInfo, b: SongInfo) => 1 | -1 | 0
export class SongList extends React.Component<Props, State> {
    onSelectSong = (selectedKeys: string[]) => {
        const { songList, onSelectSong } = this.props
        const selectedSongKey = selectedKeys[0]
        // Find Song with same key.
        const selectedSong = songList.find((songInfo) =>
            this.getSongAsTreeKey(songInfo) === selectedSongKey
        )
        // Must check for undefined, as onSelectSong gets also called for artist clicks !
        if (selectedSong)
            onSelectSong(selectedSong)
    }
    getSongAsTreeKey = (songInfo: SongInfo) => `${songInfo.artist} - ${songInfo.name}`
    render() {
        const { songList, searchString } = this.props
        if (! searchString) {
            const songsByArtist = mapSongsByArtist(songList)
                .map((artistSongs) => artistSongs.sort(sortSongsByName))
            return <Tree
                showIcon
                switcherIcon={<Icon type="down" />}
                onSelect={this.onSelectSong}
            >
                {songsByArtist.map((artistSongs, iArtist) =>
                    <TreeNode
                        key={`${iArtist}`}
                        title={artistSongs[0].artist}
                        // icon= TODO
                    >
                        {artistSongs.map((song) =>
                            <TreeNode
                                key={this.getSongAsTreeKey(song)}
                                title={song.name}
                            />
                        )}
                    </TreeNode>
                )}
            </Tree>
        } else {
            const songsSortedBySearchString = songList
                // Copy Array.
                .map((item) => item)
                .sort(SearchStringSorter(searchString))
            return <List
                itemLayout="horizontal"
                dataSource={songsSortedBySearchString}
                renderItem={(songInfo) => (
                    <List.Item>
                        <List.Item.Meta
                            title={`${songInfo.artist} - ${songInfo.name}`}
                        />
                    </List.Item>
                )}
            />
        }
    }
}
const _getSongAsString = (songInfo: SongInfo) => `${songInfo.name} ${songInfo.artist}`.toLowerCase()
const _songSimilarity = (songInfo: SongInfo, searchString: string): number => {
    const name = songInfo.name.toLowerCase()
    const artist = songInfo.artist.toLowerCase()
    return (name.startsWith(searchString) || artist.startsWith(searchString)) ?
            1 :
            (name.includes(searchString) || artist.includes(searchString) ?
                0.5 :
                0
            )
}
const SearchStringSorter = (_searchString: string): SongSorter => {
    const searchString = _searchString.toLowerCase()
    return (a, b) => {
        const aString = _getSongAsString(a)
        const bString = _getSongAsString(b)
        let aScore, bScore
        // Separate functionality based on whether searchString is shorter than 3 characters.
        // string-similarity doesn't seem to work without at least 3 characters.
        if (searchString.length >= 3) {
            aScore = compareTwoStrings(aString, searchString)
            bScore = compareTwoStrings(bString, searchString)
        } else {
            aScore = _songSimilarity(a, searchString)
            bScore = _songSimilarity(b, searchString)
        }
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
}
const sortSongsByName = (a: SongInfo, b: SongInfo): -1 | 1 | 0 => {
    const textA = a.name.toUpperCase()
    const textB = b.name.toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
}
