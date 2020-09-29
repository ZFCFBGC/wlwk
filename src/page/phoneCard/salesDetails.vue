<template>
  <div class="salesDetails">
    <div class="search">
      <search-panel
        :searchConfig="searchConfig"
        @search="goSearch"
      ></search-panel>
    </div>
    <div class="salesDetailsTable">
      <swd-table
        :table="detailsTableAll"
        :tableData="detailsTableData"
        :tableLabel="detailsTableLabel"
        :total="detailsTotal"
        @handleSelectionChange="detailsCurrentChange"
        @handleCurrentChange="detailsCurrentChange"
        @goCurrentPage="goDetailsPage"
      >
      </swd-table>
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
            label: "",
            key: "selectItem",
            type: "selectTwo",
            value: "0",
            placeholder: this.$t('localization.SelectPlaceholder'),
            options: [
              {
                label: this.$t('localization.CardNum'),
                value: "0"
              },
              {
                label: "ICCID",
                value: "1"
              }
            ]
          },
          {
            label: "",
            key: "searchItem",
            type: "inputTwo",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {}
            }
          }
        ]
      },
      // 详情表格数据开始
      detailsTableAll: {
        select: false,
        handle: false,
        type: true
      },
      detailsTableData: [],
      detailsTotal: null, //总条数
      detailsTableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID", width: 160 },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "tCFlow", title: `${this.$t('localization.DataSize')}（M）` },
        { prop: "tCVoice", title: `${this.$t('localization.VoiceSize')}（min）` },
        { prop: "isOverstepFlow", title: `${this.$t('localization.ExcessFlow')}（M）` },
        { prop: "testFlow", title: `${this.$t('localization.TestData')}（M）` },
        { prop: "packPrice5", title: `${this.$t('localization.SingleMonth')}/年价格（元）` },
        { prop: "flowPrice", title: `${this.$t('localization.FlowPrice')}（${this.$t('localization.HYuan')}/M）` },
        { prop: "voicePrice", title: `${this.$t('localization.VoicePrice')}（${this.$t('localization.HYuan')}/30min）`, width: 160 },
        { prop: "packPrice1", title: "续费价格（元）" }
      ],
      detailsPageSize: 15, //默认多少条一页
      detailsPageIndex: 1, //初始页码
      isCardDetails: false,
      importId: "", //批次号—-请求的数据
      selectItem: "", //筛选条件
      searchItem: ""
    };
  },
  created() {
    if (this.$route.query.importId) {
      this.importId = this.$route.query.importId;
      this.getCardDetails();
    }
  },
  methods: {
    // 搜索内容
    goSearch(info) {
      this.selectItem = info.selectItem;
      this.searchItem = info.searchItem;
      this.getCardDetails();
    },
    // 详情表格方法开始
    //表格子组件选择框触发方法
    handleDetailsChange(obj) {
    },
    //分页按钮触发方法
    detailsCurrentChange(obj) {
      this.detailsPageIndex = obj.multipleSelection;
      this.getCardDetails();
    },
    goDetailsPage(obj) {
      this.detailsPageIndex = obj.multipleSelection;
      this.getCardDetails();
    },
    // 获取卡导入详情数据
    getCardDetails() {
      var url = "/card/queryImportCardsDetailsPage.do";
      this.$client
        .get(url, {
          selectItem: this.selectItem,
          searchItem: this.searchItem,
          importId: this.importId, //批次号
          pageSize: this.detailsPageSize,
          pageIndex: this.detailsPageIndex
        })
        .then(res => {
          if (res.code == 200) {
            this.detailsTableData = res.data || [];
            this.detailsTableData.map(item => {
              if (item.status == 1) {
                item.status1 = "沉默期";
              } else if (item.status == 2) {
                item.status1 = this.$t('localization.Active');
              } else {
                item.status1 = this.$t('localization.TestPeriod');
              }
            });
            this.detailsTotal = res.total;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.salesDetails {
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  .search {
    padding: 12px 29px 17px 29px;
    height: 32px;
  }
  .salesDetailsTable {
    padding: 0 29px 0 29px;
  }
}
</style>
