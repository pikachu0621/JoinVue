<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="main" style="width: 100%; height: 400px"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div id="main1" style="width: 100%; height: 400px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="main2" style="width: 100%; height: 400px"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div id="main3" style="width: 100%; height: 400px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {initEcharts} from "@/utils/echarts-utils";

export default {
  name: "MyMain",
  data() {
    return {
      initEcharts: {
        m1: undefined,
        m2: undefined,
        m3: undefined,
        m4: undefined
      }
    }
  },
  methods: {
    drawChart() {
      if (this.initEcharts.m1 !== undefined) {
        this.initEcharts.m1.resize()
      } else {
        this.initEcharts.m1 = initEcharts("main", this.$echarts, {
          title: {
            text: "软件每日启动次数"
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['03-10', '03-11', '03-12', '03-13', '03-14', '03-15', '03-16']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [230, 330, 332, 410, 435, 247, 600],
              type: 'line',
              markLine: {
                data: [{type: 'average', name: ''}]
              }
            }
          ]
        })
      }
      if (this.initEcharts.m2 !== undefined) {
        this.initEcharts.m2.resize()
      } else {
        this.initEcharts.m2 = initEcharts("main1", this.$echarts, {
          backgroundColor: '#2c343c',
          title: {
            text: '软件用户画像',
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 335, name: '男'},
                {value: 310, name: '女'},
                {value: 274, name: '河南'},
                {value: 235, name: '老师'}
              ].sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#499a5c',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function () {
                return Math.random() * 200;
              }
            }
          ]
        })
      }
      if (this.initEcharts.m3 !== undefined) {
        this.initEcharts.m3.resize()
      } else {
        this.initEcharts.m3 = initEcharts("main2", this.$echarts, {
          title: {
            text: "软件崩溃次数"
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['03-10', '03-11', '03-12', '03-13', '03-14', '03-15', '03-16']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              areaStyle: {},
              data: [20, 10, 12, 10, 5, 6, 10],
              type: 'line',
              color: 'rgba(255,0,0,0.6)',
              markPoint: {
                data: [
                  {type: 'max', name: 'Max'},
                  {type: 'min', name: 'Min'}
                ]
              },
              markLine: {
                data: [{type: 'average', name: ''}]
              }
            }
          ]
        })
      }
      if (this.initEcharts.m4 !== undefined) {
        this.initEcharts.m4.resize()
      } else {
        this.initEcharts.m4 = initEcharts("main3", this.$echarts, {
          title: {
            text: "软件新增用户",
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: ['03-10', '03-11', '03-12', '03-13', '03-14', '03-15', '03-16'],
          },
          yAxis: {},
          series: [
            {
              name: "软件新增用户",
              type: "bar",
              data: [100, 150, 136, 110, 140, 180, 166],
              markLine: {
                data: [{type: 'average', name: ''}]
              }
            },
          ]
        })
      }
    }
  },
  mounted() {
    this.drawChart()
    window.onresize = () => {
      return (() => {
        this.drawChart()
      })()
    }
  }
}
</script>

<style scoped>

.el-card {
  border: 1px solid #4f5870;
  background-color: #424859;
  color: #FFF;
  transition: .3s;
}

.el-row {
  margin-bottom: 20px;
}
</style>