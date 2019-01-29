<template>
  <div class="login-wrapper">
     <div class="logo">
         <img src="../../../static/logo.png" alt="">
     </div>
     <div class="login-content">
         <div class="welcome">
             <img src="../../../static/text.png" alt="">
         </div>
         <div class="form">
             <div class="form-group">
                 <label for="username"><img src="../../../static/username.png" alt=""></label>
                 <input type="text" name="username" v-model="user.username">
             </div>
             <div class="form-group">
                 <label for="password"><img src="../../../static/psw.png" alt=""></label>
                 <input type="password" name="password" v-model="user.password">
             </div>
             <div class="w-icon w-icon-back-icon"></div>
         </div>
         <div class="btn" @click="login">Login</div>
     </div>
     <toast @closeToast="close" v-if="showToast" :text="text"></toast>
  </div>
</template>

<script>
import { requestLogin } from "@/api/index";
import Toast from '@/components/toast/toast';

export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      showToast : false,
      text:{
        tip: '用户名或密码错误'
      }
    };
  },
  components: {
    Toast
  },
  methods: {
    login() {
      if(this.user.username == "admin" && this.user.password == "Yum@1234"){
         let user = this.user;
         user.password = undefined;
         sessionStorage.setItem('user',JSON.stringify(user));
         this.$router.push({path:'/home'})
      } else {
        this.showToast = true;
      }
    },
    // 关闭toast
    close(){
        this.showToast = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  text-align: center;
  width: 100%;
  .logo {
    padding: 40px 0 30px 0;
    img {
      display: block;
      width: 200px;
      height: auto;
      margin: 0 auto;
    }
  }
  .login-content {
    width: 80%;
    margin: 0 auto;
    .welcome {
      width: 100%;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .form {
      margin: 30px 0;
      .form-group {
        width: 100%;
        border: 1px dashed rgba(240, 204, 146, 1);
        // border-image:linear-gradient( rgba(192,141,94, 1), rgba(240,204,146, 1)) 1 1;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        border-radius: 5px;
        label {
          flex: 0 0 60px;
          width: 60px;
          text-align: right;
          height: 36px;
          line-height: 36px;
          padding-right: 4px;
          border-right: 1px solid #dfb365;
          display: flex;
          align-items: center;
          margin-right: 10px;
          img {
            width: 24px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
        }
        input {
          flex: 1;
          height: 40px;
          outline: none;
          color: #dfb365;
          @include fontpx(36);
        }
      }
    }
    .btn {
      width: 100%;
      height: 50px;
      border-radius: 5px;
      background: #c28c5d;
      color: #fff;
      text-align: center;
      line-height: 50px;
      @include fontpx(36);
      font-weight: bold;
    }
  }
}
</style>


