import * as types from './mutation-types'
import * as consts from '@/consts'
import accountApi from './api'

const ACCOUNT_KEY = 'bazaar-account'
const getAccount = () => localStorage.getItem(ACCOUNT_KEY)
  ? JSON.parse(localStorage.getItem(ACCOUNT_KEY))
  : null

const state = {
  account: getAccount(),
  accountCreateStatus: '',
  accountShowStatus: '',
  accountListStatus: ''
}

const getters = {
  account: state => state.account,
  hasUserRole: state => state.account &&
    state.account.roles &&
    state.account.roles.includes('USER'),
  hasAdminRole: state => state.account &&
    state.account.roles &&
    state.account.roles.includes('ADMIN'),
  accountShowStatus: state => state.accountShowStatus
}

const actions = {
  updateLocalAccount ({ commit, state }) {
    const account = getAccount()
    if (JSON.stringify(account) !== JSON.stringify(state.account)) {
      commit(types.SET_ACCOUNT, { account })
    }
    return account
  },
  createAccount ({ commit }, payload) {
    let status = consts.PENDING
    commit(types.SET_ACCOUNT_CREATE_STATUS, { status })
    return accountApi.create(payload)
      .then(account => {
        status = consts.SUCCESS
        commit(types.SET_ACCOUNT_CREATE_STATUS, { status })
        return account
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_ACCOUNT_CREATE_STATUS, { status, err })
        throw err
      })
  },
  showAccount ({ commit }, {id}) {
    let status = consts.PENDING
    commit(types.SET_ACCOUNT_SHOW_STATUS, { status })
    return accountApi.show(id)
      .then(account => {
        status = consts.SUCCESS
        commit(types.SET_ACCOUNT_SHOW_STATUS, { status })
        return account
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_ACCOUNT_SHOW_STATUS, { status, err })
        throw err
      })
  },
  setAccount ({ commit }, account) {
    commit(types.SET_ACCOUNT, { account })
  },
  listAccounts ({ commit }, params) {
    let status = consts.PENDING
    commit(types.SET_ACCOUNT_LIST_STATUS, { status })
    return accountApi.list(params)
      .then(accounts => {
        status = consts.SUCCESS
        commit(types.SET_ACCOUNT_LIST_STATUS, { status })
        return accounts
      })
      .catch(err => {
        status = consts.FAILURE
        commit(types.SET_ACCOUNT_LIST_STATUS, { status, err })
        throw err
      })
  },
  deleteAccount ({ commit }, id) {
    return accountApi.destroy(id)
  }
}

const mutations = {
  [types.SET_ACCOUNT_SHOW_STATUS] (state, { status, err }) {
    state.accountShowStatus = status
    if (err) {
      console.error(err)
    }
  },
  [types.SET_ACCOUNT] (state, {account}) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account))
    state.account = account
  },
  [types.SET_ACCOUNT_LIST_STATUS] (state, { status, err }) {
    state.accountListStatus = status
    if (err) {
      console.error(err)
    }
  },
  [types.SET_ACCOUNT_CREATE_STATUS] (state, { status, err }) {
    state.accountCreateStatus = status
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
