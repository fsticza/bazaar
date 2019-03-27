<template>
  <div class="data-grid" v-if="records.length">
    <div class="data-grid__head">
      <div class="data-grid__row">
        <div class="row">
          <slot name="head-prepend-cell" />
          <data-grid-cell class="text-uppercase" :class="col.className" v-for="col in columns" :key="col.id">

            <a v-if="col.isSortable" @click.prevent="onSortClick(col.id)" href="javascript:void(0)">
              <slot name="head-cell" :col="col">
                {{col.label}}
              </slot>
              <icon v-if="col.sortOrder === 'asc'" name="keyboard_arrow_up" />
              <icon v-else-if="col.sortOrder === 'desc'" name="keyboard_arrow_down" />
            </a>
            <slot v-else name="head-cell" :col="col">
              {{col.label}}
            </slot>

          </data-grid-cell>
          <slot name="head-append-cell" />
        </div>
      </div>
    </div>
    <div class="data-grid__body">
      <div class="data-grid__row my-2 rounded" :class="addRowClass(record)" v-for="record in records" :key="record[keyProp]">
        <div class="row align-items-center">
          <slot name="body-prepend-cell" :record="record" />
          <data-grid-cell :class="col.className" v-for="col in columns" :key="col.id">
            <slot name="body-cell" :record="record" :col="col">
              {{record[col.id]}}
            </slot>
          </data-grid-cell>
          <slot name="body-append-cell" :record="record" />
        </div>
      </div>
    </div>
  </div>
  <alert class="mt-3" v-else>
    {{$i18n.t('general.list.empty')}}
  </alert>
</template>

<script>
import DataGridCell from './DataGridCell'

export default {
  name: 'DataGrid',
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    records: {
      type: Array,
      default: () => ([])
    },
    addRowClass: {
      type: Function,
      default: () => {}
    },
    keyProp: {
      type: String,
      default: 'id'
    }
  },
  methods: {
    onSortClick (prop) {
      this.$emit('sort', prop)
    }
  },
  components: {
    DataGridCell
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/abstracts/variables";
.data-grid__head {
  font-weight: bold;
  .data-grid__row {
    padding: 0 15px;
    background: $grid-head-bg;
  }
}
.data-grid__body {
  margin: 15px 15px;
}
.data-grid__row {
  background: #fff;
}
.data-grid__cell {
  padding: 10px;
}
</style>
