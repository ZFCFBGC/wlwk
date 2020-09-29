<template>
  <div class="auditManage">
    <div class="advancedSearch clearfix">
      <div class="search fl clearfix">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="addPackage fr">{{this.$t('localization.Export')}}</div>
    </div>
    <div class="auditTable">
      <swd-table
        :more="false"
        :table="tableAll"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :total="total"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @goCurrentPage="goCurrentPage"
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
    <!-- 详情弹窗 -->
    <div v-if="detailShow">
      <audit-pop :type="active" @cancel="detailCancel"></audit-pop>
    </div>
  </div>
</template>
<script>
import searchPanel from "../searchPanel/searchPanel.vue";
import swdTable from "../swdTable/swdTable1.vue";
import auditPop from "./auditPop.vue";
export default {
  components: {
    swdTable,
    searchPanel,
    auditPop
  },
  props: {
    active: {
      type: String,
      default: "first"
    }
  },
  watch: {
    active(newValue, oldValue) {
      // this.total = newValue;
    }
  },
  data() {
    return {
      detailShow: false,
      searchConfig: {
        form: []
      },
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  created() {
    if (this.active == "first") {
      this.tableLabel = [
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "tCFlow", title: $t('localization.Username') },
        { prop: "tCVoice", title: $t('localization.MSum') },
        { prop: "", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.SubmitTime') },
        { prop: "", title: "处理时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ];
      this.searchConfig = {
        form: [
          {
            label: `${this.$t('localization.SubmitTime')}：`,
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
            label: `${this.$t('localization.ClientName')}：`,
            key: "package",
            type: "tree",
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
            label: `${this.$t('localization.Status')}：`,
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All')
              },
              {
                value: "0",
                label: "待审核"
              },
              {
                value: "1",
                label: "审核不通过"
              },
              {
                value: "2",
                label: "审核通过"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          }
        ]
      };
      this.tableAll = {
        select: false,
        handle: true,
        type: false
      };
    } else if (this.active == "second") {
      this.tableLabel = [
        { prop: "packName", title: $t('localization.Username') },
        { prop: "tCFlow", title: "账户类型" },
        { prop: "tCVoice", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.SubmitTime') },
        { prop: "", title: "处理时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ];
      this.searchConfig = {
        form: [
          {
            label: `${this.$t('localization.SubmitTime')}：`,
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
            label: `${this.$t('localization.ClientName')}：`,
            key: "package",
            type: "tree",
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
            label: `${this.$t('localization.Status')}：`,
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All')
              },
              {
                value: "0",
                label: "待审核"
              },
              {
                value: "1",
                label: "审核不通过"
              },
              {
                value: "2",
                label: "审核通过"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          }
        ]
      };
      this.tableAll = {
        select: false,
        handle: true,
        type: true
      };
    } else {
      this.tableLabel = [
        { prop: "packName", title: this.$t('localization.OrderNumber') },
        { prop: "tCFlow", title: $t('localization.Username') },
        { prop: "tCVoice", title: "充值金额" },
        { prop: "tCVoice", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.SubmitTime') },
        { prop: "", title: "处理时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ];
      this.searchConfig = {
        form: [
          {
            label: `${this.$t('localization.SubmitTime')}：`,
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
            label: `${this.$t('localization.ClientName')}：`,
            key: "package",
            type: "tree",
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
            label: `${this.$t('localization.Status')}：`,
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All')
              },
              {
                value: "0",
                label: "待审核"
              },
              {
                value: "1",
                label: "审核不通过"
              },
              {
                value: "2",
                label: "审核通过"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          }
        ]
      };
      this.tableAll = {
        select: false,
        handle: true,
        type: false
      };
    }
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
    goSearch(info) {
    },
    detailCancel() {
      this.detailShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.auditManage {
  min-height: 600px;
  .advancedSearch {
    padding: 0px 0 16px 0;
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
  }
}
</style>
