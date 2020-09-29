<template>
  <div class="phoneCardRef">
    <div class="advancedSearch clearfix">
      <div class="search fl clearfix">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="addPackage pointer fr" @click="goPop('add')">+&nbsp;{{$t('localization.New')}}</div>
    </div>
    <div class="pakageTable">
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
          <div class="handle" @click="goDetails(props.row)">{{$t('localization.Details')}}</div>
        </template>
      </swd-table>
    </div>
    <!-- 卡刷新详情弹窗 -->
    <div class="details" v-if="isCardDetails">
      <div class="mask" @click="goDetailsClose"></div>
      <div class="detailsTable">
        <div class="header clearfix">
          <div class="title fl">{{$t('localization.ViewDetail')}}</div>
          <div class="close pointer fr" @click="goDetailsClose">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div>
          <swd-table
            :more="false"
            :table="detailsTableAll"
            :tableData="detailsTableData"
            :tableLabel="detailsTableLabel"
            :total="detailsTotal"
            :pageSize="detailsPageSize"
            :maxHeight="500"
            @handleSelectionChange="handleDetailsChange"
            @handleCurrentChange="detailsCurrentChange"
            @goCurrentPage="goDetailsPage"
          >
            <template
              slot-scope="props"
              v-if="props.row != undefined"
              slot="handle"
            >
              <div class="handle">
                {{ props.row.status == 4 ? "重新执行" : "-" }}
              </div>
            </template>
          </swd-table>
        </div>
      </div>
    </div>
    <!-- 卡刷新详情结束 -->
    <div v-if="isPop">
      <refresh-pop :popInfo="popInfo" @handleIsPop="handleIsPop"></refresh-pop>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
import refreshPop from "../../components/common/refreshPop.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    refreshPop,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
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
            label: `${this.$t('localization.Status')}：`,
            key: "status",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: `${this.$t('localization.ShowAll')}`
              },
              {
                value: "1",
                label: `${this.$t('localization.Pending')}`
              },
              {
                value: "2",
                label: `${this.$t('localization.InProcess')}`
              },
              {
                value: "3",
                label: `${this.$t('localization.SucceedProcess')}`
              },
              {
                value: "4",
                label: `${this.$t('localization.FailProcess')}`
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
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
        { prop: "cardNo", title: this.$t('localization.CardNum'), width: 160 },
        { prop: "corresponding", title: "ICCID", width: 160 },
        { prop: "importCardStatus1", title: this.$t('localization.CardStatus') },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "nickname", title: `${this.$t('localization.BelongsUser')}`, width: 160 },
        { prop: "tCFlow", title: `${this.$t('localization.FlowSize')}（M）`, width: 160 },
        { prop: "tCVoice", title: `${this.$t('localization.VoiceSize')}（min）`, width: 160 },
        { prop: "testFlow", title: `${this.$t('localization.ExcessFlow')}（M）`, width: 160 },
        { prop: "isOverstepFlow", title: `${this.$t('localization.TestData')}（M）`, width: 160 },
        { prop: "status1", title: this.$t('localization.Status'), width: 120 },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true, width: 120 }
      ],
      detailsPageSize: 10, //默认多少条一页
      detailsPageIndex: 1, //初始页码
      isCardDetails: false,
      //详情表格数据结束

      popInfo: {},
      isPop: false,
      tableAll: {
        select: false,
        handle: true,
        type: false
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "id", title: this.$t('localization.Batch') },
        { prop: "cardsCount", title: "条数" },
        { prop: "nickname", title: `${this.$t('localization.Operator')}` },
        { prop: "submitTime", title: this.$t('localization.SubmitTime') },
        { prop: "status1", title: this.$t('localization.Status') },
        { prop: "startTime", title: "开始处理时间" },
        { prop: "endTime", title: `${this.$t('localization.EndTime')}` },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      total: null,
      beginTime: "",
      endTime: "",
      status: "",
      id: ""
    };
  },
  created() {
    this.getFlow();
  },
  methods: {
    goPop() {
      this.popInfo.title = this.$t('localization.InvalidCardImport');
      this.isPop = true;
    },
    //子组件关闭弹窗
    handleIsPop() {
      this.isPop = false;
      this.getFlow();
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
    //获取数据
    getFlow() {
      var url = "/card/queryCardsRefreshPage.do";
      this.$client
        .get(url, {
          beginTime: this.beginTime,
          endTime: this.endTime,
          status: this.status,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data || [];
            this.tableData.map(item => {
              if (item.status == 1) {
                item.status1 = this.$t('localization.Pending');
              } else if (item.status == 2) {
                item.status1 = this.$t('localization.InProcess');
              } else if (item.status == 3) {
                tem.status1 = this.$t('localization.SucceedProcess');
              } else {
                tem.status1 = this.$t('localization.FailProcess');
              }
            });
            this.total = res.total || null;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //编辑按钮
    goDetails(info) {
      this.isCardDetails = true;
      this.id = info.id;
      this.getDetailsData();
    },
    // 搜索内容
    goSearch(info) {
      this.beginTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.status = info.status;
      this.getFlow();
    },

    // 详情表格方法开始
    //表格子组件选择框触发方法
    goDetailsClose() {
      this.isCardDetails = false;
    },
    handleDetailsChange(obj) {
    },
    //分页按钮触发方法
    detailsCurrentChange(obj) {
      this.pageIndex = obj.multipleSelection;
      // this.getFlow();
    },
    goDetailsPage(obj) {
      this.pageIndex = obj.multipleSelection;
      // this.getFlow();
    },
    //获取详情数据
    getDetailsData() {
      var url = "/card/queryCardsRefreshDetails.do";
      this.$client
        .get(url, {
          id: this.id
        })
        .then(res => {
          if (res.code == 200) {
            this.detailsTableData = res.data || [];
            this.detailsTableData.map(item => {
              if (item.status == 1) {
                item.status1 = this.$t('localization.Pending');
              } else if (item.status == 2) {
                item.status1 = this.$t('localization.InProcess');
              } else if (item.status == 3) {
                tem.status1 = this.$t('localization.SucceedProcess');
              } else {
                tem.status1 = this.$t('localization.FailProcess');
              }
              if (item.importCardStatus == "1") {
                item.importCardStatus1 = "沉默期";
              } else if (item.importCardStatus == "2") {
                item.importCardStatus1 = this.$t('localization.Active');
              } else {
                item.importCardStatus1 = this.$t('localization.TestPeriod');
              }
            });
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    }
    //详情表格结束
  }
};
</script>
<style lang="less" scoped>
.phoneCardRef {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .advancedSearch {
    padding: 14px 27px 14px 32px;
    .packageBtn {
      margin-left: 12px;
      width: 64px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 4px;
      line-height: 32px;
      text-align: center;
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .addPackage {
    width: 81px;
    height: 32px;
    background: rgba(51, 112, 255, 1);
    border-radius: 4px;
    line-height: 32px;
    text-align: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
  }
  .pakageTable {
    margin: 28px 27px 0 32px;
    margin-top: 28px;
    border-radius: 10px;
    border-bottom: 0 none;
    .handle {
      display: inline-block;
      font-size: 12px;
      color: #3370ff;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 999;
  }
  .detailsTable {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1180px;
    height: 595px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
    transform: translate(-50%, -50%);
    padding: 0 31px;
    .header {
      padding-top: 26px;
      height: 69px;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 14px;
        height: 14px;
        // background: brown;
      }
    }
  }
}
</style>
