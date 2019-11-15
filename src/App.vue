<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive" class="Router" ></router-view>
      </keep-alive>
    </transition >
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"  class="Router" ></router-view>
    </transition >
    <Play></Play>
  </div>
</template>

<script>import Play from './components/play'
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    Play
  },
  watch: {
    '$route' (to, from) {
      // console.log('变化了')
      // 切换动画
      let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      if (isBack === true) {
        this.transitionName = 'slide-right'
        // from.meta.keepAlive = false
        // to.meta.keepAlive = true
      } else {
        // from.meta.keepAlive = true
        // to.meta.keepAlive = false
        // this.transitionName = 'slide-left'
        if (this.$route.path.split('/').length < 3) {
          this.transitionName = 'slide-fade'
        } else {
          this.transitionName = 'slide-left'
        }
      }
      this.$router.isBack = false
    }
  },
  // components: {
  //   Play
  // },
  computed: {

  }
}
</script>

<style>
.Router {
  font-family: Roboto, Lato, sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  transition: all .377s ease;
  box-sizing: border-box;
  overflow: auto;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
.ovf {
  overflow: hidden;
}
.center {
  width: 95%;
  margin: 0 auto;
  overflow-y: hidden;
}
li {
  list-style: none;
}
</style>
