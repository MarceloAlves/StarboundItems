import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
axios.defaults.adapter = httpAdapter
export function performSearch(term, includeRaw = false) {
  if (!term || term === '' || term.length <= 2) {
    return {
      data: [],
      error: false
    }
  }

  return new Promise(resolve => {
    axios
      .get(
        `https://api.starbounditems.com/v1/search/?type=list&includeRaw=${includeRaw}&term=${term}`
      )
      .then(response => {
        const results = Object.assign({}, response.data, { error: false })
        resolve(results)
      })
      .catch(err => resolve({ data: [], error: true, errorDetails: err }))
  })
}

export function tagLookup(tag) {
  return new Promise(resolve => {
    axios
      .get(`https://api.starbounditems.com/v1/search/?type=tags&term=${tag}`)
      .then(response => {
        const results = Object.assign({}, response.data, { error: false })
        resolve(results)
      })
      .catch(err => resolve({ data: [], error: true, errorDetails: err }))
  })
}

export function getStats() {
  return new Promise(resolve => {
    axios
      .get('https://api.starbounditems.com/v1/stats')
      .then(response => resolve(response))
      .catch(err => resolve({ error: true, errorDetails: err }))
  })
}

export function getItemPage(page) {
  return new Promise(resolve => {
    axios
      .get(`https://api.starbounditems.com/v1/items/?page=${page}`)
      .then(response => {
        const results = Object.assign({}, response.data, { error: false })
        resolve(results)
      })
      .catch(err => resolve({ data: [], error: true, errorDetails: err }))
  })
}
