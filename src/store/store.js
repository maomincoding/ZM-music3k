import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songlist: '',
    time: '',
    time1: '',
    name: '',
    sub: '',
    src: '',
    iid: '',
    i: '',
    pause1: [],
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
      state.songs.unshift(msg)
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
    currtime (state) {
      return state.time
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
    gettime1 (state) {
      return state.time1
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
