<template>
  <button type="button" @click="onOpenerClick()">
    <slot />
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ModalOpener',
  props: {
    modalId: {
      type: String
    }
  },
  methods: {
    ...mapActions('modal', [
      'openModal'
    ]),
    onOpenerClick () {
      this.openModal(this.modalId)
    }
  }
}
</script>
