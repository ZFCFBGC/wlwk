<template>
  <div class="phoneCardPre">
    <div class="advancedSearch clearfix">
      <div class="search fl clearfix">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="addPackage pointer search fr" @click="goPop">+&nbsp;{{$t('localization.New')}}</div>
    </div>
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
          <div class="handle" @click="goEdit(props.item)">{{$t('localization.Edit')}}</div>
          <div class="handle" @click="goDelete(props.item)">
            {{ props.item.isDelete == 1 ? $t('localization.OnShelf') : $t('localization.OffShelf') }}
          </div>
        </template>
      </swd-table>
    </div>
    <div v-if="isPop">
      <agent-popup
        :popInfo="popInfo"
        @handleIsPop="handleIsPop"
        @goAdd="goAdd"
      ></agent-popup>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable.vue";
import userTree from "../../components/common/userTree.vue";
import agentPopup from "../../components/agentPopup/agentPopup.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
import { reject } from "q";
export default {
  components: {
    swdTable,
    userTree,
    agentPopup,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: "代理：",
            key: "package",
            type: "tree",
            value: "",
            placeholder:this.$t('localization.SelectPlaceholder')
          },
          {
            label: this.$t('localization.PackName'),
            label1: `${this.$t('localization.PackageType')}：`,
            key: "packId",
            type: "selectT",
            value: "",
            placeholder:this.$t('localization.SelectPlaceholder'),
          },
          {
            label: "套餐状态：",
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
                label: this.$t('localization.OnShelf')
              },
              {
                value: "1",
                label: this.$t('localization.OffShelf')
              }
            ],
            placeholder:this.$t('localization.SelectPlaceholder')
          }
        ]
      },
      isClient: false,
      client: "", //代理商
      userId: "", //代理id
      packId: null, //套餐ID
      //弹窗是否显示
      isPop: false,
      //弹窗传值
      popInfo: {},
      tableAll: {
        select: false,
        handle: true,
        type: false
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardIndex", title: "编号" },
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "nickname", title: "代理名称" },
        { prop: "packType1", title: this.$t('localization.PackageType') },
        { prop: "flowPrice", title: `${this.$t('localization.DataUnitPrice')}` },
        { prop: "voicePrice", title: `${this.$t('localization.VoiceUnitPriceWithUnit')}` },
        { prop: "packPrice5", title: `${this.$t('localization.MonthPrice')}（${this.$t('localization.HYuan')}）` },
        { prop: "packPrice1", title: `${this.$t('localization.YearPrice')}（${this.$t('localization.HYuan')}）` },
        { prop: "isDelete1", title: this.$t('localization.Status'), custom: true, hover: true , width:60}
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      packageType: null, //套餐类型
      packageStatus: null, //套餐状态
      total: null
    };
  },
  created() {
    if (this.$route.query.userId) {
      this.userId = this.$route.query.userId;
    }
    this.getUserInfo().then(res => {
      this.getFlow();
    });
  },
  methods: {
    getUserInfo(node, resolve) {
      return new Promise((resolve, reject) => {
        var url = `/user/getUserInfo.do`;
        this.$client.get(url).then(res => {
          if (res.code == "200") {
            this.userId = res.data.id;
            resolve();
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
            reject();
          }
        });
      });
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
      var url = "/package/queryUsersAndChildPackagePage.do";
      this.$client
        .get(url, {
          userId: this.userId,
          packId: this.packId,
          packType: this.packageType,
          isDelete: this.packageStatus,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data || [];
            this.tableData.map((item, idx) => {
              item.flowPrice = Tools.changeTwoDecimal_f(item.flowPrice);
              item.packPrice1 = Tools.changeTwoDecimal_f(item.packPrice1);
              item.packPrice5 = Tools.changeTwoDecimal_f(item.packPrice5);
              item.testFlow = Tools.changeTwoDecimal_f(item.testFlow);
              item.voicePrice = Tools.changeTwoDecimal_f(item.voicePrice);

              if (item.packType == "1") {
                item.packType1 = this.$t('localization.AnnualCard');
              } else if (item.packType == "2") {
                item.packType1 = "语音";
              } else {
                item.packType1 = this.$t('localization.MonthlyCard');
              }
              if (item.isDelete == 1) {
                item.isDelete1 = this.$t('localization.OffShelf');
              } else {
                item.isDelete1 = this.$t('localization.OnShelf');
              }
              if (idx < 9 && this.pageIndex == 1) {
                item.cardIndex = "00" + (idx + 1);
              } else if (idx >= 9 && this.pageIndex == 1) {
                item.cardIndex = "0" + (idx + 1);
              } else {
                item.cardIndex = "0" + ((this.pageIndex - 1) * 15 + 1 + idx);
              }
              return;
            });
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
          this.total = res.total || null;
        });
    },
    //编辑按钮
    goEdit(info) {
      this.isPop = true;
      this.popInfo.title = "编辑套餐";
      this.popInfo.info = info;
    },
    //代理套餐上下架
    goDelete(info) {
      var url = "/package/updateUserAndChildPackageStatus.do";
      var status = info.isDelete == 1 ? "0" : "1";
      var params = {
        userId: info.userId + "",
        packId: info.packID,
        isDelete: status
      };
      var that = this;
      swd.confirm({
        title: "提示",
        content: "此操作将改变套餐的状态, 是否继续?",
        success: function(res) {
          if (res.confirm == true) {
            that.$client.get(url, params).then(res => {
              if (res.code == 200) {
                swd.compop({
                  title: "提示",
                  content: "设置成功",
                  success: function(res) {
                    that.getFlow();
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
        }
      });
    },
    // 搜索内容
    goSearch(info) {
      this.packId = info.packId;
      this.packageType = info.packageType;
      this.packageStatus = info.packageStatus;
      this.userId = info.userId;
      this.getFlow();
    },
    //打开弹窗
    goPop(type, info) {
      this.isPop = true;
      this.popInfo.title = "新增套餐";
      this.popInfo.info = null;
    },
    goAdd() {
      this.isPop = false;
      this.getFlow();
    },
    //子组件关闭弹窗
    handleIsPop() {
      this.isPop = false;
    }
  }
};
</script>
<style lang="less" scoped>
.phoneCardPre {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .advancedSearch {
    padding: 14px 27px 14px 32px;
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
  .handlePakage {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 830px;
    height: 692px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
    transform: translate(-50%, -50%);
  }
}
</style>
