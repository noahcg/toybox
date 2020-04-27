<template>
  <v-app>
    <v-app-bar fixed>
      <v-spacer></v-spacer>

      <nav>
        <v-list dense>
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>fa fa-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="authStatus" to="/toys">
            <v-list-item-action>
              <img class="toy-icon" src="/img/toy-icon.png" alt="" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Toys</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="authStatus" to="/manage">
            <v-list-item-action>
              <v-icon>fa fa-table</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Manage</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!authStatus" to="/login">
            <v-list-item-action>
              <v-icon>fa fa-sign-in</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/"
            v-if="authStatus"
            class="blue-grey--text subtitle-1 logout"
            @click.native="signOut"
          >
            <v-list-item-action>
              <v-icon>fa fa-sign-out</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </nav>
    </v-app-bar>

    <v-content>
      <v-toolbar-title>Toybox v.0.1.0</v-toolbar-title>
      <img
        class="bkgImg"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        role="presentation"
      />
      <v-container class="page-container">
        <router-view />
      </v-container>
    </v-content>
    <v-bottom-navigation :value="activeBtn" color="blue" :fixed="true">
      <v-btn to="/">
        <span>Home</span>
        <v-icon>fa fa-home</v-icon>
      </v-btn>

      <v-btn to="/manage" v-if="authStatus">
        <span>Manage</span>
        <v-icon>fa fa-table</v-icon>
      </v-btn>

      <v-btn to="/toys" v-if="authStatus">
        <span>Toys</span>
        <img class="toy-icon" src="/img/toy-icon.png" alt="" />
      </v-btn>

      <v-btn to="/login" v-if="!authStatus">
        <span>Login</span>
        <v-icon>fa fa-sign-in</v-icon>
      </v-btn>

      <v-btn @click.native="signOut" v-if="authStatus">
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
  z-index: 2;
}
.page-container {
  margin-top: 80px;
}
.v-toolbar__title {
  color: #fff;
  left: 5px;
  padding: 15px;
  position: absolute;
  top: 5px;
  z-index: 1;
}
.bkgImg {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.toy-icon {
  height: 26px;
  margin-bottom: 3px;
}

h2 {
  font-size: 1.3rem;
}
@media (min-width: 992px) {
  header {
    display: flex;
    justify-content: space-between;
    z-index: 10;
  }
  .v-toolbar__title {
    display: inline-block;
    color: #000;
  }
  .v-toolbar__content {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.page {
  height: 100%;
}
header {
  display: none;
}
.container {
  height: 100%;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 10px;
}
@media (min-width: 992px) {
  @media (min-width: 992px) {
    .page {
      margin-top: 64px;
      margin-bottom: 0;
    }
  }
  header {
    display: block;
  }
  .v-list-item {
    display: inline-flex;
  }
  .v-item-group.v-bottom-navigation {
    display: none;
  }
}
</style>
