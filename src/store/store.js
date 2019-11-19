import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songlist: '',
    name: '',
    sub: '',
    src: '',
    iid: '',
    i: '',
    songs: [],
    djs: [],
    songid: [],
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
    songs (state, msg) {
      state.songs.push(msg)
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
    }
  },
  actions: {},
  getters: {
    isshow (state) {
      return state.isshow
    },
    playlist (state) {
      return state.songlist
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
    getsongs (state) {
      return state.songs
    },
    getsongid (state) {
      return state.songid
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
