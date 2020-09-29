<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl">{{ popInfo.title }}</div>
        <div class="close pointer fr" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="cardNum">{{$t('localization.PlsInputCardNum')}}，{{$t('localization.Currently')}}：{{ cardNum }}个</div>
      <div class="shuru">
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="textarea"
          @input="getVal"
        >
        </el-input>
      </div>
      <div class="tips">
       {{this.$t('localization.ShutdownTip')}}
      </div>
      <div class="btn pointer" @click="goClick">{{$t('localization.Exec')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    popInfo: {
      type: Object
    }
  },
  watch: {
    popInfo: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.popInfo = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      textarea: "",
      cardNum: null,
      strAry: []
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("handleIsPop");
    },
    getVal(e) {
      this.textarea = e.replace(/\，/g, ",");
      var num = Tools.getStrCount(this.textarea, ",");
      var strLeg = null;
      if (num == 15) {
        strLeg = this.textarea.length;
        this.textarea = this.textarea.substring(0, strLeg - 1);
      }
      if (this.num > 15) {
        this.textarea = this.textarea.substring(0, strLeg - 1);
      }
      var str = this.textarea.replace(/\n/g, "");
      this.strAry = Tools.arrValid(str.split(","));
      this.cardNum = this.strAry.length;
    },
    goClick() {
      var url = "/card/addCardsRefresh.do";
      if (!this.textarea) {
        swd.toast({
          type: "fail",
          content: "请输入您要执行的卡号"
        });
        return;
      }
      this.$client
        .get(url, {
          cards: this.textarea
        })
        .then(res => {
          if (res.code == 200) {
            this.$emit("handleIsPop");
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
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
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 543px;
    height: 475px;
    background: #fff;
    border-radius: 8px;
    padding-left: 31px;
    padding-right: 31px;
    box-sizing: border-box;
    z-index: 1001;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 16px;
        height: 16px;
      }
    }
    .cardNum {
      height: 13px;
      font-size: 13px;
      color: rgba(121, 121, 121, 1);
      margin-bottom: 13px;
    }
    /deep/.shuru {
      width: 479px;
      height: 260px;
      background: rgba(247, 247, 250, 1);
      border-radius: 3px;
      .el-textarea__inner {
        font-size: 12px;
        line-height: 17px;
        background: rgba(247, 247, 250, 1);
      }
    }
    .tips {
      margin-top: 12px;
      margin-bottom: 12px;
      font-size: 13px;
      color: rgba(255, 51, 51, 1);
      line-height: 20px;
    }
    .btn {
      width: 76px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 3px;
      line-height: 32px;
      text-align: center;
      margin: 0 auto;
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
