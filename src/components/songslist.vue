<!--歌单-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="ttt">歌单</span>
      </mu-appbar>
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <div class="tjgd-b ovf">
        <div v-for="(item,index) in tjgd" :key="index">
          <router-link :to="{name: 'playListDetail',params: { id: item.id}}">
            <img :src="item.coverImgUrl" alt>
            <p>{{item.name}}</p>
          </router-link>
        </div>
      </div>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songslist',
  data () {
    return {
      isloading: false,
      tjgd: [],
      num: 27,
      refreshing: false,
      loading: false,
      text: 'List'
    }
  },
  methods: {
    refresh () {
      this.refreshing = true
      this.$refs.container.scrollTop = 0
      setTimeout(() => {
        this.refreshing = false
        // this.text = this.text === 'List' ? 'Menu' : 'List'
        this.loading = false
        this.$axios.get(['/api/top/playlist?limit=' + this.num + '&order=hot']).then(response => {
          // success
          console.log(response.data.playlists)
          this.tjgd = response.data.playlists
          this.isloading = false
        }).catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
        // this.get()
      }, 500)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.num += 3
        this.$axios.get(['/api/top/playlist?limit=' + this.num + '&order=hot']).then(response => {
          // success
          console.log(response.data.playlists)
          this.tjgd = response.data.playlists
          this.isloading = false
        }).catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
      }, 500)
    },
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    },
    get () {
      this.isloading = true
      this.$axios.get(['/api/top/playlist?limit=27&order=hot']).then(response => {
        // success
        console.log(response.data.playlists)
        this.tjgd = response.data.playlists
        this.isloading = false
      }).catch(error => {
        // error
        alert('失败！')
        console.log(error)
      })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style  scoped>
  .ttt{
    font-size: 18px;
  }
  .icon {
    display: block !important;
    margin: 75% auto 0;
  }
  .tjgd-b{
    width: 95%;
    margin: 0 auto;
    margin-top:18%;
  }
  mu-list-item-action img{
    width: 10% !important;
  }
  .back-b{
    position: fixed;
    z-index: 100;
    width: 100%;
    max-width: 640px;
    top:0;
  }
  .tjgd-b div{
    float: left;
    width: 33.3%;
    margin-bottom:20px;
    box-sizing: border-box;
    text-align: center;
  }
  .tjgd-b p {
    width: 95%;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tjgd-b img{
    width: 80%;
    height:99.89px;
    border-radius: 8px;
    object-fit: cover;
  }
</style>
