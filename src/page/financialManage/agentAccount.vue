<template>
  <div class="agentAccount">
    <div class="account clearfix">
      <div class="icon fl"></div>
      <div class="accountTitle fl">{{$t('localization.AccountBalance')}}</div>
      <div class="money fl">&yen;3600.00</div>
      <div class="recharge pointer fl">{{$t('localization.HRecharge')}}</div>
      <div class="withdraw pointer fl">{{$t('localization.HWithdrawal')}}</div>
      <div class="cashManage pointer fl">{{this.$t('localization.WithdrawalAccount')}}</div>
      <div class="flowMotion fr">
        <el-checkbox v-model="flowChecked">{{this.$t('localization.FlowAutoRenew')}}</el-checkbox>
      </div>
      <div class="SIMmotion fr">
        <el-checkbox v-model="SIMchecked">{{this.$t('localization.SimAutoRenew')}}</el-checkbox>
      </div>
    </div>
    <div class="cont">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('localization.IncomeExpenseDetail')" name="first">
          <div class="detailTable">
            <div class="advancedSearch clearfix">
              <div class="search fl clearfix">
                <search-header @search="incomeSearch"></search-header>
              </div>
              <div class="addPackage pointer fr">
                {{ this.$t("localization.Export")
                }}<img
                  class="export-arrow balance-arrow"
                  src="@/assets/images/export.png"
                  alt="export"
                />
              </div>
            </div>
            <div class="tableList">
              <swd-table
                :more="false"
                :table="incomeAll"
                :tableData="incomeData"
                :tableLabel="incomeLabel"
                :total="incomeTotal"
                @handleSelectionChange="handleincomeChange"
                @handleCurrentChange="handleIncomeCurrentChange"
                @goCurrentPage="goIncomeCurrentPage"
              >
                <template
                  slot-scope="props"
                  v-if="props.row != undefined"
                  slot="handle"
                >
                  <div class="handle">{{$t('localization.Details')}}</div>
                </template>
              </swd-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提现明细" name="second">
          <div class="detailTable">
            <div class="advancedSearch clearfix">
              <div class="search fl clearfix">
                <search-header @search="cashSearch"></search-header>
              </div>
              <div class="addPackage pointer fr">
                {{ this.$t("localization.Export") }}
              </div>
            </div>
            <div class="tableList">
              <swd-table
                :more="false"
                :table="cashAll"
                :tableData="cashData"
                :tableLabel="cashLabel"
                :total="cashTotal"
                @handleSelectionChange="handleCashChange"
                @handleCurrentChange="handleCashCurrentChange"
                @goCurrentPage="goCashCurrentPage"
              >
                <template
                  slot-scope="props"
                  v-if="props.row != undefined"
                  slot="handle"
                >
                  <div class="handle">{{$t('localization.Details')}}</div>
                </template>
              </swd-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 详情弹窗 -->
    <div class="agentDeatils" v-if="agentDeatilsShow">
      <agent-details></agent-details>
    </div>
    <!-- 提现流程 -->
    <div class="cashProcess" v-if="cashProcessShow">
      <cash-process></cash-process>
    </div>
    <!-- 充值弹窗 -->
    <div class="rechargeRecord" v-if="rechargeRecordShow">
      <recharge-record></recharge-record>
    </div>
  </div>
