<template>
  <b-card
    tag="button"
    :href="book.id"
    :img-src="book.cover.medium"
    :img-alt="book.title"
    :img-width="headline ? '50%' : '40%'"
    :img-right="headline"
    :img-left="!headline"
    class="library-item"
    @click="$router.push(book.id)"
  >
    <b-card-text>
      <h4 :class="{ headline }">{{ book.title }}</h4>
      <button v-if="!headline" class="btn-remove" @click="remove($event)">
        ×
      </button>
    </b-card-text>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue';
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
  computed: {},
  methods: {},
});
</script>
<style lang="scss">
@import 'rfs/scss';
.library-item {
  padding: 0;
  margin-bottom: 0.5rem;
  text-align: left;
  align-items: flex-end;
  width: 100%;
  .card-body {
    position: relative;
    h4 {
      @include font-size(1.6rem);
      color: rgb(66, 66, 66);
      font-weight: 300;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
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
