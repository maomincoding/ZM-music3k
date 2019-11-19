<!--新碟-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="ttt">专辑</span>
      </mu-appbar>
      <div class="center lls">
        <div v-for="(item,index) in list" :key="index" class="listb ovf">
          <router-link :to="{name: 'song',params: { id: item.id,name1: item.name}}" class="aa">
            <div class="listb1"><img :src="item.al.picUrl" alt="" class="lisimg"></div>
            <div class="listb2">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-sub-title>{{item.ar[0].name}}</mu-list-item-sub-title>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newd',
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
      this.isloading = true
      this.$axios
        .get(['/api/album?id=' + this.$route.params.id])
        .then(response => {
          // success
          this.list = response.data.songs
          this.isloading = false
        }).catch(error => {
        // error
          alert('失败！')
          console.log(error)
        })
    }
  },
  // 解除keep-alive的缓存
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 根据传过来的ID是否一样，判断加载
      if (parseInt(to.params.id) !== parseInt(vm.id)) {
        vm.get()
      }
      // 判断过来的路由是否带有对应的参数信息
      if (to.params.id) {
        // 获取songList传入的数据
        vm.name = vm.$route.params.name
        vm.id = vm.$route.params.id
      }
    })
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
