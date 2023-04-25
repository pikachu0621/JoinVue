<template>
  <div id="#app">
    <MyLogin v-if="isShowLogin"/>
    <MyFrame v-else/>
  </div>
</template>



<style>

body {
  width: 100vw;
  height: 100vh;
  min-width: 800px;
  background: #424859;
  position: relative;
  display: table;
  clear: both;
}


</style>


<script>
import MyFrame from "./components/MyFrame.vue"
import MyLogin from "./components/MyLogin.vue"
import {getToken, removeToken} from "@/utils/auth";
import {rootInfo} from "@/api/all-api";
import {requestCallback} from "@/utils/request/servies";

export default {
  name: "App",
  components: {MyFrame, MyLogin},
  data() {
    return {
      isShowLogin : false,
      bus: undefined
    }
  },
  mounted() {
    this.$bus.$on('isShowLogin', data => {
      this.isShowLogin = data
      if (!this.isShowLogin) this.lon()
    })
    this.lon()
  },
  methods: {
    lon(){
      const token = getToken()
      console.log(">>>>>>>>>>>>>>>>>>>> "+ token)
      if ( token === null || token === undefined || token === '' || token === 'undefined') {
        this.isShowLogin = true
      } else {
        requestCallback(rootInfo(token), data => {
          this.isShowLogin = false
          this.$bus.$emit("userDataNav", data.result)
        }, () =>{
          removeToken()
          this.isShowLogin = true
        })
      }
    }
  }
}
</script>