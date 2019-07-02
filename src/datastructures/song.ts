
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
}
/**
 * 
 */
export interface Song extends SongInfo {
    /**
     * 
     */
    readonly content: string
}