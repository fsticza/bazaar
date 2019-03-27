
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import auth from '@/auth/store'
import account from '@/account/store'
import product from '@/product/store'
import upload from '@/upload/store'
import modal from '@/components/modal/store'
import createLogger from '@/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  httpError: null,
  notifications: []
}

const getters = {
  httpError: state => state.httpError,
  notifications: state => state.notifications
}

const actions = {
  notify ({ commit }, notification) {
    notification.id = Date.now()
    commit(types.ADD_NOTIFICATION, { notification })
    if (notification.timeout) {
      setTimeout(() => {
        commit(types.REMOVE_NOTIFICATION, { notification })
      }, notification.timeout)
    }
  },
  setHttpError ({ commit }, status = null) {
    commit(types.SET_HTTP_ERROR, { status })
  }
}

const mutations = {
  [types.ADD_NOTIFICATION] (state, { notification }) {
    state.notifications.push(notification)
  },
  [types.REMOVE_NOTIFICATION] (state, { notification }) {
    let index = state.notifications.indexOf(notification)
    state.notifications.splice(index, 1)
  },
  [types.SET_HTTP_ERROR] (state, { status }) {
    state.httpError = status
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    auth,
    account,
    product,
    upload,
    modal
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
