import InfinitScroll from '@/components/common/InfinitScroll'
import DataGrid from '@/components/common/grid/DataGrid'
import DataGridCell from '@/components/common/grid/DataGridCell'
import DataGridSearch from '@/components/common/grid/DataGridSearch'

import { ASC, DESC } from '@/consts'
import { jsonFallback } from '@/utils'

const gridMixin = {
  data () {
    const { limit, offset, search, filter, sort } = this.$route.query
    return {
      maxCount: 0,
      limit: limit ? parseInt(limit, 10) : 24,
      offset: offset ? parseInt(offset, 10) : 0,
      filter: jsonFallback(filter, null),
      sort: jsonFallback(sort, null),
      searchText: search || '',
      isSearchable: false
    }
  },
  methods: {
    setSortProps (list) {
      this.maxCount = list.entries
      this.gridRecords = this.offset === 0
        ? list.items
        : [...this.gridRecords, ...list.items]

      if (!list.rules) {
        return
      }
      if (list.rules.searchables) {
        this.isSearchable = list.rules.searchables.length > 0
      }
      if (list.rules.sortables) {
        this.gridColumns = this.gridColumns.map(col => {
          const isSortable = list.rules.sortables.includes(col.id)
          col.isSortable = isSortable
          if (isSortable) {
            let order
            if (list.sorted_by.includes(`${col.id} ${ASC}`)) {
              order = ASC
            } else if (list.sorted_by.includes(`${col.id} ${DESC}`)) {
              order = DESC
            }
            if (order) {
              this.sort = this.sort || {}
              this.sort[col.id] = order
            }
            col.sortOrder = order
          }
          return col
        })
      }
    },
    loadMore () {
      this.offset += this.limit
      return this.fetchList()
    },
    manageSort (prop) {
      let order
      if (!this.sort || !this.sort[prop]) {
        order = ASC
      } else if (this.sort[prop] === ASC) {
        order = DESC
      }

      if (order) {
        return Object.assign({}, this.sort, {
          [prop]: order
        })
      }
      delete this.sort[prop]
      return this.sort
    },
    onSort (prop) {
      this.offset = 0
      this.sort = this.manageSort(prop)
      this.fetchList()
    },
    onSearch (text) {
      this.offset = 0
      this.searchText = text
      this.fetchList()
    }
  },
  computed: {
    hasMorePages () {
      return this.maxCount > this.limit + this.offset
    },
    searchParams () {
      const params = { limit: this.limit, offset: this.offset }
      if (this.searchText) {
        params.search = this.searchText
      }
      if (this.filter) {
        params.filter = Object.assign({}, params.filter, this.filter)
      }
      if (this.sort) {
        params.sort = this.sort
      }
      return params
    }
  },
  components: {
    DataGrid,
    DataGridCell,
    DataGridSearch,
    InfinitScroll
  }
}

export default gridMixin
