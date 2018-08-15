import React from 'react'
import { shallow } from 'enzyme'
import ItemTable from './ItemTable'

function setup(props) {
  return shallow(<ItemTable {...props} />)
}

describe('ItemTable', () => {
  describe('Without Data', () => {
    let wrapper = setup()

    it('renders a table by default', () => {
      expect(wrapper.find('.table').length).toBe(1)
    })
  })

  describe('With Data', () => {
    let wrapper, props

    beforeAll(() => {
      props = {
        items: [
          {
            icon: 'item.jpg',
            name: 'longclaw',
            short_description: 'Longclaw',
            description: 'Valyrian steel',
            rarity: 'Legendary',
            type: 'Weapon'
          }
        ]
      }

      wrapper = setup(props)
    })

    it('renders with a table row', () => {
      expect(wrapper.find('tbody > tr').length).toBe(1)
      expect(wrapper.find('td').contains(props.items[0].name)).toBeTruthy()
      expect(
        wrapper.find('td').contains(props.items[0].short_description)
      ).toBeTruthy()
      expect(
        wrapper.find('td').contains(props.items[0].description)
      ).toBeTruthy()
      expect(wrapper.find('td').contains(props.items[0].rarity)).toBeTruthy()
      expect(wrapper.find('td').contains(props.items[0].type)).toBeTruthy()
    })

    it('uses the correct image path', () => {
      expect(wrapper.find('td > img').prop('src')).toBe(
        `/images/icons/${props.items[0].icon}`
      )
    })
  })
})
