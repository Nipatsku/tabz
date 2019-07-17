import { AutoScrollSpeed } from "./autoScroll";

/**
 *
 */
export interface SongInfo {
    /**
     * Unique identifier between all songs.
     */
    readonly id: string
    /**
     *
     */
    readonly name: string
    /**
     *
     */
    readonly artist: string
    /**
     *
     */
    readonly url: string
}
/**
 *
 */
interface GuitarSong {
    /**
     *
     */
    readonly instrument: "guitar"
    /**
     *
     */
    readonly tuning: string
}
/**
 *
 */
interface OnlyLyrics {
    /**
     *
     */
    readonly instrument: "lyrics"
}
/**
 *
 */
type PossibleSongVersions = GuitarSong | OnlyLyrics
/**
 *
 */
export type SongVersion = {
    /**
     * Unique identifier between all versions **and** all songs.
     */
    readonly id: string
    /**
     *
     */
    readonly name: string
    /**
     *
     */
    readonly content: string
    /**
     *
     */
    readonly duration?: AutoScrollSpeed
} & PossibleSongVersions
/**
 *
 */
export interface Song extends SongInfo {
    /**
     *
     */
    readonly versions: SongVersion[]
}
