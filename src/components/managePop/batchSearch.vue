<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{$t('localization.BatchSearch')}}</div>
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="card-count">
          请输入卡号，换行分隔，当前：{{ cardNum }}个
        </div>
        <div class="text-area">
          <el-input
            type="textarea"
            :rows="13"
            placeholder="请输入内容"
            v-model="batchCards"
          >
          </el-input>
        </div>
      </div>
      <div class="btn-right">
        <el-button type="primary" @click="submitSearch">{{$t('localization.Confirm')}}</el-button>
      </div>
    </div>
    <!-- <div class="content"> -->
    <!-- <div class="header">
        <div class="title">批量查询</div>
        <div class="close" @click="close"></div>
      </div>
      <div class="cardNum">请输入卡号，当前：{{ cardNum }}个</div>
      <div class="input">
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="textarea"
          @input="getVal"
        >
        </el-input>
      </div> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      batchCards: null,
      cardNum: null,
      strAry: []
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    submitSearch(){
      this.$emit('search', this.batchCards)
      this.close()
    },
    close() {
      this.$emit("cancel");
    },
    getVal() {
      this.strAry = this.textarea.split("\n");
      this.cardNum = this.strAry.length;
    },
    goClick() {
      var that = this;
      var arr = [];
      var errorArr = [];
      this.strAry.map(item => {
        if (Tools.phonevalid(item)) {
          arr.push(item);
        } else {
          errorArr.push(item);
        }
        return;
      });
      var obj = Tools.uniArr(arr);
    }
  }
};
</script>
<style lang="less" scoped>
.popUp {
  .mask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 999;
  }
  .dialog {
    width: 543px;
    height: 451px;
    .content {
      .card-count {
        height: 30px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(121, 121, 121, 1);
        line-height: 30px;
      }
      /deep/.el-textarea {
        .el-textarea__inner {
          background: rgba(247, 247, 250, 1);
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
