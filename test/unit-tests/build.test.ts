// Tests for build process.
const { expect } = require('chai')
const fs = require('fs')

describe('build', function() {
    describe('public/content', function() {
        it('list.json exists', function() {
            const listExists = fs.existsSync('public/content/list.json')
            expect(listExists).to.equal(true)
        })
        describe('list.json', function() {
            const listRaw = fs.readFileSync('public/content/list.json')
            const list = JSON.parse(listRaw)
            it('is an Array', function() {
                expect(list).to.have.property('length')
            })
            it('only has SongInfo members', function() {
                const len = list.length
                for (let i = 0; i < len; i ++) {
                    const item = list[i]
        
                    expect(item).to.have.property('name')
                    expect(item.name).to.be.a('string')
                    
                    expect(item).to.have.property('artist')
                    expect(item.artist).to.be.a('string')
        
                    expect(item).to.have.property('url')
                    expect(item.url).to.be.a('string')
                }
            })
            it('references existing URLs', function() {
                const len = list.length
                for (let i = 0; i < len; i ++) {
                    const { url } = list[i]
                    const fileExists = fs.existsSync(`public/${url}`)
                    expect(fileExists).to.equal(true)
                }
            })
        })
        describe('songs', function() {
            const files = fs.readdirSync('public/content/')
            const filesLen = files.length
            const songs = new Array<any>()
            for (let i = 0; i < filesLen; i ++) {
                const fileName = files[i]
                if (fileName === 'list.json')
                    continue
                
                const fileRaw = fs.readFileSync(`public/content/${fileName}`)
                const song = JSON.parse(fileRaw)
                songs.push(song)
            }
            const songsLen = songs.length
            it('are Song objects', function() {
                for (let i = 0; i < songsLen; i ++) {
                    const song = songs[i]
                    
                    expect(song).to.have.property('name')
                    expect(song.name).to.be.a('string')
                    
                    expect(song).to.have.property('artist')
                    expect(song.artist).to.be.a('string')
        
                    expect(song).to.have.property('url')
                    expect(song.url).to.be.a('string')
    
                    expect(song).to.have.property('versions')
                    expect(song.versions).to.have.property('length')
                }
            })
            it('.versions only has Song members', function() {
                for (let i = 0; i < songsLen; i ++) {
                    const song = songs[i]
                    for (const version of song.versions) {
                        expect(version).to.have.property('name')
                        expect(version.name).to.be.a('string')

                        expect(version).to.have.property('content')
                        expect(version.content).to.be.a('string')
                    }
                }
            })
            // GuitarSong implements Song.
            // In future there might be more Song types added, then this test will have to be modified.
            it('.versions only has GuitarSong members', function() {
                for (let i = 0; i < songsLen; i ++) {
                    const song = songs[i]
                    for (const version of song.versions) {
                        expect(version).to.have.property('instrument')
                        expect(version.instrument).to.be.a('string')
    
                        expect(version).to.have.property('tuning')
                        expect(version.tuning).to.be.a('string')
                    }
                }
            })
        })
    })
})

export {
    // Use an empty export to please Babel's single file emit.
    // https://github.com/Microsoft/TypeScript/issues/15230
}