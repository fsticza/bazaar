<template>
  <div>
    <h1>Create new product</h1>
    <form action="#" method="POST" @submit.prevent="onSubmit">
      <form-group>
        <label for="title">Title</label>
        <form-control type="text" name="title" required
        v-model="title" placeholder="Title of Product" />
      </form-group>
      <form-group>
        <label for="description">Description</label>
        <textarea name="description" class="form-control" required
        v-model="description" placeholder="Description">
        </textarea>
      </form-group>
      <div class="row">
        <form-group class="col-sm-4">
          <label for="price">Price</label>
          <form-control type="number" name="price" required
          v-model="price" placeholder="66.6" step="0.25" />
        </form-group>
        <form-group class="col-sm-4">
          <label for="currency">Currency</label>
          <select class="form-control" v-model="currency" required
          name="currency" id="currency">
            <option v-for="currency in ['USD', 'EUR']"
              :key="currency">{{currency}}</option>
          </select>
        </form-group>
      </div>
      <form-group>
        <label for="title">Cover image</label>
        <form-control type="file" name="coverSrc" @change="onCoverChange"
        v-model="coverSrc" placeholder="Upload cover image" />
      </form-group>
      <form-group>
        <label for="title">Cover url</label>
        <form-control type="url" name="coverUrl" :value="coverUrl"
        v-model="coverUrl" placeholder="URL for cover image" />
      </form-group>
      <button type="submit" class="btn btn-primary">
        Create product
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormGroup from '@/components/form/FormGroup'
import FormControl from '@/components/form/FormControl'
export default {
  name: 'admin-event-create',
  data () {
    return {
      title: '',
      description: '',
      currency: 'USD',
      price: 0,
      coverSrc: '',
      coverUrl: ''
    }
  },
  methods: {
    ...mapActions('product', [
      'createProduct'
    ]),
    ...mapActions('upload', [
      'createUpload'
    ]),
    onCoverChange (value, ev) {
      this.createUpload(ev.target.files[0])
      .then(({file}) => {
        this.coverUrl = file.url
      })
    },
    onSubmit (ev) {
      const { title, description, currency, price, coverUrl } = this
      this.createProduct({ title, description, currency, price, coverUrl })
        .then(() => { this.$router.push({ name: 'ProductList' }) })
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
