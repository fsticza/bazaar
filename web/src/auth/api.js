import fetch from '@/fetch'

export default {
  signIn (credentials = {}) {
    // console.log(Vue.prototype.$api)
    return fetch('/auth/token', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
  },
  signOut () {
    return fetch('/auth/token', {
      method: 'DELETE'
    })
  }
}
