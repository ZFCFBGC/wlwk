<template>
  <div class="auditPop">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header">
        <div class="title">{{$t('localization.ViewDetail')}}</div>
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="auditCont clearfix" v-if="type == 'first'">
        <div class="audit_l fl">
          <div class="list">
            <div class="title">{{$t('localization.OrderNumber')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">现金金额（{{$t('localization.HYuan')}}）</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.SubmitTime')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.WithdrawalMethod')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
        <div class="audit_r fr">
          <div class="list">
            <div class="title">{{$t('localization.Alipay')}}{{$t('localization.Account')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.Status')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.ApprovedTime')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.PaymentTime')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
      </div>
      <div class="auditCont clearfix" v-if="type == 'second'">
        <div class="audit_l fl">
          <div class="list">
            <div class="title">{{$t('localization.Username')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.IncomeExpense')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.DetailInside')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.Recharger')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
        <div class="audit_r fr">
          <div class="list">
            <div class="title">充值方式</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.Confirm')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.IncomeExpenseDetail')}}</div>
            <div class="shuru"></div>
          </div>
           <div class="list">
            <div class="title">{{$t('localization.Time')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
      </div>
      <div class="btnArr clearfix">
        <div class="cancel fr">{{$t('localization.Cancel')}}</div>
        <div class="confirm fr">{{$t('localization.Confirm')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "second"
    }
  },
  data() {
    return {
      radio: 3,
      textarea: "",
      cardNum: null,
      strAry: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  created() {
  },
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("cancel");
    },
    // 图片上传事件
    
  }
};
</script>
<style lang="less" scoped>
.auditPop {
  .imgMask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 1999;
  }
  .img {
    position: fixed;
    left: 50%;
    top: 50%;
    height: 340px;
    z-index: 2001;
    transform: translate(-50%, -50%);
  }
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
    width: 738px;
    box-sizing: border-box;
    // height: 621px;
    background: #fff;
    border-radius: 8px;
    padding: 0 31px 30px 31px;
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
    .auditCont {
      .audit_l,
      .audit_r {
        .list {
          margin-bottom: 16px;
        }
        .title {
          line-height: 16px;
          font-size: 13px;
          color: rgba(85, 85, 85, 1);
          margin-bottom: 16px;
        }
        .shuru {
          width: 315px;
          height: 32px;
          background: rgba(244, 245, 249, 1);
          border-radius: 3px;
          line-height: 32px;
          color: #000;
          font-size: 13px;
          text-indent: 1em;
        }
        /deep/.radioBox {
          width: 315px;
          height: 32px;
          .el-radio {
            padding: 0 16px;
            height: 32px;
            background: rgba(225, 234, 255, 1);
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
          }
        }
        /deep/.upLoad {
          // width: 115px;
          width: 100%;
          height: 109px;
          // background: chartreuse;
          .el-upload--picture-card {
            width: 115px;
            height: 109px;
            line-height: 113px;
          }
          .uploadImg {
            display: flex;
            width: 100%;
          }
          .el-upload-list--picture-card .el-upload-list__item {
            width: 115px;
            height: 109px;
          }
        }
      }
    }
    .btnArr {
      padding-top: 24px;
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
}
</style>
