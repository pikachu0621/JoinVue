<template>
  <div>
    <div style="margin-top: 10px"></div>
    <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
    <el-button type="success" size="small" icon="el-icon-refresh-left" @click="refreshData(true)">刷新</el-button>

    <!--    .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
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
          label="组创建者Id"
          align="center"
          prop="userId">
      </el-table-column>

      <el-table-column
          label="组图像"
          align="center"
          prop="userImg">
        <template v-slot="scope">
          <el-image
              style="width: 26px; height: 26px; border-radius: 4px"
              :src="baseAddress + scope.row.groupImg +'?token=' + token"
              :preview-src-list="previewSrcList">
          </el-image>
        </template>
      </el-table-column>


      <el-table-column
          align="center"
          label="组名字"
          prop="groupName">
      </el-table-column>

      <el-table-column
          label="组介绍"
          width="100%"
          :show-overflow-tooltip="true"
          align="center"
          prop="groupIntroduce">
      </el-table-column>


      <el-table-column
          align="center"
          label="组类型">
        <template v-slot="scope">
          <el-tag effect="light" size="small">{{ scope.row.groupType }}</el-tag>
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
    <MyEditGroupDialog :visible.sync="visibleEditDialog" :table-data="clickTimeRow"/>
  </div>
</template>

<script>
import {requestCallback} from "@/utils/request/servies";
import {rootAllGroup, rootAllGroupDel} from "@/api/all-api";
import {Message} from "element-ui";
import {getToken} from "@/utils/auth";
import {BASE_ADDRESS} from '@/utils/request/config'
import MyEditGroupDialog from "./MyEditGroupDialog.vue";

export default {
  name: "GroupManagement",
  components: {
    MyEditGroupDialog
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

    loadImage(t) {
      t.forEach(v => {
        this.previewSrcList.push(this.baseAddress + v.groupImg + '?token=' + this.token)
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.clickTimeRow = row
      this.visibleEditDialog = true
    },
    handleDelete(row) {
      this.$confirm(`是否删除名为 "${row.groupName}" 的小组`, '删除此小组', {
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
        requestCallback(rootAllGroupDel(row.id), () => {
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
      }).catch(() => {
      })
    },
    refreshData(isShowMsg = false) {
      requestCallback(rootAllGroup(), (data) => {
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