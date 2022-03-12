<template>
  <div>
    <b-card class="panel">
      <h1>Login</h1>
      <hr />
      <b-form-group label="Email">
        <b-form-input
          v-model="input.email"
          name="email"
          type="email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input
          v-model="input.password"
          name="password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-button block variant="dark" size="lg" @click="login(input)">
        Login
      </b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  data: () => ({
    input: {},
  }),
  methods: {
    ...mapActions({ login: 'user/login' }),
  },
});
</script>

<style lang="scss" scoped>
.panel {
  // height: calc(100vh - 72px * 2);
}
</style>
