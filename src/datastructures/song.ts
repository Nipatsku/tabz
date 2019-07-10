
/**
 *
 */
export interface SongInfo {
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
     * 
     */
    readonly name: string
    /**
     *
     */
    readonly content: string
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
