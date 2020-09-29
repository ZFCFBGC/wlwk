<!--  -->
<template>
  <div class="sale-dialog" v-if="show">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{this.$t('localization.Sell')}}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="sale-form">
          <BatchSearch
            v-if="showBatchSearch"
            @cancel="showBatchSearch = false"
            @search="searchBatch"
          ></BatchSearch>
          <el-form :data="saleForm" label-position="top">
            <el-form-item label="目标客户">
              <ClientName
                v-model="saleForm.userId"
                @nodeChange="getClientVal"
              />
            </el-form-item>
            <el-form-item label="添加设备">
              <div class="operation">
                <el-input class="add-device" v-model="cardNo">
                  <el-button slot="append" @click="getUserCards"
                    >{{$t('localization.Add')}}</el-button
                  >
                </el-input>
                <el-button @click="addBatch">{{$t('localization.BatchAdd')}}</el-button>
                <span class="current-count">{{$t('localization.Currently')}}：{{ count }}个</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <swd-table
          :table="tableAll"
          :tableData="cardsData"
          :tableLabel="saleTableLabel"
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

      <div class="btn-right">
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
  props: {
    show: false
  },
  components: {
    swdTable,
    BatchSearch,
    ClientName
  },
  data() {
    //这里存放数据
    return {
      showBatchSearch: false,
      cardsData: null,
      saleForm: {
        userId: null
      },
      saleTableLabel: [
        { prop: "corresponding", title: "设备号（IMEI）" },
        { prop: "nickname", title: this.$t('localization.Operation') },
        { prop: "", title: this.$t('localization.Operation') }
      ],
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      cardNo: null,
      count: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    getClientVal(e) {
      this.saleForm.userId = e.userId;
      // this.ruleForm.superiorName = e.nickname;
    },
    getUserCards() {},
    addBatch() {
      this.showBatchSearch = true;
    },
    searchBatch(cards) {
      let result = cards.split(/\n/).join(",");
      let url = "/card/queryBatchCards.do";
      let params = {
        cards: result
      };
      this.$client.get(url, params).then(res => {
        this.cardsData = res.data;
        this.count = res.total;
      });
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
          this.$emit("cancel");

        }
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
.sale-dialog {
  .dialog {
    width: 673px;
    .content {
      .sale-form {
        margin-bottom: 20px;
        /deep/.el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            margin: 10px 0;
            height: 13px;
            line-height: 13px;
            padding: 0;
          }
          .el-button {
            display: inline-block;
            height: 32px;
            font-size: 13px;
            padding: 0 10px;
            line-height: 32px;
            vertical-align: middle;
          }
        }
        .operation {
          position: relative;
        }
        .current-count {
          position: absolute;
          right: 5px;
          font-size: 13px;
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
            .el-input {
              display: inline-block;
            }
            .el-input__inner {
              height: 32px;
            }
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
}
</style>
