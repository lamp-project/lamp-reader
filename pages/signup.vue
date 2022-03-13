<template>
  <div>
    <b-card class="panel">
      <h1>Signup</h1>
      <hr />
      <b-alert :show="!!error" variant="danger" dismissible>
        ⚠️ {{ error }}
      </b-alert>
      <b-form @submit="submit">
        <b-form-group label="Email">
          <b-form-input
            v-model="input.email"
            name="email"
            type="email"
            size="lg"
            :required="true"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Name" description="* Optional">
          <b-form-input
            v-model="input.name"
            name="fname"
            size="lg"
            :required="false"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input
            v-model="input.password"
            name="password"
            type="password"
            :required="true"
            size="lg"
          ></b-form-input>
        </b-form-group>
        <hr />
        <b-button block variant="dark" size="lg" type="submit">
          Signup
        </b-button>
      </b-form>
    </b-card>
    <br />
    <center>
      <b-link to="login">Or login if you have an account</b-link>
    </center>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  data: () => ({
    input: {},
    error: '',
  }),
  methods: {
    ...mapActions({ signup: 'user/signup' }),
    async submit(event) {
      try {
        event.preventDefault();
        this.error = '';
        await this.signup(this.input);
        this.$router.push('/');
      } catch (error) {
        this.error = 'Signup failed! change your inputs and try again.';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.panel {
  // height: calc(100vh - 72px * 2);
}
</style>
