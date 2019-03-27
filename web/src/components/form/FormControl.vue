<template>
  <input :type="type" class="form-control" @input="onInput"
  @change="onChange"
  :id="name" :placeholder="placeholder">
</template>

<script>
export default {
  name: 'form-control',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  methods: {
    onInput (ev) {
      this.$emit('input', ev.target.value, ev)
    },
    onChange (ev) {
      this.$emit('change', ev.target.value, ev)
    }
  }
}
</script>
