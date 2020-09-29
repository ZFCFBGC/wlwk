<template>
  <div class="flowPool">
    <div class="advancedSearch clearfix">
      <div class="search fl">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
      </div>
      <div class="addPackage pointer fr" @click="goPop">+&nbsp;新建流量池</div>
    </div>
    <!-- 表格组件 -->
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
        <template slot-scope="props" v-if="props.row != undefined" slot="id">
          <div class="number" @click="goDetailsTable(props.row.id)">
            {{ props.row.id }}
          </div>
        </template>

        <template
          slot-scope="props"
          v-if="props.row != undefined"
          slot="poolStatus"
        >
          <div class="static">
            <span>
              <el-popover
                trigger="hover"
                :visible-arrow="false"
                popper-class="swd_popUp"
                placement="right-start"
                :offset="0"
                :content="props.row.poolStatus == 1 ? '失效' : $t('localization.Enable')"
              >
                <i
                  slot="reference"
                  :class="props.row.poolStatus == 1 ? 'soldOut' : 'launched'"
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
          <div class="handle clearfix">
            <span class="edit" @click="goEdit(props.row)">{{$t('localization.Edit')}}</span>
            <span class="dead">{{
              props.row.poolStatus == 1 ? $t('localization.Enable') : $t('localization.Deactivate')
            }}</span>
            <span class="stick" @click="goStick(props.row)">{{
              props.row.topping == 1 ? $t('localization.Top') : "取消置顶"
            }}</span>
          </div>
        </template>
      </swd-table>
    </div>
    <!-- 弹窗 -->
    <div v-if="isPop">
      <flow-pop
        :popInfo="popInfo"
        @handleIsPop="handleIsPop"
        @goAdd="goAdd"
      ></flow-pop>
    </div>
  </div>
</template>
<script>
import userTree from "../../components/common/userTree.vue";
import swdTable from "../../components/swdTable/swdTable1.vue";
import flowPop from "../../components/flowPop/flowPop.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    userTree,
    swdTable,
    flowPop,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.NewTime')}：`,
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
                value: "0",
                label: this.$t('localization.Enable')
              },
              {
                value: "1",
                label: this.$t('localization.Deactivate')
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
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
          }
        ]
      },
      userId: "",
      timers: null,
      poolStatus: null,
      beginTime: null,
      endTime: null,
      packId: "",
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "id", title: "流量池编号", width: 160, slot: true },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "poolName", title: "流量池名称" },
        { prop: "packName", title: this.$t('localization.Package') },
        { prop: "totalCards", title: this.$t('localization.CardTotal') },
        { prop: "totalUseFlow", title: `已用流量（MB）` },
        { prop: "totalFlow", title: "总流量（MB）" },
        { prop: "usePercent", title: this.$t('localization.UsedPercent') },
        { prop: "createTime", title: this.$t('localization.NewTime') },
        { prop: "poolStatus", title: this.$t('localization.Status'), slot: true },
        { prop: "phone", title: "预留手机" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true, width: 160 }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      isPop: false, //弹窗显示控制
      //弹窗传值
      popInfo: {}
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
    //编辑按钮
    goEdit(info) {
      this.isPop = true;
      this.popInfo.title = this.$t('localization.Edit');
      this.popInfo.info = info;
    },
    // 置顶操作
    goStick(info) {
      var url = "/card/updatePoolTopping.do";
      this.$client
        .get(url, {
          poolId: info.id,
          topping: info.topping == 1 ? 0 : 1
        })
        .then(res => {
          if (res.code == 200) {
            this.getFlow();
          }else{
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //获取数据
    getFlow() {
      var url = "/card/queryCardsPoolPage.do";
      this.$client
        .get(url, {
          userId: this.userId,
          packId: this.packId,
          poolStatus: this.poolStatus,
          beginTime: this.beginTime,
          endTime: this.endTime,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data || [];
            this.tableData.map(item => {
              item.createTime = item.createTime.substring(0, 10);
              item.poolStatus =
                item.poolStatus || item.poolStatus == 0 ? item.poolStatus : "1";
              item.phone = item.phone ? item.phone : "-";
              return;
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

    //打开弹窗
    goPop(type, info) {
      this.isPop = true;
      this.popInfo.title = "新建";
      this.popInfo.info = null;
    },
    //打开详情表格弹窗
    goDetailsTable(id) {
      this.isPop = true;
      this.popInfo.title = this.$t('localization.CardList');
      this.popInfo.origin = "flowPool";
      this.popInfo.id = id;
    },
    goAdd() {
      this.isPop = false;
    },
    //子组件关闭弹窗
    handleIsPop() {
      this.popInfo = {};
      this.isPop = false;
      this.getFlow();
    },
    // 搜索按钮
    // 搜索内容
    goSearch(info) {
      this.packId = info.packId;
      //this.packageType = info.packageType;
      this.poolStatus = info.status;
      this.userId = info.userId;
      this.beginTime = info.timers ? info.timers[0] : null;
      this.endTime = info.timers ? info.timers[1] : null;
      this.getFlow();
    }
  }
};
</script>
<style lang="less" scoped>
.flowPool {
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
    width: 92px;
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
      span {
        display: inline;
        font-size: 12px;
        color: #3370ff;
        margin-left: 8px;
      }
    }
    .soldOut {
      width: 14px;
      height: 14px;
      background: rgba(148, 148, 148, 1);
      border-radius: 50%;
      display: inline-block;
    }
    .launched {
      width: 14px;
      height: 14px;
      background: rgba(104, 194, 58, 1);
      border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>
