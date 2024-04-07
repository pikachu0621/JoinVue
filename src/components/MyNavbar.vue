<template>
  <div class="navbar">
    <i :class="icon+' container'" @click="navbarClick"></i>
    <el-dropdown style="float: right;" @command="handleCommand">
      <div>
        <div class="user-avatar">
          <img :src=" baseAddress + userImage +'&token=' + token " alt=""/>
        </div>
        <span class="container" style="font-size: 12px">{{userNickname}}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">退出登录</el-dropdown-item>
        <el-dropdown-item command="b">管理员设置</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import MyFrame from "./MyFrame.vue";
import {BASE_ADDRESS} from "@/config";
import {getToken, removeToken} from "@/utils/auth";

export default {
  name: "MyNavbar",

  data() {
    return {
      icon: "el-icon-s-fold", //el-icon-s-unfold
      isCollapse: !MyFrame.data().isCollapse,
      baseAddress: BASE_ADDRESS,
      visibleEditUserDialog: false,
      token: getToken(),
      userImage: undefined,
      userNickname: undefined
    }
  },
  mounted() {
    this.$bus.$on('userDataNav', data => {
      this.userImage = data.userImg
      this.userNickname = data.userAccount
    })
  },
  methods: {
    navbarClick() {
      this.isCollapse = !this.isCollapse
      this.$bus.$emit("isCollapse", !this.isCollapse);
      this.icon = this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold"
    },
    handleCommand(command) {
      if (command === "a") {
        removeToken()
        this.$bus.$emit("isShowLogin", true)
      }
    }
  }

}
</script>

<style scoped>


.user-avatar {
  cursor: pointer;
  padding: 12px 12px;
  float: right;
}

.user-avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.container {
  line-height: 64px;
  height: 100%;
  float: left;
  cursor: pointer;
  padding: 0 32px;
  -webkit-transition: background .3s;
  transition: background .3s;
  -webkit-tap-highlight-color: transparent;
}

.container:hover,
.user-avatar:hover {
  background: #384757;
}

.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  -webkit-text-fill-color: white;
  background: #424859;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>