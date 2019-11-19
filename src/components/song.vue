<!--歌曲播放-->
<template>
  <div class="cc">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div class="big">
          <marquee direction='left' class="gd">{{name}} —— {{subname}}</marquee>
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
      ff: '',
      backpath: ''
    }
  },
  computed: {
    ...mapGetters({
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
    // 下一首
    next1 () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh >= this.getsongs.length - 1) {
          this.$store.commit('backzero')
          this.$router.replace({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        } else {
          this.$store.commit('add')
          this.$router.replace({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        }
      }
    },
    // 上一首
    prep () {
      if (this.getsongs.length > 1) {
        if (this.$store.state.xh > 0) {
          this.$store.commit('jian')
          this.$router.replace({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        } else {
          this.$store.state.xh = this.getsongs.length - 1
          this.$router.replace({
            name: 'song',
            params: {
              id: this.getsongs[this.getxh].id,
              name1: this.getsongs[this.getxh].name
            }
          })
        }
      }
    },
    // 播放结束
    ender () {
      this.next1()
    },
    // 加入播放列表
    cl () {
      var obj = {}
      if (this.$store.state.songid.includes(Number(this.$route.params.id)) === false) {
        this.$store.state.songid.push(Number(this.$route.params.id))
        obj.name = this.$route.params.name1
        obj.sub = this.$route.params.sub
        obj.id = this.$route.params.id
        this.$store.commit('songs', obj)
      }
      this.isActive = true
    },
    // 评论
    refresh () {
      this.refreshing = true
      this.$refs.container.scrollTop = 0
      setTimeout(() => {
        this.refreshing = false
      }, 500)
    },
    // 评论触底刷新
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
    // 歌词滚动
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
    // 快进
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
    // 图片开始暂停
    pause1 () {
      document.querySelector('img').classList.add('pause11')
      this.ff = 1
    },
    // 图片开始转动
    play1 (e) {
      document.querySelector('img').classList.remove('pause11')
      document.querySelector('img').classList.add('annim')
    },
    // 喜欢
    love () {
      this.love1 = 1
      this.$axios
        .get([
          '/api/like?id=' + this.$route.params.id
        ])
        .then(response => {
          // success
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    // 不喜欢
    nolove () {
      this.love1 = 0
      this.$axios
        .get([
          '/api/like/?like=false&id=' + this.$route.params.id
        ])
        .then(response => {
          // success
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    // mv
    gomv () {
      document.querySelector('audio').pause()
      this.$router.push({
        name: 'mv',
        params: {
          id: this.mvid
        }
      })
    },
    // 获取信息
    get () {
      this.$store.state.iid = this.$route.params.id
      // mvid
      this.isloading = true
      this.$axios.get(['/api/search?keywords=' + this.$route.params.name1 + '&type=1004']).then(response => {
        // success
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
    // 返回
    back() {
      this.$router.go(-1)
      this.$router.isBack = true
    }
  },
  // 路由更新
  beforeRouteUpdate (to, from, next) {
    if(to.fullPath!=from.fullPath){
      next()
      this.get()
    }
  },
  // 一开始加载
  mounted () {
    this.get()
    // console.log(this.$route.params.sub)
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
      this.next1()
    })
    Bus.$on('ender', () => {
      this.ender()
    })
    if (this.$store.state.i === 'dj' ) {
      this.$store.state.songs = []
      this.$store.state.i = ''
    }
    this.$store.state.isshow=true
    this.$store.state.cs = 0
    this.$store.state.states = ''
    this.cl()
  },
  // 时间处理
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
  // 销毁之前
  beforeDestroy () {
    Bus.$off('timeupdate1')
    Bus.$off('seeked1')
    Bus.$off('pause11')
    Bus.$off('play11')
    Bus.$off('next1')
    Bus.$off('prep1')
    Bus.$off('ender', this.ender)
  },
  // 路由离开
  beforeRouteLeave (to, from, next) {
    this.$store.state.isshow = false
    this.$store.commit('name', this.name)
    this.$store.commit('subname', this.subname)
    this.$store.commit('src', this.imgsrc)
    next();
  },
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
