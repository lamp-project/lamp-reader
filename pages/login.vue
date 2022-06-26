<template>
  <b-row>
    <b-col offset-lg="4" lg="4">
      <b-card class="panel">
        <h1>Login</h1>
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
            Login
          </b-button>
        </b-form>
      </b-card>
      <br />
      <center>
        <b-link to="/signup">Or create a new account</b-link>
      </center>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import {
  BCard,
  BLink,
  BForm,
  BButton,
  BFormGroup,
  BFormInput,
  BAlert,
  BRow,
  BCol,
} from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BCard,
    BLink,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BAlert,
    BRow,
    BCol,
  },
  layout: 'auth',
  data: () => ({
    input: {},
    error: '',
  }),
  methods: {
    ...mapActions({
      login: 'user/login',
      getUserWords: 'user-word/getUserWords',
    }),
    async submit(event) {
      try {
        event.preventDefault();
        this.error = '';
        await this.login(this.input);
        await this.getUserWords();
        this.$router.push('/');
      } catch (error) {
        this.error = 'Login failed! change your inputs and try again.';
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
