import { SongVersion } from "./song";

/**
 * Collection of static AutoScrollSpeed values.
 */
export const AutoScrollValues = {
    /**
     * 
     */
    min: 10 * 60 as AutoScrollSpeed,
    /**
     * 
     */
    max: 1 * 60 as AutoScrollSpeed,
    /**
     * 
     */
    default: 3 * 60 as AutoScrollSpeed
}
/**
 * Number presents **seconds** that it should take to scroll the whole content from start to end.
 */
export type AutoScrollSpeed = number
/**
 * 
 */
const _SongAutoScrollSpeedID = (song: SongVersion): string => `ass-${song.id}`
/**
 * Get AutoScrollSpeed for a Version of a Song. Included factors are:
 * - localStorage
 * - SongVersion.duration
 * - default AutoScrollSpeed
 */
export const getSongAutoScrollSpeed = (song: SongVersion): AutoScrollSpeed => {
    // Check for saved value in localStorage.
    if (localStorage !== undefined) {
        const savedPreference = localStorage.getItem(_SongAutoScrollSpeedID(song))
        if (savedPreference !== null)
            return Number(savedPreference) as AutoScrollSpeed
    }
    return song.duration !== undefined ?
        song.duration : AutoScrollValues.default
}
export const saveSongAutoScrollSpeed = (song: SongVersion, autoScrollSpeed: AutoScrollSpeed) => {
    if (localStorage === undefined)
        // localStorage is not available.
        return
    
    localStorage.setItem(_SongAutoScrollSpeedID(song), String(autoScrollSpeed))
}
