<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners"
               :modal-append-to-body="false"
               @open="onOpen" @close="onClose" title="编辑小组">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">


        <el-form-item label="组名">
          <el-input v-model="formData.groupName" placeholder="请输入组名" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="组介绍">
          <el-input v-model="formData.groupIntroduce" type="textarea" placeholder="请输入组介绍" :maxlength="200"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="组类型">
          <el-select v-model="formData.groupType" placeholder="请选择组类型" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in fieldGradeOptions" :key="index" :label="item.label"
                       :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改图片">
          <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :auto-upload="true"
              :before-upload="beforeAvatarUpload">
            <img v-if="image_url" :src="image_url" class="up_data_avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon-up-data"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {Message} from "element-ui";
import {getToken} from "@/utils/auth";
import {BASE_ADDRESS} from "@/config";
import {requestCallback} from "@/utils/request/servies";
import {getGroupType, rootAllUserEdit} from "@/api/all-api";

export default {
  name: "MyEditGroupDialog",
  inheritAttrs: false,
  components: {},
  props: {
    tableData: {
      type: undefined,
      default: undefined
    }
  },
  data() {
    return {
      image_url: undefined,
      file_raw: undefined,
      token: getToken(),
      baseAddress: BASE_ADDRESS,
      formData: {
        groupName: undefined,
        groupIntroduce: undefined,
        groupType: undefined,
        groupImg: undefined,
      },
      rules: {
        groupName: [],
        groupIntroduce: [],
        groupType: []
      },
      fieldGradeOptions: [{
        "label": "课堂组",
        "value": "课堂组"
      }, {
        "label": "会议组",
        "value": "会议组"
      }, {
        "label": "培训组",
        "value": "培训组"
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      this.formData.groupName = this.tableData.groupName
      this.formData.groupIntroduce = this.tableData.groupIntroduce
      this.formData.groupType = this.tableData.groupType
      this.image_url = this.baseAddress + this.tableData.groupImg + '?token=' + this.token
      this.getGroupType()
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      this.file_raw = undefined
      this.image_url = undefined
    },
    close() {
      this.file_raw = undefined
      this.image_url = undefined
      this.$emit('update:visible', false)
    },

    getGroupType() {
      requestCallback(getGroupType(), (data) => {
        const result = data.result
        let arr = Array()
        for (let i = 0; i < result.length; i++) {
          arr.push({
            "label": result[i],
            "value": result[i]
          })
        }
        this.fieldGradeOptions = arr
      })
    },

    /*选择文件*/
    beforeUpload(up_type, max_size, file, success, error = null) {
      let isType = false;
      up_type.forEach(function (v) {
        if (file.type === v) {
          isType = true
        }
      })
      const isLtSize = file.size / 1024 / 1024 < max_size
      if (!isType) {
        Message({
          type: "warning",
          message: "上传格式暂不支持!",
          center: true
        })
        if (error != null)
          error(file, '上传格式暂不支持!')
        return false
      }
      if (!isLtSize) {
        Message({
          type: "warning",
          message: `上传文件大小不能超过 ${max_size}MB!`,
          center: true
        })
        if (error != null)
          error(file, `上传文件大小不能超过 ${max_size}MB!`)
        return false
      }
      success(file)
      return true
    },

    beforeAvatarUpload(file) {
      const _this = this
      _this.beforeUpload(['image/jpeg', 'image/png', 'image/webp'], 10, file, function () {
        _this.file_raw = file
        _this.image_url = window.URL.createObjectURL(file)
      })
    },

    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
            if (!valid) return
            // 修改
            const loading = this.$loading({
              lock: true,
              text: '修改中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            requestCallback(rootAllUserEdit(
                {
                  userId: this.tableData.id,
                  userPassword: (this.formData.userPassword === undefined || this.formData.userPassword == null || this.formData.userPassword === '') ? '' : this.formData.userPassword,
                  userSex: this.formData.userSex,
                  userNickname: this.formData.userNickname,
                  userUnit: this.formData.userUnit,
                  userBirth: this.formData.userBirth,
                  userIntroduce: this.formData.userIntroduce,
                  userGrade: this.formData.userGrade,
                  userLimit: this.formData.userLimit,
                  userImage: (this.file_raw === undefined || this.file_raw == null || this.file_raw === '') ? '' : this.file_raw,
                }
            ), () => {
              loading.close()
              this.$bus.$emit("isRefresh", true)
              Message({
                type: "success",
                message: "修改完成",
                center: true
              })
              this.file_raw = undefined
            }, (v,t) => {
              if (t){
                this.$bus.$emit("isShowLogin", true)
                return
              }
              loading.close()
            })
            this.close()
          }
      )
    },
  }
}

</script>
<style scoped>


.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #5197d8;
}

.avatar-uploader-icon-up-data {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.up_data_avatar {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
  position: relative;
}


</style>
