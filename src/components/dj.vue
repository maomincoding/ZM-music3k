<!--电台-->
<template>
  <div class="list">
    <mu-circular-progress :size="40" class="icon" v-if="isloading"/>
    <div v-show="!isloading">
      <mu-appbar style="width: 100%;" class="back-b" color="primary">
        <mu-button icon slot="left" @click="back">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <span class="ttt">电台</span>
      </mu-appbar>
      <div class="top">
      <mu-paper class="demo-paper" round :z-depth="1" @click="cli(index)" v-for="(item,index) in tjgd" :key="item.id">
        {{item.categoryName}}
      </mu-paper>
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" class="left1">
        <mu-list>
          <div class="tit">{{tits}}</div>
          <div class="listbox">
              <div v-for="(item,index) in tjgd1" :key="index">
                <router-link :to="{name: 'djxq',params: { id: item.id,name1:item.name}}">
                  <img :src="item.picUrl" alt>
                  <p>{{item.name}}</p>
                </router-link>
              </div>
          </div>
        </mu-list>
      </mu-drawer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dj',
  components: {},
  data () {
    return {
      isloading: false,
      tjgd: [],
      tjgd1: [],
      docked: false,
      open: false,
      position: 'left',
      tits: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.go(-1)
      this.$router.isBack = true
    },
    cli (index) {
      this.isloading = true
      this.open = !this.open
      this.tits = this.tjgd[index].categoryName
      this.tjgd1 = this.tjgd[index].radios
      this.isloading = false
    },
    get () {
      this.isloading = true
      this.$axios.get(['/api/dj/category/recommend']).then(response => {
        // success
        this.tjgd = response.data.data
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
  },
  beforeRouteLeave (to, from, next) {
    this.open = false
    next()
  }
}
</script>

<style  scoped>
  .ttt{
    font-size: 18px;
  }
  .listbox div{
    width: 66%;
    margin: 0 auto;
    margin-bottom:28px;
    box-sizing: border-box;
    text-align: center;
    border-radius:16px ;
    padding: 8px 0;
    box-shadow: 0 5px 50px #dcdcdc;
    /*box-shadow: 0px 0px 50px #dcdcdc;*/
  }
  .listbox p {
    width: 95%;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .listbox img{
    width: 99.89px;
    height: 99.89px;
    border-radius: 8px;
    object-fit: cover;
  }
  .tit {
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    margin-left: 5%;
    color: #333;
    margin:10px 0;
  }
  .top{
    margin-top:18%;
  }
  .demo-paper{
    font-size: 15px;
    width: 95%;
    margin: 15px auto;
    padding:15px;
  }
  .icon {
    display: block !important;
    margin: 75% auto 0;
  }
  .tjgd-b{
    margin-top:20px;
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
  mu-button{
    margin-right:0.8rem !important;
  }
</style>
