<!--电台详情-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div>
          <marquee :lists="name"></marquee>
        </div>
      </mu-appbar>
      <div class="center">
        <mu-list>
          <mu-list-item v-for="(item,index) in list" :key="item.id" class="item">
            <router-link :to="{name: 'djplay',params: { id: item.mainSong.id,name1:item.name, src:item.coverUrl}}" class="aa">
              <mu-list-item-content>
                <mu-list-item-title class="title">
                  <span class="index">{{index+1}}</span>
                  <span class="tite">{{item.name}}</span>
                </mu-list-item-title>
              </mu-list-item-content>
            </router-link>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>import marquee from './marquee'
export default {
  name: 'djxq',
  components: {
    marquee
  },
  data () {
    return {
      isloading: false,
      list: [],
      name: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    get () {
      var arr = []
      this.isloading = true
      this.$axios
        .get([
          '/api/dj/program?rid=' +
          this.$route.params.id
        ])
        .then(response => {
          // success
          this.list = response.data.programs
          this.list.forEach((val, i) => {
            var obj = {}
            obj.id = this.list[i].mainSong.id
            obj.name = this.list[i].name
            obj.src = this.list[i].coverUrl
            arr.push(obj)
          })
          this.$store.commit('playlist', arr)
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
    this.name = this.$route.params.name1
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
        vm.src = vm.$route.params.src
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
    margin-right: 10px;
    color: #999;
  }
  .item {
    margin:10px 0;
  }
  .sub {
    font-size: 14px;
    margin-top:10px;
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
</style>
