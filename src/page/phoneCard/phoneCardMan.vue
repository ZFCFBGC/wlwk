<template>
  <div class="phoneCardMan">
    <div class="advancedSearch clearfix">
      <div class="search fl clearfix">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="addPackage fr pointer" @click="goPop('add')">+&nbsp;{{$t('localization.NewPackage')}}</div>
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
        @more="goMore"
      >
        <template
          slot-scope="props"
          v-if="props.row != undefined"
          slot="isDelete"
        >
          <div class="static">
            <span>
              <el-popover
                trigger="hover"
                :visible-arrow="false"
                popper-class="swd_popUp"
                placement="right-start"
                :offset="0"
                :content="props.row.isDelete == 1 ? $t('localization.OffShelf') : $t('localization.OnShelf')"
              >
                <i
                  slot="reference"
                  :class="props.row.isDelete == 1 ? 'soldOut' : 'launched'"
                ></i>
              </el-popover>
            </span>
          </div>
        </template>
        <template
          slot-scope="props"
          v-if="props.row != undefined"
          slot="handle"
        >
          <div class="handle" @click="goEdit(props.row)">{{$t('localization.Edit')}}</div>
          <div class="handle" @click="goDelete(props.row)">
            {{ props.row.isDelete == 1 ? $t('localization.OnShelf') : $t('localization.OffShelf') }}
          </div>
        </template>
      </swd-table>
    </div>
    <div v-if="isPop">
      <pop-up
        :popInfo="popInfo"
        @handleIsPop="handleIsPop"
        @goAdd="goAdd"
      ></pop-up>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
import popUp from "../../components/common/popUp.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    popUp,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: this.$t('localization.PackName'),
            label1: `${this.$t('localization.PackageType')}：`,
            key: "packId",
            type: "selectT",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
            placeholder1: this.$t('localization.SelectPlaceholder')
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
                label: this.$t('localization.OnShelf')
              },
              {
                value: "1",
                label: this.$t('localization.OffShelf')
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          }
        ]
      },
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
        { prop: "packName", title: this.$t('localization.PackName') },
        { prop: "tCFlow", title: `${this.$t('localization.DataSize')}(M)` },
        { prop: "tCVoice", title: `${this.$t('localization.VoiceSize')}(min)` },
        { prop: "isOverstepFlow", title: `${this.$t('localization.ExcessFlow')}(M)` },
        { prop: "testFlow", title: `${this.$t('localization.TestData')}(M)` },
        { prop: "packType1", title: this.$t('localization.PackageType') },
        { prop: "flowPrice", title: `${this.$t('localization.DataUnitPrice')}` },
        { prop: "voicePrice", title: `${this.$t('localization.VoiceUnitPriceWithUnit')}` },
        { prop: "packPrice5", title: `${this.$t('localization.MonthWithUnit')}` },
        { prop: "packPrice1", title: `${this.$t('localization.RetailMonth')}`},
        { prop: "lsPackPrice5", title: `${this.$t('localization.YearWithUnit')}` },
        { prop: "lsPackPrice1", title: `${this.$t('localization.RetailYear')}` },
        { prop: "isDelete", title: this.$t('localization.Status'), slot: true,width:70},
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      packageType: null, //套餐类型
      packageStatus: null, //套餐状态
      total: null
    };
  },
  created() {
    this.getFlow();
  },
  methods: {
    //子组件关闭弹窗
    handleIsPop() {
      this.isPop = false;
    },
    //打开弹窗
    goPop(type, info) {
      this.isPop = true;
      this.popInfo.title = this.$t('localization.NewPackage');
      this.popInfo.info = null;
      this.single = this.$t('localization.SingleMonth');
      this.isVoice = false;
      this.packageId = "1";
    },

    goAdd() {
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
      var url = "/package/queryAdminPackagePage.do";
      this.$client
        .get(url, {
          packName: this.packId,
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
              item.isOverstepFlow = Tools.changeTwoDecimal_f(
                item.isOverstepFlow
              );
              item.lsPackPrice1 = Tools.changeTwoDecimal_f(item.lsPackPrice1);
              item.lsPackPrice5 = Tools.changeTwoDecimal_f(item.lsPackPrice5);
              item.packPrice1 = Tools.changeTwoDecimal_f(item.packPrice1);
              item.packPrice5 = Tools.changeTwoDecimal_f(item.packPrice5);
              item.tCFlow = Tools.changeTwoDecimal_f(item.tCFlow);
              item.tCVoice = Tools.changeTwoDecimal_f(item.tCVoice);
              item.testFlow = Tools.changeTwoDecimal_f(item.testFlow);
              item.voicePrice = Tools.changeTwoDecimal_f(item.voicePrice);
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
    //删除按钮
    goDelete(info) {
      var url = "/package/updatePackageStatus.do";
      var status = info.isDelete == 1 ? "0" : "1";
      var params = {
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
      this.getFlow();
    },
    //测试自定义列选用
    goMore() {
    }
  }
};
</script>
<style lang="less" scoped>
.phoneCardMan {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .advancedSearch {
    padding: 14px 27px 14px 32px;
  }
  .addPackage {
    width: 106px;
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
    border-radius: 10px;
    border-bottom: 0 none;
    .launched {
      width: 14px;
      height: 14px;
      background: rgba(103, 194, 58, 1);
      border-radius: 50%;
      display: block;
    }
    .soldOut {
      width: 14px;
      height: 14px;
      background: rgba(147, 147, 147, 1);
      border-radius: 50%;
      display: block;
    }
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
