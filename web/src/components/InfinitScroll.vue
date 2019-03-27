<template>
  <div class="text-center" v-if="hasMorePages">
    <button :disabled="isLoading" @click="loadMore" type="button" ref="more" class="btn btn-primary btn--material">
      {{$i18n.t('general.next')}}
    </button>
  </div>
</template>

<script>
import { isElementInViewport } from '@/utils'
export default {
  name: 'InfinitScroll',
  data () {
    return {
      isLoading: false,
      scrollObserver: null
    }
  },
  props: {
    loadMore: {
      type: Function,
      default: () => {}
    },
    hasMorePages: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const ratio = entry.intersectionRatio * 100
        if (ratio > 80) {
          this.loadIfNotLoading()
        }
      })
    }, {
      rootMargin: '0px',
      root: null,
      threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    })
    this.initScrollObserver()
  },
  methods: {
    loadIfNotLoading () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.loadMore()
        .catch(() => {})
        .then(() => { this.isLoading = false })
    },
    initScrollObserver () {
      const el = this.$refs['more']
      if (el) {
        if (isElementInViewport(el)) {
          this.loadIfNotLoading()
        }
        this.scrollObserver.observe(this.$refs['more'])
      }
    }
  }
}
</script>
