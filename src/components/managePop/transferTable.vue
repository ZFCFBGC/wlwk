<template>
  <div class="transferTable">
    <div class="mask"></div>
    <div class="table">
      <div class="header clearfix">
        <div class="title fl">客户转移记录</div>
        <div class="close fr" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <swd-table
          :table="tableAll"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :total="total"
          @handleSelectionChange="handleSelectionChange"
          @handleCurrentChange="handleCurrentChange"
          @goCurrentPage="goCurrentPage"
        ></swd-table>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable.vue";
export default {
  components: {
    swdTable
  },
  data() {
    return {
      tableAll: {
        select: false,
        handle: false,
        type: true
      },
      tableData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      total: 20, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.ClientName') },
        { prop: "corresponding", title: this.$t('localization.Account') },
        { prop: "nickname", title: this.$t('localization.OriginalCustomer') },
        { prop: "packName", title: this.$t('localization.CurrentCustomer') },
        { prop: "useFlow", title: this.$t('localization.OperateTime') },
        { prop: "useFlow", title: `${this.$t('localization.Operator')}` }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
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
    }
  }
};
</script>
<style lang="less" scoped>
.transferTable {
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 1000;
  }
  .table {
    width: 1241px;
    height: 637px;
    box-sizing: border-box;
    padding: 26px 36px;
    background: #fff;
    z-index: 1001;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 26px 36px;
    .header {
      .title {
        font-size: 14px;
        color: rgba(24, 38, 60, 1);
      }
      .close {
        color: #646a73;
        font-size: 14px;
        cursor: pointer;
        &:hover{
          color: #409EFF;
        }
      }
    }
    .content {
      padding-top: 28px;
    }
  }
}
</style>
