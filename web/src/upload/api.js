import fetch from '@/fetch'

export default {
  create (file) {
    var formData = new FormData()
    formData.append('coverSrc', file)

    return fetch('/uploads', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
  }
}
