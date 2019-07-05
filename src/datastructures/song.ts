
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
    readonly instrument: 'guitar'
    /**
     * 
     */
    readonly tuning: string
}
/**
 * 
 */
export type SongVersion = {
    /**
     * 
     */
    readonly content: string
} & (GuitarSong)
/**
 * 
 */
export interface Song extends SongInfo {
    /**
     * 
     */
    readonly versions: SongVersion[]
}