<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 sm6 offset-xs1>
        <v-form ref="form" v-model="valid" lazy-validation @keydown.enter.native="login">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            type="email"
            required
            ref="myEmail"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" color="blue-grey" class="white--text" @click="login">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LoginScreen",
  data: () => ({
    authenticated: false,
    valid: true,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  created() {
    if (this.$auth.currentUser) {
      this.authenticated = true;
      this.$store.commit("setAuthenticated", true);
    }
  },
  mounted() {
    if (this.authenticated) {
      this.$router.replace({ name: "library" });
    }
  },
  methods: {
    login() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit("setAuthenticated", true);
          this.authenticated = true;
          this.$router.push({ name: "library" });
        })
        .catch(e => console.log(e.message));
    }
  }
};
</script>