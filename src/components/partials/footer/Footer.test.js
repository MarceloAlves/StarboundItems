import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

const setup = props => shallow(<Footer {...props} />)

xdescribe('Footer', () => {
  let wrapper = setup()

  it('displays a simple footer', () => {
    expect(wrapper.find('footer').length).toBe(1)
  })

  it('has two columns', () => {
    expect(wrapper.find('.column').length).toBe(2)
  })
})
