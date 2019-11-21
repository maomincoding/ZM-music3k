<!--歌单详情-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="name">{{name}}</span>
      </mu-appbar>
      <div class="center">
        <mu-list>
          <mu-list-item v-for="(item,index) in list" :key="item.id" class="item">
            <router-link :to="{name: 'song',params: { id: item.id,name1:item.name,sub:item.ar[0].name}}" class="aa" >
              <mu-list-item-content>
                <mu-list-item-title class="title">
                  <span class="index">{{index+1}}</span>
                  <span class="tite">{{item.name}}</span>
                </mu-list-item-title>
                <mu-list-item-sub-title class="sub">{{item.ar[0].name}}——{{item.al.name}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </router-link>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playListDetail',
  components: {},
  data () {
    return {
      isloading: false,
      list: [],
      name: ''
    }
  },
  watch: {},
  methods: {
    get () {
      this.isloading = true
      this.$axios
        .get([
          '/api/playlist/detail?id=' +
            this.$route.params.id
        ])
        .then(response => {
          // success
          this.name = response.data.playlist.name
          this.list = response.data.playlist.tracks
          // console.log(response.data.playlist.tracks)
          this.$store.commit('playlist', response.data.playlist.tracks)
          this.isloading = false
        })
        .catch(error => {
          // error
          alert('失败！')
          console.log(error)
        })
    },
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    }
  },
  created () {
    this.$store.commit('playlist', '')
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
.aa {
  width: 100%;
}
.center {
  margin-top: 15%;
}
.icon {
  display: block !important;
  margin: 75% auto 0;
}
.index {
  font-size: 16px;
  font-weight: bold;
  margin-right:10px;
  color: #999;
}
.item {
  margin: 5px 0;
  padding: 10px 0;
}
.sub {
  font-size: 14px;
  margin-top:8px;
}
.back {
  padding: 10px 0 10px 10px;
}
.tite {
  color: #333;
}
.back-b {
  position: fixed;
  z-index: 100;
  width: 100%;
  max-width: 640px;
  top: 0;
}
  .name{
    font-size: 18px;
  }
</style>
