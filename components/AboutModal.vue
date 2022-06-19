<template>
  <b-modal id="about-modal" centered ok-only hide-footer>
    <template #default="{}">
      <div class="text-center">
        <img src="~/assets/img/bulb.png" height="96" />
        <br>
        <br>
        <h1 class="modal-title text-center">Lamp Reader</h1>
        <small>
          <kbd>v{{ version }}</kbd>
        </small>
        <br>
        <br>
        <hr>
        <h3 class="text-center">Read Books in their original languages!</h3>
        <hr>
        <p class="text-center">
          <b>Author:</b>Sajjad Shirazy
          <br />
          <b>Email:</b>
          <a href="mailto:shirazy.sajjad@gmail.com">shirazy.sajjad@gmail.com</a>
          <br />
        </p>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { BModal } from 'bootstrap-vue';

export default Vue.extend({
  components: { BModal },
  data: () => ({
    version: process.env.VERSION,
  }),
});
</script>
<style lang="scss">
#about-modal {
  .modal-title {
    text-transform: capitalize;
    small {
      font-size: 50%;
    }
  }
}
</style>
