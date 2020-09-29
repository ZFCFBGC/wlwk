<template>
  <div class="swd-confirm" v-if="show">
    <div class="swd-confirm-cont">
      <div class="swd-alert-cont-c">
        <div class="title clearfix" v-if="titleShow">
          <div class="swdTitle fl">{{ title }}</div>
          <div class="close fr" @click="cancelClick">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="content">
          <div class="text" v-if="contentShow" v-html="content"></div>
        </div>
      </div>
      <div class="btn">
        <div class="confirm" @click="confirmClick">{{ confirmTxt }}</div>
        <div class="cancel" @click="cancelClick" v-if="cancelTxt">{{ cancelTxt }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      title: "",
      titleShow: true,
      content: "",
      contentShow: true,
      cancelTxt: "",
      confirmTxt: "确认",
      autoClose:false,
      icon:""
    };
  },
  methods: {
    confirmClick() {},
    cancelClick() {}
  }
};
</script>
<style lang="less" scoped>
.swd-confirm {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999999;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  color: #fff;
  .swd-confirm-cont {
    min-width: 240px;
    min-height: 180px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 8px;
    padding: 27px;
    text-align: center;
    .title {
      .swdTitle {
        font-size: 14px;
        color: rgba(24, 38, 60, 1);
      }
      .close {
        width: 16px;
        height: 16px;
        color: rgba(24, 38, 60, 1);
        cursor: pointer;
        &:hover {
        color: #3370ff;
      }
      }
    }
    .content {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      font-size: 13px;
      line-height: 13px;
      color: #666;
      .text {
        text-align: left;
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 20px;
        color: #666;
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 24px;
      transform: translate(-50%, 0);
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
