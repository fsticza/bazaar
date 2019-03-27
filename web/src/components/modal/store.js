import * as types from './mutation-types'

const state = {
  modals: []
}

const getters = {
  isOpen: state => modalId => {
    const MODAL = state.modals.find(({ id }) => id === modalId)
    if (!MODAL) {
      return false
    }
    return MODAL.isOpen
  },
  isAnyOpen: state => state.modals.some(({ isOpen }) => isOpen === true)
}

const actions = {
  createModal ({ commit }, modal) {
    modal.isOpen = modal.isOpen || false
    commit(types.ADD_MODAL, modal)
  },
  openModal ({ commit }, id) {
    commit(types.TOGGLE_MODAL, id)
  },
  closeModal ({ commit }, id) {
    commit(types.TOGGLE_MODAL, id)
  },
  closeAllModals ({ commit }) {
    commit(types.CLOSE_ALL)
  }
}

const mutations = {
  [types.ADD_MODAL] (state, modal) {
    state.modals.push(modal)
  },
  [types.TOGGLE_MODAL] (state, modalId) {
    const MODAL = state.modals.find(({ id }) => id === modalId)
    if (!MODAL) {
      return
    }
    state.modals.splice(state.modals.indexOf(MODAL), 1, Object.assign(MODAL, {
      isOpen: !MODAL.isOpen
    }))
  },
  [types.CLOSE_ALL] (state) {
    state.modals = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
