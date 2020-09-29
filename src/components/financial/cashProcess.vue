<template>
  <div class="cashProcess">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header">
        <div class="title">{{$t('localization.WithdrawalAccount')}}</div>
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="auditCont">
        <!-- 已有审核的账户 -->
        <!-- 支付宝 -->
        <div class="alipay" v-if="alipayShow">
          <div class="list">
            <div class="title">{{$t('localization.Alipay')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.Name1')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.IDNumber')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.PhoneNum')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.WithdrawM')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
        <!-- 银行 -->
        <div class="bank" v-if="bankShow">
          <div class="list">
            <div class="title">{{$t('localization.Bank2')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.CardNum')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">开户人</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.IDNumber')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.PhoneNum')}}</div>
            <div class="shuru"></div>
          </div>
          <div class="list">
            <div class="title">{{$t('localization.WithdrawM')}}</div>
            <div class="shuru"></div>
          </div>
        </div>
        <!-- 没有提现审核的账户 -->
        <div class="unaudited" v-if="false">
          <el-tabs v-model="activeName">
            <el-tab-pane label="银行卡" name="bank">
              <div class="unaudited_bank">
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.Bank2')}}</div>
                  <div class="unaudited_shuru">
                    <swd-select
                      v-model="bank"
                      :value="bank"
                      :width="467"
                      :options="bankList"
                    ></swd-select>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.CardNum')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">开户人</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.IDNumber')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.UploadProof')}}</div>
                  <div class="unaudited_shuru"></div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.PhoneNum')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.VerifyCode')}}</div>
                  <div class="unaudited_shuru"></div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="支付宝" name="ailpay">
              <div class="unaudited_ailpay">
                <div class="unaudited_list">
                  <div class="unaudited_title">支付宝账号</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.Name1')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.IDNumber')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.UploadProof')}}</div>
                  <div class="unaudited_shuru"></div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.PhoneNum')}}</div>
                  <div class="unaudited_shuru">
                    <swd-input
                      :value="packPrice1"
                      placeholder="0.00"
                      :width="467"
                    ></swd-input>
                  </div>
                </div>
                <div class="unaudited_list">
                  <div class="unaudited_title">{{$t('localization.VerifyCode')}}</div>
                  <div class="unaudited_shuru"></div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 提现审核开发更新账户，入口为提现账户管理 -->
        <div class="unauditedSecond" v-if="false">
          <div class="unauditedSecond_alipay" v-if="true">
            <div class="list">
              <div class="title">{{$t('localization.AccountType')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">支付宝账户</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.Name1')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.IDNumber')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.PhoneNum')}}</div>
              <div class="shuru"></div>
            </div>
          </div>
          <!-- 银行 -->
          <div class="unauditedSecond_bank" v-if="false">
            <div class="list">
              <div class="title">{{$t('localization.AccountType')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.Bank2')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.CardNum')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">开户人</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.IDNumber')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.PhoneNum')}}</div>
              <div class="shuru"></div>
            </div>
          </div>
        </div>
        <!-- 提交审核记录 -->
        <div class="unauditedRecord" v-if="false">
          <swd-table
            :more="false"
            :table="tableAll"
            :tableData="tableData"
            :tableLabel="tableLabel"
            :total="total"
          >
          </swd-table>
        </div>
      </div>
      <div class="btnArr clearfix">
        <div class="cancel fr">{{$t('localization.Cancel')}}</div>
        <div class="confirm fr">{{$t('localization.SubmitAudit')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import swdInput from "../form/swdInput.vue";
import swdSelect from "../form/swdSelect.vue";
import swdTable from "../swdTable/swdTable1.vue";
export default {
  components: {
    swdInput,
    swdSelect,
    swdTable
  },
  data() {
    return {
      alipayShow: true,
      bankShow: false,
      activeName: "ailpay",
      packPrice1: "",
      bank: "",
      bankList: [
        { value: "10086", label: "中国银行" },
        { value: "10087", label: "中国银行2" },
        { value: "10088", label: "中国银行3" }
      ],
      tableAll: {
        select: false,
        handle: true,
        type: false
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "packName", title: this.$t('localization.OrderNumber') },
        { prop: "tCFlow", title: $t('localization.Username') },
        { prop: "tCVoice", title: this.$t('localization.MSum') },
        { prop: "", title: this.$t('localization.Status') }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.cashProcess {
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
    box-sizing: border-box;
    max-height: 621px;
    width: 543px;
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
      .alipay,
      .bank {
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
          width: 467px;
          height: 32px;
          background: rgba(244, 245, 249, 1);
          border-radius: 3px;
          line-height: 32px;
          color: #000;
          font-size: 13px;
          text-indent: 1em;
        }
      }
      .unaudited {
        .unaudited_bank,
        .unaudited_ailpay {
          height: 410px;
          overflow-y: auto;
          .unaudited_list {
            margin-bottom: 14px;
            .unaudited_title {
              font-size: 13px;
              line-height: 16px;
              margin-bottom: 14px;
              color: #666;
            }
            .unaudited_shuru {
              height: 32px;
              line-height: 32px;
              width: 467px;
              // background: chartreuse;
            }
          }
        }
      }
      .unauditedSecond {
        .unauditedSecond_alipay,
        .unauditedSecond_bank {
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
            width: 467px;
            height: 32px;
            background: rgba(244, 245, 249, 1);
            border-radius: 3px;
            line-height: 32px;
            color: #000;
            font-size: 13px;
            text-indent: 1em;
          }
        }
      }
    }
    .btnArr {
      padding-top: 24px;
      width: 100%;
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
