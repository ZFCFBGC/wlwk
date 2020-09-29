<template>
  <div class="ccb-toast" v-if="show">
    <div class="content">
      <div :class="styleClass">
        <div class="spinner">
          <i :class="className" v-if="showIcon"></i>
          <span>{{ msg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      showIcon: true,
      styleClass: "cont",
      className: "icon iconfont icon-success",
      msg: "操作成功"
    };
  }
};
</script>
<style lang="less" scoped>
.ccb-toast {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9999999999;
  .content {
    display: inline-block;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 999999999;
    .cont {
      padding: 15px 20px 15px 15px;
      background: #f0f9ed;
      border-radius: 4px;
      min-width: 342px;
      i {
        display: block;
        font-size: 36px;
        color: #fff;
        text-align: center;
        margin-bottom: 8px;
      }
      span {
        display: block;
        text-align: left;
        font-size: 13px;
        line-height: 13px;
        color: #67c23a;
        text-indent: 2em;
      }
    }
    .failCont {
      padding: 15px 20px 15px 15px;
      background: #fef0f0;
      border-radius: 4px;
      min-width: 342px;
      i {
        display: block;
        font-size: 36px;
        color: #fff;
        text-align: center;
        margin-bottom: 8px;
      }
      span {
        display: block;
        text-align: left;
        font-size: 16px;
        line-height: 16px;
        color: #f56c6c;
        text-indent: 2em;
      }
    }
    .cont.none {
      padding: 12px;
      background: #4c4c4c;
      border-radius: 4px;
      span {
        display: block;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
      }
    }
  }
}
</style>
