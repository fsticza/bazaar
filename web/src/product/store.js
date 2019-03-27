import * as types from './mutation-types'
import * as consts from '@/consts'
import productApi from './api'

const state = {
  productCreateStatus: '',
  productShowStatus: '',
  productListStatus: ''
}

const getters = {
  productCreateStatus: state => state.productCreateStatus,
  productListStatus: state => state.productListStatus,
  productShowStatus: state => state.productShowStatus
}

const actions = {
  createProduct ({ commit, state }, payload) {
    let status = consts.PENDING
    commit(types.SET_PRODUCT_CREATE_STATUS, { status })
    return productApi.create(payload)
      .then(product => {
        status = consts.SUCCESS
        commit(types.SET_PRODUCT_CREATE_STATUS, { status })
        return product
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_PRODUCT_CREATE_STATUS, { status, err })
        throw err
      })
  },
  showProduct ({ commit, state }, id) {
    let status = consts.PENDING
    commit(types.SET_PRODUCT_SHOW_STATUS, { status })
    return productApi.show(id)
      .then(product => {
        status = consts.SUCCESS
        commit(types.SET_PRODUCT_SHOW_STATUS, { status })
        return product
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_PRODUCT_SHOW_STATUS, { status, err })
        throw err
      })
  },
  listProducts ({ commit, state }, params) {
    let status = consts.PENDING
    commit(types.SET_PRODUCT_LIST_STATUS, { status })
    return productApi.list(params)
      .then(products => {
        status = consts.SUCCESS
        commit(types.SET_PRODUCT_LIST_STATUS, { status })
        return products
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_PRODUCT_LIST_STATUS, { status, err })
        throw err
      })
  },
  deleteProduct ({ commit }, id) {
    return productApi.destroy(id)
  }
}

const mutations = {
  [types.SET_PRODUCT_CREATE_STATUS] (state, { status, err }) {
    state.productCreateStatus = status
    if (err) {
      console.error(err)
    }
  },
  [types.SET_PRODUCT_SHOW_STATUS] (state, { status, err }) {
    state.productShowStatus = status
    if (err) {
      console.error(err)
    }
  },
  [types.SET_PRODUCT_LIST_STATUS] (state, { status, err }) {
    state.productListStatus = status
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
