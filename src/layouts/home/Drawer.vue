<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list color="white" shaped>
      <v-list-item to="/" color="primary">
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="authStatus" to="/manage" color="primary">
        <v-list-item-content>
          <v-list-item-title>Manage</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="authStatus" to="/toys" color="primary">
        <v-list-item-content>
          <v-list-item-title>Toys</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="!authStatus" to="/login" color="primary">
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="authStatus" @click="signOut" color="primary">
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../../main";
export default {
  name: "HomeDrawer",
  computed: mapState({
    authStatus: state => state.authenticated
  }),
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$store.commit("setAuthenticated", false);
        this.$router.push("/");
      });
    }
  }
};
</script>
