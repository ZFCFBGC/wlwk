<template>
  <div class="swd-pay">
    <div class="mask"></div>
    <div class="swd-pay-cont">
      <div class="ccb-alert-cont-c">
        <div class="title clearfix">
          <div class="confirmTitle fl">{{$t('localization.AccountBalance')}}充值</div>
          <div class="confirmClose fr" @click="cancelClick">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="cont1">
          <div class="payMoney">
            <div class="payMoneyTitle">付款金额（{{$t('localization.HYuan')}}）</div>
            <div class="payMoneyNum">100.00</div>
          </div>
          <div class="payMethods">
            <div class="payMethodsTitle">{{$t('localization.PayType')}}</div>
            <div class="payMethodsList">
              <div class="tabList">
                <div
                  class="list_one clearfix"
                  @click="getMethod('Alipay')"
                  :class="activeName == 'Alipay' ? 'active' : ''"
                >
                  <div class="alipayIcon fl"></div>
                  <div class="payTitle fl">
                    {{$t('localization.Alipay')}}
                  </div>
                </div>
                <div
                  class="list_one clearfix"
                  @click="getMethod('WeChat')"
                  :class="activeName == 'WeChat' ? 'active' : ''"
                >
                  <div class="weChatIcon fl"></div>
                  <div class="payTitle fl">
                    {{$t('localization.Wechat')}}
                  </div>
                </div>
                <div
                  class="list_one clearfix"
                  @click="getMethod('Balance')"
                  :class="activeName == 'Balance' ? 'active' : ''"
                >
                  <div class="balanceIcon fl"></div>
                  <div class="payTitle fl">
                    {{$t('localization.CorporateAccount')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="weChatPay" v-if="activeName == 'WeChat'">
            <!-- 微信支付 -->
          </div>
          <div class="apliayPay" v-if="activeName == 'Alipay'">
            <!-- 支付宝支付 -->
          </div>
          <div class="balancePay" v-if="activeName == 'Balance'">
            <!-- 余额支付 -->
            <div class="accountInfo clearfix">
              <div class="accountInfo_l fl">
                <div class="title clearfix">
                  <div class="icon fl"></div>
                  <div class="tips fl">{{$t('localization.CorporateAccount')}}</div>
                </div>
                <div class="list">
                  <div class="list_t">{{$t('localization.Bank2')}}</div>
                  <div class="list_s"></div>
                </div>
                <div class="list">
                  <div class="list_t">{{$t('localization.Bank')}}</div>
                  <div class="list_s"></div>
                </div>
                <div class="list">
                  <div class="list_t">{{$t('localization.AccountName')}}</div>
                  <div class="list_s"></div>
                </div>
                <div class="list">
                  <div class="list_t">输入金额</div>
                  <div class="list_s"></div>
                </div>
              </div>
              <div class="accountInfo_r fr">
                <div class="title clearfix">
                  <div class="icon fl"></div>
                  <div class="tips fl">{{$t('localization.TransferToAccount')}}</div>
                </div>
                 <div class="list">
                  <div class="list_t">{{$t('localization.Bank2')}}</div>
                  <div class="list_shuru"></div>
                </div>
                <div class="list">
                  <div class="list_t">{{$t('localization.BankCard')}}号</div>
                  <div class="list_shuru"></div>
                </div>
                <div class="list">
                  <div class="list_t">{{$t('localization.AccountName')}}</div>
                  <div class="list_shuru"></div>
                </div>
                <div class="list">
                  <div class="list_t">输入金额</div>
                  <div class="list_shuru"></div>
                </div>
              </div>
            </div>
            <div class="btn clearfix">
              <div class="cancel fr" @click="cancelClick">
                {{$t('localization.Cancel')}}
              </div>
              <div class="confirm fr" @click="confirmClick">
                {{$t('localization.Confirm')}}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: "",
      activeName: "Balance"
    };
  },
  methods: {
    confirmClick() {
      return "gqg";
    },
    cancelClick() {},
    getMethod(active) {
      this.activeName = active;
    }
  }
};
</script>
<style lang="less" scoped>
.swd-pay {
  .mask {
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    color: #fff;
  }
  .swd-pay-cont {
    height: auto;
    min-width: 738px;
    min-height: 664px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 1001;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    .ccb-alert-cont-c {
      .title {
        height: 18px;
        .confirmTitle {
          height: 18px;
          line-height: 18px;
          color: rgba(24, 38, 60, 1);
          font-size: 13px;
        }
        .confirmClose {
          color: rgba(24, 38, 60, 1);
          font-size: 13px;
        }
      }
      .cont1 {
        .payTime {
          padding-top: 20px;
          .payTimeTitle {
            color: #333;
            font-size: 13px;
            line-height: 32px;
          }
          .payTimeSelect {
            position: relative;
            .selectDiv {
              width: 455px;
              height: 30px;
              padding-left: 12px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(222, 224, 227, 1);
              border-radius: 3px;
              line-height: 30px;
            }
            .selectIcon {
              position: absolute;
              right: 20px;
              top: 8px;
              width: 14px;
              height: 14px;
              color: #333;
              background: url(../../assets/images/down.png) no-repeat center
                center;
            }
            .listOption {
              width: 120px;
              position: absolute;
              height: 388px;
              padding: 5px 0;
              right: 12px;
              top: 34px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
              border-radius: 8px;
              z-index: 10;
            }
            .listOption ul li {
              width: 105px;
              height: 32px;
              cursor: pointer;
              line-height: 32px;
              padding-left: 15px;
              color: #333;
              font-size: 12px;
            }
            .listOption ul li:hover {
              background: rgba(222, 224, 227, 1);
            }
          }
        }
        .payMoney {
          padding-top: 20px;
          .payMoneyTitle {
            color: #333;
            font-size: 13px;
            line-height: 32px;
          }
          .payMoneyNum {
            margin-top: 10px;
            width: 660px;
            height: 32px;
            background: rgba(244, 245, 249, 1);
            border-radius: 3px;
            line-height: 32px;
            color: #333;
            font-size: 13px;
            padding-left: 9px;
          }
        }
        .payMethods {
          padding-top: 10px;
          .payMethodsTitle {
            color: #333;
            font-size: 13px;
            line-height: 32px;
            height: 32px;
          }
          .payMethodsList {
            height: 32px;
            .tabList {
              height: 32px;
              display: flex;
              .list_one {
                padding-top: 8px;
                padding-left: 6px;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
                width: 82px;
                .alipayIcon {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                  background: url(../../assets/images/alipay.png) no-repeat
                    center center;
                }
                .weChatIcon {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                  margin-left: 10px;
                  background: url(../../assets/images/weChat.png) no-repeat
                    center center;
                }
                .balanceIcon {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                  background: url(../../assets/images/Balance.png) no-repeat
                    center center;
                }
                .payTitle {
                  color: #333;
                  font-size: 13px;
                  line-height: 16px;
                }
              }
              .active {
                border-bottom: 2px solid #3370ff;
              }
            }
          }
        }
        .balancePay {
          padding-top: 40px;
          .accountInfo {
            .accountInfo_l,
            .accountInfo_r {
              width: 315px;
              .title {
                margin-bottom:29px;
                .icon {
                  width: 4px;
                  height: 14px;
                  background: rgba(51, 112, 255, 1);
                  margin-right: 3px;
                }
                .tips {
                  color: rgba(0, 0, 0, 1);
                  font-size: 14px;
                }
              }
              .list {
                margin-bottom:16px;
                .list_t {
                  font-size: 13px;
                  color: #666;
                  line-height: 16px;
                  margin-bottom: 14px;
                }
                .list_s {
                  width: 315px;
                  height: 32px;
                  background: rgba(244, 245, 249, 1);
                  border-radius: 3px;
                  font-size: 13px;
                  color: rgba(0, 0, 0, 1);
                  line-height: 32px;
                }
                .list_shuru{
                  width: 315px;
                  height: 32px;
                }
              }
            }
          }
          .btn {
            padding-top: 35px;
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
    }
  }
}
</style>
