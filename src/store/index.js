import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'chalk',
    themeIndex: 0
  },
  mutations: {
    changeTheme(state) {
      if (state.themeIndex === 3) state.themeIndex = 0;
      else state.themeIndex++;
      if (state.themeIndex == 0) state.theme = 'chalk';
      else if (state.themeIndex == 1) state.theme = 'dark';
      else if (state.themeIndex == 2) state.theme = 'purple-passion';
      else if (state.themeIndex == 3) state.theme = 'vintage';
    }
  },
  actions: {
  },
  modules: {
  }
})
