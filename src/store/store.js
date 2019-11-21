import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    song: '',
    name: '',
    sub: '',
    src: '',
    iid: '',
    i: '',
    djs: [],
    playlist: '',
    xh: 0,
    cs: 0,
    src1: '',
    isshow: false
  },
  mutations: {
    add (state) {
      return state.xh++
    },
    jian (state) {
      return state.xh--
    },
    song (state, val) {
      state.song = val
    },
    name (state, val) {
      state.name = val
    },
    src (state, val) {
      state.src = val
    },
    subname (state, val) {
      state.sub = val
    },
    backzero (state) {
      state.xh = 0
    },
    playlist (state, val) {
      state.playlist = val
    },
    xh (state, val) {
      state.xh = val
    }
  },
  actions: {},
  getters: {
    isshow (state) {
      return state.isshow
    },
    getsong (state) {
      return state.song
    },
    getname (state) {
      return state.name
    },
    getsub (state) {
      return state.sub
    },
    getsrc (state) {
      return state.src
    },
    getid (state) {
      return state.iid
    },
    geti (state) {
      return state.i
    },
    getplaylist (state) {
      return state.playlist
    },
    getxh (state) {
      return state.xh
    },
    getcs (state) {
      return state.cs
    },
    getdjs (state) {
      return state.djs
    }
  }
})
