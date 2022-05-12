<template>
  <b-card
    tag="button"
    :href="book.id"
    :img-src="createObjectURL(book.cover)"
    :img-alt="book.title"
    :img-width="headline ? '50%' : '40%'"
    :img-right="headline"
    :img-left="!headline"
    class="library-item"
    @click="$router.push(`reader/${book.id}`)"
  >
    <b-card-text>
      <h4 :class="{ headline }">{{ book.title }}</h4>
      <small>
        <kbd v-if="percentage">{{ percentage }}% read</kbd>
      </small>
      <button v-if="!headline" class="btn-remove" @click="remove($event)">
        ×
      </button>
    </b-card-text>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { library } from '@derock.ir/epubjs-plus';
import { BCard, BCardText } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BCard,
    BCardText,
  },
  props: {
    book: {
      type: Object,
      default: () => ({}),
    },
    headline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    percentage() {
      return (
        (this.book.pagination.currentLocation?.end.percentage || 0) * 100
      ).toFixed();
    },
  },
  methods: {
    createObjectURL: URL.createObjectURL,
    remove(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      if (confirm(`Are you sure to remove "${this.book.title}"?`)) {
        library.remove(this.book.id);
      }
    },
  },
});
</script>
<style lang="scss">
@import 'rfs/scss';
.library-item {
  padding: 0;
  margin-bottom: 0.5rem;
  text-align: left;
  align-items: flex-end;
  .card-body {
    position: relative;
    h4 {
      @include font-size(1.6rem);
      color: rgb(66, 66, 66);
      font-weight: 300;
    }
    .headline {
      font-weight: 700;
      color: black;
    }
    .btn-remove {
      background-color: unset;
      border: none;
      position: absolute;
      bottom: 0;
      right: 0;
      // color: gray;
      font-size: 1.5rem;
    }
  }
}
</style>
