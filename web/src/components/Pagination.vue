<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled': !hasPrevious }">
        <router-link class="page-link" :to="routeToIndex(0)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">{{$i18n.t('general.previous')}}</span>
        </router-link>
      </li>
      <li class="page-item"
        :class="{'active': isActive}"
        v-for="({label, index, isActive}) in pages"
        :key="index">
        <router-link class="page-link" :to="routeToIndex(index)">
          {{label}}
        </router-link>
      </li>
      <li class="page-item" :class="{ 'disabled': !hasNext }">
        <router-link class="page-link" :to="routeToIndex(pageCount - 1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">{{$i18n.t('general.next')}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { range } from '@/utils'
export default {
  name: 'Pagination',
  props: {
    route: {
      type: Object
    },
    size: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 24
    }
  },
  methods: {
    routeToIndex (pageIndex) {
      return Object.assign({}, this.route, {
        query: Object.assign({}, this.route.query, {
          limit: this.limit,
          offset: pageIndex * this.limit
        })
      })
    }
  },
  computed: {
    pages () {
      return range(this.pageCount).map(idx => {
        return {
          isActive: this.activePageIndex === idx,
          index: idx,
          label: idx + 1
        }
      })
    },
    pageCount () {
      return Math.floor(this.size / this.limit)
    },
    activePageIndex () {
      if (this.offset < 1) {
        return 0
      }
      return this.pageCount - (this.size / this.offset)
    },
    hasPrevious () {
      return this.offset > 0
    },
    hasNext () {
      return this.offset + this.limit < this.size
    }
  }
}
</script>
