<template>
  <div class="reportForms">
    <div class="container">
      <div class="condition clearfix">
        <div class="fl">
          <search-panel
            :searchConfig="searchConfig"
            @search="goSearch"
          ></search-panel>
        </div>
        <div class="fr exportBtn pointer" @click="getExport">
          {{ this.$t("localization.Export")
          }}<img
            class="export-arrow"
            src="@/assets/images/export.png"
            alt="export"
          />
        </div>
      </div>
      <div class="user-data">
        <span class="flowAll"> {{$t('localization.PackageData')}}：{{ totalTCFlow }}G </span>
        <span class="flowUser"> {{$t('localization.UsedData')}}：{{ totalUseFlow }}G </span>
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
import swdTable from "../../components/swdTable/swdTable";
import userTree from "../../components/common/userTree";
import searchPanel from "../../components/searchPanel/searchPanel";
export default {
  components: {
    swdTable,
    userTree,
    searchPanel,
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.Time')}：`,
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
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {},
            },
          },
          {
            label: `${this.$t('localization.ContainsLower')}：`,
            key: "lower",
            type: "checkBox",
            value: false,
          },
        ],
      },
      tableAll: {
        select: false,
        handle: false,
        type: true,
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID" },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "useFlow", title: `${this.$t('localization.UsedData')}（M）` },
      ],
      timers: null, //时间
      package: "", //客户
      userId: "", //客户id
      isClient: false, //是否显示下拉客户
      cardNumber: "", //卡号
      lower: false, //是否选中
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      startTime: "", //开始时间
      endTime: "", //结束时间
      totalTCFlow: "", //套餐流量
      totalUseFlow: "", //使用流量
    };
  },
  created() {
    this.getFlow();
  },
  methods: {
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
    //获取数据
    getFlow() {
      var url = `/statistics/queryFlowStatisticsPage.do`;
      this.$client
        .get(url, {
          cardNo: this.cardNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          userId: this.userId,
          isHaveChild: this.lower ? "1" : "0",
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == "200") {
            this.tableData = res.data.flowStatisticsList || [];
            this.total = res.data.totalCount || null;
            if (res.data.totalUseFlow) {
              this.totalUseFlow = Tools.upFixed(
                res.data.totalUseFlow / 1024,
                4
              );
              this.totalTCFlow = Tools.upFixed(res.data.totalTCFlow / 1024, 4);
            }
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
      var url = `/statistics/exportFlowStatistics.do`;
      this.$client.downLoad(url, {
        cardNo: this.cardNumber,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: this.userId,
        isHaveChild: this.lower ? "1" : "0",
      });
    },
    // 搜索内容
    goSearch(info) {
      this.cardNumber = info.cardNumber;
      this.userId = info.userId;
      this.lower = info.lower;
      this.startTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.getFlow();
    },
  },
  beforeDestroy() {
    this.timers = null; //时间
    this.clientOptions = []; //客户列表数据
    this.client = ""; //客户
    this.cardNumber = ""; //卡号
    this.lower = false; //是否选中
    this.pageSize = 15; //默认多少条一页
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
    .condition {
      border-bottom: 1px solid #e9eaf2;
      padding-bottom: 17px;
      .exportBtn {
        width: 64px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 4px;
        line-height: 32px;
        font-size: 13px;
        color: #333;
        text-align: center;
        position: relative;
      }
    }
    .user-data {
      padding:18px 0;
      .flowAll {
        height: 14px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 41, 41, 1);
        line-height: 18px;
      }
      .flowUser {
        padding-left: 14px;
        height: 14px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 41, 41, 1);
        line-height: 18px;
      }
    }
    .flowTable {
      //border: 1px solid #dedede;
      border-radius: 10px;
      border-bottom: 0 none;
    }
  }
}
</style>
