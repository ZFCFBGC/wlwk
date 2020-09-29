<template>
  <div class="reportForms">
    <div class="container">
      <div class="pre-search">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
        <div class="export">
          <el-button
            >{{ this.$t("localization.Export") }}
            <img
              class="export-arrow"
              src="@/assets/images/export.png"
              alt="export"
          /></el-button>
        </div>
      </div>

      <div class="flowTable">
        <swd-table
          :table="tableAll"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :total="total"
          @handleSelectionChange="handleSelectionChange"
          @handleCurrentChange="handleCurrentChange"
          @goCurrentPage="goCurrentPage"
        ></swd-table>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable.vue";
import userTree from "../../components/common/userTree.vue";
import searchPanel from "../../components/searchPanel/searchPanel";

export default {
  components: {
    swdTable,
    userTree,
    searchPanel,
  },
  data() {
    return {
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.OperateTime')}：`,
            key: "timers",
            type: "datePicker",
            value: [],
            config: {
              type: "daterange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期",
            },
          },
          {
            label: `${this.$t('localization.Customer')}：`,
            key: "package",
            type: "tree",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
          {
            label: this.$t('localization.CardNum'),
            key: "cardNumber",
            type: "input",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {},
            },
          },
          {
            label: `${this.$t('localization.Type')}：`,
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: "国内短信",
              },
              {
                value: "2",
                label: "国外短信",
              },
            ],
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
          {
            label: `${this.$t('localization.ContainsLower')}：`,
            key: "lower",
            type: "checkBox",
            value: false,
          },
        ],
      },
      isClient: false,
      options: [
        {
          value: "",
          label: this.$t('localization.All'),
        },
        {
          value: "1",
          label: this.$t('localization.ModifyPackagePrice'),
        },
        {
          value: "2",
          label: this.$t('localization.TransferPriceAdj'),
        },
      ],
      typeValue: "", //类型
      tableAll: {
        select: false,
        handle: false,
        type: true,
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID", width: 200 },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "oldVal", title: "原价格（元）" },
        { prop: "changeVal", title: "价格变动（元）" },
        { prop: "newVal", title: "调价后价格（元）" },
        { prop: "type", title: this.$t('localization.Type'), width: 100 },
        { prop: "handletime", title: this.$t('localization.OperateTime') },
        { prop: "handletime", title: "完成时间" },
        { prop: "handleAutor", title: `${this.$t('localization.Operator')}`, width: 100 },
      ],
      timers: null, //时间
      clientOptions: [], //客户列表数据
      client: "", //客户
      cardNumber: "", //卡号
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      startTime: "", //开始时间
      endTime: "", //结束时间
    };
  },
  created() {
    this.getFlow();
  },
  methods: {
    goClient() {
      this.isClient = !this.isClient;
    },
    goSearch() {},
    //客户选择触发
    getNode(obj) {
      this.client = obj.multipleSelection.nickname;
      this.userId = obj.multipleSelection.userId;
      this.isClient = false;
    },
    //表格子组件选择框触发方法
    handleSelectionChange(obj) {
    },
    //分页按钮触发方法
    handleCurrentChange(obj) {
      this.pageIndex = obj.multipleSelection;
      this.getFlow();
    },
    goCurrentPage(obj) {
      this.pageIndex = obj.multipleSelection;
      this.getFlow();
    },
    //用户确认选定的值时触发
    timeConfirm(e) {
      this.startTime = this.timers[0];
      this.endTime = this.timers[1];
    },
    //获取数据
    getFlow() {
      var url = `/statistics/queryFlowStatisticsPage.do`;
      this.$client
        .get(url, {
          cardNo: this.cardNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          userId: "",
          isInternational: "",
          isHaveChild: this.lower ? "1" : "0",
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == "200") {
            this.tableData = res.data.flowStatisticsList || [];
            this.total = res.data.totalCount || null;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code,
            });
          }
        });
    },
    //导出报表
    getExport() {
      var url = `statistics/exportFlowStatistics.do`;
      this.$client.downLoad(url, {
        cardNo: this.cardNumber,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: "",
        isInternational: "",
        isHaveChild: this.lower ? "1" : "0",
      });
    },
  },
  beforeDestroy() {
    this.timers = null; //时间
    this.clientOptions = []; //客户列表数据
    this.client = ""; //客户
    this.cardNumber = ""; //卡号
    this.lower = false; //是否选中
    this.pageSize = 10; //默认多少条一页
    this.pageIndex = 1; //初始页码
    this.startTime = ""; //开始时间
    this.endTime = ""; //结束时间
    this.originName = ""; //判断是哪个统计页面
  },
};
</script>
<style lang="less" scoped>
.reportForms {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .container {
    padding: 14px 27px 0 24px;
    .pre-search {
      display: flex;
      justify-content: space-between;
      /deep/.export {
        display: inline-block;
        .el-button {
          height: 32px;
          padding: 0 19px;
          position: relative;
          .el-button__inner {
            height: 32px;
            line-height: 32px;
          }
        }
      }
    }

    .condition {
      display: flex;
      //height: 60px;
      .dates {
        width: 292px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px 3px 3px 3px;
        height: 32px;
        position: relative;
        .dateTitle {
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          color: #888888;
          position: absolute;
          left: 14px;
          top: 0;
        }
        /deep/.dateChoice {
          position: absolute;
          right: 0;
          top: 0;
          .el-input__inner {
            border: 0 none;
            height: 32px;
            width: 242px;
            line-height: 32px;
          }
          .el-date-editor .el-range__icon {
            line-height: 28px;
          }
          .el-date-editor .el-range-separator {
            line-height: 28px;
            color: #999;
          }
        }
      }
      .client {
        margin-left: 12px;
        width: 202px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px 3px 3px 3px;
        height: 32px;
        position: relative;
        .clientInfo {
          position: absolute;
          width: 200px;
          height: 200px;
          left: 0;
          top: 33px;
          overflow-y: auto;
          z-index: 1000000;
          background: #fff;
        }
        .clientTitle {
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          color: #888888;
          position: absolute;
          left: 14px;
          top: 0;
        }
        /deep/.clientChoice {
          position: absolute;
          right: 0;
          top: 0;
          .el-input__inner {
            border: 0 none;
            height: 32px;
            line-height: 32px;
            width: 120px;
          }
          .el-input__prefix,
          .el-input__suffix {
            top: -4px;
          }
        }
      }
      .cardNumber {
        margin-left: 12px;
        width: 193px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px 3px 3px 3px;
        height: 32px;
        position: relative;
        .cardTitle {
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          color: #888888;
          position: absolute;
          left: 14px;
          top: 0;
        }
        /deep/.cardShuru {
          position: absolute;
          right: 0;
          top: 0;
          .el-input__inner {
            border: 0 none;
            height: 32px;
            line-height: 32px;
            width: 140px;
          }
        }
      }
      .type {
        margin-left: 12px;
        width: 193px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px 3px 3px 3px;
        height: 32px;
        position: relative;
        .typeTitle {
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          color: #888888;
          position: absolute;
          left: 14px;
          top: 0;
        }
        /deep/.typeChoice {
          position: absolute;
          right: 0;
          top: 0;
          .el-input .el-input__suffix {
            top: 3px;
          }
          .is-focus .el-input__suffix {
            top: -3px;
          }
          .el-input__inner {
            border: 0 none;
            height: 32px;
            line-height: 32px;
            width: 110px;
          }
        }
      }
      .btnArr {
        margin-left: 20px;
        .search {
          width: 64px;
          height: 30px;
          background: rgba(51, 112, 255, 1);
          border-radius: 4px;
          border: 1px solid #3370ff;
          display: inline-block;
          font-size: 13px;
          color: rgba(255, 255, 255, 1);
          line-height: 32px;
          text-align: center;
        }
        .report {
          margin-left: 12px;
          width: 64px;
          height: 30px;
          border: 1px solid #dedede;
          border-radius: 4px;
          display: inline-block;
          font-size: 13px;
          color: #666;
          line-height: 32px;
          text-align: center;
        }
      }
    }
    .flowTable {
      margin-top: 28px;
      border-radius: 10px;
      border-bottom: 0 none;
    }
  }
}
</style>
