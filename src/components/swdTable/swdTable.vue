<template>
  <div class="swdTable">
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%"
        :header-row-style="headerStyle"
        :max-height="maxHeight"
        :header-cell-style="{
          'background-color': '#fff',
          'border-top':'1px solid #E9EAF2'
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" v-if="table.select">
        </el-table-column>
        <el-table-column
          :label="this.$t('localization.SerialNo')"
          width="80"
          type="index"
          align="center"
          v-if="table.type"
        >
        </el-table-column>
        <el-table-column
          v-for="(col, index) in tableLabel"
          :fixed="col.fixed"
          :label="col.title"
          :width="col.width"
          :min-width="col.minWidth"
          :max-width="col.maxWidth"
          :sortable="col.sort"
          :formatter="col.formatter"
          :show-overflow-tooltip="col.ellipsis"
          :align="col.align"
          :key="index"
        >
          <template slot-scope="scope">
            <div class="static">
              <span v-if="col.custom ? true : false">
                <el-popover
                  trigger="hover"
                  :visible-arrow="false"
                  popper-class="swd_popUp"
                  placement="right-start"
                  :offset="0"
                  :content="scope.row[col.prop]"
                >
                  <i
                    slot="reference"
                    :class="
                      scope.row[col.prop] == '上架' ? 'launched' : 'soldOut'
                    "
                    v-if="col.custom ? true : false"
                  ></i>
                </el-popover>
              </span>

              <span v-if="col.custom ? false : true">{{
                scope.row[col.prop]
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('localization.Operation')" v-if="table.handle" width="100">
          <template slot-scope="scope">
            <slot v-bind:item="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" v-if="total > 0">
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, slot"
          :total="total"
          :hide-on-single-page="true"
          :page-size="pageSize"
        >
          <div class="handlePage clearfix">
            <div class="fl handlePage_l">{{$t('localization.To')}}</div>
            <div class="shuru fl">
              <el-input
                v-model="currentPage1"
                class="pageInput"
                oninput="value=value.replace(/\D/g,'')"
              ></el-input>
            </div>
            <div class="fl handlePage_r">{{$t('localization.Page')}}</div>
            <div class="button pointer fl" @click="goPage">Go</div>
          </div>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    table: {
      type: Object
    },
    tableLabel: {
      type: Array
    },
    tableData: {
      type: Array
    },
    total: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 15
    },
    maxHeight:{
      type: String,
      default: null
    }
  },
  data() {
    return {
      tableData1: [],
      loading:true,
      currentPage: 1,
      currentPage1: null,
      isShow: true,
      headerStyle:{
        'backgound-color':'#fff'
      }
    };
  },
  watch: {
    tableData: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.tableData1 = this.tableData;
      },
      deep: true
    },
    total(newValue, oldValue) {
      this.total = newValue;
    },
    tableLabel: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.tableLabel = this.newVal;
      },
      deep: true
    },
    table: {
      handler(newVal, oldVal) {
        this.table = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    var that = this;
    setTimeout(() => {
      that.tableData1 = that.tableData;
    }, 0);
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", {
        multipleSelection: val
      });
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", {
        multipleSelection: val
      });
    },
    goPage(val) {
      this.currentPage = this.currentPage1 * 1;
      this.$emit("goCurrentPage", {
        multipleSelection: this.currentPage1 * 1
      });
    },
    goMouserOver(type) {
      if (type == true) {
        //this.isShow = true;
      }
    },
    goMouserOut(type) {
      if (type == true) {
        //this.isShow = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.swdTable {
  width: 100%;
  /deep/.table {
    width: 100%;
    .el-table__empty-block {
      min-height: 42px;
    }
    .el-table__empty-block .el-table__empty-text {
      height: 42px;
      line-height: 42px;
      padding: 0 !important;
    }
    .cell span {
      font-size: 12px;
    }
    tr {
      .cell {
        div {
          font-size: 12px;
        }
      }
    }
    th {
      padding: 0 !important;
      height: 42px;
      line-height: 42px;
      .cell {
        font-size: 12px;
      }
    }
    td {
      padding: 0 !important;
      height: 42px;
      line-height: 42px;
    }
  }
}
.page {
  margin-top: 20px;
  width: 100%;
  height: 35px;
  position: relative;
  .pagination {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /deep/.handlePage {
      position: absolute;
      right: -162px;
      top: 0;
      .handlePage_l,
      .handlePage_r {
        font-size: 12px;
        color: #303133;
        line-height: 28px;
        margin: 0 10px;
      }
      .shuru {
        font-size: 12px;
        color: #303133;
        line-height: 28px;

        .el-input__inner {
          width: 28px;
          height: 28px;
          padding: 0 2px;
        }
      }
      .button {
        line-height: 26px;
        width: 40px;
        height: 26px;
        border: 1px solid #dedede;
        border-radius:4px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
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
</style>
<style>
.swd_popUp {
  min-width: 50px !important;
  width: 56px !important;
  height: 22px !important;
  line-height: 22px !important;
  font-size: 12px !important;
  color: #999 !important;
  padding: 0 !important;
  text-align: center !important;
  background: #fff;
  /* left:1716px !important; */
}
</style>
