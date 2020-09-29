<!--  -->
<template>
  <div class="detail-dialog">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{this.$t('localization.Details1')}}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <el-input v-model="currentCard" @keydown.enter="searchCurrentCard">
        <template slot="prepend"><i class="el-icon-search"></i></template>
      </el-input>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('localization.ClientRelations')" name="first">
            <div class="relation-table">
              <div class="title">{{this.$t('localization.Customer')}}</div>
              <swd-table
                :table="tableAll"
                :tableData="customerData"
                :tableLabel="customerLabel"
              ></swd-table>
            </div>
          </el-tab-pane>
          <el-tab-pane class="detail" :label="this.$t('localization.Details')" name="second">
            <div class="info-title">SIM卡信息</div>
            <div class="info-table">
              <el-form inline label-position="top">
                <el-form-item :label="$t('localization.CardNum')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.ExpirationDate')">
                  <el-input></el-input>
                  <el-button>{{this.$t('localization.Renew')}}</el-button>
                </el-form-item>
                <el-form-item :label="$t('localization.PackageType')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.MonthFlow')">
                  <el-input></el-input>
                  <el-button>{{this.$t('localization.FillingFlow')}}</el-button>
                </el-form-item>
                <el-form-item :label="$t('localization.PackSurplus1')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.CurrentMsg')">
                  <el-input></el-input>
                  <el-button>{{this.$t('localization.SMS')}}</el-button>
                </el-form-item>
                <el-form-item :label="this.$t('localization.ActivationTime')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="ICCID">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="info-title">{{this.$t('localization.DeviceInfo')}}</div>
            <div class="info-table">
              <el-form inline label-position="top">
                <el-form-item :label="$t('localization.AccStatus1')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.EquipmentIMEI')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.DeviceState')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="IMSI">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.EquipmentType')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="GPS功能">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.CardStatus')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item :label="$t('localization.LatestUseTime')">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item class="remarks" :label="this.$t('localization.Remarks')">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane class="retail" :label="$t('localization.Sell')" name="third">
            <BatchSearch v-if="showBatchSearch" @cancel="showBatchSearch=false" @search="searchBatch"/>
            <el-form :data="saleForm" label-position="top">
              <el-form-item :label="$t('localization.TargetClient')">
                <ClientName v-model="saleForm.userId" @nodeChange="getClientVal"/>
              </el-form-item>
              <el-form-item :label="$t('localization.AddDevice')">
                <el-input class="add-device" v-model="cardNo">
                  <el-button slot="append" @click="getUserCards"
                    >{{$t('localization.Add')}}</el-button
                  >
                </el-input>
                <el-button @click="addBatch">{{$t('localization.BatchAdd')}}</el-button>
              </el-form-item>
            </el-form>
            <swd-table :table="tableAll" :tableData="cardsData" :tableLabel="saleTableLabel">
              <template
              slot-scope="props"
              v-if="props.row != undefined"
              slot="handle"
            >
              <div class="handle" @click="goDelete(props.row)">{{$t('localization.Delete')}}</div>
              </template>
            </swd-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="btn-right" v-if="activeName === 'second'">
        <el-button type="primary">{{$t('localization.Confirm')}}</el-button>
        <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
      </div>
      <div class="btn-right" v-if="activeName === 'third'">
        <el-button type="primary" @click="batchSaleCards">{{this.$t('localization.Sell')}}</el-button>
        <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import swdTable from "../../components/swdTable/swdTable1";
import BatchSearch from "../../components/managePop/batchSearch";
import ClientName from "../form/clientName";


