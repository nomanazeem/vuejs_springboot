import Vue from 'vue'
//import { set } from 'vue/types/umd';
import Vuex from 'vuex';
import http from './http-common';
import VueSessionStorage from "vue-sessionstorage";


Vue.use(VueSessionStorage);
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,

  status:sessionStorage.getItem(`status`)||false,
  token:sessionStorage.getItem(`token`)||``,
  user:JSON.parse(sessionStorage.getItem(`user`))||{},
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  /* updateSet (state, [variable, value]) {
    state[variable] = value
  }, */

  
  auth_request(state){
    state.status = 'loading';
  },
  auth_success(state, token, user){
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  auth_error(state){
    state.status = 'error';
  },

  register(state){
    state.status = '';
    state.token = '';
    state.user = null;
  },
  register_error(state){
    state.status = 'error';
    state.token = '';
    state.user = null;
  },

  logout(state){
    state.status = '';
    state.token = '';
  },
}

const actions = {
  login({commit}, user){
    return new Promise((resolve, reject) => {
      //debugger;
      //Commit auth_request
      commit('auth_request')
      
      http({url: '/auth/signin', data: user, method: 'POST' })
      .then(resp => {
        //Get loggedIn user data and token
        const token = resp.data.accessToken;
        const user = {id:resp.data.id
                      , username:resp.data.username
                      , email:resp.data.email
                      , roles:resp.data.roles};

        console.log('token=>'+token);
        //token = "Bearer "+token;

        //Set in local storage
        sessionStorage.setItem('token', token);

        //Set in local storage
        sessionStorage.setItem('user', JSON.stringify(user));

        //Set token in authorization header
        http.defaults.headers['Authorization'] = "Bearer "+ token;
        
        //Commit auth_success
        commit('auth_success', token, user);
        
        resolve(resp);
      })
      .catch(err => {
        //debugger;
        commit('auth_error');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        //updateSet('token', token);
        //updateSet('user', user);

        reject(err);
      })
    })
  },
  register({commit}, user){
    return new Promise((resolve, reject) => {
      http({url: '/auth/signup', data: user, method: 'POST' })
      .then(resp => {
        //debugger;'
        
        console.log(resp);

         //Commit auth_request
        commit('register');

        resolve(resp);
      })
      .catch(err => {
        //debugger;
        //console.log(err);

        commit('register_error');

        reject(err);
      })
    })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      //commit logout  
      commit('logout');


      //Set in local storage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      //updateSet('token', token);
      //updateSet('user', user);


      //Set token in authorization header
      delete http.defaults.headers.common['Authorization'];

      resolve();
    });
  },
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user : state => state.user,
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})