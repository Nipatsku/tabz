// Tests for build process.
const { expect } = require('chai')
const fs = require('fs')

/**
 *
 */
describe('public/content', function() {
    it('list.json', function() {
        // Read 'public/content/list.json'.
        const listRaw = fs.readFileSync('public/content/list.json')
        const list = JSON.parse(listRaw)
        // 'list' should be an Array of 'SongInfo' objects.
        expect(list).to.have.property('length')
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
})

export {
    // Use an empty export to please Babel's single file emit.
    // https://github.com/Microsoft/TypeScript/issues/15230
}