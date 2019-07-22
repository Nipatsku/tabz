import { expect } from 'chai'
import { useLocalStorageItem, ParseString } from '../../../src/components/common/common'
import { LocalStorage } from '../mocks'

describe('ParseString', function() {
    describe('Boolean', function() {
        describe('fromString', function() {
            it('\'true\' = true', function() {
                expect(ParseString.Boolean.fromString('true')).to.equal(true)
            })
            it('\'false\' = false', function() {
                expect(ParseString.Boolean.fromString('false')).to.equal(false)
            })
        })
        describe('toString', function() {
            it('true = \'true\'', function() {
                expect(ParseString.Boolean.toString(true)).to.equal('true')
            })
            it('false = \'false\'', function() {
                expect(ParseString.Boolean.toString(false)).to.equal('false')
            })
        })
    })
})

describe('useLocalStorageItem', function() {
    let localStorage: LocalStorage
    
    beforeEach(function() {
        localStorage = LocalStorage()
    })
    afterEach(function() {
        localStorage = undefined
    })

    describe('localStorage is undefined', function() {
        it.skip('value is equal to defaultValue', function() {
            // TODO: Use react-testing-library for testing Hooks.
            useLocalStorageItem(
                'test-key',
                true,
                ParseString.Boolean,
                // Inject mock localStorage.
                localStorage
            )
        })
        it.skip('handleChange changes value', function() {})
    })
    describe('localStorage is defined', function() {
        it.skip('if value is not stored yet, defaultValue is used', function() {})
        it.skip('if there is a stored value, it is used over defaultValue', function() {})
        it.skip('handleChange calls setItem', function() {})
    })
})
