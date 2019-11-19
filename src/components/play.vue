<!--底部栏音乐-->
<template>
  <div v-if="playlist!=''">
    <mu-paper class="demo-paper audios-b ovf" :z-depth="3" >
      <div class="ovf listd"  v-show="isshow===true">
        <div  style="float:left" class="liopen">
          <mu-button  icon color="black" ripple  v-for="(item,index) in icons"  :key="index" v-if="item.is" @click.stop="made(index)">
            <mu-icon   :value="item.val"  size="30"  ></mu-icon>
          </mu-button>
        </div>
        <div style="float: left;width: 60%;margin-left:7.5vw" >
          <mu-button   color="black" ripple icon  @click.stop="prep()"  style="float: left">
            <mu-icon value="skip_previous"  size="26"></mu-icon>
          </mu-button>
          <mu-button   color="black" ripple icon   @click.stop="next1()"  style="float: right">
            <mu-icon value="skip_next"  size="26"></mu-icon>
          </mu-button>
        </div>
        <mu-button  icon color="black" ripple @click.stop="openBotttomSheet"  class="liopen" style="float: right">
          <mu-icon value="queue_music"  size="30"></mu-icon>
        </mu-button>
      </div>
      <div  class="listb ovf " @click="f1()" v-show="isshow===false">
        <div class="listb1"><img  alt="" class="lisimg" :src="src"></div>
        <div class="listb2">
          <mu-list-item-title>{{name}}</mu-list-item-title>
          <mu-list-item-sub-title>{{sub}}</mu-list-item-sub-title>
        </div>
        <div class="listb3">
          <mu-button fab small color="primary" ripple v-show="jj" @click.stop="j1">
            <mu-icon value="pause"  size="23"></mu-icon>
          </mu-button>
          <mu-button fab small color="primary" ripple v-show="!jj"  @click.stop="j0">
            <mu-icon value="play_arrow"  size="23"></mu-icon>
          </mu-button>
          <mu-button fab small color="primary" ripple @click.stop="openBotttomSheet"  class="liopen1" >
            <mu-icon value="queue_music"  size="26"></mu-icon>
          </mu-button>
        </div>
      </div>
      <!--1-->
      <audio
        :controls="isshow"
        :src="playlist"
        ref="audio"
        :loop="modeLoop"
        class="audios"
        autoplay
        @ended="ender"
        @timeupdate="timeupdate"
        @seeked="seeked"
        @pause="pause1"
        @play="play1"
        controlslist="nodownload"
      ></audio>
    </mu-paper>
    <mu-bottom-sheet :open.sync="open" class="list-tc">
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
    <mu-snackbar :color="color.color" :open.sync="color.open">
      {{tag}}
    </mu-snackbar>
  </div>
</template>
<script>import Bus from '../bus/bus'
import {mapGetters} from 'vuex'
export default {
  name: 'play',
  components: {},
  data () {
    return {
      name: '',
      sub: '',
      src: '',
      url: '',
      jj: true,
      open: false,
      modeLoop: true,
      ids: '',
      isActive: false,
      cTime: '',
      currentLine: 0,
      currentTime1: '',
      tag: '',
      iindex: 0,
      color: {
        color: 'info',
        message: ['顺序播放', '单曲循环'],
        open: false,
        timeout: 1000
      },
      icons: [
        {
          val: 'repeat_one',
          is: true
        },
        {
          val: 'loop',
          is: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      playlist: 'playlist',
      isshow: 'isshow',
      getname: 'getname',
      getsub: 'getsub',
      getsrc: 'getsrc',
      getid: 'getid',
      geti: 'geti',
      getsongs: 'getsongs'
    })
  },
  watch: {
    time () {
      console.log('change')
    }
  },
  methods: {
    openColorSnackbar (i) {
      this.tag = this.color.message[i]
      if (this.color.timer) clearTimeout(this.color.timer)
      this.color.open = true
      this.color.timer = setTimeout(() => {
        this.color.open = false
      }, this.color.timeout)
    },
    made (index) {
      this.iindex++
      if (this.iindex >= this.icons.length) {
        this.iindex = 0
      }
      this.icons.forEach((val) => {
        val.is = false
      })
      this.icons[this.iindex].is = true
      if (this.iindex === 0) {
        this.modeLoop = true
      } else if (this.iindex === 1) {
        this.modeLoop = false
      }
      this.openColorSnackbar(index)
    },
    ender () {
      Bus.$emit('ender')
    },
    timeupdate () {
      Bus.$emit('timeupdate1')
    },
    seeked () {
      Bus.$emit('seeked1')
    },
    pause1 () {
      Bus.$emit('pause11')
      this.$store.state.pause1 = 'off'
      this.jj = false
    },
    play1 () {
      Bus.$emit('play11')
      this.jj = true
    },
    prep () {
      Bus.$emit('prep1')
    },
    next1 () {
      Bus.$emit('next1')
    },
    openBotttomSheet () {
      this.open = true
    },
    romove (index) {
      this.getsongs.splice(index, 1)
      this.$store.state.songid.splice(index, 1)
    },
    go (id, name, src) {
      this.open = false
      if (this.geti === 'dj') {
        this.$router.replace({
          name: 'djplay',
          params: {
            id: id,
            name1: name,
            src: this.src
          }
        })
      } else {
        this.$router.replace({
          name: 'song',
          params: {
            id: id,
            sub: this.sub,
            name1: name
          }
        })
      }
    },
    f1 () {
      if (this.geti === 'dj') {
        this.$router.push({
          name: 'djplay',
          params: {
            id: this.ids,
            name1: this.name,
            src: this.src
          }
        })
        this.$store.state.time1 = this.currtime
      } else {
        this.$router.push({
          name: 'song',
          params: {
            id: this.ids,
            sub: this.sub,
            name1: this.name
          }
        })
        this.$store.state.time1 = this.currtime
      }
    },
    get () {
      this.$store.state.states = 'on'
      if (this.playlist !== '') {
        this.name = this.getname
        this.sub = this.getsub
        this.src = this.getsrc
      }
      if (this.getid !== '') {
        this.ids = Number(this.getid)
        if (this.open === true) {
          var obj = document.getElementsByClassName('songlists')
          var arr = Array.prototype.slice.call(obj)
          arr.forEach((value, index) => {
            if (Number(arr[index].getAttribute('alt')) === this.ids) {
              arr[index].style.background = '#f5f5f5'
            }
          })
        }
        this.isActive = true
      }
    }
  },
  updated () {
    this.get()
  }
}

</script>
<style  scoped>
  .songname{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .songsub{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .listb1{
    float: left;
    width: 13%;
    margin: 5px 0 0 5px;
  }
  .listb2{
    float: left;
    margin-left:4%;
    width: 48%;
    color: #333;
    margin-top: 5px;
  }
  .listb3{
    float: right;
    padding: 5px;
    border-radius: 1rem;
  }
  .lisimg{
    width: 46.31px;
    height: 46.31px;
    border-radius:50%;
  }
  .liopen1{
    margin-left: 10px;
  }
  .audios-b {
    position: fixed;
    width: 100%;
    z-index: 100;
    bottom: 0;
    background:#F1F3F4 ;
    max-width: 640px;
  }
  audio {
    width: 97%;
    margin-left:1.5%;
  }
  .mu-list{
    max-height: 50vh;
    overflow: auto;
  }

</style>
