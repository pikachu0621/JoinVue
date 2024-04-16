<template>
  <div>
    <div style="margin-top: 10px"></div>
    <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
    <el-button type="success" size="small" icon="el-icon-refresh-left" @click="refreshData(true)">刷新</el-button>

    <el-table
        :data="tableData"
        style="width: 100%">

      <el-table-column
          width="40%"
          align="center"
          label="ID"
          prop="id">
      </el-table-column>

      <el-table-column
          label="用户账号"
          align="center"
          prop="userAccount">
      </el-table-column>

      <el-table-column
          label="用户头像"
          align="center"
          prop="userImg">
        <template v-slot="scope">
          <el-image
              style="width: 26px; height: 26px; border-radius: 13px"
              :src="addTokenGet(baseAddress + scope.row.userImg)"
              :preview-src-list="previewSrcList">
          </el-image>
        </template>
      </el-table-column>


      <el-table-column
          align="center"
          label="用户性别">
        <template v-slot="scope">
          <el-tag effect="light" size="small" :color="scope.row.userSex ? '#3a78bf' : '#b23abf'">
            <span style="color: white">{{ scope.row.userSex ? '男' : '女' }}</span></el-tag>
        </template>
      </el-table-column>


      <el-table-column
          align="center"
          label="用户昵称"
          prop="userNickname">
      </el-table-column>

      <el-table-column
          align="center"
          label="用户学校"
          prop="userUnit">
      </el-table-column>


      <el-table-column
          label="用户日期"
          align="center"
          prop="userBirth">
      </el-table-column>


      <el-table-column
          label="用户年龄"
          align="center"
          prop="userAge">
      </el-table-column>


      <el-table-column
          label="用户简介"
          width="100%"
          :show-overflow-tooltip="true"
          align="center"
          prop="userIntroduce">
      </el-table-column>


      <el-table-column
          label="用户等级"
          width="100%"
          :show-overflow-tooltip="true"
          align="center">
        <template v-slot="scope">
          <el-tag effect="light" size="small"
                  :color="scope.row.userGrade === 2 ? '#bf763a' : scope.row.userGrade === 1 ? '#60bf3a' : '#3abfb5'">
            <span style="color: white">{{
                scope.row.userGrade === 2 ? 'ROOT' : scope.row.userGrade === 1 ? '管理员' : '普通用户'
              }}</span></el-tag>
        </template>
      </el-table-column>

      <el-table-column
          width="100%"
          :show-overflow-tooltip="true"
          align="center"
          label="用户拉黑">
        <template v-slot="scope">
          <el-switch
              @change="userLimit(scope.row.id, scope.row.userLimit)"
              v-model="scope.row.userLimit"
                     active-color="#ff4949"
                     inactive-color="#13ce66">

          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
          width="200px"
          :show-overflow-tooltip="true"
          align="right">
        <template slot="header" slot-scope="{}">
          <el-input
              v-model="search"
              size="mini"
              style="color: white"
              placeholder="输入关键字"/>
        </template>


        <template v-slot="scope">

          <el-button type="success"
                     size="small"
                     icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>

          <el-button type="danger"
                     size="small"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)">删除
          </el-button>


        </template>
      </el-table-column>
    </el-table>
    <MyEditUserDialog :visible.sync="visibleEditDialog" :table-data="clickTimeRow"/>
  </div>
</template>

<script>
import {requestCallback} from "@/utils/request/servies";
import {rootAllUser, rootAllUserDel, rootAllUserEdit} from "@/api/all-api";
import {Message} from "element-ui";
import {addTokenGet, getToken} from "@/utils/auth";
import {BASE_ADDRESS} from '@/config'
import MyEditUserDialog from "./MyEditUserDialog.vue";

export default {
  name: "UserManagement",
  components: {
    MyEditUserDialog
  },


  data() {
    return {
      tableData: undefined,
      search: '',
      token: getToken(),
      baseAddress: BASE_ADDRESS,
      visibleEditDialog: false,
      clickTimeRow: undefined,
      previewSrcList: []
    }
  },
  mounted() {
    this.refreshData()
    this.$bus.$on('isRefresh', () => {
      this.refreshData()
    })
  },

  methods: {
    addTokenGet,

    loadImage(t) {
      t.forEach(v => {
        this.previewSrcList.push(addTokenGet(this.baseAddress + v.userImg ))
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.clickTimeRow = row
      this.visibleEditDialog = true
    },
    handleDelete(row) {
      this.$confirm(`是否删除${row.userAccount}用户`, '删除此用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '修改中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        requestCallback(rootAllUserDel(row.id), () => {
          this.refreshData()
          loading.close()
          Message({
            type: "success",
            message: "删除完成",
            center: true
          })
        }, (v,t) => {
          if (t){
            this.$bus.$emit("isShowLogin", true)
            return
          }
          loading.close()
          this.refreshData()
        })
      }).catch(() => {})
    },
    userLimit(userId, isLimit){
       const loading = this.$loading({
        lock: true,
        text: '修改中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      requestCallback(rootAllUserEdit(
          {
            userId: userId,
            userLimit: isLimit,
          }
      ), () => {
        this.refreshData()
        loading.close()
        Message({
          type: "success",
          message: "修改完成",
          center: true
        })
      }, (v,t) => {
        if (t){
          this.$bus.$emit("isShowLogin", true)
          return
        }
        loading.close()
        this.refreshData()
      })
    },
    refreshData(isShowMsg = false) {
      requestCallback(rootAllUser(), (data) => {
        this.tableData = data.result
        this.loadImage(data.result)
        if (isShowMsg) {
          Message({
            type: "success",
            message: "刷新完成",
            center: true
          })
        }
      }, (v,t) => {
        if (t) this.$bus.$emit("isShowLogin", true)
      })
    }
  }
}
</script>

<style scoped>

.el-table {
  width: 100%;
  border: 0;
  margin-top: 10px;
  color: white;
  background: transparent;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: '';
  position: absolute;
  background-color: transparent;
  z-index: 1;
}


/deep/ .el-table th {
  background: #3b4153;
}

/deep/ .el-table tr {
  background: #424859;
}

/deep/ .el-table td, /deep/ .el-table th.is-leaf {
  border-bottom: 1px solid #3b4153;
}


/deep/ tr:hover > td {
  background-color: #3b4153 !important;
}


</style>