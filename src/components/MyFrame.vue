<template>
  <div class="app">

    <el-menu class="el-menu-vertical"
             background-color="#333744"
             text-color="#fff"
             active-text-color="#409Eff"
             :default-active="selectIndex"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <div class="logo-div el-menu-item">
        <!--@click="logoClick(!isCollapse)"-->
        <img src="../assets/app_logo.svg" alt="签到系统用户管理" class="logo">
        <span slot="title" style="font-weight: bold">签到系统用户管理</span>
      </div>

      <el-menu-item index="1" style="margin-top: 2vh" @click="isShow = 'MyMain'"
      >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="isShow = 'UserManagement'">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="6" @click="isShow = 'GroupManagement'">
        <i class="el-icon-menu"></i>
        <span slot="title">群组管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-flag"></i>
        <span slot="title">签到管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-platform"></i>
        <span slot="title">前端设置</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-s-help"></i>
        <span slot="title">管理员</span>
      </el-menu-item>
    </el-menu>

    <div class="main-container" :style="'margin-left:'+mainContainerLeft + 'px'">
      <MyNavbar />
      <div class="cps-main-container">
        <transition name="fade">
          <MyMain v-show="isShow === 'MyMain'" class="chc"/>
        </transition>
        <transition name="fade">
          <UserManagement v-show="isShow === 'UserManagement'" class="chc"/>
        </transition>
        <transition name="fade">
          <GroupManagement v-show="isShow === 'GroupManagement'" class="chc"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>


import MyMain from "./MyMain.vue";
import UserManagement from "./UserManagement.vue";
import GroupManagement from "./GroupManagement.vue";
import MyNavbar from "./MyNavbar.vue";

export default {
  name: "MyFrame",
  components: {
    MyMain,
    UserManagement,
    GroupManagement,
    MyNavbar
  },
  data() {
    return {
      isShow: 'MyMain',
      isCollapse: false,
      selectIndex: "1",
      mainContainerLeft: 200,
    };
  },

  mounted() {
    this.$bus.$on('isCollapse', data => {
      this.logoClick(data)
    })
  },


  methods: {
    logoClick(isCollapse) {
      this.isCollapse = isCollapse
      this.mainContainerLeft = this.isCollapse ? 64 : 200;
    },


    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {

      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  min-width: 800px;
  background: #424859;
  position: fixed;
  display: table;
  clear: both;
  overflow: hidden;
}


.main-container {
  min-height: 100vh;
  -webkit-transition: margin-left .38s;
  transition: margin-left .38s;
  position: relative;
}

.cps-main-container {
  width: 100%;
  min-height: calc(100vh - 64px);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.cps-main-container::-webkit-scrollbar {
  -webkit-appearance: none;
}

.cps-main-container::-webkit-scrollbar:vertical {
  width: 8px;
}

.cps-main-container::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid white;
  background-color: white;
}


.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical {
  min-height: 400px;
  height: 100vh;
  position: fixed;
  z-index: 1001;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}

.el-menu {
  border-right: 0;
}

.logo {
  height: 24px;
  width: 24px;
}

.logo-div {
  color: white !important;
  background: transparent !important;
}

.chc {
  position: absolute;
  padding: 20px;
  width: calc(100% - 40px);
}


/* 1.过渡动画 */
@keyframes fade {
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0px);
  }
}

.fade-enter-active {
  animation: fade .2s;
  transition: opacity .2s
}

.fade-leave-active {
  animation: fade .2s reverse;
  opacity: 0
}


</style>