</template>
<script>
import searchHeader from "../../components/financial/searchHeader.vue";
import swdTable from "../../components/swdTable/swdTable1.vue";
import agentDetails from "../../components/financial/agentDetails.vue";
import cashProcess from "../../components/financial/cashProcess.vue";
import rechargeRecord from "../../components/financial/rechargeRecord.vue";
export default {
  components: {
    searchHeader,
    swdTable,
    agentDetails,
    cashProcess,
    rechargeRecord,
  },
  data() {
    return {
      rechargeRecordShow: false,
      cashProcessShow: false,
      agentDeatilsShow: false,
      flowChecked: false,
      SIMchecked: true,
      activeName: "first",
      // 收支表格数据
      incomeAll: {
        select: false,
        handle: true,
        type: true,
      },
      incomeData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      incomeTotal: 100, //总条数
      incomeLabel: [
        { prop: "", title: this.$t('localization.IncomeExpenseDetail') },
        { prop: "", title: this.$t('localization.IncomeExpense') },
        { prop: "", title: this.$t('localization.DetailInside') },
        { prop: "", title: this.$t('localization.Time') },
        { prop: "", title: this.$t('localization.Status') },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
      ],
      incomeSize: 10, //默认多少条一页
      incomeIndex: 1, //初始页码
      // 提现表格数据
      cashAll: {
        select: false,
        handle: true,
        type: false,
      },
      cashData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      cashTotal: 100, //总条数
      cashLabel: [
        { prop: "", title: this.$t('localization.OrderNumber') },
        { prop: "", title: this.$t('localization.MSum') },
        { prop: "", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.SubmitTime') },
        { prop: "", title: "处理时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
      ],
      cashSize: 10, //默认多少条一页
      cashIndex: 1, //初始页码
    };
  },
  methods: {
    handleClick(tab, event) {
    },
    //收支搜索
    incomeSearch(info) {
    },
    // 提现搜索
    cashSearch(info) {
    },
    // 收支表格方法
    handleincomeChange(obj) {
    },
    //分页按钮触发方法
    handleIncomeCurrentChange(obj) {
      this.incomeIndex = obj.multipleSelection;
      //this.getFlow();
    },
    goIncomeCurrentPage(obj) {
      this.incomeIndex = obj.multipleSelection;
      //this.getFlow();
    },
    // 提现表格方法
    handleCashChange(obj) {
    },
    //分页按钮触发方法
    handleCashCurrentChange(obj) {
      this.cashIndex = obj.multipleSelection;
      //this.getFlow();
    },
    goCashCurrentPage(obj) {
      this.cashIndex = obj.multipleSelection;
      //this.getFlow();
    },
  },
};
</script>
<style lang="less" scpoed>
.agentAccount {
  .account {
    padding-top: 23px;
    padding-left: 32px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    .icon {
      margin-top: 8px;
      width: 4px;
      height: 16px;
      background: #3370ff;
      margin-right: 6px;
    }
    .accountTitle {
      font-size: 14px;
      height: 16px;
      line-height: 32px;
      color: #333;
      margin-right: 21px;
    }
    .money {
      font-family: Arial;
      color: rgba(255, 138, 0, 1);
      font-size: 16px;
      line-height: 32px;
      margin-right: 21px;
    }
    .recharge {
      width: 64px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 4px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      margin-right: 12px;
      font-size: 13px;
    }
    .withdraw {
      width: 62px;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 224, 227, 1);
      border-radius: 4px;
      line-height: 30px;
      text-align: center;
      color: #333;
      font-size: 13px;
    }
    .cashManage {
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      color: #3370ff;
      margin-left: 16px;
    }
    /deep/.flowMotion {
      padding: 0 13px;
      height: 32px;
      background: rgba(245, 246, 247, 1);
      border-radius: 16px;
      line-height: 32px;
      text-align: center;
      .el-checkbox__label {
        color: #999;
      }
      .el-checkbox__inner {
        border-radius: 50%;
      }
      margin-right: 35px;
    }
    /deep/.SIMmotion {
      padding: 0 13px;
      height: 32px;
      background: rgba(245, 246, 247, 1);
      border-radius: 16px;
      line-height: 32px;
      text-align: center;
      .el-checkbox__label {
        color: #999;
      }
      .el-checkbox__inner {
        border-radius: 50%;
      }
      margin-right: 23px;
    }
  }
  .cont {
    margin-top: 16px;
    height: 627px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    border-radius: 5px 5px 5px 5px;
    padding: 28px 30px 16px 30px;
    color: #333;
    .detailTable {
      .advancedSearch {
        .addPackage {
          width: 64px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 4px;
          line-height: 32px;
          text-align: center;
          font-size: 13px;
          color: #333;
          .balance-arrow{
            top:10px;
          }
        }
      }
    }
    .tableList {
      margin-top: 16px;
    }
  }
}
</style>
