var { expect } = require('chai')

describe('math', function() {
    it('addition', function() {
        const result = 5 + 2
        expect(result).equal(7)
    })
})

export {
    // Use an empty export to please Babel's single file emit.
    // https://github.com/Microsoft/TypeScript/issues/15230
}