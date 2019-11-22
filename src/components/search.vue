<!--搜索-->
<template>
  <div class="search">
    <mu-appbar style="width: 100%;" class="back-b" color="primary">
      <mu-button icon slot="left" @click="back">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <span class="name1">搜你想听</span>
    </mu-appbar>
    <mu-text-field
      label="你想听啥"
      label-float
      icon="search"
      v-model.trim="sse"
      ref="input"
      class="int"
    ></mu-text-field>
    <div class="sealist">
      <div class="sealist-item ovf" v-for="item in search1" :key="item.id" @click="go(item.id,item.name, item.artists[0].name,)">
          <div class="sealist-item1">
            <mu-button icon>
              <mu-icon value="search" size="22" color="black"></mu-icon>
            </mu-button>
          </div>
          <div class="sealist-item2">
            <mu-list-item-title class="name">{{item.name}}</mu-list-item-title>
            <mu-list-item-sub-title>{{item.artists[0].name}}</mu-list-item-sub-title>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

export default {
  name: 'search',
  components: {},
  data () {
    return {
      sse: '',
      search1: []
    }
  },
  computed: {},
  watch: {
    sse () {
      delay(() => {
        this.search()
      }, 500)
    }
  },
  methods: {
    go (id, name, sub) {
      this.$router.replace({
        name: 'song',
        params: {
          id: id,
          name1: name,
          sub: sub
        }
      })
    },
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    },
    search () {
      if (this.sse.length !== 0) {
        this.$axios
          .get([
            '/api/search?keywords=' + this.sse
          ])
          .then(response => {
            // success
            this.search1 = response.data.result.songs
          })
          .catch(error => {
            // error
            alert('失败！')
            console.log(error)
          })
      } else {
        this.search1 = ''
      }
    }
  }
}
</script>

<style  scoped>
  .name1{
    font-size: 18px;
    color: #fff;
  }
.search {
  margin-top: 18%;
}
.mu-input {
  width: 95%;
}
.back-b {
  position: fixed;
  max-width: 640px;
  z-index: 100;
  width: 100%;
  top: 0;
}
  .sealist{
    height:80%;
    overflow: auto;
  }
.sealist-item1 {
  float: left;
}
.sealist-item2 {
  width: 85%;
  float: right;
}
.sealist-item {
  width: 100%;
  margin: 12px 0;
}
.name {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.aa{
    width: 100%;
  }
</style>
