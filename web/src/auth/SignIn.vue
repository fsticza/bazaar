<template>
  <div>
    <h1>Sign In</h1>
      <div class="row">
        <form class="col-lg-6 col-md-8" action="#" method="POST" @submit.prevent="onSubmit">
          <form-group>
            <label for="email">Email address</label>
            <form-control type="email" name="email" required
              v-model="email" placeholder="Enter email" />
          </form-group>
          <form-group>
            <label for="password">Password</label>
            <form-control type="password" name="password" required
              v-model="password" placeholder="Password" />
          </form-group>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormGroup from '@/components/form/FormGroup'
import FormControl from '@/components/form/FormControl'
export default {
  name: 'sign-in',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['notify']),
    ...mapActions('auth', [
      'signIn'
    ]),
    ...mapActions('account', [
      'showAccount',
      'setAccount'
    ]),
    onSubmit () {
      const { email, password } = this
      this.signIn({ email, password })
        .then(() => this.showAccount({id: 'me'}))
        .then(({account} = {}) => {
          this.setAccount(account)
          this.notify({
            timeout: 2000,
            type: 'success',
            message: 'Signed in'
          })

          return this.$router.push({ name: 'Home' })
        })
        .catch(() => {
          this.notify({
            timeout: 2000,
            type: 'danger',
            message: 'Signin failed.'
          })
        })
    }
  },
  computed: {
    ...mapGetters('auth', [
      'signInStatus'
    ])
  },
  components: {
    FormGroup,
    FormControl
  }
}
</script>
