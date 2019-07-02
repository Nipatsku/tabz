const _ = () => {
    /////////////////////////////////////////////////////////
    // @@@@@ TEMPLATE @@@@@
    song('', '')
    //#region
        .version({
            instrument: Guitar(guitarTunings.standard),
            duration: 3 * 60 + 0,
            content: `

`
        })
    //#endregion
    /////////////////////////////////////////////////////////
    // @@@@@ SONG LIST @@@@@

    //#region
    song('Nirvana', 'Lake of Fire')
    //#region
        .version({
            instrument: Guitar(guitarTunings.capo2),
            duration: 2 * 60 + 30,
            content: ``
        })
    //#endregion
    song('Nirvana', 'Oh, Me')
    //#region
        .version({
            instrument: Guitar(guitarTunings.capo2),
            duration: 2 * 60 + 30,
            content: ``
        })
    //#endregion
    //#endregion

    /////////////////////////////////////////////////////////
}
const songs = []
const song = (artist, name) => {
    // Push entry to song list.
    const versions = []
    songs.push({
        name,
        artist,
        versions
    })
    // Return interface for adding versions.
    return {
        version: (data) => {
            const { instrument, duration, content } = data
            versions.push({
                ...instrument,
                duration,
                content
            })
        }
    }
}
const instruments = {
    guitar: 'guitar'
}
const guitarTunings = {
    unknown: 'Unknown',
    full_step_down: 'Full-Step Down',
    half_step_down: 'Half-Step Down',
    standard: 'Standard',
    capo1: 'Capo 1st',
    capo2: 'Capo 2st',
    capo3: 'Capo 3st',
    capo4: 'Capo 4st',
    capo5: 'Capo 5st',
    capo6: 'Capo 6st',
    capo7: 'Capo 7st',
    capo8: 'Capo 8st',
    capo9: 'Capo 9st',
    capo10: 'Capo 10st',
    capo11: 'Capo 11st',
}
const Guitar = (tuning = guitarTunings.standard) => ({
    instrument: instruments.guitar,
    tuning
})
_()
module.exports = { songs, instruments }
