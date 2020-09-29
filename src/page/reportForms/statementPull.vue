<template>
  <div class="reportForms">
    <div class="container">
      <div class="condition clearfix">
        <div class="fl">
          <search-panel :searchConfig="searchConfig" @search="goSearch"></search-panel>
        </div>
        <div class="fr exportBtn pointer" @click="getExport">{{$t('localization.Export')}}<img
                      class="export-arrow"
                      src="@/assets/images/export.png"
                      alt="export"
                  /></div>
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
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.CreateDate')}：`,
            key: "timers",
            type: "datePicker",
            value: [],
            config: {
              type: "daterange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期"
            }
          },
          {
            label: `${this.$t('localization.Customer')}：`,
            key: "package",
            type: "tree",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: `${this.$t('localization.PackageType')}：`,
            key: "packId",
            type: "selectT",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder')
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
              validator: () => {}
            }
          },
          {
            label: `${this.$t('localization.OperationType')}：`,
            key: "operationType",
            type: "select",
            value: "",
            options: [
              {
                value: "",
                label: this.$t('localization.All')
              },
              {
                value: "1",
                label: this.$t('localization.FlowOff')
              },
              {
                value: "2",
                label: this.$t('localization.CardOff')
              },
              {
                value: "4",
                label: this.$t('localization.FlowOpen1')
              },
              {
                value: "3",
                label: this.$t('localization.CardOpen1')
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: `${this.$t('localization.ContainsLower')}：`,
            key: "lower",
            type: "checkBox",
            value: false
          }
        ]
      },
      packId: null, //套餐类型
      operationType: "", //操作类型
      tableAll: {
        select: false,
        handle: false,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID", width: 200 },
        { prop: "packName", title: this.$t('localization.PackageType') },
        { prop: "cardType1", title: this.$t('localization.CardType'), width: 100 },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "operationTypeName", title: this.$t('localization.OperationType'), width: 100 },
        { prop: "createTime", title: this.$t('localization.CreateDate') },
        { prop: "startTime", title: "开始执行时间" },
        { prop: "operationResult1", title: "执行状态", width: 100 },
        { prop: "execCount", title: this.$t('localization.CallTimes'), width: 100 },
        { prop: "dealResultCode1", title: "结果", width: 100 }
      ],
      creationOptions: [],
      timers: null, //时间
      package: "", //客户
      isClient: false, //是否显示下拉客户
      cardNumber: "", //卡号
      lower: false, //是否选中
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      startTime: "", //开始时间
      endTime: "" //结束时间
    };
  },
  created() {
    this.getFlow();
    this.goPackage();
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
      var url = `/statistics/queryOpenAndStopStatisticsPage.do`;
      this.$client
        .get(url, {
          cardNo: this.cardNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          userId: this.userId,
          packId: this.packId,
          operationType: this.operationType,
          selectTimeType: this.selectTimeType,
          isHaveChild: this.lower ? "1" : "0",
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == "200") {
            this.tableData = res.data || [];
            this.total = res.total || null;
            this.tableData.map(item => {
              item.createTime = item.createTime.substring(0, 10);
              item.startTime = item.startTime.substring(0, 10);
              if (
                item.cardType == "5" ||
                item.cardType == "6" ||
                item.cardType == "7" ||
                item.cardType == "11"
              ) {
                item.cardType1 = "国际卡";
              } else {
                item.cardType1 = "国内卡";
              }
              if (item.operationResult == "1") {
                item.operationResult1 = "已执行";
              } else if (item.operationResult == "2") {
                item.operationResult1 = "未处理";
              } else if (item.operationResult == "3") {
                item.operationResult1 = "已处理";
              } else {
                item.operationResult1 = "未执行";
              }
              if (item.dealResultCode == 1) {
                item.dealResultCode1 = "失败";
              } else {
                item.dealResultCode1 = "成功";
              }
              return;
            });
          }else{
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //导出报表
    getExport() {
      var url = `/statistics/exportOpenAndStopStatistics.do`;
      this.$client.downLoad(url, {
        cardNo: this.cardNumber,
        userId: this.userId,
        packId: this.packId,
        operationType: this.operationType,
        selectTimeType: this.selectTimeType,
        isHaveChild: this.lower ? "1" : "0"
      });
    },
    // 搜索内容
    goSearch(info) {
      this.cardNumber = info.cardNumber;
      this.userId = info.userId;
      this.lower = info.lower;
      this.packId = info.packId;
      this.operationType = info.operationType;
      this.startTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.getFlow();
    },
    //获取套餐列表
    goPackage() {
      var url = "/package/queryPackageNameByUserId.do";
      this.$client.get(url).then(res => {
        if (res.code == 200) {
          this.creationOptions = res.data || [];
          this.creationOptions.map(item => {
            item.label = item.packName;
            item.value = item.packID;
            return;
          });
        }
      });
    },
    //select套餐值改变
    getPackId() {
    }
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
  }
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
    .flowTable {
      margin-top: 28px;
      border-radius: 10px;
      border-bottom: 0 none;
      overflow-x: auto;
    }
  }
}
</style>
