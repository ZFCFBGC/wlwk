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
        <div class="fr pointer exportBtn" @click="getExport">
          {{this.$t('localization.Export')}}<img
                      class="export-arrow"
                      src="@/assets/images/export.png"
                      alt="export"
                  />
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
        >
          <template slot-scope="props" v-if="props.item != undefined">
            <!--获取子组件值得方法-->
            <div class="handle" @click="goDetails(props.item)">{{$t('localization.ViewDetails')}}</div>
          </template>
        </swd-table>
      </div>
    </div>
    <div class="mask" v-if="isNote" @click="goClose"></div>
    <div class="note" v-if="isNote">
      <div class="noteHeader">
        <div class="nodeTitle">{{$t('localization.SMSRecord')}}</div>
        <div class="close" @click="goClose">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="noteMain" ref="noteMain">
        <div class="noteDetails" @click="goNoteDetails" v-if="noteDetails">
          {{$t('localization.SeeMoreMsg')}}
        </div>
        <div
          v-for="(item, i) in noteArr"
          :key="i"
          :class="item.msgType == 1 ? 'right' : 'left'"
          class="clearfix"
        >
          <div class="noteLocation">
            <div class="sendInfo">
              <span class="autor" v-if="item.msgType == 1"
                >{{$t('localization.Sender')}}：{{ item.userName }}</span
              >
              <span class="sendTime">{{ item.createTime }}</span>
            </div>
            <div class="sendMain">
              {{ item.msg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable.vue";
import userTree from "../../components/common/userTree.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    userTree,
    searchPanel
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
            label: `${this.$t('localization.Type')}：`,
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: "国内短信"
              },
              {
                value: "2",
                label: "国外短信"
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
      typeValue: "", //短信类型
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID" },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "cardType1", title: this.$t('localization.BelongType') },
        {
          prop: "smsCount",
          title: "发送短信（条）",
          width: "140"
        },
        {
          prop: "receiveCount",
          title: "接收短信（条）",
          width: "140"
        },
        { prop: "money", title: "已付金额（元）", width: "140" }
      ],
      timers: null, //时间
      package: "", //客户
      isClient: false,
      cardNumber: "", //卡号
      lower: false, //是否选中
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      startTime: "", //开始时间
      endTime: "", //结束时间
      originName: "", //判断是哪个统计页面
      userId: "",
      detailsArr: [], //更多短信数据
      noteDetails: true, //是否显示更多消息
      noteArr: [], //短信数据
      isNote: false //短信弹窗
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
    //用户确认选定的值时触发
    timeConfirm(e) {
      this.startTime = this.timers[0];
      this.endTime = this.timers[1];
    },
    //获取数据
    getFlow() {
      var url = "/statistics/querySMSStatisticsPage.do";
      this.$client
        .get(url, {
          cardNo: this.cardNumber,
          startTime: this.startTime,
          endTime: this.endTime,
          userId: this.userId,
          isInternational: this.isInternational,
          isHaveChild: this.lower ? "1" : "0",
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == "200") {
            this.tableData = res.data || [];
            this.tableData.map(item => {
              if (
                item.cardType == "5" ||
                item.cardType == "6" ||
                item.cardType == "7" ||
                item.cardType == "11"
              ) {
                item.cardType1 = "国际短信";
              } else {
                item.cardType1 = "国内短信";
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
    // 搜索内容
    goSearch(info) {
      this.cardNumber = info.cardNumber;
      this.userId = info.userId;
      this.lower = info.lower;
      this.isInternational = info.isInternational;
      this.startTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.getFlow();
    },
    //导出报表
    getExport() {
      var url = "/statistics/exportSMSStatistics.do";
      this.$client.downLoad(url, {
        cardNo: this.cardNumber,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: this.userId,
        isInternational: this.isInternational,
        isHaveChild: this.lower ? "1" : "0"
      });
    },
    //查看短信详情
    goDetails(e) {
      var url = "/sms/querySMSMessage.do";
      this.$client
        .get(url, {
          cardNo: e.cardNo
        })
        .then(res => {
          if (res.code == 200) {
            this.isNote = true;
            if (res.data.length) {
              this.noteArr =
                res.data.slice(res.data.length - 3, res.data.length) || [];
              this.detailsArr = res.data || [];
            }
          }
        });
    },
    //查看更多消息
    goNoteDetails() {
      this.noteDetails = false;
      this.noteArr = this.detailsArr;
      setTimeout(() => {
        this.$refs.noteMain.scrollBottom = this.$refs.noteMain.scrollHeight;
      }, 0);
    },
    //关闭短信详情弹窗
    goClose() {
      this.noteDetails = true;
      this.isNote = false;
    }
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
  }
};
</script>
<style lang="less" scoped>
.reportForms {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  position: relative;
  background-color: #fff;
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
  .note {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 734px;
    height: 423px;
    background: #fff;
    border-radius: 8px;
    z-index: 1000;
    .noteHeader {
      padding-left: 37px;
      .nodeTitle {
        font-size: 14px;
        color: #18263c;
        margin-top: 26px;
      }
      .close {
        position: absolute;
        right: 26px;
        top: 26px;
        width: 16px;
        height: 16px;
      }
    }
    .noteMain {
      width: 659px;
      height: 293px;
      padding-bottom: 10px;
      overflow-y: auto;
      background: rgba(247, 247, 250, 1);
      margin: 29px auto 0 auto;
      .noteDetails {
        height: 24px;
        font-size: 13px;
        text-align: center;
        color: rgba(162, 162, 162, 1);
        line-height: 24px;
      }
      .right {
        margin-top: 20px;
        .noteLocation {
          height: 65px;
          float: right;
          width: 260px;
        }
        .sendInfo {
          //padding: 0 7px;
          height: 19px;
          background: rgba(218, 218, 218, 1);
          border-radius: 2px;
          width: 240px;
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
          line-height: 19px;
          text-align: center;
        }
        .sendMain {
          margin-top: 11px;
          padding: 0 25px;
          width: 190px;
          background: rgba(158, 234, 106, 1);
          border-radius: 2px;
          font-size: 14px;
          color: rgba(56, 56, 56, 1);
          line-height: 34px;
        }
      }
      .left {
        margin-top: 20px;
        .noteLocation {
          height: 65px;
          float: left;
          width: 260px;
        }
        .sendInfo {
          padding: 0 7px;
          height: 19px;
          background: rgba(218, 218, 218, 1);
          border-radius: 2px;
          width: 240px;
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
          line-height: 19px;
          text-align: center;
        }
        .sendMain {
          width: 240px;
          margin-top: 11px;
          padding: 0 25px;
          font-size: 14px;
          color: rgba(56, 56, 56, 1);
          line-height: 34px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(237, 237, 237, 1);
          border-radius: 5px 5px 5px 5px;
        }
      }
    }
  }
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
      .handle {
        color: #3370ff;
        font-size: 14px;
      }
    }
  }
}
</style>
