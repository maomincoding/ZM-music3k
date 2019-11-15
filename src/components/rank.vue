<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="name">{{titi}}</span>
      </mu-appbar>
      <mu-list class="item-b">
        <mu-list-item v-for="(item,index) in list" :key="item.id" class="item">
          <router-link :to="{name: 'song',params: { id: item.id,name1:item.name}}" class="aa">
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
</template>

<script>
export default {
  name: 'rank',
  components: {},
  data () {
    return {
      isloading: false,
      list: [],
      titi: ''
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
      this.$axios.get(['/api/top/list?idx=1']).then(response => {
        // success
        console.log(response.data.playlist.tracks)
        this.list = response.data.playlist.tracks
        this.titi = response.data.playlist.name
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
  .mu-list{
    margin-top:15%;
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
