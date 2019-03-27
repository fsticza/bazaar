import fetch from '@/fetch'

export default {
  create (payload = {}) {
    return fetch('/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },
  show (id) {
    return fetch(`/products/${id}`)
      .then(res => res.json())
  },
  list (params = {}) {
    const queryParams = new URLSearchParams()
    Object.entries(params)
      .forEach(([key, value]) => queryParams.append(key, value))
    return fetch(`/products?${queryParams}`)
      .then(res => res.json())
  },
  destroy (id) {
    return fetch(`/products/${id}`, {
      method: 'DELETE'
    })
  },
}
