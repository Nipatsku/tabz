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
        // Verify correct structure of JSON object.
    })
})

export {
    // Use an empty export to please Babel's single file emit.
    // https://github.com/Microsoft/TypeScript/issues/15230
}