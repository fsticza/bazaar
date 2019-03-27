<template>
  <div class="">
    <div class="my-3">
      <router-link class="btn btn-primary" :to="{name:'AccountCreate'}">Create Account</router-link>
    </div>
    <table v-if="accounts.length" class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">fullName</th>
          <th scope="col">email</th>
          <th scope="col">avatar</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account) in accounts" :key="account.id">
          <td>{{account.fullName}}</td>
          <td>{{account.email}}</td>
          <td>
            <img height="50" :src="account.avatarUrl" alt="">
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="onDeleteClick(account.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <router-link class="page-link" :to="{name:'AccountList'}">Next</router-link>
        </li>
      </ul>
    </nav> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'admin-account-list',
  data () {
    return {
      accounts: []
    }
  },
  created () {
    this.initialList()
  },
  methods: {
    ...mapActions('account', [
      'listAccounts',
      'deleteAccount'
    ]),
    initialList () {
      this.listAccounts().then(({accounts}) => {
        this.accounts = accounts
      })
    },
    onDeleteClick (id) {
      this.deleteAccount(id).then(() => {
        this.initialList()
      })
    }
  },
  computed: {
    ...mapGetters('account', [
      'accountCreateStatus'
    ])
  }
}
</script>
