<template>
  <transition name="modal-anim">
    <div :id="id" v-if="isModalOpen"
      class="modal"
      @click="onClose"
      @keyup.esc="onClose"
      ref="modal"
      tabindex="-1"
      role="dialog">
      <div class="modal-dialog" :class="dialogClass" role="document">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" @click="onClose()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer-buttons"></slot>
            <button type="button" class="btn btn-secondary" @click="onClose()">{{$i18n.t('general.close.label')}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { randomString } from '@/utils'
export default {
  name: 'Modal',
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    dialogClass: {
      type: String
    }
  },
  mounted () {
    this.createModal({
      id: this.id || randomString()
    })
  },
  methods: {
    ...mapActions('modal', [
      'createModal',
      'closeModal'
    ]),
    onClose () {
      this.$emit('close')
      this.closeModal(this.id)
    }
  },
  computed: {
    ...mapGetters('modal', [
      'isOpen'
    ]),
    isModalOpen () {
      const IS_OPEN = this.isOpen(this.id)
      if (IS_OPEN) {
        this.$nextTick(() => {
          this.$refs.modal && this.$refs.modal.focus()
        })
      }
      return IS_OPEN
    }
  }
}
</script>

<style lang="scss">
.modal {
  display: block;
}
.modal-anim-leave-active {
  transition: all .25s;
}
.modal-anim-enter-active {
  transition: all .5s;
}
.modal-anim-enter, .modal-anim-leave-to {
  opacity: 0;
  transform: translateY(-30px)
}
</style>
