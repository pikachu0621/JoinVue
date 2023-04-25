<template>
  <div class="login">
    <el-card class="box-card">


      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title" style="color: white">考勤APP后台管理系统</h3>

        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号">
          </el-input>
        </el-form-item>


        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码">
          </el-input>
        </el-form-item>


        <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">记住密码</el-checkbox>

        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%; margin-top: 30px; height: 45px"
              @click="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>


import {isNullOrUndefined} from "@/utils/echarts-utils";
import {rootLogin} from "@/api/all-api";
import {removeToken, setToken} from "@/utils/auth";
import {requestCallback} from "@/utils/request/servies";

export default {
  name: "MyLogin",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "请输入您的账号"}
        ],
        password: [
          {required: true, trigger: "blur", message: "请输入您的密码"}
        ]
      },
      loading: false
    };
  },

  methods: {
    handleLogin() {
      if (isNullOrUndefined(this.loginForm.username, this.loginForm.password)) return
      this.loading = true
      requestCallback(rootLogin(this.loginForm.username, this.loginForm.password),(data) => {
        this.loading = false
        setToken(data.result.loginToken)
        console.log("-----------  ok")
        this.$bus.$emit("isShowLogin", false)
      }, () => {
        removeToken()
        this.loading = false
        console.log("----------- error")
        this.$bus.$emit("isShowLogin", true)
      }, false)
    }
  }
};
</script>

<style scoped>
/* background-image: url("../assets/images/login-background.jpg");*/
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #3b4153;
  background-size: cover;
}


.el-card {
  width: 400px;
  padding: 50px 35px 10px 35px;
  border-radius: 6px;
  border: 1px solid #4f5870;
  background-color: #424859;
  color: #FFF;
  transition: .3s;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

/*
/deep/ .el-input__inner {
  background-color: #4f5870;
  border: 1px solid #DCDFE6;
  color: white;
}

/deep/ .el-checkbox__inner {
  border: 1px solid #4f5870;
  background-color: #424859;
}
*/

</style>
