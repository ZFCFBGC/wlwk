<template>
  <div class="flow-recharge">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{$t('localization.FlowCharge')}}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <div class="amount">
            {{$t('localization.OverduePayment')}}：{{$t('localization.InTotal')}}<span>{{ overflowCount }}</span
            >{{$t('localization.Chapter')}}， {{$t('localization.Totals')}}<span>{{ overflowData }}</span
            >MB
          </div>
          <div class="total">
            {{$t('localization.AmountPay1')}}（{{$t('localization.HYuan')}}）：<span class="total-amount">{{
              overflowAmoumt
            }}</span>
          </div>
        </div>
        <hr style="background: rgba(240, 241, 242, 1); opacity: 0.5;" />
        <div class="info">
          <div class="amount">
            常规叠加:
            <el-select v-model="packageSize">
              <el-option
                v-for="item in dataOptions"
                :key="item.flow"
                :value="item.flow"
                :label="item.flowPackageName"
              ></el-option>
              <el-option
                :value="customValue"
                :label="customPack"
                style="color: #3370ff;"
              >
                <div style="font-size: 13px;" @click.prevent="customOption">
                  自定义叠加流量
                </div>
              </el-option>
            </el-select>
            /{{$t('localization.Chapter')}}
          </div>
          <div class="total">
            {{$t('localization.InTotal')}}<span>{{ tableData.length }}</span
            >{{$t('localization.Chapter')}}，{{$t('localization.Totals')}}<span>{{ chargeData }}</span
            >MB，{{$t('localization.AmountPay1')}}（{{$t('localization.HYuan')}}）：<span class="total-amount">{{
              chargeAmount
            }}</span>
          </div>
        </div>
        <div class="title">{{$t('localization.AdditionalCard')}}</div>
        <div class="info">
          <div class="add-button">
            <el-input v-model="singleCard">
              <el-button slot="append" @click="addSingleCard">{{$t('localization.Add')}}</el-button>
            </el-input>
            <el-button>{{$t('localization.BatchAdd')}}</el-button>
          </div>
          <div class="total">{{$t('localization.Currently')}}{{ this.tableData.length }}个</div>
        </div>
        <div class="sim-table">
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
              <div class="handle" @click="goDelete(props.row)">{{$t('localization.Delete')}}</div>
            </template>
          </swd-table>
        </div>
        <div class="totalMoney">
          <span>共付金额（元）：</span>
          <span class="num">{{
            parseFloat(overflowAmoumt + chargeAmount)
          }}</span>
        </div>
      </div>
      <div class="btn-right">
        <el-button type="primary" @click="createOrder">{{$t('localization.Confirm')}}</el-button>
        <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
      </div>
    </div>
    <div v-if="showCustomDialog">
      <SwdDialog
        btn="center"
        title="自定义流量叠加"
        @confirm="addCustomPack"
        @dialog-cancel="showCustomDialog = false"
      >
      </SwdDialog>
    </div>
    <Charge @close="cancel" ref="charge" :title="$t('localization.HRecharge')" content="确定使用余额支付充值流量吗？"/>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable1";
