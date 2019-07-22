import { expect } from 'chai'
import { useLocalStorageItem, ParseString } from '../../../src/components/common/common'
import { LocalStorage } from '../mocks'
import { renderHook } from '@testing-library/react-hooks'

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
        it('value is equal to defaultValue', function() {
            const { result } = renderHook(() =>
                useLocalStorageItem(
                    'test-key',
                    true,
                    ParseString.Boolean,
                    { inject: undefined }
                )
            )
            expect(result.current.value).to.equal(true)
        })
        it('handleChange changes value', function() {
            const { result } = renderHook(() =>
                useLocalStorageItem(
                    'test-key',
                    true,
                    ParseString.Boolean,
                    { inject: undefined }
                )
            )
            expect(result.current.value).to.equal(true)
            result.current.handleChange(false)
            expect(result.current.value).to.equal(false)
        })
    })
    describe('localStorage is defined', function() {
        it.skip('if value is not stored yet, defaultValue is used', function() {})
        it.skip('if there is a stored value, it is used over defaultValue', function() {})
        it.skip('handleChange calls setItem', function() {})
    })
})
