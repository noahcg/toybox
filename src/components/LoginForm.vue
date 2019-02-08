<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ref="myEmail"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="login"
          >
            Login
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { auth } from '../main';

export default {
  name: 'LoginForm',
  data: () => ({
    authenticated: false,
    valid: true,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 10) || 'Password must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'library' });
    }
    // auth.signOut()
    // .catch(function (err) {
    //   // Handle errors
    // });
  },
  methods: {
    login() {
      const myPromise = auth.signInWithEmailAndPassword(this.email, this.password);
      myPromise
        .then(
          this.authenticated = true,
        )
        .catch(e => console.log(e.message));
    },
  },
};
</script>

<style>

</style>
