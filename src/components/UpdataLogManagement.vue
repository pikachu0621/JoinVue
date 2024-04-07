<template>
  <div class="block" style="width: 100%; height: 90%">
    <el-empty description="获取失败" v-show="!isNull" style="width: 100%; height: 90%" image="el-icon-loading">
      <el-button type="primary" @click="loadLogs">重新加载</el-button>
    </el-empty>
    <el-row v-show="isNull" :gutter="40">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="col">
        <a href="https://github.com/pikachu0621/JoinSpring"><h2>Join - SpringBoot</h2></a>
        <el-empty description="获取失败" v-show="itemsForSpringBoot.length <= 0" style="width: 100%; height: 80%" image="#">
          <i class="el-icon-question"></i>
          <el-button type="primary" @click="loadForSpring">重新加载</el-button>
        </el-empty>
        <el-timeline v-show="itemsForSpringBoot.length > 0">
          <el-timeline-item v-for="(item, index) in itemsForSpringBoot" :timestamp="formDate(item.commit.author.date)" placement="top"
                            :key="index">
            <el-card>
              <h4>{{ item.commit.message }}</h4>
              <div class="logMore">
                <a href="https://github.com/pikachu0621" target="_blank">
                  <img
                      :src=" item.author == null ? 'https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=32' : item.author.avatar_url + '&size=32'"
                      alt=""/>
                </a>
                <p>{{ item.commit.author.name }}
                  <a :href="item.html_url" target="_blank">代码更新对比</a>
                </p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <a href="https://github.com/pikachu0621/JoinSpring"><h2>Join - Android</h2></a>
        <el-empty description="获取失败" v-show="itemsForAndroid.length <= 0" style="width: 100%; height: 80%" class="el-icon-delete" image="#">
          <el-button type="primary" @click="loadForAndroid">重新加载</el-button>
        </el-empty>
        <el-timeline v-show="itemsForAndroid.length > 0">
          <el-timeline-item v-for="(item, index) in itemsForAndroid" :timestamp="formDate(item.commit.author.date)" placement="top"
                            :key="index">
            <el-card>
              <h4>{{ item.commit.message }}</h4>
              <div class="logMore">
                <a href="https://github.com/pikachu0621" target="_blank">
                  <img
                      :src=" item.author == null ? 'https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=32' : item.author.avatar_url + '&size=32'"
                      alt=""/>
                </a>
                <p>{{ item.commit.author.name }}
                  <a :href="item.html_url" target="_blank">代码更新对比</a>
                </p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <a href="https://github.com/pikachu0621/JoinSpring"><h2>Join - Vue</h2></a>
        <el-empty description="获取失败" v-show="itemsForVue.length <= 0" style="width: 100%; height: 80%"  class="el-icon-delete" image="#">
          <el-button type="primary" @click="loadForVue">重新加载</el-button>
        </el-empty>
        <el-timeline v-show="itemsForVue.length > 0">
            <el-timeline-item v-for="(item, index) in itemsForVue" :timestamp="formDate(item.commit.author.date)" placement="top"
                              :key="index">
              <el-card>
                <h4>{{ item.commit.message }}</h4>
                <div class="logMore">
                  <a href="https://github.com/pikachu0621" target="_blank">
                    <img
                        :src=" item.author == null ? 'https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=32' : item.author.avatar_url + '&size=32'"
                        alt=""/>
                  </a>
                  <p>{{ item.commit.author.name }}
                    <a :href="item.html_url" target="_blank">代码更新对比</a>
                  </p>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {getLogs} from "@/api/all-api";

export default {
  name: "UpdataLogManagement",
  components: {},
  data() {
    return {
      itemsForSpringBoot: [],
      itemsForAndroid: [],
      itemsForVue: [],
      isNull: true
    }
  },
  mounted() {
    this.loadLogs()
  },
  methods: {
    loadLogs(){
      this.loadForSpring()
      this.loadForAndroid()
      this.loadForVue()
    },
    loadForSpring(){
      getLogs().then((res) => {
        this.itemsForSpringBoot = res.data
        this.isEcNull()
      }).catch(() => {
        this.itemsForSpringBoot = []
        this.isEcNull()
      })
    },
    loadForAndroid(){
      getLogs('JoinAndroid').then((res) => {
        this.itemsForAndroid = res.data
        this.isEcNull()
      }).catch(() => {
        this.itemsForAndroid = []
        this.isEcNull()
      })
    },
    loadForVue() {
      getLogs('JoinVue').then((res) => {
        this.itemsForVue = res.data
        this.isEcNull()
      }).catch(() => {
        this.itemsForVue = []
        this.isEcNull()
      })
    },
    formDate(originalTimeString) {
      return new Date(originalTimeString).toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'});
    },
    isEcNull(){
      this.isNull = this.itemsForSpringBoot.length > 0 || this.itemsForAndroid.length > 0 || this.itemsForVue.length > 0
    }
  }
}
</script>

<style scoped>


.logMore {
  margin-top: 20px;
  display: flex;
}

.logMore img {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.logMore p {
  display: inline-block;
  margin-left: 10px;
}

.logMore a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
}

h1,h2,h3,h4{
  color: white;
  margin-bottom: 40px;
}


</style>