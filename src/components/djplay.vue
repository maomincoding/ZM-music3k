<!--电台播放-->
<template>
  <div class="cc">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <marquee direction='left' class="gd">{{name}}</marquee>
      </mu-appbar>
      <div class="img-b" >
        <img :src="src" alt class="annim">
      </div>
    </div>
  </div>
</template>

<script>import Bus from '../bus/bus'
import {mapGetters} from 'vuex'
export default {
  name: 'djplay',
  data () {
    return {
      isloading: false,
      list: [],
      name: '',
      url: '',
      src: '',
      open1: false
    }
  },
  computed: {
    ...mapGetters({
      getsong: 'getsong',
      getplaylist: 'getplaylist',
      getxh: 'getxh',
      getcs: 'getcs',
      geti: 'geti'
    })
  },
  methods: {
    // 加入播放列表
    cl () {
      var obj = {}
      if (this.$store.state.songid.includes(Number(this.$route.params.id)) === false) {
        this.$store.state.songid.push(Number(this.$route.params.id))
        obj.name = this.$route.params.name1
        obj.id = this.$route.params.id
        obj.src = this.$route.params.src
        obj.url = this.url
        this.$store.commit('songs', obj)
      }
      this.isActive = true
    },
    // 下一首
    next1 () {
      console.log(window.history)
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh >= this.getsongs.length - 1) {
          this.$store.commit('backzero')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name,
              src: this.getsongs[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        } else {
          this.$store.commit('add')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name,
              src: this.getsongs[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        }
      }
    },
    // 上一首
    prep () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh > 0) {
          this.$store.commit('jian')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name,
              src: this.getsongs[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        } else {
          this.$store.state.xh = this.getsongs.length - 1
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name,
              src: this.getsongs[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        }
      }
    },
    // 暂停
    pause1 () {
      document.querySelector('img').classList.add('pause11')
      this.$store.state.pause1.push(1)
    },
    // 播放
    play1 (e) {
      this.$store.state.pause1 = []
      document.querySelector('img').classList.remove('pause11')
      document.querySelector('img').classList.add('annim')
    },
    // 播放结束
    ender () {
      this.next1()
    },
    // 列表跳转
    go (id, name1, src) {
      this.open1 = false
      if (this.$store.state.i === 'dj') {
        this.$router.replace({
          name: 'djplay',
          params: {
            id: id,
            name1: name1,
            src: src
          }
        })
      }
    },
    // 获取
    get () {
      this.isloading = true
      this.$store.state.iid = this.$route.params.id
      this.src = this.$route.params.src
      this.name = this.$route.params.name1
      this.$axios
        .get([
          '/api/song/url?id=' +
          this.$route.params.id
        ])
        .then(response => {
          // success
          this.$store.state.songlist = response.data.data[0].url
          this.isloading = false
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    // 返回
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    }
  },
  // 一开始加载
  mounted () {
    this.get()
    Bus.$on('pause11', () => {
      this.pause1()
    })
    Bus.$on('play11', () => {
      this.play1()
    })
    Bus.$on('prep1', () => {
      this.prep()
    })
    Bus.$on('next1', () => {
      this.next1()
    })
    Bus.$on('ender', () => {
      this.ender()
    })
    this.$store.state.isshow = true
    this.$store.state.cs = 0
    if (this.$store.state.i !== 'dj') {
      this.$store.state.songs = []
      this.$store.state.i = 'dj'
    }
    this.cl()
  },
  // 路由更新
  beforeRouteUpdate (to, from, next) {
    if (to.fullPath !== from.fullPath) {
      next()
      this.get()
    }
  },
  // 销毁之前
  beforeDestroy () {
    Bus.$off('pause11')
    Bus.$off('play11')
    Bus.$off('next1')
    Bus.$off('prep1')
    Bus.$off('ender', this.ender)
  },
  // 路由离开
  beforeRouteLeave (to, from, next) {
    this.$store.state.isshow = false
    this.$store.state.name = this.name
    this.$store.state.sub = '电台'
    this.$store.state.src = this.src
    this.$store.state.iid = this.$route.params.id
    next()
  }
}
</script>

<style  scoped>
  .gd{
    margin-top:20px;
    font-size: 18px;
  }
  .annim{
    animation: rotating 10s infinite linear;
  }
  .pause11{
    animation-play-state:paused;
  }
  .ttt{
    font-size: 18px;
  }
  .icon {
    display: block !important;
    margin: 75% auto 0;
  }
  .back-b {
    position: fixed;
    z-index: 100;
    width: 100%;
    max-width: 640px;
    top: 0;
  }
  .img-b {
    width: 60%;
    padding: 10px;
    margin: 0 auto;
    margin-top: 50%;
    position: relative;
  }
  .img-b div{
    position: absolute;
    top:10px;
  }
  .img-b img {
    width: 100%;
    border-radius: 50%;
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .cc{
    background: rgba(192,192,192,0.1);
  }
</style>
