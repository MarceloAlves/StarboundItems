import React from 'react'
import { shallow } from 'enzyme'
import nock from 'nock'
import HomePage from './HomePage'

const setup = props => shallow(<HomePage {...props} />)

describe('HomePage', () => {
  describe('Default Render', () => {
    let wrapper

    beforeAll(() => {
      wrapper = setup()
    })

    it('has a search box', () => {
      expect(wrapper.find('DebounceInput').length).toBe(1)
    })

    xit('has an InfoBar', () => {
      expect(wrapper.find('InfoBar').length).toBe(1)
    })

    it('has the item table hidden', () => {
      expect(wrapper.find('ItemTable').length).toBe(0)
    })
  })

  describe('Searching', () => {
    let wrapper, result

    beforeAll(async () => {
      result = {
        icon: 'item.jpg',
        name: 'longclaw',
        short_description: 'Longclaw',
        description: 'Valyrian steel',
        rarity: 'Legendary',
        type: 'Weapon'
      }

      nock.disableNetConnect()
      nock('https://api.starbounditems.com')
        .get('/v1/search/')
        .query({
          type: 'list',
          includeRaw: 'false',
          term: 'longclaw'
        })
        .reply(200, { data: [{ ...result }], error: false })

      wrapper = setup()
      await wrapper.instance().handleSearch('longclaw')
    })

    afterAll(() => {
      nock.cleanAll()
    })

    it('updates state correctly', () => {
      expect(wrapper.state().results[0]).toEqual(result)
    })

    it('hides info box', () => {
      expect(wrapper.find('InfoBox').length).toBe(0)
    })
  })
})
