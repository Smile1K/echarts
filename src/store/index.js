import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as getters from './getters.js';
import * as mutations from './mutations.js';
import * as actions from './actions.js';

const state = {
    showLoading : false
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store;