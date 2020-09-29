<template>
  <div class="phoneCardSal">
    <div class="advancedSearch clearfix">
      <div class="search fl clearfix">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="add-package pointer fr" @click="goPop()">+&nbsp;{{$t('localization.New')}}</div>
    </div>
    <!-- 表格组件 -->
    <div class="pakageTable">
      <swd-table
        :table="tableAll"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :total="total"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @goCurrentPage="goCurrentPage"
      >
        <template slot-scope="props" v-if="props.item != undefined">
          <div class="handle" @click="viewDetails(props.item)">{{$t('localization.Details')}}</div>
        </template>
      </swd-table>
    </div>
    <!-- 导入弹窗 -->
    <div v-if="isPop">
      <sale-pop @handleIsPop="handleIsPop" @confirm="goAdd"></sale-pop>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable.vue";
import userTree from "../../components/common/userTree.vue";
import salePop from "../../components/salePop/salePop.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    userTree,
    salePop,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.BatchNo')}：`,
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
            label: "代理：",
            key: "package",
            type: "tree",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: this.$t('localization.PackName'),
            key: "packId",
            type: "selectT",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder')
          },

          {
            label: `${this.$t('localization.CompanyType')}：`,
            key: "companyType",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All')
              },
              {
                value: "1",
                label: this.$t('localization.YS')
              },
              {
                value: "2",
                label: this.$t('localization.GZMobile')
              },
              {
                value: "3",
                label: "浙江移动"
              },
              {
                value: "4",
                label: "江西移动"
              },
              {
                value: "5",
                label: "广州国际A"
              },
              {
                value: "6",
                label: "广州国际B"
              },
              {
                value: "7",
                label: "国际卡C"
              },
              {
                value: "8",
                label: "广州移动EC"
              },
              {
                value: "9",
                label: "安徽EC"
              },
              {
                value: "10",
                label: "河南移动"
              },
              {
                value: "11",
                label: "广州国际卡D"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: `${this.$t('localization.ActivationTime')}：`,
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
      //新增弹窗数据开始
      isPop: false,
      //新增弹窗数据结束
      cardNumber: null, //批次号
      timers: null,
      startTime: null,
      endTime: null,
      isClient: false,
      client: "", //代理商
      userId: "", //代理商id
      packId: null, //套餐ID
      //套餐数组
      creationOptions: [],
      //弹窗是否显示
      isPop: false,
      //弹窗传值
      popInfo: {},
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "id", title: this.$t('localization.BatchNo') },
        { prop: "userName", title: "代理名称" },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "cardType1", title: this.$t('localization.CompanyType') },
        { prop: "apnType", title: this.$t('localization.APNType') },
        { prop: "cardForm1", title: this.$t('localization.CardForm') },
        { prop: "cardsCount", title: "总条数" },
        { prop: "operator", title: `${this.$t('localization.Operator')}` },
        { prop: "importTime", title: "销售时间" }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      companyType: null, //公司类型
      cardTypeObj: {
        1: this.$t('localization.YS'),
        2: this.$t('localization.GZMobile'),
        3: "浙江移动",
        4: "江西移动",
        5: "广州国际A",
        6: "广州国际B",
        7: "国际卡C",
        8: "广州移动EC",
        9: "安徽EC",
        10: "河南移动",
        11: "广州国际卡D"
      }
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
      var url = "/card/queryImportCards.do";
      this.$client
        .get(url, {
          num: this.cardNumber, //批次号
          userId: this.userId, //用户id
          packId: this.packId, //套餐id
          cardType: this.companyType, //公司类型
          impaortStartTime: this.startTime,
          impaortEndTime: this.endTime,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data || [];
            this.tableData.map(item => {
              if (item.cardForm == 1) {
                item.cardForm1 = this.$t('localization.ESIM');
              } else {
                item.cardForm1 = this.$t('localization.NonSMDcard');
              }
              item.cardType1 = this.cardTypeObj[item.cardType];
            });
            this.total = res.total;
          }else{
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },

    // 搜索内容
    goSearch(info) {
      this.cardNumber = info.cardNumber;
      this.userId = info.userId;
      this.packId = info.packId;
      this.companyType = info.companyType;
      this.startTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.getFlow();
    },
    viewDetails(info) {
      this.importId = info.id;
      this.$router.push({ path: '/index/phoneCard/salesDetails' ,query:{ importId: this.importId }});
    },
    //导入弹窗开始
    handleIsPop() {
      this.isPop = false;
    },
    goAdd() {
      this.isPop = false;
      this.getFlow()
    },
    goPop() {
      this.isPop = true;
    }
    //导入弹窗结束
  }
};
</script>
<style lang="less" scoped>
.phoneCardSal {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .advancedSearch {
    padding: 14px 27px 14px 32px;
  }
  .add-package {
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
  .details {
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
      padding: 0 32px;
      left: 52%;
      top: 50%;
      width: 1386px;
      height: 600px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      z-index: 1000;
      transform: translate(-50%, -50%);
      .header {
        box-sizing: border-box;
        height: 69px;
        padding-top: 26px;
        .title {
          height: 14px;
          font-size: 14px;
          line-height: 14px;
          color: #333;
        }
        .close {
          width: 14px;
          height: 14px;
          background: rgba(100, 106, 115, 1);
        }
      }
    }
  }
}
</style>
