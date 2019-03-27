import store from './store'

const { VUE_APP_API_URL: API_URL } = process.env

const throwOnError = response => {
  if (!response || response.ok) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const checkMIME = response => {
  const contentType = response.headers.get('content-type')
  if (!contentType) {
    return response
  }
  response.isJSON = contentType.includes('/json')
  response.isHTML = contentType.includes('/html')
  response.isText = contentType.includes('text/')
  return response
}

const defaultOptions = {
  cache: 'no-cache',
  // credentials: 'same-origin',
  headers: {
    'Accept': 'application/json; charset=UTF-8'
  }
}

if (!API_URL) {
  // console.info('No API_URL provided in env config.')
}

export default function fetch (path, options = {}) {
  const token = store.getters['auth/token']
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`
  }
  if (!options.body || !(options.body instanceof FormData)) {
    options.headers = options.headers || {}
    options.headers['Content-Type'] = 'application/json'
  }

  return window.fetch(`${API_URL}${path}`, Object.assign({}, defaultOptions, options, {
    headers: Object.assign({}, defaultOptions.headers, options.headers)
  }))
    .then(checkMIME)
    .then(res => {
      if (res && res.status === 401) {
        store.dispatch('auth/signOut')
        store.dispatch('account/setAccount', null)
      }
      return res
    })
    .then(throwOnError)
}
