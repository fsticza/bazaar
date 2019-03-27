import * as types from './mutation-types'
import * as consts from '@/consts'
import uploadApi from './api'

const state = {
  uploadCreateStatus: ''
}

const getters = {
  uploadCreateStatus: state => state.uploadCreateStatus
}

const actions = {
  createUpload ({ commit, state }, file) {
    let status = consts.PENDING
    commit(types.SET_UPLOAD_CREATE_STATUS, { status })
    return uploadApi.create(file)
      .then(upload => {
        status = consts.SUCCESS
        commit(types.SET_UPLOAD_CREATE_STATUS, { status })
        return upload
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_UPLOAD_CREATE_STATUS, { status, err })
      })
  }
}

const mutations = {
  [types.SET_UPLOAD_CREATE_STATUS] (state, { status, err }) {
    state.productCreateStatus = status
    if (err) {
      console.error(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
