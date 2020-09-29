<template>
  <div class="charger-record">
    <div class="advanced-search">
      <div class="search">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <el-button class="export"
        >{{ this.$t("localization.Export")
        }}<img
          class="export-arrow"
          src="@/assets/images/export.png"
          alt="export"
      /></el-button>
      <!-- <el-button class="export-charge">导入续费</el-button> -->
    </div>
    <!-- 表格组件 -->
    <div class="pakageTable">
      <swd-table
        :table="tableAll"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :total="total"
        :more="false"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @goCurrentPage="goCurrentPage"
      >
      </swd-table>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    searchPanel,
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.RechargeDate')}：`,
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
            label: this.$t('localization.OrderNumber'),
            key: "orderNumber",
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
            label: this.$t('localization.RechargeUser'),
            key: "package",
            type: "tree",
            value: "",
            placeholder: this.$t('localization.HClient'),
          },
          {
            label: this.$t('localization.RechargeType'),
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All'),
              },
              {
                value: "0",
                label: this.$t('localization.RenewSimCard'),
              },
              {
                value: "1",
                label: this.$t('localization.FlowCharge'),
              },
              {
                value: "2",
                label: this.$t('localization.FlowCharge'),
              },
            ],
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
          {
            label: "充值方式：",
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All'),
              },
              {
                value: "0",
                label: this.$t('localization.RenewSimCard'),
              },
              {
                value: "1",
                label: this.$t('localization.FlowCharge'),
              },
              {
                value: "2",
                label: this.$t('localization.FlowCharge'),
              },
            ],
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
        ],
      },
      tableAll: {
        select: false,
        handle: false,
        type: false,
      },
      tableData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      total: 100, //总条数
      tableLabel: [
        { prop: "", title: this.$t('localization.OrderNumber') },
        { prop: "", title: this.$t('localization.CardNum') },
        { prop: "packName", title: this.$t('localization.MSum') },
        { prop: "", title: "充值客户" },
        { prop: "", title: this.$t('localization.RechargeType') },
        { prop: "", title: "内容" },
        { prop: "", title: "充值方式" },
        { prop: "", title: this.$t('localization.ApplicationTime') },
        { prop: "", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.ChargeTime') },
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
    };
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
    getFlow() {},
    // 搜索内容
    goSearch(info) {
    },
  },
};
</script>
<style lang="less" scoped>
.charger-record {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .advanced-search {
    display: flex;
    padding: 14px 27px 14px 32px;
    /deep/.export,
    .export-charge {
      height: 34px;
      padding: 8px 16px;
      border-radius: 4px;
      border: 0;
      border: 1px solid rgba(222, 224, 227, 1);
      margin-left: 14px;
      font-size: 13px;
      position: relative;
    }
    .export-charge {
      background-color: rgba(51, 112, 255, 1);
      color: #fff;
    }
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
      margin-left: 12px;
    }
    .exportPackage {
      width: 102px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 4px;
      line-height: 32px;
      text-align: center;
      font-size: 13px;
      color: #fff;
    }
  }
  .pakageTable {
    margin: 0 27px 0 32px;
    border-radius: 10px;
    border-bottom: 0 none;
  }
}
</style>
