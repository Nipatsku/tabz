// Important! jsdom-global/register must be imported first!
import 'jsdom-global/register'
import React from 'react'
import { configure, mount } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import App from '../../../../src/components/App'
import { MemoryRouter } from 'react-router-dom'
import { SelectSong } from '../../../../src/components/selectSong/SelectSong'
import { NotFound } from '../../../../src/components/NotFound'

configure({ adapter: new Adapter() })

describe('App', function() {
    describe('routing', function() {
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
        it.skip('/ renders SelectSong', function() {
            testRoute('/', SelectSong)
        })
    })
})
