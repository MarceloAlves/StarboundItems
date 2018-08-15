import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

function setup(props) {
  return shallow(<Footer {...props} />)
}

describe('Footer', () => {
  let wrapper = setup()

  it('displays a simple footer', () => {
    expect(wrapper.find('footer').length).toBe(1)
  })

  it('has two columns', () => {
    expect(wrapper.find('.column').length).toBe(2)
  })
})
