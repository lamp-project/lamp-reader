<template>
  <ion-progress-bar type="indeterminate" color="dark"></ion-progress-bar>
  <div class="loading">
    <img :src="cover" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IonProgressBar } from '@ionic/vue';
import { BookInfo } from '@derock.ir/epubjs-plus';

export default defineComponent({
  components: { IonProgressBar },
  props: {
    value: {
      default: {} as BookInfo,
    },
  },
  computed: {
    cover() {
      return this.value.cover ? URL.createObjectURL(this.value.cover) : '';
    },
  },
  methods: {
    createObjectURL: URL.createObjectURL,
  },
});
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 4px);
  img {
    height: 75vh;
    filter: grayscale(100%);
  }
}
</style>
