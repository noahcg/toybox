<template>
  <v-app>
    <v-toolbar color="blue lighten-4" class="py-4" flat>
      <v-toolbar-title class="display-2 text-uppercase blue-grey--text font-weight-light mb-4">
        My
        <br />personal
        <br />library
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/library" class="blue-grey--text font-weight-light headline" flat>Library</v-btn>
        <v-btn
          v-if="authStatus"
          class="blue-grey--text font-weight-light headline"
          to="/reports"
          flat
        >Reports</v-btn>
        <v-btn
          v-if="authStatus"
          class="blue-grey--text font-weight-light headline"
          to="/management"
          flat
        >Management</v-btn>
        <v-btn v-if="!authStatus" class="blue-grey--text subtitle-1 login" to="/login" flat>Login</v-btn>
        <v-btn
          v-if="authStatus"
          class="blue-grey--text subtitle-1 logout"
          @click.native="signOut"
          flat
        >Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-card flat class="hidden-md-and-up bottom-nav">
      <v-bottom-nav fixed>
        <v-btn color="secondary" flat value="library" to="/library">
          <span>Library</span>
          <v-icon>library_books</v-icon>
        </v-btn>

        <v-btn color="secondary" flat value="reports" to="/reports">
          <span>Reports</span>
          <v-icon>bar_chart</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "./main";

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      left: false
    };
  },
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
.application--wrap {
  flex-direction: row;
  overflow: auto;
}
.v-toolbar {
  display: block;
  height: 100%;
  position: fixed;
  width: 350px;
}
.v-toolbar__content {
  display: block;
}
.v-toolbar__items {
  flex-direction: column;
}
.v-toolbar__items .v-btn {
  border-bottom: 1px solid #fff;
  width: 100%;
}
main {
  position: absolute;
  right: 0;
  width: calc(100vw - 350px);
}
.v-item-group.v-bottom-nav {
  bottom: 60px !important;
}

.login,
.logout {
  border: none !important;
  bottom: 0;
  position: absolute;

  &:hover {
    position: absolute;
  }
}
</style>
