<!--登录-->
<template>
  <div>
    <div class="log-b">
      <img src="../assets/images/logo.png" alt srcset class="logo animated bounceInDown">
    </div>
    <mu-container class="box">
      <mu-text-field v-model="ph"  type='tel' icon="phone" max-length="11" placeholder="请输入手机号"></mu-text-field>
      <mu-button color="primary" small round @click="getData" class="rezz">{{regtxt}}</mu-button>
      <br>
      <mu-text-field
        v-model="pass"
        class="pass"
        placeholder="请输入密码"
        icon="locked"
        :action-icon="visibility ? 'visibility_off' : 'visibility'"
        :action-click="() => (visibility = !visibility)"
        :type="visibility ? 'text' : 'password'"
      ></mu-text-field>
      <br>
      <mu-text-field
        v-model="rezcode"
        icon="comment"
        max-length="4"
        placeholder="验证码"
        class="rez"
      ></mu-text-field>
      <br>
      <div class="btn">
        <mu-button color="primary" @click="login" class="log">登&nbsp;录</mu-button>
      </div>
      <mu-snackbar :color="color.color" :open.sync="color.open">
        <mu-icon left :value="icon1"></mu-icon>
        {{color.message}}
      </mu-snackbar>
    </mu-container>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ph: '',
      pass: '',
      rezcode: '',
      regtxt: '发送验证码',
      visibility: false,
      color: {
        color: '',
        message: '',
        open: false,
        timeout: 3000
      }
    }
  },
  computed: {
    icon1 () {
      return {
        success: 'check_circle',
        info: 'info',
        warning: 'priority_high',
        error: 'warning'
      }[this.color.color]
    }
  },
  methods: {
    openColorSnackbar () {
      if (this.color.timer) clearTimeout(this.color.timer)
      this.color.open = true
      this.color.timer = setTimeout(() => {
        this.color.open = false
      }, this.color.timeout)
    },
    getData () {
      let timer = null
      var numReg = /^[0-9]+$/
      var numRe = new RegExp(numReg)
      if (this.ph.length === 11 && numRe.test(this.ph) && this.regtxt === '发送验证码') {
        this.$axios
          .get([
            '/api/captch/sent?phone=' + this.ph
          ])
          .then(response => {
            // success
            console.log(response.data)
            if (response.data.code === 200) {
              this.color.color = 'success'
              this.color.message = '发送验证码成功'
              this.openColorSnackbar()
            }
          })
          .catch(error => {
            // error
            console.log(error)
          })
        let i = 60
        timer = setInterval(() => {
          i--
          this.regtxt = '重新发送' + i + 's'
          if (i === 0) {
            clearInterval(timer)
            timer = null
            this.regtxt = '发送验证码'
          }
        }, 1000)
      } else {
        return false
      }
    },
    login () {
      if (
        this.ph.length === 11 &&
        this.rezcode.length === 4 &&
        this.pass.length !== 0
      ) {
        this.$axios
          .get([
            '/api/captch/verify?phone=' +
              this.ph +
              '&captcha=' +
              this.rezcode
          ])
          .then(response => {
            // success
            if (response.data.code === 200) {
              this.$axios
                .get([
                  '/api/login/cellphone?phone=' + this.ph +
                    '&password=' +
                    this.pass
                ])
                .then(response => {
                  // success
                  if (response.statusText === 'OK') {
                    this.color.color = 'success'
                    this.color.message = '登录成功'
                    this.openColorSnackbar()
                    localStorage.setItem(
                      'user',
                      response.data.account.id
                    )
                    this.$router.push('/index')
                  }
                })
                .catch(error => {
                  // error
                  this.color.color = 'warning'
                  this.color.message = '登录失败'
                  this.openColorSnackbar()
                  // alert('失败')
                  console.log(error)
                })
            }
          })
          .catch(error => {
            // error
            // alert('失败！')
            this.color.color = 'warning'
            this.color.message = '登录失败'
            this.openColorSnackbar()
            console.log(error)
          })
      } else {
        alert('请重新填写信息')
      }
    }
  }
}
</script>

<style scoped>
.box {
  margin-top: 15%;
}
.logo{
  width: 25%;
}
.mu-button {
  line-height: 8px;
  vertical-align: middle;
}
.log-b{
  text-align: center;
  margin-top:26% ;
}
.btn {
  text-align: center;
}
.log{
  text-align: center;
  font-size: 16px;
}
.mu-input{
  width:70%;
}
.rez, .pass,
.name {
  width: 100%;
}
.mu-input-help {
  display: none !important;
}
.rezz{
  width: 28%;
  float: right;
  margin-top:5px ;
  line-height: 16px;
}
</style>
