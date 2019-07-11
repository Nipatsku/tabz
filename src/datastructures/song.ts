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
export interface GuitarSong {
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
export type PossibleSongVersions = GuitarSong
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
} & (PossibleSongVersions)
/**
 *
 */
export interface Song extends SongInfo {
    /**
     *
     */
    readonly versions: SongVersion[]
}
