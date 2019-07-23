import { spy } from 'sinon'
import { expect } from 'chai'
import { useLocalStorageItem, ParseString } from '../../../../../src/components/common/common'
import { LocalStorage } from '../../../mocks'
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
        let localStorage: LocalStorage
        
        beforeEach(function() {
            localStorage = LocalStorage()
        })
        afterEach(function() {
            localStorage = undefined
        })

        it('if value is not stored yet, defaultValue is used', function() {
            // Mock localStorage: getItem() -> null
            localStorage.getItem = () => null

            const { result } = renderHook(() =>
                useLocalStorageItem(
                    'test-key',
                    true,
                    ParseString.Boolean,
                    { inject: localStorage }
                )
            )
            // Current value should equal passed defaultValue.
            expect(result.current.value).to.equal(true)
        })
        it('if there is a stored value, it is used over defaultValue', function() {
            const storedValue = 'false'
            // Mock localStorage: getItem() -> storedValue
            localStorage.getItem = () => storedValue

            const { result } = renderHook(() =>
                useLocalStorageItem(
                    'test-key',
                    true,
                    ParseString.Boolean,
                    { inject: localStorage }
                )
            )
            // Current value should equal mocked storage value.
            expect(result.current.value).to.equal(
                ParseString.Boolean.fromString(storedValue)
            )
        })
        it('handleChange calls setItem', function() {
            // Spy on localStorage.setItem()
            const setItem = spy(localStorage, 'setItem')

            const itemKey = 'test-key'
            const { result } = renderHook(() =>
                useLocalStorageItem(
                    itemKey,
                    true,
                    ParseString.Boolean,
                    { inject: localStorage }
                )
            )
            expect(setItem.notCalled).to.be.ok
            // Call handleChange() with a new value.
            const newValue = false
            result.current.handleChange(newValue)
            // Check that localStorage.setItem() was called with given key and value.
            expect(setItem.calledWith(
                itemKey,
                ParseString.Boolean.toString(newValue)
            )).to.be.ok
        })
    })
})
