<template>
  <div class="transfer-handle">
    <div class="mask"></div>
    <div class="table">
      <div class="header clearfix">
        <div class="title fl">{{$t('localization.Transfer')}}</div>
        <div class="close fr" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="list">
          <div class="listTitle">{{$t('localization.ClientName')}}</div>
          <div class="listShuru">{{ clientInfo.nickname }}</div>
        </div>
        <div class="list">
          <div class="listTitle">{{this.$t('localization.SubUser')}}</div>
          <div class="listShuru">{{subClients}}</div>
        </div>
        <div class="list">
          <div class="listTitle">{{$t('localization.SimCount')}}（{{$t('localization.Chapter')}}）</div>
          <!-- <div class="listShuru">1200</div> -->
          <el-input v-model="simCardCount"></el-input>
        </div>
        <div class="list">
          <div class="listTitle">{{$t('localization.TransferTo')}}</div>
          <div class="listSelect">
            <div class="clientName">
              <client-name
                :width="467"
                @nodeChange="getClientVal"
                :root="parentId"
              ></client-name>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="transfer" @click="transferHistory">{{$t('localization.TransferLog')}}</div>
        </div>
        <div class="list clearfix">
          <div class="cancel fr" @click="cancel">{{$t('localization.Cancel')}}</div>
          <div class="confirm fr" @click="confirm">{{$t('localization.Confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import clientName from "../form/clientName";
export default {
  props:{
    parentId:null
  },
  components: {
    clientName
  },
  data() {
    return {
      client: "",
      clientInfo: "",
      targetClient: null,
      subClients:null,
      simCardCount:null
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    async open(clientInfo) {
      this.clientInfo = clientInfo;
      let result = await this.getSubUser(this.clientInfo.id);
      let simCards=await this.getSimCount()
      this.simCardCount=simCards.data.cardsCount
      this.subClients=result.data?result.data.length:0
    },
    getSubUser(userId) {
      let url = "/user/queryAllSubordinateUsersPage.do";
      let result = this.$client.get(url, {
        userId: userId,
        beginCreateTime: this.beginCreateTime,
        endCreateTime: this.endCreateTime,
        isDelete: this.packageStatus,
        pageSize: this.downPageSize,
        pageIndex: this.downPageIndex
      });
      return result;
    },
    getSimCount() {
      let url = "/statistics/queryCardsStatistics.do";
      let result = this.$client.get(url, {
        userId: this.clientInfo.id,
      });
      return result;
    },
    getClientVal(e) {
      this.targetClient=e
    },
    transferHistory() {
      this.$emit("history");
    },
    confirm() {
      this.$emit("confirm", this.clientInfo,this.targetClient );
    }
  }
};
</script>
<style lang="less" scoped>
.transfer-handle {
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
    width: 543px;
    height: 498px;
    box-sizing: border-box;
    padding: 26px 36px;
    background: #fff;
    border-radius: 8px;
    z-index: 1000;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 26px 36px;
    .header {
      .title {
        font-size: 14px;
        color: rgba(24, 38, 60, 1);
      }
      .close {
        cursor: pointer;
        color: #646a73;
        font-size: 14px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .content {
      padding-top: 32px;
      /deep/.list {
        padding-bottom: 16px;
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
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
        .el-input {
          height: 32px;
          line-height: 32px;
          .el-input__inner {
            height: 32px;
            font-size: 13px;
            background: rgba(244, 245, 249, 1);
            border-radius: 3px;
            border:0;
          }
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
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
        .listTitle {
          font-size: 13px;
          color: #666;
          line-height: 16px;
          margin-bottom: 14px;
        }
        .listShuru {
          width: 467px;
          height: 32px;
          background: rgba(244, 245, 249, 1);
          border-radius: 3px;
          line-height: 32px;
          color: #333;
          font-size: 13px;
          text-indent: 1em;
        }
        .listSelect {
          width: 467px;
          height: 32px;
          position: relative;
          .clientName {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .transfer {
          font-size: 13px;
          color: #3370ff;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
