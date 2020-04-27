<template>
  <div class="page">
    <v-row justify="center" class="mb-4">
      <v-col cols="10" class="page-title-area">
        <h1>Login</h1>
      </v-col>
    </v-row>
    <v-row class="content-row">
      <v-col cols="12" class="page-content-area">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @keydown.enter.native="login"
        >
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

          <v-btn
            :disabled="!valid"
            color="blue-grey"
            class="white--text"
            @click="login"
            >Login</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </div>
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
          this.$router.push({ name: "home" });
        })
        .catch(e => console.log(e.message));
    }
  }
};
</script>
<style lang="scss" scoped>
.page-title-area {
  background: #fff;
  padding: 20px;
}
.content-row {
  height: 100%;
}
.page-content-area {
  background: #fff;
  padding: 20px;
}
h1 {
  line-height: 2.4rem;
}

.login-content-container {
  margin-top: 25%;
  padding-bottom: 0;
}
.login-callout {
  background: #fff;
  max-width: 90%;
  padding: 20px;
}
</style>