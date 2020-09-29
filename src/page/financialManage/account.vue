<template>
  <div class="rebateRecord">
    <div class="tabPane">
      <div class="nouser"></div>
      <div class="nouserTwo"></div>
      <div class="cont clearfix">
        <div
          class="assets fl"
          :class="activeName == 'first' ? 'active' : ''"
          @click="toggle('first')"
        >
          我的资产
        </div>
        <div
          class="audit fl"
          :class="activeName == 'second' ? 'active' : ''"
          @click="toggle('second')"
        >
          审核管理
        </div>
      </div>
    </div>
    <div class="content" v-if="activeName == 'first'">
      <div class="account clearfix">
        <div class="icon fl"></div>
        <div class="accountTitle fl">{{$t('localization.AccountBalance')}}</div>
        <div class="money fl">&yen;3600.00</div>
        <div class="recharge fl">{{$t('localization.HRecharge')}}</div>
        <div class="withdraw fl">{{$t('localization.HWithdrawal')}}</div>
      </div>
      <div class="accountTable">
        <div class="title">{{$t('localization.AccountBalance')}}</div>
        <div class="advancedSearch clearfix">
          <div class="search fl clearfix">
            <search-panel
              :searchConfig="searchConfig"
              @search="goSearch"
            ></search-panel>
          </div>
          <div class="addPackage fr">{{this.$t('localization.Export')}}</div>
        </div>
        <div class="tableList">
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
      </div>
    </div>
    <div class="auditCont" v-if="activeName == 'second'">
      <div class="auditMain">
        <div class="tabPane1">
          <el-tabs v-model="auditName" @tab-click="handleClick">
            <el-tab-pane :label="$t('localization.HUserManage')" name="first">
              <div v-if="auditName == 'first'">
                <audit-manage :active="auditName"></audit-manage>
              </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
              <div v-if="auditName == 'second'">
                <audit-manage :active="auditName"></audit-manage>
              </div>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">
              <div v-if="auditName == 'third'">
                <audit-manage :active="auditName"></audit-manage>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 我的资产详情弹窗 -->
    <div class="acountPop" v-if="acountPopShow">
      <acount-pop @cancel="goCancel"></acount-pop>
    </div>
    <!-- 我的资产修改弹窗 -->
    <div class="amendPop" v-if="amendShow">
      <amend-pop @cancel="amendCancel"></amend-pop>
    </div>
  </div>
</template>
<script>
import searchPanel from "../../components/searchPanel/searchPanel.vue";
import swdTable from "../../components/swdTable/swdTable1.vue";
import auditManage from "../../components/financial/auditManage.vue";
import acountPop from "../../components/financial/acountPop.vue";
import amendPop from "../../components/financial/amendPop.vue";
export default {
  components: {
    searchPanel,
    swdTable,
    auditManage,
    acountPop,
    amendPop
  },
  data() {
    return {
      amendShow: false,
      acountPopShow: false,
      activeName: "second",
      auditName: "second",
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: this.$t('localization.PackName'),
            label1: `${$t('localization.PackageType')}：`,
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
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "packName", title: this.$t('localization.Username') },
        { prop: "tCFlow", title: this.$t('localization.Superior') },
        { prop: "tCVoice", title: this.$t('localization.AccountBalance') },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  methods: {
    toggle(tab) {
      this.activeName = tab;
    },
    // 搜索内容
    goSearch(info) {
    },
    handleClick(tab, event) {
    },
    goCancel() {
      this.acountPopShow = false;
    },
    //表格子组件选择框触发方法
    handleSelectionChange(obj) {
    },
    //分页按钮触发方法
    handleCurrentChange(obj) {
      this.pageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    goCurrentPage(obj) {
      this.pageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    // 
    amendCancel(){
      this.amendShow = false
    }
  }
};
</script>
<style lang="less" scoped>
.rebateRecord {
  position: relative;
  .tabPane {
    height: 34px;
    background: #fff;
    position: absolute;
    top: -17px;
    left: 0;
    right: 0;
    border-bottom: 1px solid #e9eaf2;
    .nouser {
      position: absolute;
      width: 16px;
      height: 34px;
      left: -16px;
      top: 0;
      background: #fff;
      border-bottom: 1px solid #e9eaf2;
    }
    .nouserTwo {
      position: absolute;
      width: 16px;
      height: 34px;
      right: -16px;
      top: 0;
      background: #fff;
      border-bottom: 1px solid #e9eaf2;
    }
    .cont {
      padding-top: 8px;
      margin-left: 32px;
      .assets,
      .audit {
        color: #333;
        font-size: 16px;
        padding-bottom: 6px;
        margin-right: 32px;
      }
      .active {
        color: #3370ff;
        font-size: 16px;
        padding-bottom: 6px;
        border-bottom: 3px solid #3370ff;
      }
    }
  }
  .content {
    padding-top: 36px;
    .account {
      padding-top: 23px;
      padding-left: 32px;
      height: 50px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      .icon {
        margin-top: 8px;
        width: 4px;
        height: 16px;
        background: #3370ff;
        margin-right: 6px;
      }
      .accountTitle {
        font-size: 14px;
        height: 16px;
        line-height: 32px;
        color: #333;
        margin-right: 21px;
      }
      .money {
        font-family: Arial;
        color: rgba(255, 138, 0, 1);
        font-size: 16px;
        line-height: 32px;
        margin-right: 21px;
      }
      .recharge {
        width: 64px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        margin-right: 12px;
        font-size: 13px;
      }
      .withdraw {
        width: 62px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 4px;
        line-height: 30px;
        text-align: center;
        color: #333;
        font-size: 13px;
      }
    }
    .accountTable {
      margin-top: 16px;
      height: 710px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
      border-radius: 5px 5px 5px 5px;
      box-sizing: border-box;
      padding: 27px 28px 16px 28px;
      .title {
        font-size: 14px;
        color: #333;
        height: 16px;
        padding-bottom: 10px;
      }
      .advancedSearch {
        padding: 16px 0 16px 0;
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
  }
  .auditCont {
    padding-top: 36px;
    .auditMain {
      height: 671px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
      border-radius: 5px 5px 5px 5px;
      padding: 28px 28px 16px 28px;
      box-sizing: border-box;
    }
  }
}
</style>
