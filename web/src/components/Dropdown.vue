<template>
  <div tabindex="-1" @focusout="onFocusOut" @click="toggleOpen" class="dropdown"
    :class="{'show': isOpen, 'dropdown-right': menuAlign === 'right'}">
    <slot name="opener">
      <button class="btn btn-link text" type="button">
        <icon name="more_vert" />
      </button>
    </slot>
    <div class="dropdown-menu" @focusout.stop :class="{'show': isOpen, 'dropdown-menu-right': menuAlign === 'right'}">
      <slot name="items" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    menuAlign: {
      type: String
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    onFocusOut (ev) {
      setTimeout(() => {
        if (this.isOpen) {
          this.toggleOpen()
        }
      }, 200)
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
