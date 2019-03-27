import * as types from './mutation-types'
import * as consts from '@/consts'
import authApi from './api'

const getJWT = () => localStorage.getItem(consts.JWT_KEY)
  ? JSON.parse(localStorage.getItem(consts.JWT_KEY))
  : null

const state = {
  jwt: getJWT(),
  signInStatus: ''
}

const getters = {
  token: state => state.jwt && state.jwt.token,
  isAuthenticated: state => !!state.jwt,
  signInStatus: state => state.signInStatus
}

const actions = {
  updateLocalToken ({ commit, state }) {
    const TOKEN = getJWT()
    if (TOKEN !== state.jwt) {
      commit(types.SET_TOKEN, TOKEN)
    }
    return TOKEN
  },
  signIn ({ commit }, credentials) {
    let status = consts.PENDING
    commit(types.SET_SIGN_IN_STATUS, { status })
    return authApi.signIn(credentials)
      .then(({token}) => {
        const jwt = token
        status = consts.SUCCESS
        commit(types.SET_SIGN_IN_STATUS, { status })
        commit(types.SET_TOKEN, jwt)
        return jwt
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_SIGN_IN_STATUS, { status, err })
        throw err
      })
  },
  signOut ({ commit }) {
    commit(types.SET_TOKEN, null)
  }
}

const mutations = {
  [types.SET_SIGN_IN_STATUS] (state, { status, err }) {
    state.signInStatus = status
    if (err) {
      console.error(err)
    }
  },
  [types.SET_TOKEN] (state, jwt) {
    if (!jwt) {
      localStorage.removeItem(consts.JWT_KEY)
    } else {
      localStorage.setItem(consts.JWT_KEY, JSON.stringify(jwt))
    }
    state.jwt = jwt
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