export default {
  //import引入的组件需要注入到对象中才能使用
  name: "detail", //详单
  props: {
    card: Number,
    default: null,
    currentCard: null
  },
  components: {
    swdTable,
    ClientName,
    BatchSearch
  },
  data() {
    //这里存放数据
    return {
      activeName: "first",
      cardNo: null,
      cardsData:null,
      tableLabel: [
        { prop: "", title: this.$t('localization.SerialNo') },
        { prop: "", title: this.$t('localization.ClientName') },
        { prop: "", title: this.$t('localization.LoginName') },
        { prop: "", title: this.$t('localization.Contacts') },
        { prop: "", title: this.$t('localization.ContactNumber') }
      ],
      saleTableLabel: [
        { prop: "corresponding", title: "设备号（IMEI）" },
        { prop: "nickname", title: this.$t('localization.BelongsCustomer') },
        { prop: "", title: this.$t('localization.Operation') }
      ],
      customerLabel: [
        { prop: "nickname", title: this.$t('localization.ClientName') },
        { prop: "loginName", title: this.$t('localization.LoginName') },
        { prop: "", title: this.$t('localization.Contacts') },
        { prop: "tel", title: this.$t('localization.ContactNumber') }
      ],
      customerData: [],
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      saleForm:{},
      showBatchSearch:false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getUserCards(carNo) {
      if (carNo) {
        swd.compop({
          title: "提示",
          content: "卡号不能为空"
        });
      }
      let url = "/card/queryCardListPage.do";
      let params = {
        cards: this.cardNo
      };
      this.$client.get(url, params).then(res => {
      });
    },
    handleClick(tab, event) {
    },
    batchSaleCards(){
      let result=[]
      this.cardsData.forEach(item=>{
        result.push(item.cardNo)
      })
      result=result.join(",")
      let params={
        userId:this.saleForm.userId,
        cards:result
      }
      let url="/card/batchSaleCards.do"
      this.$client.get(url, params).then(res=>{
        if(res.code==="200"){
          swd.compop({
            title:'结果',
            content:res.msg
          })
        }
      })
    },
    getClientVal(e) {
      this.saleForm.userId = e.userId;
      // this.ruleForm.superiorName = e.nickname;
    },
    addBatch(){
      this.showBatchSearch=true
    },
    cancel() {
      this.$emit("cancel");
    },
    searchCurrentCard() {
      let url = "/card/queryCardListPage.do";
      let params = {
        cards: this.currentCard
      };
      this.$client.get(url, params).then(res => {
      });
    },
    searchBatch(cards){
      let result=cards.split(/\n/).join(",")
      let url="/card/queryBatchCards.do"
      let params={
        cards:result
      }
      this.$client.get(url, params).then(res=>{
        this.cardsData=res.data
      })
    },
    getRelationship() {
      let url = "/user/queryCustomerRelationship.do";
      let params = {
        cardNo: this.currentCard
      };
      this.$client.get(url, params).then(res => {
        let result = res.data;
        result.forEach((item, index) => {
          if (index === 0) return;
          item.nickname = item.nickname.split("");
          item.nickname = item.nickname.join("");
        });
        this.customerData = result;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.currentCard = this.card;
    this.getRelationship();
    this.searchCurrentCard();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.detail-dialog {
  .dialog {
    width: 830px;
    height: 682px;
    .content {
      height: 506px;
      overflow-y: auto;
      padding-right: 2px;
    }
    /deep/.el-input {
      margin-top: 16px;
      font-size: 12px;
      .el-input-group__prepend {
        background-color: #fff;
        border-radius: 16px 0 0 16px;
      }
      .el-input__inner {
        height: 32px;
        line-height: 32px;
        border-radius: 0 16px 16px 0;
        border-left: 0;
        &:focus {
          border-color: #dee0e3;
        }
      }
    }
    .relation-table {
      .title {
        font-size: 13px;
        color: rgba(85, 85, 85, 1);
        line-height: 35px;
      }
    }
    .detail {
      .info-title {
        width: 68px;
        height: 77px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 77px;
        vertical-align: middle;
      }
      .info-table {
        /deep/.el-form--inline {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .el-form-item {
            width: 48%;
            margin: 0 0 0 0;
            .el-form-item__label {
              margin-top: 5px;
              height: 13px;
              line-height: 13px;
            }
            .el-form-item__content {
              display: flex;
              align-items: center;
              .el-input {
                flex: 1;
              }
              .el-button {
                margin-bottom: 4px;
                align-self: flex-end;
                margin-left: 16px;
                width: 76px;
                height: 32px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(222, 224, 227, 1);
                border-radius: 3px;
                padding: 0 10px;
                span {
                  height: 32px;
                  line-height: 32px;
                }
              }
            }
            .el-input__inner {
              height: 32px;
              background: rgba(244, 245, 249, 1);
              border-radius: 3px;
              border: 0;
            }
            .el-textarea {
              margin-top: 10px;
            }
            &.remarks {
              display: block;
              width: 100%;
            }
          }
        }
      }
    }
    .retail {
      /deep/.el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          margin: 10px 0;
          height: 13px;
          line-height: 13px;
        }
        .el-button {
          display: inline-block;
          height: 32px;
          padding: 0 10px;
          line-height: 32px;
          vertical-align: middle;
        }
      }
      /deep/.el-input {
        margin-top: 0;
        width: 365px;
        vertical-align: middle;
        position: relative;
        .el-input__inner {
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          vertical-align: middle;
        }
        &.add-device {
          display: inline-block;
        }
        .el-input-group__append {
          width: 61px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          box-sizing: border-box;
          font-size: 13px;
          color: #fff;
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 8px;
          .el-button {
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>
