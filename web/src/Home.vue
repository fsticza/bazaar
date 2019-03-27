<template>
  <div class="home">
    <h1>Hello</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters('account', [
      'account'
    ])
  }
}
</script>
