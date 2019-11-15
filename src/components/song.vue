<template>
  <div class="cc">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div class="big">
          <marquee direction=left class="gd">{{name}} —— {{subname}}</marquee>
        </div>
        <mu-button icon slot="right"  @click="open = !open">
          <mu-icon size="28" value="chat" class="play" color="white" center ></mu-icon>
        </mu-button>
        <mu-button icon slot="right" @click="love" v-show="love1===0">
          <mu-icon size="28" value="favorite_border" class="play" color="white" center ></mu-icon>
        </mu-button>
        <mu-button icon slot="right" @click="nolove" v-show="love1===1">
          <mu-icon size="28" value="favorite" class="play" color="white" center ></mu-icon>
        </mu-button>
        <mu-button icon slot="right"  @click="gomv">
          <mu-icon size="28" value="play_circle_outline" class="play" color="white" center></mu-icon>
        </mu-button>
      </mu-appbar>
      <div class="img-b" v-show="curId===0" @click="l1">
        <div class="img-n">
          <img :src="imgsrc" alt class="annim" >
        </div>
      </div>
      <div class="gc-box"  v-show="curId===1" ></div>
      <div class="gc-bb" v-show="curId===1"  @click="l0">
        <div class="gc-b"  >
          <div
            v-for="(item, index) in afterLrc"
            :id="'line-'+index"
            :key="index"
            class="gc"
            ref="gc1"
          >{{item.txt}}</div>
        </div>
      </div>
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div class="pl-box">
            <div v-for="item in songpl" :key='item.index' class="ovf pl">
              <div class="pl-l"><img :src="item.user.avatarUrl" alt=""></div>
              <div class="pl-r">
                <div class="name">{{item.user.nickname}}</div>
                <div class="time">{{item.time|getdate}}</div>
                <div class="con">{{item.content}}</div>
              </div>
            </div>
          </div>
        </mu-load-more>
      </mu-drawer>
    </div>
  </div>

</template>

