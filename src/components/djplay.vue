<!--电台播放-->
<template>
  <div class="cc">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div>
          <marquee :lists="name"></marquee>
        </div>
      </mu-appbar>
      <div class="img-b" >
        <img :src="src" alt class="annim">
      </div>
    </div>
  </div>
</template>

<script>import marquee from './marquee'
import Bus from '../bus/bus'
import {mapGetters} from 'vuex'
export default {
  name: 'djplay',
  components: {
    marquee
  },
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
    // 下一首
    next1 () {
      if (this.getplaylist.length > 1) {
        if (this.$store.state.xh >= this.getplaylist.length - 1) {
          this.$store.commit('backzero')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getplaylist[this.getxh].id,
              name1: this.getplaylist[this.getxh].name,
              src: this.getplaylist[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        } else {
          this.$store.commit('add')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getplaylist[this.getxh].id,
              name1: this.getplaylist[this.getxh].name,
              src: this.getplaylist[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        }
      }
    },
    // 上一首
    prep () {
      if (this.getplaylist.length > 1) {
        if (this.$store.state.xh > 0) {
          this.$store.commit('jian')
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getplaylist[this.getxh].id,
              name1: this.getplaylist[this.getxh].name,
              src: this.getplaylist[this.getxh].src
            }
          }).catch(err => { console.log(err) })
        } else {
          this.$store.state.xh = this.getplaylist.length - 1
          this.$router.replace({
            name: 'djplay',
            params: {
              id: this.getplaylist[this.getxh].id,
              name1: this.getplaylist[this.getxh].name,
              src: this.getplaylist[this.getxh].src
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
          this.$store.commit('song', response.data.data[0].url)
          console.log(response.data)
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
  created () {
    this.get()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'get'
  },
  // 一开始加载
  mounted () {
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
    if (!this.isserch) {
      var arr = this.getplaylist
      arr.forEach((value, index) => {
        if (Number(arr[index].id) === Number(this.$route.params.id)) {
          console.log(index)
          this.$store.commit('xh', index)
        }
      })
    }
    this.$store.state.states = ''
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
