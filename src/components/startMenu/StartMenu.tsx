import * as React from "react";
import { SongInfo, Song } from "../../datastructures/song";
import { SongSelector } from "./SongSelector";
import { DisplaySong } from "../displaySong/DisplaySong";
import { LoadingIndicator } from "../common/LoadingIndicator"
import { Button, Layout, Typography, Icon } from "antd/lib";

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
    songList?: SongInfo[];
    /**
     *
     */
    subState:
        {
            id: "none"
        } |
        {
            id: "select-song"
        } |
        {
            id: "display-song",
            partialSongInfo: SongInfo,
            song?: Song,
        };
}
/**
 *
 */
export class StartMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // Read song list.
        fetch("content/list.json")
            .then((r) => r.json())
            .then((songList) => this.setState({ songList }))
            // For development, auto traversal of GUI.
            .then(() => {
                const songList = this.state.songList as SongInfo[]
                const partialSongInfo = songList.find((songInfo) => songInfo.name.includes("Nice Guy")) as SongInfo
                this.getFullSongInfo(partialSongInfo)
                    .then((song) => {
                        this.setState({
                            subState: {
                                id: "display-song",
                                partialSongInfo,
                                song
                            }
                        })
                    })
            })
        this.state = {
            subState: {
                id: "select-song"
            },
        };
    }
    getFullSongInfo(partialSongInfo: SongInfo): Promise<Song> {
        return fetch(partialSongInfo.url)
            .then((r) => r.json());
    }
    onClickSelectSong = () => {
        this.setState({
            subState: { id: "select-song" },
        });
    }
    onSelectSong = (songInfo: SongInfo) => {
        this.getFullSongInfo(songInfo)
            .then((song) => {
                const { subState } = this.state;
                if (subState.id === "display-song") {
                    this.setState({
                        subState: {
                            ...subState,
                            song
                        }
                    });
                }
            });
        this.setState({
            subState: {
                id: "display-song",
                partialSongInfo: songInfo,
            },
        });
    }
    render() {
        const { songList, subState } = this.state;
        switch (subState.id) {
            case "none":
                return <div>
                    <Typography.Title>
                        Tabz for days - React version
                    </Typography.Title>
                    <Button
                        onClick={this.onClickSelectSong}
                    >Select song</Button>
                </div>;
            case "select-song":
                return songList ? <SongSelector
                        songList={songList}
                        onSelectSong={this.onSelectSong}
                    ></SongSelector>
                    :
                    <LoadingIndicator/>;
            case "display-song":
                return subState.song ? <DisplaySong
                    song={subState.song}
                    returnToPrevious={() => {
                        this.setState({
                            subState: { id: "select-song" }
                        })
                    }}
                />
                :
                <LoadingIndicator/>;
        }
    }
}
