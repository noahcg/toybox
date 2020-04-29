<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

    <base-text-field label="Email" v-model="email" type="email" />

    <base-text-field label="Password" v-model="password" type="password" />

    <base-btn
      :color="!theme.isDark ? 'accent' : 'white'"
      @click="login"
      outlined
      target="_blank"
    >
      Login
    </base-btn>
  </div>
</template>

<script>
export default {
  name: "BaseContactForm",

  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],

  props: {
    subtitle: String,
    title: {
      type: String,
      default: "MAIL US YOUR MESSAGE"
    }
  },
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
      this.$router.replace({ name: "Home" });
    }
  },
  methods: {
    login() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit("setAuthenticated", true);
          this.authenticated = true;
          this.$router.push({ name: "Home" });
        })
        .catch(e => console.log(e.message));
    }
  }
};
</script>
