import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import App from '../../../src/components/App'

configure({ adapter: new Adapter() });

describe.only('test', function() {
    it('test', function() {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('div').html()).to.equal('<p>Title</p>');
    })
})
