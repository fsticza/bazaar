import fetch from '@/fetch'

export default {
  create (payload = {}) {
    // console.log(Vue.prototype.$api)
    return fetch('/accounts', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },
  show (id) {
    // console.log(Vue.prototype.$api)
    return fetch(`/accounts/${id}`)
      .then(res => res.json())
  },
  list (params = {}) {
    // console.log(Vue.prototype.$api)
    const queryParams = Object.keys(params)
      .filter(key => {
        return !!key && !!params[key] && !!params[key].length
      })
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return fetch(`/accounts?${queryParams}`)
      .then(res => res.json())
  },
  destroy (id) {
    // console.log(Vue.prototype.$api)
    return fetch(`/accounts/${id}`, {
      method: 'DELETE'
    })
  },
}
