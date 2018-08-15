import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

function setup(props) {
  return shallow(<App {...props} />)
}
describe('App', () => {
  let wrapper = setup()

  it('renders without crashing', () => {
    expect(wrapper.find('.container').length).toBe(1)
  })
})
