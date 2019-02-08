<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>My </span>
        <span class="font-weight-light">personal </span>
        <span>library</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/library" flat>Library</v-btn>
        <v-btn to="/reports" flat>Reports</v-btn>
        <v-btn to="/" flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      //
    };
  },
};
</script>
