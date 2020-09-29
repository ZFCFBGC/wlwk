<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header">
        <div class="title">{{$t('localization.ViewDetail')}}</div>
        <div class="close" @click="close"></div>
      </div>
      <div class="searchHead">
        <search-header @search="goSearch"></search-header>
      </div>
      <div class="detailsTable">
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
    <div class="seeDetails" v-if="seeDetailsShow">
      <div class="seeMask"></div>
      <div class="seeCont">
        <div class="header">
          <div class="title">{{$t('localization.ViewDetail')}}</div>
          <div class="close" @click="seeClose"></div>
        </div>
        <div class="auditCont clearfix">
          <div class="audit_l fl">
            <div class="list">
              <div class="title">{{$t('localization.Username')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.IncomeExpense')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.DetailInside')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.Recharger')}}</div>
              <div class="shuru"></div>
            </div>
          </div>
          <div class="audit_r fr">
            <div class="list">
              <div class="title">充值方式</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.OrderNumber')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.IncomeExpenseDetail')}}</div>
              <div class="shuru"></div>
            </div>
            <div class="list">
              <div class="title">{{$t('localization.Time')}}</div>
              <div class="shuru"></div>
            </div>
          </div>
        </div>
        <div class="btnArr clearfix">
          <div class="cancel fr" @click="seeClose">{{$t('localization.Cancel')}}</div>
          <div class="confirm fr">{{$t('localization.Confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable1.vue";
import searchHeader from "./searchHeader.vue";
export default {
  components: {
    swdTable,
    searchHeader
  },
  data() {
    return {
      textarea: "",
      cardNum: null,
      strAry: [],
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      total: 20, //总条数
      tableLabel: [
        { prop: "packName", title: this.$t('localization.OrderNumber') },
        { prop: "tCFlow", title: this.$t('localization.Username') },
        { prop: "tCVoice", title: this.$t('localization.Credit') },
        { prop: "tCVoice", title: this.$t('localization.Status') },
        { prop: "", title: this.$t('localization.SubmitTime') },
        { prop: "", title: "处理时间" },
        { prop: "handle", title: this.this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 10, //默认多少条一页
      pageIndex: 1, //初始页码
      seeDetailsShow: false
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("cancel");
    },
    goSearch(info) {
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
    // 详情弹窗
    seeClose() {
      this.seeDetailsShow = false
    }
  }
};
</script>
<style lang="less" scoped>
.popUp {
  .mask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 999;
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1241px;
    // height: 595px;
    background: #fff;
    border-radius: 8px;
    padding: 0 31px 16px 31px;
    box-sizing: border-box;
    z-index: 1001;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        position: absolute;
        top: 26px;
        right: 26px;
        width: 16px;
        height: 16px;
        background: brown;
      }
    }
    .detailsTable {
      margin-top: 16px;
      .handle {
        color: #4f8aff;
        font-size: 12px;
      }
    }
  }
  .seeDetails {
    .seeMask {
      position: fixed;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 1);
      opacity: 0.5;
      z-index: 2000;
    }
    .seeCont {
      position: fixed;
      left: 50%;
      top: 50%;
      width: 738px;
      // height: 595px;
      background: #fff;
      border-radius: 8px;
      padding: 0 31px 16px 31px;
      box-sizing: border-box;
      z-index: 2001;
      transform: translate(-50%, -50%);
      .header {
        height: 69px;
        line-height: 69px;
        .title {
          font-size: 14px;
          color: #333333;
          font-family: Microsoft YaHei;
        }
        .close {
          position: absolute;
          top: 26px;
          right: 26px;
          width: 16px;
          height: 16px;
          background: brown;
        }
      }
      .auditCont {
        .audit_l,
        .audit_r {
          .list {
            margin-bottom: 16px;
          }
          .title {
            line-height: 16px;
            font-size: 13px;
            color: rgba(85, 85, 85, 1);
            margin-bottom: 16px;
          }
          .shuru {
            width: 315px;
            height: 32px;
            background: rgba(244, 245, 249, 1);
            border-radius: 3px;
            line-height: 32px;
            color: #000;
            font-size: 13px;
            text-indent: 1em;
          }
        }
      }
      .btnArr {
        padding-top: 8px;
        .cancel {
          width: 76px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          font-size: 13px;
          color: #333;
        }
        .confirm {
          width: 76px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          line-height: 32px;
          font-size: 13px;
          text-align: center;
          color: #fff;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
