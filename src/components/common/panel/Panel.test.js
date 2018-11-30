import React from 'react'
import { shallow } from 'enzyme'
import Panel from './Panel'

const setup = props => shallow(<Panel {...props} />)

xdescribe('Panel', () => {
  xdescribe('Without Data', () => {
    let wrapper = setup()

    it('renders a panel', () => {
      expect(wrapper.find('.box').length).toBe(1)
    })
  })

  xdescribe('with data', () => {
    let wrapper, props

    beforeAll(() => {
      props = {
        title: 'Panel Title',
        children: 'Content'
      }

      wrapper = setup(props)
    })

    it('contains a title', () => {
      expect(wrapper.find('.content').contains(props.title)).toBeTruthy()
    })

    it('contains children', () => {
      expect(wrapper.find('.content').contains(props.children)).toBeTruthy()
    })
  })
})
