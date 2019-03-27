<template>
  <div class="alert"  :class="`alert-${type}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>
