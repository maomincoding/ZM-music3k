<template>
  <div v-if="playlist!=''">
    <mu-paper class="demo-paper audios-b ovf" :z-depth="3" >
      <div class="ovf"  v-show="isshow===true">
        <div style="float: left;width: 60%;margin-left:20%;" >
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
      </div>
      <div  class="listb ovf center" @click="f1()" v-show="isshow===false">
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
          <mu-button fab small color="primary" ripple @click.stop="openBotttomSheet"  class="liopen">
            <mu-icon value="list"  size="26"></mu-icon>
          </mu-button>
        </div>
      </div>
      <!--1-->
      <audio
        :controls="isshow"
        :src="playlist"
        ref="audio"
        loop="loop"
        class="audios"
        autoplay
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
      ids: '',
      isActive: false,
      cTime: '',
      currentLine: 0,
      currentTime1: ''
    }
  },
  computed: {
    ...mapGetters({
      playlist: 'playlist',
      isshow: 'isshow',
      currtime: 'currtime',
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
    timeupdate () {
      Bus.$emit('timeupdate1', function () {})
    },
    seeked () {
      Bus.$emit('seeked1', function () {})
    },
    pause1 () {
      Bus.$emit('pause11', function () {})
    },
    play1 () {
      Bus.$emit('play11', function () {})
    },
    prep () {
      Bus.$emit('prep1', function () {})
    },
    next () {
      Bus.$emit('next1', function () {})
    },
    j1 () {
      this.$refs.audio.pause()
      this.$store.state.pause1 = 'off'
      this.jj = false
    },
    j0 () {
      this.$refs.audio.play()
      this.jj = true
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
        this.$router.push({
          name: 'djplay',
          params: {
            id: id,
            name1: name,
            src: this.src
          }
        })
      } else {
        this.$router.push({
          name: 'song',
          params: {
            id: id,
            name1: name
          }
        })
      }
    },
    f1 () {
      console.log(this.geti)
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
            name1: this.name
          }
        })
        this.$store.state.time1 = this.currtime
      }
    },
    get () {
      console.log(this.getsongs)
      this.$store.state.states = 'on'
      if (this.playlist !== '') {
        this.name = this.getname
        this.sub = this.getsub
        this.src = this.getsrc
      }
    }
  },
  beforeUpdate () {
    this.get()
    if (this.$store.state.pause1.length === 2) {
      console.log(this.$store.state.pause1)
      this.j1()
    }
    if (this.$store.state.pause1.length === 1) {
      this.j0()
    }
  },
  updated () {
    if (this.getid !== '') {
      this.ids = this.getid
      if (this.open === true) {
        var obj = document.getElementsByClassName('songlists')
        var arr = Array.prototype.slice.call(obj) // [].slice.call(obj);
        console.log(this.ids)
        console.log(arr)
        arr.forEach((value, index) => {
          console.log(arr[index].getAttribute('alt'))
          if (Number(arr[index].getAttribute('alt')) === this.ids) {
            arr[index].style.background = '#f5f5f5'
            console.log(index)
          }
        })
      }
      this.isActive = true
    }
  }
}

</script>
<style  scoped>
  .liopen{
    margin-left: 10px;
  }
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
  }
  .listb2{
    float: left;
    margin-left:4%;
    width: 48%;
    color: #333;
  }
  .listb3{
    float: right;
    padding: 5px;
  }
  .lisimg{
    width: 46.31px;
    height: 46.31px;
    border-radius:50%;
  }
  .audios-b {
    position: fixed;
    width: 100%;
    z-index: 100;
    bottom: 0;
    padding-top: 5px ;
  }
  audio {
    width: 97%;
    margin-left:1.5%;
    background: #fff;
  }
  .mu-list{
    max-height: 50vh;
    overflow: auto;
  }

</style>
