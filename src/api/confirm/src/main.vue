<template>
  <div class="ccb-confirm" v-if="show">
    <div class="ccb-confirm-cont">
      <div class="ccb-alert-cont-c">
        <div class="title clearfix">
          <div class="confirmTitle fl" v-if="titleShow">{{ title }}</div>
          <div class="confirmClose fr pointer" @click="cancelClick">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="cont">
          <div class="typeIcon" v-if="typeShow">
            <div class="typeLogo"></div>
            <div class="typeTips">{{typeTips}}</div>
          </div>
          <div class="content" v-if="contentShow">{{ content }}</div>
        </div>
      </div>
      <div class="btn clearfix">
        <div class="confirm pointer" @click="confirmClick">{{ confirmTxt }}</div>
        <div class="cancel pointer" @click="cancelClick">{{ cancelTxt }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      title: "这里是标题",
      titleShow: true,
      content: "这里是内容",
      contentShow: true,
      type: "success",
      typeShow: false,
      typeTips: "操作成功",
      typeTipShow: false,
      cancelTxt: "取消",
      confirmTxt: "确认"
    };
  },
  methods: {
    confirmClick() {},
    cancelClick() {}
  }
};
</script>
<style lang="less" scoped>
.ccb-confirm {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999999;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  color: #fff;
  .ccb-confirm-cont {
    height: auto;
    min-width: 240px;
    min-height: 180px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    .ccb-alert-cont-c {
      .title {
        height: 18px;
        .confirmTitle {
          height: 18px;
          line-height: 18px;
          color: rgba(24, 38, 60, 1);
          font-size: 14px;
        }
        .confirmClose {
          color: rgba(24, 38, 60, 1);
          font-size: 16px;
        }
      }
      .cont {
        padding: 45px 0;
        text-align: center;
        font-size: 13px;
        color: #666;
        line-height: 18px;
        .content{
          font-size: 13px;
        }
        .typeIcon{
          display:flex;
          height:24px;
          line-height:24px;
          .typeTips{
            font-size:13px;
            color: #666;
          }
        }
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translate(-50%, 0);
      display: flex;
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        font-size: 13px;
        margin-right: 12px;
      }
      .cancel {
        width: 76px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        line-height: 32px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        font-size: 13px;
      }
    }
  }
}
</style>
