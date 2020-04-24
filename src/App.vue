<template>
  <v-app>
    <v-app-bar fixed>
      <v-toolbar-title>Toybox</v-toolbar-title>

      <v-spacer></v-spacer>

      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li v-if="authStatus">
            <a href="">Manage</a>
          </li>
          <li v-if="authStatus">
            <a href="">List</a>
          </li>
          <li v-if="!authStatus">
            <a href="">Login</a>
          </li>
          <li v-if="authStatus">
            <a href="">Logout</a>
          </li>
        </ul>
      </nav>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-bottom-navigation :value="activeBtn" color="blue" :fixed="true">
      <v-btn>
        <span>Home</span>
        <v-icon>fa fa-home</v-icon>
      </v-btn>

      <v-btn v-if="authStatus">
        <span>Manage</span>
        <v-icon>fa fa-table</v-icon>
      </v-btn>

      <v-btn v-if="authStatus">
        <span>List</span>
        <v-icon>fa fa-th-list</v-icon>
      </v-btn>

      <v-btn v-if="!authStatus">
        <span>Login</span>
        <v-icon>fa fa-sign-in</v-icon>
      </v-btn>

      <v-btn v-if="authStatus">
        <span>Logout</span>
        <v-icon>fa fa-sign-out</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "./main";

export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    activeBtn: 1
  }),
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
<style lang="scss">
.theme--light.v-application {
  background: #fff !important;
}
.container {
  position: relative;
}
@media (min-width: 992px) {
  header {
    display: flex;
    justify-content: space-between;
  }
  .v-toolbar__content {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
header {
  display: none;
}
@media (min-width: 992px) {
  header {
    display: block;
  }
  nav {
    height: 100%;
    ul {
      align-items: center;
      display: flex;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul li {
      flex: 1 1 auto;
      padding: 0 10px;
    }
    ul li a {
      display: block;
      height: 100%;
    }
  }
  .v-item-group.v-bottom-navigation {
    display: none;
  }
}
</style>
