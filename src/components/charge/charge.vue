<!--  -->
<template>
  <div class="charge-dialog" v-if="show">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="charge-time" v-if="showTime">
          <div class="title">{{$t('localization.RenewTime')}}</div>
          <div class="time-select">
            <el-select
              v-model="timeValue"
              :placeholder="$t('localization.SelectPlaceholder')"
              popper-class="select-option"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="charge-time" v-if="showVoice">
          <div class="title">{{this.$t('localization.VoiceCharge')}}</div>
          <div class="time-select">
            <el-select
              v-model="voicePack"
              :placeholder="$t('localization.SelectPlaceholder')"
              popper-class="select-option"
              @change="onPackTimeChange"
            >
              <el-option
                v-for="item in voiceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="title">付款金额（{{$t('localization.HYuan')}}）</div>
        <div class="charge-amount">
          <el-input v-model="amount" disabled></el-input>
        </div>
        <div class="title">{{this.$t('localization.PayType')}}</div>
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('localization.Alipay')" name="alipay">
            <img class="qrcode" src="" alt="qrcode" />
            <div class="tips">扫一扫支付</div>
          </el-tab-pane>
          <el-tab-pane :label="$t('localization.Wechat')" name="wechatpay">
            <img class="qrcode" src="" alt="qrcode" />
            <div class="tips">扫一扫支付</div>
          </el-tab-pane>
          <el-tab-pane :label="$t('localization.AccountBalance')" name="balance">
            <div class="balance">
              {{$t('localization.Balance')}}（元）:<span>&nbsp;{{ userInfo.balanceAmount }}</span>
              <div class="button-left">
                <el-button type="primary" @click="chargeByBalance"
                  >{{$t('localization.Confirm')}}</el-button
                >
                <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: "",
    showTime: { type: Boolean, default: false },
    showVoice: { type: Boolean, default: false },
    content: String,
  },
  components: {},
  data() {
    //这里存放数据
    return {
      dialogInfo: {},
      show: false,
      timeValue: null,
      userInfo: {},
      tradeNo: "",
      timeOptions: [
        {
          value: 1,
          label: "1个月",
        },
        {
          value: 2,
          label: "2个月",
        },
        {
          value: 3,
          label: "3个月",
        },
        {
          value: 4,
          label: "4个月",
        },
        {
          value: 5,
          label: "5个月",
        },
        {
          value: 6,
          label: "6个月",
        },
        {
          value: 7,
          label: "7个月",
        },
        {
          value: 8,
          label: "8个月",
        },
        {
          value: 9,
          label: "9个月",
        },
        {
          value: 10,
          label: "10个月",
        },
        {
          value: 11,
          label: "11个月",
        },
        {
          value: 12,
          label: "1年",
        },
      ],
      voicePack: 30,
      voiceOptions: [
        { value: 30, label: "30min" },
        { value: 60, label: "60min" }
      ],
      activeName: "alipay",
      amount: 0,
      cardNo: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    open(amoumt, tradeNo, cardNo) {
      this.show = true;
      this.amount = amoumt;
      this.getAccountInfo();
      this.activeName = "alipay";
      tradeNo && (this.tradeNo = tradeNo);
      cardNo && (this.cardNo = cardNo);
      if (this.showVoice) {
        this.voicePack=30
        this.getPackPrice(cardNo).then((res) => {
          let card = res.data.OKCards[0];
          let { voicePrice } = card;
          this.getVoicePackPrice(30, cardNo, voicePrice);
        });
      }
    },
    getVoicePackPrice(timerange, cardNo, voicePrice) {
      let url = "/pay/addBatchVoiceDieJiaOrder.do";
      let params = {
        cards: cardNo,
        whenLong: timerange,
        totalPay: (timerange / 30) * voicePrice,
      };
      this.$client.get(url, params).then((res) => {
        this.amount = res.data.totalPay;
        this.tradeNo = res.data.out_trade_no;
        this.content = `确定为${cardNo} 语音充值${timerange}min?`;
      });
    },
    getPackPrice(cardNo) {
      let url = "/package/queryBatchCardsPackage.do";
      let params = {
        cards: cardNo,
      };
      return this.$client.get(url, params);
    },
    cancel() {
      this.show = false;
    },
    onPackTimeChange() {
      this.getPackPrice(this.cardNo).then((res) => {
        let card = res.data.OKCards[0];
        let { voicePrice } = card;
        this.getVoicePackPrice(this.voicePack, this.cardNo, voicePrice);
      });
    },
    chargeByBalance() {
      if (this.amount > this.userInfo.balanceAmount) {
        this.$message.warning("账户余额不足");
        return;
      }
      swd.compop({
        title: "提示",
        content: this.content,
        success: (res) => {
          if (res.confirm == true) {
            let url = "/pay/payByBalance.do";
            let params = {
              totalPay: this.amount,
              out_trade_no: this.tradeNo,
            };
            this.$client.get(url, params).then((res) => {
              if (res.code === "200") {
                swd.compop({
                  title: "提示",
                  content: this.$t('localization.RechargeSuccess'),
                  autoClose: true,
                });
                this.cancel();
                this.$emit("close");
              } else {
                swd.compop({
                  title: "提示",
                  content: "充值失败",
                  autoClose: false,
                });
              }
            });
          }
        },
      });
    },
    getAccountInfo() {
      let url = "/user/getUserInfo.do";
      this.$client.get(url).then((res) => {
        this.userInfo = res.data;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.charge-dialog {
  .mask {
    z-index: 2000;
  }
  .dialog {
    z-index: 2001;
    width: 543px;
    height: 576px;
    .content {
      .title {
        height: 35px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(85, 85, 85, 1);
        line-height: 35px;
      }
      .time-select {
        height: 32px;

        /deep/.el-select {
          width: 100%;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            border: 1px solid rgba(222, 224, 227, 1);
          }
          .el-input__suffix {
            .el-select__caret {
              line-height: 32px;
            }
          }
        }
      }
      /deep/.charge-amount {
        .el-input.is-disabled {
          .el-input__inner {
            height: 32px;
            background: rgba(244, 245, 249, 1);
            border-radius: 3px;
            border: 0;
            color: #000;
          }
        }
      }
      .qrcode {
        width: 142px;
        height: 142px;
        border: 1px solid rgba(240, 245, 248, 1);
      }
      .tips {
        width: 142px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(100, 100, 100, 1);
        line-height: 42px;
        text-align: center;
      }
      .balance {
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(85, 85, 85, 1);
        line-height: 30px;
        span {
          color: #ff7200;
        }
        /deep/.button-left {
          margin-top: 30px;
          .el-button {
            font-size: 13px;
            height: 32px;
            border: 1px solid rgba(222, 224, 227, 1);
            border-radius: 3px;
            padding: 0;
            text-align: center;
            width: 76px;
            line-height: 32px;
          }
          .el-button--primary {
            background: rgba(51, 112, 255, 1);
          }
        }
      }
    }
  }
}
</style>
<style>
.select-option {
  width: 120px !important;
  min-width: 120px !important;
  right: 246px !important;
  /* left: 470px !important; */
}
</style>
