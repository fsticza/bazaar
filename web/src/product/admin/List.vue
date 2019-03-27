<template>
  <div class="">
    <div class="my-3">
      <form action="" class="form-inline" @submit.prevent="onSearch">
        <router-link class="btn btn-primary" :to="{name:'AdminProductCreate'}">Create Product</router-link>
        <form-group class="ml-auto">
          <div class="input-group">
            <form-control type="search" name="search"
            autocomplete="off"
            v-model="searchText" placeholder="Search products" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit">Search</button>
            </div>
          </div>
        </form-group>
      </form>
    </div>
    <table v-if="products.length" class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Cover</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product) in products" :key="product.id">
          <td>{{product.title}}</td>
          <td>
            <img height="50" :src="product.coverUrl" alt="">
          </td>
          <td>{{product.description}}</td>
          <td>{{new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)}}</td>
          <td>
            <button type="button" class="btn btn-danger" @click="onDeleteClick(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <router-link class="page-link" :to="{name:'ProductList'}">Next</router-link>
        </li>
      </ul>
    </nav> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormGroup from '@/components/form/FormGroup'
import FormControl from '@/components/form/FormControl'
export default {
  name: 'admin-product-list',
  data () {
    return {
      products: [],
      searchText: ''
    }
  },
  created () {
    this.initialList()
  },
  methods: {
    ...mapActions('product', [
      'listProducts',
      'deleteProduct'
    ]),
    onSearch () {
      this.listProducts({
        search: this.searchText
      }).then(({products}) => {
        this.products = products
      })
    },
    initialList () {
      this.listProducts().then(({products}) => {
        this.products = products
      })
    },
    onDeleteClick (id) {
      console.log(id)
      this.deleteProduct(id).then(() => {
        this.initialList()
      })
    }
  },
  computed: {
    ...mapGetters('product', [
      'productCreateStatus'
    ])
  },
  components: {
    FormGroup,
    FormControl
  }
}
</script>
