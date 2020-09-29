<template>
  <div class="flowRecharge">
    <div class="mask"></div>
    <div class="table">
      <div class="header clearfix">
        <div class="title fl">批量导入续费</div>
        <div class="close pointer fr" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="addCard">
          <div class="title">{{this.$t('localization.AdditionalCard')}}</div>
          <div class="cont clearfix">
            <div class="fl cardShuru clearfix">
              <div class="card-input fl">
                <el-input v-model="singleCard"></el-input>
              </div>
              <div @click="addSingleCard" class="add fl">{{$t('localization.Add')}}</div>
              <div class="batchAdd fl" @click="openBatchAdd">{{$t('localization.BatchAdd')}}</div>
            </div>
            <div class="fr cardNumber">
              一共：{{ cardList && cardList.length }}个
            </div>
          </div>
        </div>
        <div class="flowTable">
          <swd-table
            :more="false"
            :table="tableAll"
            :tableData="cardList"
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
              <div class="handle" @click="goDelete(props.row)">{{$t('localization.Delete')}}</div>
            </template>
          </swd-table>
        </div>
        <div class="btnArr clearfix">
          <span class="renew-tip">{{this.$t('localization.BatchRenewTip')}}</span>
          <div class="cancel pointer fr" @click="cancel">{{$t('localization.Cancel')}}</div>
          <div class="confirm pointer fr" @click="confirm">{{$t('localization.Confirm')}}</div>
        </div>
      </div>
      <div class="batch-import" v-if="showBatchImport">
      <batch-import @cancel="closeBatchImport"></batch-import>
    </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable1.vue";
import batchImport from "../../components/managePop/batchImport";
import swdInput from "../form/swdInput.vue";
export default {
  components: {
    swdTable,
    swdInput,
    batchImport
  },
  data() {
    return {
      packPrice1: "",
      singleCard: null,
      cardList: [],
      showBatchImport:false,
      tableAll: {
        select: false,
        handle: false,
        type: true,
      },
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      if(!this.cardList.length){
        this.$message.warning('当前卡号为空')
        return
      }
      this.$emit("confirm", this.cardList);
    },
    closeBatchImport(){
      this.showBatchImport=false
    },
    //表格子组件选择框触发方法
    handleSelectionChange(obj) {},
    addSingleCard() {
      let url="/package/queryBatchCardsPackage.do"
      let params={
        cards:this.singleCard
      }
      let existed = false;
      this.cardList.forEach((item) => {
        if (item.cardNo === this.singleCard) {
          existed = true;
          this.$message.warning("已存在该卡");
        }
      });
      if (!existed) {
        this.$client.get(url, params).then((res) => {
          if (res.code === "200") {
            if (res.data.OKCards.length !== 0) {
              this.cardList.push(res.data.OKCards[0]);
            }
          }
        });
      }
    },
    //分页按钮触发方法
    handleCurrentChange(obj) {
      this.pageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    openBatchAdd(){
      this.showBatchImport=true
    },
    goCurrentPage(obj) {
      this.pageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    goDelete(row) {
      this.cardList.forEach((item, index) => {
        if (item.cardNo === row.cardNo) {
          this.cardList.splice(index, 1);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.flowRecharge {
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
    width: 673px;
    box-sizing: border-box;
    padding: 26px 36px;
    background: #fff;
    z-index: 1001;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 26px 36px;
    border-radius: 8px;
    .header {
      .title {
        font-size: 14px;
        color: rgba(24, 38, 60, 1);
      }
      .close {
        color: #646a73;
        font-size: 14px;
      }
    }
    .content {
      .addCard {
        padding-top: 46px;
        .title {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
        }
        .cont {
          padding-top: 13px;
        }
        .cardShuru {
          /deep/.card-input {
            .el-input {
              .el-input__inner {
                width: 300px;
                height: 32px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(222, 224, 227, 1);
                border-radius: 3px 0 0 3px;
              }
            }
          }
          .add {
            padding: 0 16px;
            height: 32px;
            background: rgba(51, 112, 255, 1);
            line-height: 32px;
            font-size: 13px;
            color: #fff;
            text-align: center;
            border-radius: 0 3px 3px 0;
            cursor: pointer;
          }
          .batchAdd {
            margin-left: 12px;
            width: 88px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(222, 224, 227, 1);
            border-radius: 3px;
            line-height: 32px;
            font-size: 13px;
            color: #333333;
            text-align: center;
            cursor: pointer;
          }
        }
        .cardNumber {
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          color: #666;
        }
      }
      .flowTable {
        padding-top: 14px;
      }
      .btnArr {
        padding-top: 34px;
        .renew-tip {
          font-size: 13px;
          font-weight: 400;
          color: rgba(85, 85, 85, 1);
          line-height: 13px;
        }
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
