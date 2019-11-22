<!--推荐新音乐-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="ttt">每日推荐</span>
      </mu-appbar>
      <div class="center lls">
        <div v-for="item in list" :key="item.id" class="listb ovf">
           <router-link :to="{name: 'song',params: { id: item.id,name1:item.name, sub:item.artists[0].name}}" class="aa" >
          <div class="listb1"><img :src="item.album.picUrl" alt="" class="lisimg"></div>
          <div class="listb2">
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
            <mu-list-item-sub-title>{{item.artists[0].name}}</mu-list-item-sub-title>
          </div>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsong',
  components: {},
  data () {
    return {
      isloading: false,
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    },
    get () {
      var arr = []
      this.isloading = true
      this.$axios.get(['/api/recommend/songs']).then(response => {
        // success
        this.list = response.data.recommend
        this.list.forEach((val, i) => {
          var obj = {}
          obj.id = this.list[i].id
          obj.name = this.list[i].name
          obj.sub = this.list[i].artists[0].name
          arr.push(obj)
        })
        this.$store.commit('playlist', arr)
        this.isloading = false
      }).catch(error => {
        // error
        alert('失败！')
        console.log(error)
      })
    }
  },
  created () {
    this.$store.commit('playlist', '')
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
  .lls{
    margin-top:15%;
  }
  .lisimg{
    width: 100%;
    height: 46.31px;
    border-radius:4px;
    object-fit: cover;
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
  .listb{
    margin: 15px 0;
  }
  .listb1{
    float: left;
    width: 13%;
  }
  .listb2{
    float: left;
    margin-left:2%;
    width: 60%;
    color: #333;
  }
  .listb3{
    float: right;
  }
  .name{
    font-size: 16px;
    color: #333;
    line-height: 16px !important;
  }
  .gc{
    color: #666;
    font-size: 14px;
  }
</style>
