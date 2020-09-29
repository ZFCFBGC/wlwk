<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header">
        <div class="title">{{$t('localization.ViewDetail')}}</div>
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="cont">
        <div class="list">
          <div class="title">{{$t('localization.AccountHolder')}}</div>
          <div class="shuru">
            <swd-input
              :value="packPrice1"
              placeholder="0.00"
              :width="467"
            ></swd-input>
          </div>
        </div>
        <div class="list">
          <div class="title">{{$t('localization.Bank')}}</div>
          <div class="shuru">
            <swd-select
              v-model="bank"
              :value="bank"
              :width="467"
              :options="bankList"
            ></swd-select>
          </div>
        </div>
        <div class="list">
          <div class="title">{{$t('localization.BankCard')}}</div>
          <div class="shuru">
            <swd-input
              :value="packPrice1"
              placeholder="0.00"
              :width="467"
            ></swd-input>
          </div>
        </div>
      </div>
      <div class="btnArr clearfix">
         <div class="cancel fr" @click="close">{{$t('localization.Cancel')}}</div>
        <div class="confirm fr" @click="confirm">{{$t('localization.Confirm')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import swdInput from "../form/swdInput.vue";
import swdSelect from "../form/swdSelect.vue";
export default {
  components: {
    swdInput,
    swdSelect
  },
  data() {
    return {
      bank: "",
      packPrice1: "",
      bankList: [
        { value: "10086", label: "中国银行" },
        { value: "10087", label: "中国银行2" },
        { value: "10088", label: "中国银行3" }
      ]
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("cancel");
    },
    confirm(){
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
    // height: 595px;
    background: #fff;
    border-radius: 8px;
    padding: 0 31px 16px 31px;
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
        position: absolute;
        top: 26px;
        right: 26px;
        width: 16px;
        height: 16px;
        background: brown;
      }
    }
    .cont {
      .list {
        margin-bottom: 16px;
        .title {
          font-size: 13px;
          color: #666;
          line-height: 16px;
          margin-bottom: 14px;
        }
      }
    }
  }
  .btnArr {
      padding-top: 8px;
      .cancel {
        width: 76px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        text-align: center;
        line-height: 32px;
        font-size: 13px;
        color: #333;
      }
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        font-size: 13px;
        text-align: center;
        color: #fff;
        margin-right: 12px;
      }
    }
}
</style>
