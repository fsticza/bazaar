<template>
  <span class="material-icons align-middle" :style="{ fontSize: size }">{{name}}</span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    size: {
      type: String,
      default: '1em'
    }
  }
}
</script>
