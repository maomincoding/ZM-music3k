import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: pather => require(['../components/login.vue'], pather),
      meta: {
        title: '登录',
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: pather => require(['../components/index.vue'], pather),
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/playListDetail/:id',
      name: 'playListDetail',
      component: pather => require(['../components/playListDetail.vue'], pather),
      meta: {
        title: '歌单详情',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/djxq/:id/:name1',
      name: 'djxq',
      component: pather => require(['../components/djxq.vue'], pather),
      meta: {
        title: '电台详情',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/newsong/',
      name: 'newsong',
      component: pather => require(['../components/newsong.vue'], pather),
      meta: {
        title: '推荐新音乐',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/songslist/',
      name: 'songslist',
      component: pather => require(['../components/songslist.vue'], pather),
      meta: {
        title: '歌单',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/rank/',
      name: 'rank',
      component: pather => require(['../components/rank.vue'], pather),
      meta: {
        title: '排行榜',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/dj/',
      name: 'dj',
      component: pather => require(['../components/dj.vue'], pather),
      meta: {
        title: '电台',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/newd/:id/:name1',
      name: 'newd',
      component: pather => require(['../components/newd.vue'], pather),
      meta: {
        title: '新碟',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/bfjl/',
      name: 'bfjl',
      component: pather => require(['../components/bfjl.vue'], pather),
      meta: {
        title: '最近播放',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/search/',
      name: 'search',
      component: pather => require(['../components/search.vue'], pather),
      meta: {
        title: '搜索',
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/song/:id/:name1/:sub/',
      name: 'song',
      component: pather => require(['../components/song.vue'], pather),
      meta: {
        title: '歌曲',
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/djplay/:id/:name1/:src',
      name: 'djplay',
      component: pather => require(['../components/djplay.vue'], pather),
      meta: {
        title: '电台播放',
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/mv/:id/:name1',
      name: 'mv',
      component: pather => require(['../components/mv.vue'], pather),
      meta: {
        title: 'mv',
        keepAlive: false,
        isBack: false
      }
    }
  ],
  mode: 'history'
})
