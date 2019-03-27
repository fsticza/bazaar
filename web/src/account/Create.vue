<template>
  <div>
    <h1>Create new account</h1>
    <form action="#" method="POST" @submit.prevent="onSubmit">
      <div class="row">
        <form-group class="col-sm-6">
          <label for="firstName">First name</label>
          <form-control type="text" name="firstName" required
          v-model="firstName" placeholder="First name" />
        </form-group>
        <form-group class="col-sm-6">
          <label for="lastName">Last name</label>
          <form-control type="text" name="lastName" required
          v-model="lastName" placeholder="Last name" />
        </form-group>
      </div>
      <div class="row">
        <form-group class="col-sm-6">
          <label for="email">Email</label>
          <form-control type="text" name="email" required
          v-model="email" placeholder="your@email.com" />
        </form-group>
        <form-group class="col-sm-6">
          <label for="email">Password</label>
          <form-control type="password" name="password" required
          v-model="password" placeholder="****" />
        </form-group>
      </div>
      <div class="row">
        <form-group class="col-sm-8">
          <label for="avatarSrc">Upload Avatar</label>
          <form-control type="file" name="avatarSrc" @change="onCoverChange"
          v-model="avatarSrc" />
        </form-group>
        <div class="col-sm-4 text-center">
          <img v-if="avatarUrl" alt="Preview" :src="avatarUrl" height="80">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        Create account
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormGroup from '@/components/form/FormGroup'
import FormControl from '@/components/form/FormControl'
export default {
  name: 'event-create',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatarSrc: '',
      avatarUrl: '',
      roles: []
    }
  },
  methods: {
    ...mapActions('account', [
      'createAccount'
    ]),
    ...mapActions('upload', [
      'createUpload'
    ]),
    onCoverChange (value, ev) {
      this.createUpload(ev.target.files[0])
      .then(({file}) => {
        this.avatarUrl = file.url
      })
    },
    onSubmit (ev) {
      const { firstName, lastName, email, password, avatarUrl } = this
      this.createAccount({ firstName, lastName, email, password, avatarUrl })
        .then(() => { this.$router.push({ name: 'AccountList' }) })
    }
  },
  computed: {
    ...mapGetters('event', [
      'eventCreateStatus'
    ])
  },
  components: {
    FormGroup,
    FormControl
  }
}
</script>
