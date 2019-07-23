import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import Test from '../../../src/components/Test'

configure({ adapter: new Adapter() });

describe('test', function() {
    it('test', function() {
        const wrapper = shallow(<Test/>);
        expect(wrapper.contains(<p>Hello world !</p>)).to.be.ok
    })
})
