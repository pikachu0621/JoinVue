<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners"
               :modal-append-to-body="false"
               @open="onOpen" @close="onClose" title="编辑用户">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="用户账号">
          <el-input v-model="formData.userAccount" placeholder="不可更改" readonly :disabled='true' clearable
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formData.userAge" placeholder="不可更改" readonly :disabled='true' clearable
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.userPassword" placeholder="请输入密码" clearable show-password
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.userSex" size="small">
            <el-radio-button v-for="(item, index) in fieldSexOptions" :key="index" :label="item.value"
                             :disabled="item.disabled" border>{{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="formData.userNickname" placeholder="请输入用户昵称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="单位组织">
          <el-input v-model="formData.userUnit" placeholder="请输入单位组织" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="formData.userBirth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '100%'}" placeholder="请选择出生日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="用户介绍">
          <el-input v-model="formData.userIntroduce" type="textarea" placeholder="请输入用户介绍" :maxlength="200"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="用户级别">
          <el-select v-model="formData.userGrade" placeholder="请选择用户级别" clearable :style="{width: '100%'}">
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

        <el-form-item label="拉黑">
          <el-switch v-model="formData.userLimit" active-color="#DE1D1D"></el-switch>
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
import {addTokenGet, getToken} from "@/utils/auth";
import {BASE_ADDRESS} from "@/config";
import {requestCallback} from "@/utils/request/servies";
import {rootAllUserEdit} from "@/api/all-api";

export default {
  name: "MyEditUserDialog",
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
        userAccount: undefined,
        userAge: undefined,
        userPassword: undefined,
        userSex: false,
        userNickname: undefined,
        userUnit: undefined,
        userBirth: undefined,
        userIntroduce: undefined,
        userGrade: 0,
        userLimit: false,
      },
      rules: {
        userAccount: [],
        userAge: [],
        userPassword: [],
        userSex: [],
        userNickname: [],
        userUnit: [],
        userBirth: [],
        userIntroduce: [],
        userGrade: [],
        userLimit: [],
      },
      fieldSexOptions: [{
        "label": "男",
        "value": true
      }, {
        "label": "女",
        "value": false
      }],
      fieldGradeOptions: [{
        "label": "普通用户",
        "value": 0
      }, {
        "label": "管理员",
        "value": 1
      }, {
        "label": "ROOT管理员",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    onOpen() {
      this.formData.userPassword = ""
      this.formData.userAccount = this.tableData.userAccount
      this.formData.userAge = this.tableData.userAge
      this.formData.userSex = this.tableData.userSex
      this.formData.userNickname = this.tableData.userNickname
      this.formData.userUnit = this.tableData.userUnit
      this.formData.userBirth = this.tableData.userBirth
      this.formData.userIntroduce = this.tableData.userIntroduce
      this.formData.userGrade = this.tableData.userGrade
      this.formData.userLimit = this.tableData.userLimit
      this.image_url = addTokenGet(this.baseAddress + this.tableData.userImg)
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
            requestCallback(rootAllUserEdit({
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
            }), () => {
              loading.close()
              this.$bus.$emit("isRefresh", true)
              Message({
                type: "success",
                message: "修改完成",
                center: true
              })
              this.file_raw = undefined
            }, (v, t) => {
              if (t) {
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
