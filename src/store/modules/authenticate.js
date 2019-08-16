import Vue from "vue";

const state = {
  authenticated: false
};

const mutations = {
  setAuthenticated(state, authState) {
    Vue.set(state, "authenticated", authState);
  }
};

export default {
  state,
  mutations
};
