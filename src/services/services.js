import axios from 'axios'

export async function performSearch(term) {
  if (!term || term === '') {
    return {
      data: {
        data: []
      }
    }
  }

  const response = await axios
    .get(`https://api.starbounditems.com/v1/search/?type=list&term=${term}`)
    .then(response => response)
    .catch(() => ({
      data: {
        data: []
      },
      error: true
    }));

  return await response
}

export async function tagLookup(tag) {
  const response = await axios
    .get(`https://api.starbounditems.com/v1/search/?type=tags&term=${tag}`)
    .then(response => response)
    .catch(() => ({
      data: {
        data: []
      },
      error: true
    }));

  return await response
}

export async function getStats() {
  const response = await axios
    .get('https://api.starbounditems.com/v1/stats')
    .then(response => response)
    .catch(() => ({
      data: {
        data: []
      },
      error: true
    }));

  return await response;
}

export async function getItemPage(page) {
  const response = await axios
    .get(`https://api.starbounditems.com/v1/items/?page=${page}`)
    .then(response => response)
    .catch(() => ({
      data: {
        data: []
      },
      error: true
    }));

  return await response;
}
