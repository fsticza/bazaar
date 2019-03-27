<template>
  <div class="bg-white p-3">
    <div class="row">
      <div class="col">
        <slot name="prepend">
        </slot>
      </div>
      <div class="col-md-5">
        <base-form v-if="isSearchable" @submit.prevent="onSearch">
          <form-group
            class="mb-0"
            :placeholder="$i18n.t('general.search')"
            @keyup="onSearchKeyup"
            :v-model="searchField.value"
            :field="searchField">
            <button type="submit" slot="prepend" class="input-group-text">
              <icon name="search" size="24px" />
            </button>
          </form-group>
        </base-form>
      </div>
      <div class="col">
        <slot name="append">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash-es/throttle'

export default {
  name: 'DataGridSearch',
  props: {
    searchText: {
      type: String,
      default: ''
    },
    isSearchable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchField: {
        name: 'search',
        autocomplete: 'off',
        value: this.$props.searchText
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('search', this.searchField.value.trim())
    },
    onSearchKeyup: throttle(function () {
      this.onSearch()
    }, 600)
  }
}
</script>
