<template>
  <div class="swd-pay" v-if="show">
    <div class="swd-pay-cont">
      <div class="ccb-alert-cont-c">
        <div class="title clearfix">
          <div class="confirmTitle fl" v-if="titleShow">{{ title }}</div>
          <div class="confirmClose fr" @click="cancelClick">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="cont">
          <div class="payTime" v-if="showTime">
            <div class="payTimeTitle">续费时间</div>
            <div class="payTimeSelect">
              <div class="selectDiv" @click="openValue">
                <input
                  v-model="payTime"
                  type="text"
                  :placeholder="$t('localization.SelectPlaceholder')"
                  class="selectInput"
                />
                <i class="selectIcon"></i>
              </div>
              <div class="listOption" v-show="showSelect">
                <ul>
                  <li
                    @click="getvalue(item)"
                    v-for="item in payTimeArr"
                    :key="item.value"
                  >
                    {{ item.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="payMoney">
            <div class="payMoneyTitle">付款金额（{{$t('localization.HYuan')}}）</div>
            <div class="payMoneyNum">100.00</div>
          </div>
          <div class="payMethods">
            <div class="payMethodsTitle">付款方式</div>
            <div class="payMethodsList">
              <div class="tabList">
                <div
                  class="list_one clearfix"
                  @click="getMethod('Alipay')"
                  :class="activeName == 'Alipay' ? 'active' : ''"
                >
                  <div class="alipayIcon fl"></div>
                  <div class="payTitle fl">
                    支付宝
                  </div>
                </div>
                <div
                  class="list_one clearfix"
                  @click="getMethod('WeChat')"
                  :class="activeName == 'WeChat' ? 'active' : ''"
                >
                  <div class="weChatIcon fl"></div>
                  <div class="payTitle fl">
                    微信
                  </div>
                </div>
                <div
                  class="list_one clearfix"
                  @click="getMethod('Balance')"
                  :class="activeName == 'Balance' ? 'active' : ''"
                >
                  <div class="balanceIcon fl"></div>
                  <div class="payTitle fl">
                    {{$t('localization.AccountBalance')}}
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
              <span class="accountTitle fl">余额（元）：</span>
              <span class="accountPrice fl">200.00</span>
            </div>
            <div class="btn">
              <div class="confirm" @click="confirmClick">
                {{ confirmTxt }}
              </div>
              <div class="cancel" @click="cancelClick">{{ cancelTxt }}</div>
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
      showTime: false,
      show: false,
      title: "这里是标题",
      titleShow: true,
      priceShow:true,
      price:'',
      cancelTxt: "取消",
      confirmTxt: "确认",
      payTime: "",
      payTimeArr: [
        {
          value: "0",
          label: "一年"
        },
        {
          value: "1",
          label: "一个月"
        },
        {
          value: "2",
          label: "2个月"
        },
        {
          value: "3",
          label: "3个月"
        },
        {
          value: "4",
          label: "4个月"
        },
        {
          value: "5",
          label: "5个月"
        },
        {
          value: "6",
          label: "6个月"
        },
        {
          value: "7",
          label: "7个月"
        },
        {
          value: "8",
          label: "8个月"
        },
        {
          value: "9",
          label: "9个月"
        },
        {
          value: "10",
          label: "10个月"
        },
        {
          value: "11",
          label: "11个月"
        }
      ],
      showSelect: false,
      activeName: "Balance"
    };
  },
  methods: {
    openValue() {
      this.showSelect = !this.showSelect;
    },
    getvalue(item) {
      this.payTime = item.label;
      this.showSelect = false;
    },
    confirmClick() {
      return 'gqg'
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999999;
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  color: #fff;
  .swd-pay-cont {
    height: auto;
    min-width: 480px;
    min-height: 520px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
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
      .cont {
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
              background: url(../../../assets/images/down.png) no-repeat center center;
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
            width: 458px;
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
                  background: url(../../../assets/images/alipay.png) no-repeat
                    center center;
                }
                .weChatIcon {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                  margin-left: 10px;
                  background: url(../../../assets/images/weChat.png) no-repeat
                    center center;
                }
                .balanceIcon {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                  background: url(../../../assets/images/Balance.png) no-repeat
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
          .accountTitle {
            font-size: 13px;
            color: #666;
            line-height: 16px;
          }
          .accountPrice {
            font-size: 13px;
            color: #ff7200;
            line-height: 16px;
          }
          .btn {
            display: flex;
            padding-top: 50px;
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
