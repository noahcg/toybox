<template>
  <div class="page home">
    <v-row justify="center" class="mb-4">
      <v-col cols="10" class="page-title-area">
        <div v-if="authStatus">
          <h1>Hey, everyone!</h1>
          <p class="mb-0 mt-4">
            Welcome to my toybox. Feel free to see what toys I already have, and
            which ones I truly like.
          </p>
        </div>
        <div v-else>
          <h1>Welcome to Toybox!</h1>
          <p class="mb-0 mt-4">
            The place for parents and guardians to manage the inventory of their
            children's toys.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="content-row">
      <v-col cols="12" class="page-content-area">
        <div v-if="authStatus">
          <h2>Time to Manage</h2>
          <p>
            <small>Click on the Manage link to start managing my toybox.</small>
          </p>
        </div>
        <div v-else>
          <h2>Purpose</h2>
          <p>
            <small
              >Toys can be stored and then shared with family & friends. Now,
              parents no longer need to field phone calls asking what their
              child is currently into.</small
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  computed: mapState({
    authStatus: state => state.authenticated
  })
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
@media (min-width: 992px) {
  .page {
    margin-top: 64px;
    margin-bottom: 0;
  }

  .hero-content-container {
    background: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .hero-content {
    padding: 20px;
  }
  .content {
    background: #fff;
  }
}
</style>
