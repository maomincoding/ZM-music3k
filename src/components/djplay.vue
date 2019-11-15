<template>
  <div class="cc">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="ttt">{{name}}</span>
      </mu-appbar>
      <div class="img-b" >
        <img :src="src" alt class="annim">
      </div>
        <!--<mu-paper class="demo-paper audios-b" :z-depth="3" v-show="playlist === ''">-->
          <!--<audio-->
            <!--:src="url"-->
            <!--controls="controls"-->
            <!--ref="audio"-->
            <!--class="audios"-->
            <!--@pause="pause1"-->
            <!--@play="play1(gettime1)"-->
            <!--autoplay-->
          <!--&gt;</audio>-->
        <!--</mu-paper>-->
      <div class="audios-b" v-show="playlist === ''">
        <div class="ovf" style="width: 60%;margin-left:20%; float: left">
          <mu-button   color="black" ripple icon  @click.stop="prep()"  style="float: left">
            <mu-icon value="skip_previous"  size="26"></mu-icon>
          </mu-button>
          <mu-button   color="black" ripple icon   @click.stop="next()"  style="float: right">
            <mu-icon value="skip_next"  size="26"></mu-icon>
          </mu-button>
        </div>
        <mu-button  icon color="black" ripple @click.stop="openBotttomSheet"  class="liopen" style="float: right">
          <mu-icon value="list"  size="30"></mu-icon>
        </mu-button>
        <audio
          :src="url"
          controls="controls"
          ref="audio"
          loop="loop"
          class="audios"
          autoplay="autoplay"
          @pause="pause1"
          @play="play1(gettime1)"
        ></audio>
      </div>
      <mu-bottom-sheet :open.sync="open1" class="list-tc">
        <mu-sub-header class="list-tct">播放列表</mu-sub-header>
        <mu-list textline="two-line">
          <mu-list-item avatar button  v-for="(item,index) in getsongs" :key="index" ripple @click="go(item.id,item.name,item.src)"  class="songlists"  :alt="item.id"  :ind="index" ref="lis">
            <mu-list-item-action>
              <mu-avatar>
                <mu-icon value="music_note" class="music" ></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title class="songname">{{item.name}}</mu-list-item-title>
              <mu-list-item-sub-title class="songsub">{{item.sub}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action @click.stop="romove(item.index)">
              <mu-button icon>
                <mu-icon value="close" size="20"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>

<script>import {mapGetters} from 'vuex'
export default {
  name: 'djplay',
  components: {},
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
      gettime1: 'gettime1',
      playlist: 'playlist',
      getsongs: 'getsongs',
      geti: 'geti',
      getxh: 'getxh',
      getcs: 'getcs'
    })
  },
  watch: {},
  methods: {
    openBotttomSheet () {
      this.open1 = true
      this.cl()
    },
    cl () {
      console.log('111111')
      var obj = {}
      if (this.$store.state.songid.includes(Number(this.$route.params.id)) === false) {
        this.$store.state.songid.push(Number(this.$route.params.id))
        obj.name = this.$route.params.name1
        obj.sub = this.subname
        obj.id = this.$route.params.id
        obj.src = this.$route.params.src
        obj.url = this.url
        this.$store.state.songs.push(obj)
        console.log(obj)
      }
      this.isActive = true
    },
    next () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh < this.getsongs.length - 1) {
          this.$store.commit('add')
          this.$router.push({
            name: 'djplay',
            params: {
              id: this.getsongs[this.$store.state.xh].id,
              name1: this.getsongs[this.$store.state.xh].name,
              src: this.getsongs[this.$store.state.xh].src
            }
          })
        } else {
          this.$store.state.xh = 0
          this.$router.push({
            name: 'djplay',
            params: {
              id: this.getsongs[this.$store.state.xh].id,
              name1: this.getsongs[this.$store.state.xh].name,
              src: this.getsongs[this.$store.state.xh].src
            }
          })
        }
      }
    },
    prep () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh > 0) {
          this.$store.commit('jian')
          this.$router.push({
            name: 'djplay',
            params: {
              id: this.getsongs[this.$store.state.xh].id,
              name1: this.getsongs[this.$store.state.xh].name,
              src: this.getsongs[this.$store.state.xh].src
            }
          })
        } else {
          this.$store.state.xh = this.getsongs.length - 1
          this.$router.push({
            name: 'djplay',
            params: {
              id: this.getsongs[this.$store.state.xh].id,
              name1: this.getsongs[this.$store.state.xh].name,
              src: this.getsongs[this.$store.state.xh].src
            }
          })
        }
      }
    },
    pause1 () {
      document.querySelector('img').classList.add('pause11')
      this.$store.state.pause1.push(1)
    },
    play1 (e) {
      this.$store.state.pause1 = []
      if (this.gettime1 !== '') {
        this.$refs.audio.currentTime = e
      }
      document.querySelector('img').classList.remove('pause11')
      document.querySelector('img').classList.add('annim')
    },
    go (id, name1, src) {
      this.open1 = false
      if (this.$store.state.i === 'dj') {
        this.$router.push({
          name: 'djplay',
          params: {
            id: id,
            name1: name1,
            src: src
          }
        })
      }
    },
    get () {
      this.isloading = true
      this.$store.state.songlist = ''
      this.src = this.$route.params.src
      this.name = this.$route.params.name1
      console.log(this.$route.params.id)
      this.$axios
        .get([
          '/api/song/url?id=' +
          this.$route.params.id
        ])
        .then(response => {
          // success
          console.log(response.data)
          this.url = response.data.data[0].url
          this.isloading = false
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    back () {
      document.querySelector('.audios').pause()
      console.log(this.getcs)
      this.$router.push({path: '/index'})
      // if (this.$store.state.states === 'on') {
      //   this.$router.go(Number('-' + this.getcs))
      // }
      // this.$router.go(-1)
      if (this.$store.state.pause1.length === 1) {
        this.$store.state.pause1.push(1)
      }
      this.$router.isBack = true
    }
  },
  mounted () {
    this.$store.state.cs = 0
    if (this.$store.state.i !== 'dj') {
      this.$store.state.songs = []
      this.$store.state.i = 'dj'
    }
    this.cl()
    console.log(this.$store.state.i)
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.get()
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.get()
    // document.getElementsByTagName('audio').pause()
  },
  updated () {
    if (this.open1 === true) {
      var obj1 = document.getElementsByClassName('songlists')
      var arr = Array.prototype.slice.call(obj1) // [].slice.call(obj);
      arr.forEach((value, index) => {
        console.log(arr[index].getAttribute('alt'))
        if (Number(arr[index].getAttribute('alt')) === Number(this.$route.params.id)) {
          arr[index].style.background = '#f5f5f5'
          this.$store.state.xh = index
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.cl()
    this.$store.state.songlist = this.url
    this.$store.state.time = document.querySelector('audio').currentTime
    this.$store.state.name = this.name
    this.$store.state.sub = '电台'
    this.$store.state.src = this.src
    this.$store.state.iid = this.$route.params.id
    this.$store.state.time1 = ''
    next()
  },
  beforeDestroy () {
    document.querySelector('.audios').pause()
  }

}
</script>

<style  scoped>
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
  .audios-b {
    position: fixed;
    width: 100%;
    z-index: 100;
    bottom: 0;
    line-height: 0;
    background: #F1F3F4;
  }
  audio {
    width: 97%;
    margin-left:1.5%;
    background: #f4f4f4;
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
