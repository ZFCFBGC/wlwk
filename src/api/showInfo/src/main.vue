<template>
  <div class="show-info" v-if="show">
    <div class="show-info-content">
      <div class="show-info-content-t" v-if="title != ''">
        {{ title }}
      </div>
      <div class="show-info-content-c">
        <div class="show-info-content-c-a">
          <div class="show-info-content-c-a-c">
            <i class="logo icon iconfont icon-locationiconsuccess"></i>
            <div class="content" v-if="content != ''" v-html="content"></div>
          </div>
        </div>
        <div class="error-code" v-if="errorCode != ''">
          {{ errorTitle }}：{{ errorCode }}
        </div>
      </div>
      <div class="show-info-content-b">
        <div
          class="btn"
          v-for="(item, i) in items"
          :key="i"
          @click="btnClick(i)"
        >
          {{ item.text }}
        </div>
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
      content: "",
      center: false,
      contentColor: "#333",
      errorTitle: "参考码",
      errorCode: "",
      items: [],
      themeColor: "#00B2F1"
    };
  },
  methods: {
    btnClick(index) {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.show-info {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99999999;
  .show-info-content {
    width: 307px;
    height: 210px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .show-info-content-t {
      font-size: 16px;
      line-height: 16px;
      padding-top: 16px;
      padding-left:32px;
      // color: #00b2f1;
      text-align: left;
      letter-spacing: 1px;
      text-indent: 1px;
    }
    .show-info-content-c {
      width: 100%;
      padding: 16px 16px 16px 32px;
      font-size: 15px;
      line-height: 26px;
      letter-spacing: 1px;
      .show-info-content-c-a {
        margin: 0 auto;
        margin-top: 15px;
        color: #333;
        .show-info-content-c-a-c {
          margin: 0 auto;
          width: 100%;
          word-wrap: break-word;
          .content {
            // text-align:center;
            color: #666;
            font-size: 14px;
          }
        }
      }
      .error-code {
        margin: 8px auto;
        font-size: 14px;
        color: #777;
      }
    }
    .show-info-content-b {
      .btn {
        margin:0 auto;
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        letter-spacing: 1px;
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        color:#fff;
        cursor: pointer;
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
