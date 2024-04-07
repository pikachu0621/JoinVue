<template>
  <div>
    <el-card style="padding: 20px">
      <el-form ref="form" :model="form" label-width="20%" label-position="left">

        <el-form-item label="关闭前端API (危险操作)">
          <el-switch v-model="form.appIsRemove" active-color="#ff4949" inactive-color="#13ce66"></el-switch>
        </el-form-item>

        <el-form-item label="Android 包名">
          <el-input v-model="form.appPackageName"></el-input>
        </el-form-item>

        <el-form-item label="组类型">
          <draggable v-model="form.groupTypeArr" :options="{ animation: 200, handle: '.draggable' }" class="draggableType">
            <el-tag v-for="(tag) in form.groupTypeArr"
                    :key="tag"
                    closable
                    class="draggable"
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
          </draggable>
          <el-input
              class="input-new-tag"
              v-if="inputGroupTypeVisible"
              v-model="inputGroupTypeValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新类型</el-button>
        </el-form-item>


        <el-form-item label="图片过期加密密码">
          <el-input v-model="form.imagePassword"></el-input>
        </el-form-item>

        <el-form-item label="图片有效时长 （-1永久/单位秒）">
          <el-input-number v-model="form.imageTime" :min="-1" :max="1000" label="单位秒"></el-input-number>
        </el-form-item>

        <el-form-item label="图片上传大小（单位mb）">
          <el-input-number v-model="form.imageSize" :min="1" :max="1000" label="单位mb"></el-input-number>
        </el-form-item>

        <el-form-item label="token加盐">
          <el-input v-model="form.tokenSalt"></el-input>
        </el-form-item>

        <el-form-item label="token有效时长（-1永久/单位秒）">
          <el-input-number v-model="form.tokenTime" :min="-1" :max="1000" label="单位秒"></el-input-number>
        </el-form-item>

        <el-form-item label="注册账号长度限制[min6 - max12]">
          <el-input-number v-model="form.userAccountLengthLimit[0]" :min="1" :max="1000" label=""></el-input-number>
          <el-input-number style="margin-left: 20px;" v-model="form.userAccountLengthLimit[1]" :min="1" :max="1000"
                           label=""></el-input-number>
        </el-form-item>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary" :loading="submitLoad" @click="onSubmit">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import {editAppConfig, queryAppConfig} from "@/api/all-api";
import {requestCallback} from "@/utils/request/servies";
import {Message} from "element-ui";
import draggable from 'vuedraggable';

export default {
  name: "AppConfigManagement",
  components: {
    draggable
  },
  data() {
    return {
      inputGroupTypeVisible: false,
      inputGroupTypeValue: '',
      submitLoad: false,
      draggedIndex: null,
      form: {
        // 是否关闭软件
        appIsRemove: false,
        // 包名
        appPackageName: "",
        // 组类型
        groupTypeArr: ["test1", "test2", "test3", "test4"],
        // 图片过期加密密码
        imagePassword: "",
        // 图片有效时长  -1永久  （单位 s）
        imageTime: -1,
        // 图片上传大小   （单位 mb）
        imageSize: 20,
        // token 盐
        tokenSalt: "",
        // token有效时长  -1永久 （单位 s）
        tokenTime: -1,
        // 注册账号长度限制    [min 6 - max 12]
        userAccountLengthLimit: [6, 12],
      }
    }
  },
  mounted() {
    requestCallback(queryAppConfig(), (data) => {
      this.form = data.result
    }, () => {
    })
  },
  methods: {
    // 提交
    onSubmit() {
      this.submitLoad = true
      requestCallback(editAppConfig(this.form), () => {
        this.submitLoad = false
        Message({
          type: "success",
          message: `提交成功！`,
          center: true
        })
      }, () => {
        this.submitLoad = false
      })
    },
    handleClose(tag) {
      this.form.groupTypeArr.splice(this.form.groupTypeArr.indexOf(tag), 1);
    },
    showInput() {
      this.inputGroupTypeVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputGroupTypeValue = this.inputGroupTypeValue;
      if (inputGroupTypeValue) {
        this.form.groupTypeArr.push(inputGroupTypeValue);
      }
      this.inputGroupTypeVisible = false;
      this.inputGroupTypeValue = '';
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
  height: 30px;
}

.button-new-tag {
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}


.draggableType {
  display: inline-block;
}

.draggable {
  cursor: grab;
  user-select: none;
}

.dragging {
  cursor: grabbing;
}

</style>