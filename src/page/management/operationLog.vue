<template>
  <div class="operationLog">
    <div class="tips">
      {{this.$t('localization.OperationTip')}}
    </div>
    <div class="operationCont">
      <div class="condition clearfix">
        <div class="fl">
          <search-panel
            :searchConfig="searchConfig"
            @search="goSearch"
          ></search-panel>
        </div>
        <div class="fr export-btn pointer">
          {{this.$t('localization.Export')}}<img
                      class="export-arrow"
                      src="@/assets/images/export.png"
                      alt="export"
                  />
        </div>
      </div>
      <div class="operationTable">
        <swd-table
          :table="tableAll"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :total="total"
          :more="false"
        >
        </swd-table>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
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
            label: this.$t('localization.Role'),
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: `${this.$t('localization.ShowAll')}`
              },
              {
                value: "2",
                label: "admin"
              },
              {
                value: "3",
                label: this.$t('localization.Finance')
              },
              {
                value: "4",
                label: "业务"
              },
              {
                value: "5",
                label: "终端用户"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: "姓名账号：",
            key: "cardNumber",
            type: "input",
            value: "",
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {}
            }
          },
          {
            label: `${this.$t('localization.OperateTime')}：`,
            key: "timers",
            type: "datePicker",
            value: [],
            config: {
              type: "daterange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期"
            }
          }
        ]
      },
      tableAll: {
        select: false,
        handle: false,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "", title: this.$t('localization.LoginID') },
        { prop: "", title: this.$t('localization.Name1') },
        { prop: "", title: this.$t('localization.Role') },
        { prop: "", title: this.$t('localization.OperateTime') },
        { prop: "", title: this.$t('localization.IPAddress') },
        { prop: "", title: this.$t('localization.DetailContent'),}
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  methods: {
    // 搜索内容
    goSearch(info) {
    }
  }
};
</script>
<style lang="less" scoped>
.operationLog {
  margin-top:20px;
  .tips {
    line-height: 13px;
    font-size: 13px;
    color: rgba(134, 145, 163, 1);
  }
  .operationCont {
    margin-top: 16px;
    height: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    border-radius: 5px 5px 5px 5px;
    padding: 16px 30px;
    .condition {
      border-bottom: 1px solid #e9eaf2;
      padding-bottom: 17px;
      .export-btn {
        position: relative;
        width: 64px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 4px;
        line-height: 32px;
        font-size: 13px;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
