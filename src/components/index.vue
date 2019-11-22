<!--首页-->
<template>
  <div class="main">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
    <mu-appbar style="width: 100%;" class="box ovf" color="primary">
        <mu-button icon slot="left" @click="open = !open">
        <mu-icon size="31" value="menu" ></mu-icon>
        </mu-button>
        <mu-button icon slot="right" @click="tose">
          <mu-icon size="25" value="search" color="white" ></mu-icon>
        </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <div class="side-b">
          <div class="side1">
            <img :src="srcimg" alt class="usertx">
            <p>
              <span  class="nickname">{{nickname}}</span>
              <span @click="qd" class="qd">{{qd1}}</span>
            </p>
            <mu-button small  round color="primary" @click="esc" class="esc">退出登录</mu-button>
          </div>
          <mu-list>
            <mu-list-item >
              <mu-list-item-action>
                <mu-icon size="30" value="playlist_play" color="#333"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-button class="zjbf" @click="zjbf()" ripple flat small>最近播放</mu-button>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div class="side2">
            <div></div>
            <p class="tit">我的歌单</p>
            <div class="gd-box">
            <div v-for="(item,index) in list" :key="index" class="ovf">
              <router-link :to="{name: 'playListDetail',params: { id: item.id, name:item.name}}">
              <img :src="item.coverImgUrl" alt class="gdimg">
              <p class="gdtxt">{{item.name}}</p>
              </router-link>
            </div>
            </div>
          </div>
        </div>
      </mu-list>

    </mu-drawer>
    <div class="banner">
      <mu-carousel hide-controls class="lunb" :active="active">
        <template slot="indicator" slot-scope="{ index, active }">
          <mu-button
            icon
            class="mu-carousel-indicator-button"
            :class="{'mu-carousel-indicator-button__active': active}"
            @click="changeActive(index)"
          >
            <span class="rect-indicator"></span>
          </mu-button>
        </template>
        <mu-carousel-item v-for="(item,index) in banner" :key="index">
          <img :src="item.pic" class="bannerimg">
        </mu-carousel-item>
      </mu-carousel>
    </div>
    <div class="iconb ovf">
      <div v-for="(item,index) in icon" :key="index" class="icon1">
        <router-link :to="item.url">
          <img :src="item.src" alt>
          <p>{{item.txt}}</p>
        </router-link>
      </div>
    </div>
    <div class="tjgd center">
      <p class="tit">推荐歌单</p>
      <div class="tjgd-b ovf">
        <div v-for="(item,index) in tjgd" :key="index">
          <router-link :to="{name: 'playListDetail',params: { id: item.id, name:item.name}}">
            <img :src="item.picUrl" alt>
            <div class="nn">{{item.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="xd center">
      <p class="tit">新碟</p>
      <div class="xd-b ovf">
        <div v-for="(item) in xd" :key="item.id" @click="goxd(item.id,item.name)">
          <img :src="item.picUrl" alt>
          <p>{{item.name}}</p>
          <p class="artist">{{item.artist.name}}</p>
        </div>
      </div>
    </div>
    <div class="dt center">
      <p class="tit">推荐电台</p>
      <div class="dt-b ovf">
        <div v-for="item in dt" :key="item.id" class="dt-item" @click="godj(item.id,item.name)">
          <div>
            <img :src="item.picUrl" alt>
          </div>
          <p class="dj-name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="dt center">
      <p class="tit">推荐MV</p>
      <div class="dt-b ovf">
        <div v-for="item in mv" :key="item.id" class="dt-item" @click="gomv(item.id,item.name)">
          <div>
            <img :src="item.cover" alt>
          </div>
          <div class="nn">{{item.name}}</div>
        </div>
      </div>
    </div>
    <mu-snackbar :color="color.color" :open.sync="color.open">
      <mu-icon left :value="icon1"></mu-icon>
      {{color.message}}
    </mu-snackbar>
    </div>
  </div>
</template>

<script>
import carouselImg1 from '../assets/images/c1.png'
import carouselImg2 from '../assets/images/c2.png'
import carouselImg3 from '../assets/images/c3.png'
import carouselImg4 from '../assets/images/c4.png'
export default {
  name: 'index',
  data () {
    return {
      color: {
        color: '',
        message: '',
        open: false,
        timeout: 3000
      },
      isloading: false,
      search: '',
      srcimg: '',
      flag: false,
      qd1: '',
      nickname: '',
      mv: '',
      list: '',
      list1: '',
      banner: '',
      active: 0,
      docked: false,
      user1: '',
      open: false,
      position: 'left',
      icon: [
        {
          url: '/newsong/',
          src: carouselImg1,
          txt: '每日推荐'
        },
        {
          url: '/songslist/',
          src: carouselImg2,
          txt: '歌单'
        },
        {
          url: '/rank/',
          src: carouselImg3,
          txt: '排行榜'
        },
        {
          url: '/dj/',
          src: carouselImg4,
          txt: '电台'
        }
      ],
      tjgd: '',
      xd: '',
      dt: ''
    }
  },
  computed: {
    icon1 () {
      return {
        success: 'check_circle',
        warning: 'priority_high'
      }[this.color.color]
    }
  },
  watch: {},
  methods: {
    re () {
      console.log(this.$cookies.keys())
    },
    tose () {
      this.$router.push({path: '/search/'})
    },
    openColorSnackbar () {
      if (this.color.timer) clearTimeout(this.color.timer)
      this.color.open = true
      this.color.timer = setTimeout(() => {
        this.color.open = false
      }, this.color.timeout)
    },
    qd () {
      this.$axios
        .get(['/api/daily_signin'])
        .then(response => {
          // success
          console.log(response.data)
          if (response.data.code === 200) {
            this.color.color = 'success'
            this.color.message = '签到成功'
            this.openColorSnackbar()
            this.qd1 = '已签到'
            var ctuskytime = new Date()
            ctuskytime.setDate(ctuskytime.getDate() + 1)
            ctuskytime.setHours(0)
            ctuskytime.setMinutes(0)
            ctuskytime.setSeconds(0)
            this.$cookies.set('qd01', this.qd1, ctuskytime.toGMTString())
          } else {
            this.color.color = 'warning'
            this.color.message = '重复签到'
            this.qd1 = '已签到'
            this.openColorSnackbar()
            return false
          }
        })
        .catch(error => {
          // error
          this.color.color = 'warning'
          this.color.message = '重复签到'
          this.qd1 = '已签到'
          this.openColorSnackbar()
          console.log(error)
        })
    },
    zjbf () {
      this.$router.push({path: '/bfjl/'})
    },
    godj (id, name) {
      this.$router.push({
        name: 'djxq',
        params: {
          id: id,
          name1: name
        }
      })
    },
    gomv (id, name) {
      this.$router.push({
        name: 'mv',
        params: {
          id: id,
          name1: name
        }
      })
    },
    goxd (id, name) {
      this.$router.push({
        name: 'newd',
        params: {
          id: id,
          name1: name
        }
      })
    },
    changeActive (index) {
      this.active = index
    },
    esc () {
      localStorage.clear('user')
      this.$axios
        .get(['/api/logout'])
        .then(response => {
          // success
        })
        .catch(error => {
          // error
          alert('失败')
          console.log(error)
        })
    },
    ss () {
      this.flag = !this.flag
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false)// 禁止页面滑动
    },
    side () {
      this.flag = !this.flag
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', mo, false)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.docked = false
    if (this.user1 === null) {
      this.$router.push({path: '/login/'})
    }
    if (this.$cookies.isKey('qd01')) {
      this.qd1 = this.$cookies.get('qd01')
    } else {
      this.qd1 = '签到'
    }
  },
  beforeRouteLeave (to, from, next) {
    this.open = false
    next()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素） 428900128
  mounted () {
    // 用户名
    this.isloading = true
    let user = localStorage.getItem('user')
    this.user1 = user
    this.$axios
      .get(['/api/user/detail?uid=' + user])
      .then(response => {
        // success
        this.srcimg = response.data.profile.avatarUrl
        this.nickname = response.data.profile.nickname
      })
      .catch(error => {
        // error
        alert('失败')
        window.location.reload()
        console.log(error)
      })
    this.$axios
      .get(['/api/user/record?uid=' + user])
      .then(response => {
        // success
      })
      .catch(error => {
        // error
        console.log(error)
      })
    // 我的歌单
    this.$axios
      .get(['/api/user/playlist?uid=' + user])
      .then(response => {
        // success
        this.list = response.data.playlist
      })
      .catch(error => {
        // error
        console.log(error)
      })
    // banner
    this.$axios
      .get(['/api/banner?type=2'])
      .then(response => {
        // success
        this.banner = response.data.banners
      })
      .catch(error => {
        // error
        alert('失败！')
        console.log(error)
      })
    // mv
    this.$axios
      .get(['/api/mv/first?limit=9'])
      .then(response => {
        // success
        this.mv = response.data.data
      })
      .catch(error => {
        // error
        alert('失败！')
        console.log(error)
      })
    // 推荐歌单
    this.$axios
      .get(['/api/personalized?limit=6'])
      .then(response => {
        // success
        this.tjgd = response.data.result
      })
      .catch(error => {
        // error
        alert('失败！')
        console.log(error)
      })

    // 新碟
    this.$axios
      .get(['/api/top/album?offset=0&limit=3'])
      .then(response => {
        // success
        this.xd = response.data.albums
      })
      .catch(error => {
        // error
        alert('失败')
        console.log(error)
      })
    // 电台
    this.$axios
      .get(['/api/dj/today/perfered'])
      .then(response => {
        // success
        this.dt = response.data.data
        this.isloading = false
      })
      .catch(error => {
        // error
        alert('失败')
        console.log(error)
      })
  }
}
</script>
<style  scoped>
  .icon {
    display: block !important;
    margin: 75% auto 0;
  }
  .gd-box{
    height:60vh;
    overflow-y: scroll;
  }
  .qd{
    font-size: 14px;
    border: 1px solid #cacaca;
    border-radius:16px ;
    padding: 1px 12px;
    float: right;
    margin-right:2%;
    color: #333;
  }
li {
  list-style: none;
}
.esc{
  position: absolute;
  top:5%;
  right: 2%;
  font-size: 14px;
}
.mu-list{
  padding: 0px 0;
}
.mu-appbar-title {
  line-height: 0px !important;
}
.tjgd-b>div,
.xd-b>div,
.dt-item {
  float: left;
  width: 33.3%;
  box-sizing: border-box;
  text-align: center;
}
.nn{
  width: 100%;
  padding:10px;
  text-align: left;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dt-item div {
  position: relative;
}
.dj-name{
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tjgd-b img,
.xd-b img,
.dt-item img {
  width: 80%;
  height: 94.89px;
  border-radius: 8px;
  object-fit: cover;
}
.xd-b p {
  margin: 0 !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.icon1 {
  float: left;
  text-align: center;
  width: 25%;
}
.artist {
  color: #666;
  font-size: 14px;
}
.icon1 img {
  width: 60%;
  margin: auto;
}
.icon1 p {
  margin: 0 !important;
  color: #333;
}
.banner {
  width: 95%;
  margin: 0 auto;
  margin-top:10vh;
  border-radius:12px;
}
.box{
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  z-index: 100;
}
.box1 {
  width: 60%;
  line-height: 0px !important;
}

.tit {
  font-size: 18px;
  font-weight: bold;
  margin-left: 5%;
  color: #333;
  line-height: 24px;
}
.side {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
.side2 div {
  margin: 10px 5% 0 10px;
}
.side2 {
  border-top:1px solid #2196f3 ;
}
  .side2::-webkit-scrollbar{
    display:none;
  }
.side-b1 {
  width: 20%;
  height: 100%;
  float: left;
  z-index: 101;
}
.side1 {
  position: relative;
  padding: 5% 0 3% 5%;
  background: #f4f4f4;
}
.gdimg {
  width: 19%;
  border-radius: 50%;
  float: left;
  margin: 0 4% 0 0;
  object-fit: cover;
}
.gdtxt {
  width: 77%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #333;
  float: right;
  line-height: 16px !important;
  font-size: 14px;
}
.mu-input {
  width: 92%;
}
.usertx {
  width: 25%;
  object-fit: cover;
  border-radius: 50%;
}
.nickname {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}
.zjbf{
  font-size: 14px;
  text-align: left;
}
.bannerimg {
  width: 50%;
  border-radius: 10px;
  object-fit: cover;
}
.mu-carousel-indicator-button__active {
  background: #2196f3 !important;
}
.mu-carousel-indicator-button {
  width: 8px !important;
  height: 8px !important;
  background: #fff;
}
.mu-carousel {
  height: 150px;
}
  .ss{
    margin-top:0.4rem ;
  }
</style>
