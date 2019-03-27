<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{name: 'Home'}">Bazaar</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="main-nav">

          <div class="navbar-nav mr-auto">
            <template v-if="!isAdminMenuEnabled || !hasAdminRole">
              <router-link class="nav-item nav-link" :to="{name:'ProductList'}">Products</router-link>
            </template>
            <template v-else>
              <router-link class="nav-item nav-link" :to="{name:'AdminProductList'}">Products</router-link>
              <router-link class="nav-item nav-link" :to="{name:'AdminAccountList'}">Customers</router-link>
            </template>
          </div>

          <label v-if="hasAdminRole" class="btn btn-sm btn-primary mb-0">
            <span class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="on" @change="toggleAdminMenu()">
              <span class="form-check-label">ADMIN</span>
            </span>
          </label>
          
          <div class="navbar-nav">
            <template v-if="isAuthenticated">
              <router-link class="nav-item nav-link" :to="{name:'SignOut'}">Sign out</router-link>
            </template>
            <template v-else>
              <router-link class="nav-item nav-link" :to="{name:'SignIn'}">Sign in</router-link>
            </template>
          </div>
      </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
    <div class="notification-wrapper">
      <transition-group name="list" tag="div" class="container">
        <alert class="col-sm-6 offset-sm-3" v-for="notification in notifications"
          :key="notification.id"
          :type="notification.type">
          {{notification.message}}
        </alert>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'
export default {
  name: 'app',
  data () {
    return {
      isAdminMenuEnabled: false
    }
  },
  methods: {
    toggleAdminMenu () {
      this.isAdminMenuEnabled = !this.isAdminMenuEnabled
    }
  },
  computed: {
    ...mapGetters(['notifications']),
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
    ...mapGetters('account', [
      'hasAdminRole'
    ])
  },
  components: {
    Alert
  }
}
</script>

<style lang="scss">
  @import './assets/styles/vendor';
  @import './assets/styles/app';

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all .25s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
