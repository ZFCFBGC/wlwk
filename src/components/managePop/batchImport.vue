<template>
  <div class="card-import">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{$t('localization.Import')}}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="title">
          {{$t('localization.PlsUploadFile')}}
        </div>
        <div class="upload">
          <div class="file-name" v-if="fileName">{{ fileName }}</div>
          <el-upload
            ref="upload"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="showFile"
            :http-request="uploadFile"
          >
            <el-button type="primary">选取文件</el-button>
            <el-button type="text">{{$t('localization.ClickToDl')}}</el-button>
          </el-upload>
        </div>
        <div class="title" v-if="type === 'charge'">
          {{this.$t('localization.BatchRenewTip')}}
        </div>
      </div>
      <div class="btn-right">
        <el-button
          type="primary"
          v-if="type === 'charge'"
          @click="confirmUpload"
          >{{$t('localization.Confirm')}}</el-button
        >
        <el-button type="primary" @click="confirmUpload" v-else>{{$t('localization.Import')}}</el-button>
        <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: null
  },
  data() {
    return {
      fileName: ""
    };
  },
  methods: {
    cancel() {
      this.fileName = "";
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
    showFile(file) {
      this.fileName = file.name;
    },
    confirmUpload() {
      this.$refs.upload.submit();
    },
    uploadFile(file) {
      let params = {
        file
      };
      this.$client.upload(params).then(res => {
        if (res.code === "200") {
          if (this.type === "remark") {
            this.importCardsRemarks(res.data);
          }
        }
      });
    },
    importCardsRemarks(fileName) {
      let url = "/card/importCardsRemarks.do";
      let params = {
        fileName
      };
      this.$client.get(url, params).then(res => {
        if (res.code === "200") {
          swd.compop({
            title: "提示",
            content: res.msg,
            autoClose: true
          });
          this.$emit("cancel");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.card-import {
  .dialog {
    width: 543px;
    .content {
      /deep/.upload {
        margin: 10px 0 18px 0;
        display: flex;
        .file-name {
          box-sizing: border-box;
          display: inline-block;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          line-height: 32px;
          margin-right: 14px;
          font-size: 13px;
          padding: 0 18px;
        }
        .el-button {
          height: 32px;
          line-height: 32px;
          vertical-align: middle;
          padding: 0 25px;
          text-align: center;
          font-size: 13px;
          border-radius: 3px;
        }
        .el-button--primary {
          background-color: #3370ff;
        }
        .el-button--text {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