import swdInput from "../form/swdInput";
import SwdDialog from "../common/SwdDialog";
import Charge from "../charge/charge"
export default {
  props: {
    data: Array,
  },
  components: {
    swdTable,
    swdInput,
    SwdDialog,
    Charge
  },
  data() {
    return {
      singleCard: null,
      addtionalPay: 0,
      overflowCards: [],
      showCustomDialog: false,
      customFlag: false,
      customValue: 0,
      customPack: "",
      tableAll: {
        select: false,
        handle: false,
        type: true,
      },
      packageSize: null,
      dataOptions: [],
      amount: 0,
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID" },
        { prop: "overFlow", title: this.$t('localization.Overflow') },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码,
      tableData: [],
      type: null,
    };
  },
  watch: {
    packageSize(val) {
      let result = this.dataOptions.some((item) => {
        return item.flow === val;
      });
      if (result) {
        this.customFlag = false;
      } else {
        this.customFlag = true;
      }
    },
  },
  computed: {
    overflowCount: function () {
      return this.overflowCards.length;
    },
    overflowData: function () {
      let amount = 0;
      if (this.overflowCards.length) {
        amount = this.overflowCards.reduce((total, item) => {
          return total + item.overFlow;
        });
      }
      return amount;
    },
    overflowAmoumt: function () {
      let amount = 0;
      if (this.overflowCards.length) {
        let amount = this.overflowCards.reduce((total, item) => {
          return total + item.overFlow * item.flowPrice;
        });
      }
      return amount;
    },
    chargeData: function () {
      return this.packageSize * this.tableData.length;
    },
    chargeAmount: function () {
      let amount = 0;
      if (!this.customFlag) {
        let result=this.dataOptions.find(item=>{
          return item.flow===this.packageSize
        })
        if(result){
          amount=this.tableData.length*result.flowPrice
        }
      } else {
        amount = this.tableData.reduce((total, item) => {
          return total + item.flowPrice * this.packageSize;
        }, 0);
      }
      amount = amount.toFixed(2);
      return amount;
    },
  },
  mounted() {
    this.type = this.data[0].packType;
    let url =
      this.type === 1
        ? "/pay/queryBatchYearFlowCards.do"
        : "/pay/queryBatchMonthFlowCards.do";
    let cards = [];
    let overflowCards = [];
    this.data.forEach((item) => {
      cards.push(item.cardNo);
      if (item.overFlow > 0) {
        overflowCards.push(item);
      }
    });
    this.overflowCards = overflowCards;
    let params = {
      cards,
    };
    this.$client.get(url, params).then((res) => {
      this.tableData = res.data.OKCards;
    });
    this.getAllPacks();
  },
  methods: {
    cancel() {
      this.initComponent()
      this.$emit("cancel");
    },
    initComponent(){
      this.type=null
      this.tableData=[]
    },
    getAllPacks() {
      let url = "/pay/queryFlowPackageList.do";
      this.$client.get(url).then((res) => {
        this.dataOptions = res.data;
      });
    },
    confirm() {
      this.$emit("confirm");
    },
    addCustomPack(val) {
      this.packageSize = Number(val);
      this.customValue = Number(val);
      this.customPack = val + "M";
      this.showCustomDialog = false;
    },
    createOrder() {
      let cards=[]
      let url
      this.tableData.forEach(item=>{
        cards.push(item.cardNo)
      })
      let params={
        cards,
        addFlow:this.packageSize,
        totalPay:parseFloat(this.overflowAmoumt + this.chargeAmount)
      }
      if(this.type){
        url="/pay/addBatchYearFlowDieJiaOrder.do"
        this.customFlag?params.isUseFlowPackage=0:params.isUseFlowPackage=1
      }else{
        url="/pay/addBatchGoRechargeOrder.do"
      }
      this.$client.get(url, params).then(res=>{
        let {totalPay, out_trade_no}=res.data
        this.$refs.charge.open(totalPay, out_trade_no)
      })
    },
    //表格子组件选择框触发方法
    handleSelectionChange(obj) {},
    addSingleCard() {
      let exised=false
      this.tableData.forEach(item=>{
        if(item.cardNo===this.singleCard){
          exised=true
          this.$message.warning('卡号已存在')
        }
      })
      if(exised) return
      let url = "/package/queryBatchCardsPackage.do";
      let params = {
        cards: this.singleCard,
      };
      this.$client.get(url, params).then((res) => {
        let card=res.data.OKCards[0]
        if(card.packType===this.type){
          this.tableData.push(card)
        }else{
          this.$message.warning('月卡和年卡暂不支持共同叠加流量')
        }
      });
    },
    customOption() {
      this.showCustomDialog = true;
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
    goDelete(info) {
      this.tableData.forEach((item, i)=>{
        if(item.cardNo===info.cardNo){
          this.tableData.splice(i,1)
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.flow-recharge {
  .dialog {
    width: 630px;
    .content {
      .info {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .amount {
          line-height: 32px;
          font-size: inherit;
          /deep/ .el-input {
            display: inline-block;
            width: 91px;
            background: rgba(255, 255, 255, 1);
            margin: 0 5px;
            .el-input__inner {
              border: 1px solid rgba(222, 224, 227, 1);
              border-radius: 3px;
              height: 32px;
            }
          }
        }
        .total {
          font-size: inherit;
          line-height: 32px;
          .total-amount {
            color: #fb7823;
          }
        }
        /deep/.add-button {
          display: flex;
          font-size: 13px;
          vertical-align: middle;
          line-height: 32px;
          .el-input-group {
            width: 300px;
            font-size: 13px;
            vertical-align: middle;
            .el-input__inner {
              height: 32px;
              border: 1px solid rgba(222, 224, 227, 1);
              border-radius: 3px 0 0 3px;
            }
            .el-input-group__append {
              box-sizing: border-box;
              height: 32px;
              background-color: #3370ff;
              color: #fff;
              font-size: 13px;
              border-color: #3370ff;
              border-radius: 0 3px 3px 0;
            }
            margin-right: 14px;
          }
          .el-button {
            height: 32px;
            font-size: 13px;
            padding: 0 10px;
          }
        }
      }
      .title {
        margin: 18px 0;
        font-size: 13px;
      }
      .addCard {
        padding-top: 16px;
        .title {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
        }
        .cont {
          padding-top: 13px;
        }
        .cardShuru {
          .add {
            width: 64px;
            height: 32px;
            background: rgba(51, 112, 255, 1);
            line-height: 32px;
            font-size: 13px;
            color: #fff;
            text-align: center;
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
          }
        }
        .cardNumber {
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          color: #666;
        }
      }
      .sim-table {
        padding-top: 14px;
      }
      .totalMoney {
        text-align: right;
        padding-top: 23px;
        span {
          font-size: 13px;
          line-height: 16px;
          color: #333;
        }
        .num {
          font-size: 13px;
          line-height: 16px;
          color: #fb7823;
        }
      }
      .btnArr {
        padding-top: 34px;
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