<script>import Bus from '../bus/bus'
import {mapGetters} from 'vuex'
export default {
  name: 'song',
  data () {
    return {
      curId: 0,
      isloading: false,
      url: '',
      imgsrc: '',
      lyric: '',
      love1: 0,
      lrcIndex: 0,
      afterLrc: [],
      arra: [],
      lrcTime: [],
      name: '',
      currentTime1: '',
      ppxx: '',
      arrtime: [],
      i: 0,
      currentLine: 0,
      songname: '',
      mvid: '',
      subname: '',
      songpl: [],
      docked: false,
      open: false,
      position: 'left',
      num: 20,
      refreshing: false,
      loading: false,
      open1: false,
      ids: '',
      ff: ''
    }
  },
  computed: {
    ...mapGetters({
      gettime1: 'gettime1',
      playlist: 'playlist',
      getsongs: 'getsongs',
      getid: 'getid',
      getxh: 'getxh',
      getname: 'getname',
      getcs: 'getcs',
      geti: 'geti'
    })
  },
  watch: {},
  methods: {
    next () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh < this.getsongs.length - 1) {
          this.$store.commit('add')
          this.$router.push({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        } else {
          this.$store.state.xh = 0
          this.$router.push({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
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
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        } else {
          this.$store.state.xh = this.getsongs.length - 1
          this.$router.push({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        }
      }
    },
    cl () {
      var obj = {}
      if (this.$store.state.songid.includes(Number(this.$route.params.id)) === false) {
        this.$store.state.songid.push(Number(this.$route.params.id))
        obj.name = this.$route.params.name1
        obj.id = this.$route.params.id
        this.$store.commit('songs', obj)
        // this.$store.state.songs.push(obj)
        console.log(obj)
      }
      this.isActive = true
    },
    refresh () {
      this.refreshing = true
      this.$refs.container.scrollTop = 0
      setTimeout(() => {
        this.refreshing = false
      }, 500)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.num += 20
        this.$axios
          .get([
            '/api/comment/music?id=' + this.$route.params.id + '&limit=' + this.num
          ])
          .then(response => {
            // success
            console.log(response.data.comments)
            this.songpl = response.data.comments
          })
          .catch(error => {
            // error
            alert('失败！')
            console.log(error)
          })

          .catch(error => {
            // error
            alert('失败')
            console.log(error)
          })
      }, 500)
    },
    l1 () {
      this.curId = 1
    },
    l0 () {
      this.curId = 0
    },
    timeupdate () {
      this.currentLine = 0
      this.currentTime1 = document.querySelector('audio').currentTime
      for (let j = this.currentLine; j < this.arrtime.length; j++) {
        if (
          this.currentTime1 < this.arrtime[j + 1] &&
          this.currentTime1 > this.arrtime[j]
        ) {
          this.currentLine = j
          this.ppxx = 260 - this.currentLine * 32
          document.querySelector('.gc-b').style.transform = 'translateY(' + this.ppxx + 'px)'
          for (let i = 0; i < this.$refs.gc1.length; i++) {
            this.$refs.gc1[i].className = 'gc'
          }
          this.$refs.gc1[this.currentLine].className = 'on'
          break
        }
      }
    },
    seeked () {
      if (document.querySelector('.gc-b').innerHTML === '暂无歌词') {
        return false
      } else {
        this.currentTime1 = document.querySelector('audio').currentTime
        for (let i = 0; i < this.$refs.gc1.length; i++) {
          this.$refs.gc1[i].className = 'gc'
        }
        for (let k = 0; k < this.arrtime.length; k++) {
          if (
            this.currentTime1 < this.arrtime[k + 1] &&
            this.currentTime1 < this.arrtime[k]
          ) {
            this.currentLine = k
            break
          }
        }
      }
    },
    pause1 () {
      document.querySelector('img').classList.add('pause11')
      this.$store.state.pause1.push(1)
      console.log('a')
      this.ff = 1
    },
    play1 (e) {
      this.$store.state.pause1 = []
      if (this.gettime1 !== '') {
        this.$refs.audio.currentTime = e
      }
      document.querySelector('img').classList.remove('pause11')
      document.querySelector('img').classList.add('annim')
    },
    love () {
      this.love1 = 1
      this.$axios
        .get([
          '/api/like?id=' + this.$route.params.id
        ])
        .then(response => {
          // success
          console.log(response.data)
          // this.url = response.data.data[0].url
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    nolove () {
      this.love1 = 0
      this.$axios
        .get([
          '/api/like/?like=false&id=' + this.$route.params.id
        ])
        .then(response => {
          // success
          console.log(response.data)
          // this.url = response.data.data[0].url
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    go (id, name1, src) {
      this.open1 = false
      if (this.geti === 'dj') {
        this.$router.push({
          name: 'djplay',
          params: {
            id: id,
            name1: name1,
            src: this.src
          }
        })
      } else {
        this.$router.push({
          name: 'song',
          params: {
            id: id,
            name1: name1
          }
        })
      }
    },
    gomv () {
      document.querySelector('audio').pause()
      console.log(this.$store.state.playlist)
      this.$router.push({
        name: 'mv',
        params: {
          id: this.mvid
        }
      })
    },
    romove (index) {
      this.getsongs.splice(index, 1)
      this.$store.state.songid.splice(index, 1)
    },
    get () {
      // mvid
      this.isloading = true
      console.log(this.$route.params.name1)
      this.$axios.get(['/api/search?keywords=' + this.$route.params.name1 + '&type=1004']).then(response => {
        // success
        // console.log(response.data.result.mvs[0].id)
        this.mvid = response.data.result.mvs[0].id
      })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
      // 歌曲的url
      this.$axios
        .get([
          '/api/song/url?id=' + this.$route.params.id
        ])
        .then(response => {
          // success
          // console.log(response.data.data[0].url)
          this.url = response.data.data[0].url
          this.$store.state.songlist = response.data.data[0].url
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
      // 歌曲的id
      this.$axios
        .get([
          '/api/song/detail?ids=' + this.$route.params.id
        ])
        .then(response => {
          // success
          console.log(response.data.songs[0].ar[0].name)
          document.querySelector('.gc-box').style.background = 'url(' + response.data.songs[0].al.picUrl + ')'
          this.imgsrc = response.data.songs[0].al.picUrl
          this.name = response.data.songs[0].name
          this.$store.state.name = response.data.songs[0].name
          this.subname = response.data.songs[0].ar[0].name
          this.songname = response.data.songs[0].name
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })

        .catch(error => {
          // error
          alert('失败')
          console.log(error)
        })
      // 歌曲评论
      this.$axios
        .get([
          '/api/comment/music?id=' + this.$route.params.id + '&limit=' + this.num
        ])
        .then(response => {
          // success
          // console.log(response.data.comments)
          this.songpl = response.data.comments
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })

        .catch(error => {
          // error
          alert('失败')
          console.log(error)
        })
      // 歌词
      this.$axios
        .get(['/api/lyric?id=' + this.$route.params.id])
        .then(response => {
          // success
          // console.log(response.data)
          if (response.data.lrc !== undefined) {
            this.lyric = response.data.lrc.lyric
          }
          if (response.data.lrc === undefined) {
            document.querySelector('.gc-b').innerHTML = '暂无歌词'
          }
          // 格式处理
          var lyrics = this.lyric.split('\n')
          var lrcObj = []
          /*eslint-disable */
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          for (var i = 0; i < lyrics.length; i++) {
            var timeRegExpArr = lyrics[i].match(timeReg)
            if (!timeRegExpArr) continue;
            var txt = lyrics[i].replace(timeReg, "")
            // 处理时间
            for (var k = 0; k < timeRegExpArr.length; k++) {
              var array = {}
              var t = timeRegExpArr[k]
              /*eslint-disable */
              var min = Number(String(t.match(/\[\d*/i)).slice(1))
              var sec = Number(String(t.match(/\:\d*/i)).slice(1))
              var time = min * 60 + sec
              array.time = time;
              array.txt = txt;
              lrcObj.push(array);
            }
            this.afterLrc = lrcObj;
          }
          for (let i = 0; i < this.afterLrc.length; i++) {
            var element = this.afterLrc[i].time;
            this.arrtime.push(element);
          }
          this.arrtime[this.arrtime.length] = this.arrtime[this.arrtime.length - 1] + 3
          this.isloading = false;
        })
        .catch(error => {
          //error
          alert("失败！");
          console.log(error);
        });
      this.isloading = false
    },
    back() {
      this.$router.go(-1)
      this.$router.isBack = true
    }
  },
  beforeRouteUpdate (to, from, next) {
    next ()
    this.get()
  },
  mounted () {
    Bus.$on('timeupdate1', () => {
      this.timeupdate()
    })
    Bus.$on('seeked1', () => {
      this.seeked()
    })
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
      this.next()
    })
    if (this.$store.state.i === 'dj' ) {
      this.$store.state.songs = []
      this.$store.state.i = ''
    }
    this.$store.state.isshow=true
    this.$store.state.cs = 0
    this.$store.state.states = ''
    this.cl()
    var arr = this.$store.state.songid
    arr.forEach((value, index) => {
      if (Number(arr[index]) === Number(this.$route.params.id)) {
        console.log(index)
        this.$store.state.xh = index
      }
    })
  },
  filters: {
    getdate (val) {
      let date = new Date(val)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dates = date.getDate()
      let hour = date.getHours()
      let min = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      } if (dates < 10) {
        dates = '0' + dates
      } if (hour < 10) {
        hour = '0' + hour
      } if (min < 10) {
        min = '0' + min
      } if (second < 10) {
        second = '0' + second
      }
      let box = year + '-' + month + '-' + dates + ' ' + hour + ':' + min + ':' + second
      return box
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  beforeDestroy () {
    Bus.$off('timeupdate1', this.timeupdate());
    Bus.$off('seeked1', this.seeked());
    Bus.$off('pause11', this.pause1());
    Bus.$off('play11', this.play1());
    Bus.$off('next1', this.next());
    Bus.$off('prep1', this.prep());
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.isshow=false
    this.$store.state.name=this.name
    this.$store.state.sub=this.subname
    this.$store.state.src=this.imgsrc
    this.$store.state.iid=this.$route.params.id
    next();
  }
};
</script>
<style  scoped>
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .gd{
    margin-top:20px;
    font-size: 18px;
  }
  audio {
    width: 97%;
    margin-left:1.5%;
  }
  .cc{
    background: rgba(0, 0, 0, 0.2);
  }
  .big{
    width:60%;
    float: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .tab{
    position: fixed;
    bottom:65px;
    width: 100%;
    max-width: 640px;
    background: #fff !important;
  }

  .tab-b div:nth-child(1){
    float: left;
    width: 50%;
    text-align: center;
  }
  .play{
    float: right;
  }
  .tab-b div:nth-child(2){
    float: right;
    width: 50%;
    text-align: center;
  }
  .name {
    font-size:14px;
    font-weight: bold;
  }
  .icon {
    display: block !important;
    margin: 75% auto 0;
  }
  .img-b {
    width: 100%;
    margin: 0 auto;
    padding: 24.5vh 0;
    text-align: center;
    position: relative;
    line-height: 0;
    z-index: 10;
    background: rgba(192,192,192,0.1);
    background: url('../assets/images/player-needle.png') no-repeat center 6%;
    background-size: 27%;
  }
  .img-n{
    width: 250px;
    height: 250px;
    z-index: 9;
    border-radius: 100%;
    margin: 0 auto;
    background: url("../assets/images/record-bg.png") no-repeat center center;
    background-size: 100%;
    box-shadow: 0px 0px 10px  #DCDCDC;
  }
  .img-b img {
    width: 170px;
    height: 170px;
    margin: 40px 0 ;
    border-radius: 100%;
    box-shadow: 0px 0px 15px  #DCDCDC;
  }
  .annim{
    animation: rotating 10s infinite linear;
  }
  .pause11{
    animation-play-state:paused;
  }
  .play1{
    margin-left:5%;
  }
  .back-b {
    position: fixed;
    z-index: 100;
    max-width: 640px;
    width: 100%;
    top: 0;
  }
  .gc {
    text-align: center;
    font-size: 16px;
    height: 32px;
    line-height:32px;
  }
  .gc-box {
    height:600px;
    margin-top:56px;
    position: relative;
    overflow: hidden;
    background-size: cover!important;
    background-repeat: no-repeat!important;
    background-position:center;
    filter: blur(5px);
  }

  .gc-bb{
    z-index: 1;
    width: 100%;
    height:600px;
    position: fixed;
    top:7%;
    background: rgba(0, 0, 0, 0.2);
  }
  .gc-b {
    height: 520px;
    transform: translateY(260px);
    text-align: center;
    color: #fff;
    transition-duration: 600ms;
  }
  .on {
    text-align: center;
    font-size: 16px;
    color: #2196f3 !important;
    height: 32px;
    line-height:32px;
  }
  .ppl-t{
    font-size: 14px;
    color: #666666;
    margin-left:20px ;
  }
  .back-b{
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    z-index: 100;
  }
  .ttt{
    font-size: 18px;
  }
  .video-b{
    width: 100%;
    background: #fff;
    z-index: 100;
    margin-top:15% ;
  }
  .video1{
    width: 100%;
    height: auto;
  }
  .pl{
    width: 95%;
    margin: 10px auto;
    padding: 10px 0;
    border-bottom:1px solid #eaeaea ;
  }
  .pl-box{
    overflow: auto;
  }
  .pl:last-child{
    border:none;
  }
  .pl-l{
    width: 20%;
    float: left;
  }
  .pl-l img{
    width: 60%;
    border-radius: 50%;
    margin-top:10px;
  }
  .pl-r{
    width: 78%;
    float: left;
  }
  .time{
    width: 100%;
    color: #999999;
    font-size:14px;
    line-height: 24px;
  }
  .name{
    font-size:14px;
    color: #333;
  }
  .con{
    width: 100%;
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
    color: #333333;
    font-size:15px;
  }
</style>
