// Important! jsdom-global/register must be imported first!
import 'jsdom-global/register'
import React from 'react'
import { configure, mount } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

import App from '../../../../src/components/App'
import { MemoryRouter } from 'react-router-dom'
import { SelectSong, FetchURIs as SelectSongFetchURIs } from '../../../../src/components/selectSong/SelectSong'
import { NotFound } from '../../../../src/components/NotFound'

configure({ adapter: new Adapter() })

describe('App', function() {
    describe('routing', function() {
        
        const mockFetch = {
            apply: () => fetchMock.mock(SelectSongFetchURIs.List, []),
            restore: fetchMock.restore
        }

        const mockWindowScrollTo = (() => {
            let original
            const apply = () => {
                original = window.scrollTo
                window.scrollTo = undefined
            }
            const restore = () => {
                window.scrollTo = original
                original = undefined
            }
            return { apply, restore }
        })()

        function testRoute(route: string, expectedComponent: any) {
            const wrapper = mount(
                <MemoryRouter initialEntries={[ route ]}>
                    <App/>
                </MemoryRouter>
            )
            expect(wrapper.find(expectedComponent)).to.have.length(1)
        }
        it('invalid URL renders NotFound', function() {
            testRoute('/this-url-is-definitely-invalid', NotFound)
        })
        it('/ renders SelectSong', function() {
            mockFetch.apply()
            mockWindowScrollTo.apply()

            testRoute('/', SelectSong)

            mockFetch.restore()
            mockWindowScrollTo.restore()
        })
    })
})
