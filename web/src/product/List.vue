<template>
  <div class="">
    <div class="my-3">
      <form action="" class="form-inline" @submit.prevent="onSearch">
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

    <div class="row" v-if="products.length">
      <div class="col-sm-4" v-for="(product) in products" :key="product.id">
        <div class="card">
          <img class="card-img-top" :src="product.coverUrl" :alt="product.title">
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">{{product.description}}</p>
            <p class="card-text">{{new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)}}</p>
          </div>
        </div>
      </div>
    </div>

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
  name: 'product-list',
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
