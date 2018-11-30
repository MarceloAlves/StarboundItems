import React from 'react'
import { shallow } from 'enzyme'
import InfoBar from './InfoBar'

const setup = props => shallow(<InfoBar {...props} />)

xdescribe('InfoBar', () => {
  let wrapper = setup()

  xit('renders with three panels', () => {
    expect(wrapper.find('Panel').length).toBe(3)
  })
})
