<!--MV-->
<template>
    <div class="box">
      <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <!--<span class="ttt">{{ttt}}</span>-->
        <div>
          <marquee :lists="ttt"></marquee>
        </div>
      </mu-appbar>
      <div class="video-b"><video class="video1" :src="arr1" controls autoplay="autoplay"></video></div>
      <mu-list textline="three-line" class="pllist" v-show="!isloading">
        <div class="ppl-t">评论</div>
        <div class="pl-box">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
        <div v-for="item in arr2" :key='item.index' class="ovf pl">
            <div class="pl-l"><img :src="item.user.avatarUrl" alt=""></div>
            <div class="pl-r">
              <div class="name">{{item.user.nickname}}</div>
              <div class="time">{{item.time|getdate}}</div>
              <div class="con">{{item.content}}</div>
            </div>
        </div>
          </mu-load-more>
        </div>
      </mu-list>
    </div>
</template>

<script>import marquee from './marquee'
export default {
  name: 'mv',
  components: {
    marquee
  },
  data () {
    return {
      arr1: '',
      arr2: [],
      time: [],
      ttt: '',
      num: 20,
      refreshing: false,
      loading: false,
      isloading: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
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
        this.$axios.get(['/api/comment/mv?id=' + this.$route.params.id] + '&limit=' + this.num)
          .then(response => {
            // success
            response.data.comments.forEach(function (value, index) {
            })
            this.arr2 = response.data.comments
          })
          .catch(error => {
            // error
            alert('失败！')
            console.log(error)
          })
      }, 500)
    },
    get () {
      this.isloading = true
      // mv
      this.arr1 = ''
      this.$axios.get(['/api/mv/detail?mvid=' + this.$route.params.id])
        .then(response => {
          // success
          let obj = response.data.data.brs
          var arr = []
          for (let i in obj) {
            arr.push(obj[i])
          }
          this.arr1 = arr[1]
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
      this.$axios.get(['/api/comment/mv?id=' + this.$route.params.id] + '&limit=40')
        .then(response => {
          // success
          response.data.comments.forEach(function (value, index) {
          })
          this.arr2 = response.data.comments
          this.isloading = false
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    }
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
  mounted () {
    this.get()
    this.$store.state.isshow = ''
    this.ttt = this.$route.params.name1
  },
  created () {
    this.ttt = this.$route.params.name1
  }
}
</script>

<style scoped>
  .box{
    padding-bottom: 0;
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
    height:100%;
    object-fit:cover;
  }
  .pl{
    width: 95%;
    margin: 10px auto;
    padding: 10px 0;
    border-bottom:1px solid #eaeaea ;
  }
  .pl-box{
    height:360px;
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
