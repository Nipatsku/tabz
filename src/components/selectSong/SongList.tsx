import React, { useState } from "react"
import { SongInfo } from "../../datastructures/song"
import { Tree, Icon, List, Typography, Checkbox } from "antd/lib"
import { useLocalStorageItem, ParseString } from "../common/common"
const { TreeNode } = Tree

interface Props {
    songList: SongInfo[]
    searchString?: string
    onSelectSong: (songInfo: SongInfo) => void
}
export default function SongList(props: Props) {
    const { songList, searchString, onSelectSong } = props

    const groupByArtist = useLocalStorageItem(
        localStorageKey_groupByArtist,
        false,
        ParseString.Boolean
    )
    function handleGroupByArtistChange() {
        groupByArtist.handleChange(!groupByArtist.value)
    }

    function handleSelectTreeNode(selectedKeys: string[]) {
        const selectedTreeNodeKey = selectedKeys[0]

        // Check if selected Node was a song.
        const selectedSong = songList.find((songInfo) =>
            songInfo.id === selectedTreeNodeKey
        )
        if (selectedSong)
            onSelectSong(selectedSong)
    }

    function renderSongTree(songsByArtist: SongInfo[][]): JSX.Element {
        return <Tree
            showIcon
            switcherIcon={<Icon type="down" />}
            onSelect={handleSelectTreeNode}
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
    function renderSongList(songs: SongInfo[]): JSX.Element {
        return <Tree
            showIcon
            onSelect={handleSelectTreeNode}
        >
            {songs.map((song) => <TreeNode
                    key={song.id}
                    title={`${song.name} - ${song.artist}`}
            />)}
        </Tree>
    }
    return (<div>
        <div
            className="groupByArtistDiv transparentBackground"
        >
            <Checkbox
                className="groupByArtistCheckbox transparentText"
                defaultChecked={groupByArtist.value}
                onChange={handleGroupByArtistChange}
            >
                Group by artist
            </Checkbox>
        </div>
        {
            ((searchString === undefined) ? (
                ((groupByArtist.value) ? (
                    renderSongTree(
                        mapSongsByArtist(songList)
                            .sort(sortArtistsByName)
                            .map((artistSongs) => artistSongs.sort(sortSongsByName))
                    )
                ) : (
                    renderSongList(
                        songList.sort(sortSongsByName)
                    )
                ))
            ) : (
                renderSongList(
                    songList
                        // Copy Array.
                        .map((item) => item)
                        .sort(SearchStringSorter(searchString))
                )
            ))
        }
    </div>)
}

const localStorageKey_groupByArtist = "groupByArtist"
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
