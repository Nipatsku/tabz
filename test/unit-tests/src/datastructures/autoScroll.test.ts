import { expect } from 'chai'
import { beforeEach, afterEach } from "mocha";
import sinon from "sinon";

import { getSongAutoScrollSpeed, saveSongAutoScrollSpeed, AutoScrollSpeed } from '../../../../src/datastructures/autoScroll'
import { SongVersion } from '../../../../src/datastructures/song';

describe('autoScroll', function() {
    beforeEach(function() {
        
    })
    afterEach(function() {
        
    })
    describe('getSongAutoScrollSpeed', function() {

    })
    describe('saveSongAutoScrollSpeed', function() {
        it('does not call localStorage.setItem when it is undefined', function() {
            // Mock arguments for 'saveSongAutoScrollSpeed':
            // - SongVersion
            // - AutoScrollSpeed
            // - Mock localStorage
            const songVersion: SongVersion = {} as any
            const autoScrollSpeed: AutoScrollSpeed = 0
            const storage: Storage | null = null
            // Call 'saveSongAutoScrollSpeed'.
            saveSongAutoScrollSpeed(songVersion, autoScrollSpeed, storage)
        })
        it.skip('calls localStorage.setItem when it is defined', function() {
            
        })
    })
})
export {
    // Use an empty export to please Babel's single file emit.
    // https://github.com/Microsoft/TypeScript/issues/15230
}