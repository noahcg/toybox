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
        <v-btn color="secondary" flat value="inventory" to="/inventory">
          <span>Inventory</span>
          <v-icon>local_drink</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="reports" to="/reports">
          <span>Reports</span>
          <v-icon>assessment</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="management" to="/management">
          <span>Management</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn v-if="!authStatus" color="secondary" flat value="login" to="/login">
          <span>Login</span>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="logout" @click.native="signOut">
          <span>Logout</span>
          <v-icon class="logout-icon">exit_to_app</v-icon>
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
