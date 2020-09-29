<template>
  <div class="orderForm">
    <div class="mask"></div>
    <div class="table">
      <div class="header clearfix">
        <div class="title fl">订单</div>
        <div class="close fr" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="search">
          <el-input :placeholder="$t('localization.Search')" v-model="client">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('localization.ClientRelations')" name="first">
              <div class="relationship">
                <div class="title">{{$t('localization.BelongsCustomer')}}</div>
                <div class="relTable">
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
            </el-tab-pane>
            <el-tab-pane :label="$t('localization.Details')" name="second">
              <div class="details">
                <div class="cardInfo">
                  <div class="title clearfix">
                    <div class="title_l fl"></div>
                    <div class="title_r">SIM卡信息</div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.CardNum')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">{{$t('localization.ExpirationDate')}}</div>
                      <div class="cont clearfix">
                        <div class="shuru fl"></div>
                        <div class="btn fl">{{this.$t('localization.Renew')}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.PackageType')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">{{this.$t('localization.MonthFlow')}}</div>
                      <div class="cont clearfix">
                        <div class="shuru fl"></div>
                        <div class="btn fl">{{this.$t('localization.FillingFlow')}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.PackSurplus1')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">{{this.$t('localization.CurrentMsg')}}</div>
                      <div class="cont clearfix">
                        <div class="shuru fl"></div>
                        <div class="btn fl">{{this.$t('localization.SMS')}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.ActivationTime')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">ICCID</div>
                      <div class="shuru_r"></div>
                    </div>
                  </div>
                  <div class="device_title clearfix">
                    <div class="title_l fl"></div>
                    <div class="title_r">{{this.$t('localization.DeviceInfo')}}</div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.AccStatus1')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t clearfix">
                        <div class="fl list_r_t_t">{{this.$t('localization.EquipmentIMEI')}}</div>
                        <div class="fl refresh">{{this.$t('localization.Refresh')}}</div>
                      </div>
                      <div class="shuru_r"></div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t clearfix">
                        <div class="fl list_r_t_t">{{this.$t('localization.DeviceState')}}</div>
                        <div class="fl refresh">{{this.$t('localization.Refresh')}}</div>
                      </div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">IMSI</div>
                      <div class="shuru_r"></div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{this.$t('localization.EquipmentType')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t clearfix">
                        <div class="fl list_r_t_t">GPS功能</div>
                        <div class="fl refresh">{{this.$t('localization.Refresh')}}</div>
                      </div>
                      <div class="shuru_r"></div>
                    </div>
                  </div>
                  <div class="list clearfix">
                    <div class="list_l fl">
                      <div class="list_l_t">{{$t('localization.CardForm')}}</div>
                      <div class="shuru"></div>
                    </div>
                    <div class="list_r fl">
                      <div class="list_r_t">{{$t('localization.LatestUseTime')}}</div>
                      <div class="shuru_r"></div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="销售" name="third">
              <div class="sales">
                <div class="target">
                  <div class="target_t">{{$t('localization.TargetClient')}}</div>
                  <div class="targrt_s"></div>
                </div>
                <div class="devices">
                  <div class="devices_t">{{$t('localization.AddDevice')}}</div>
                  <div class="devices_con clearfix">
                    <div class="fl cardShuru clearfix">
                      <div class="shuru fl">
                        <swd-input
                          v-model="packPrice1"
                          :value="packPrice1"
                          placeholder="0.00"
                          :width="300"
                        ></swd-input>
                      </div>
                      <div class="add fl" @click="getAdd">{{$t('localization.Add')}}</div>
                      <div class="batchAdd fl">{{$t('localization.BatchAdd')}}</div>
                    </div>
                    <div class="fr cardNumber">{{$t('localization.Currently')}}：5{{$t('localization.item')}}</div>
                  </div>
                </div>
                <div class="sales_table">
                  <swd-table
                    :table="saleTableAll"
                    :tableData="saleTableData"
                    :tableLabel="saleTableLabel"
                    :total="saleTotal"
                    @handleSelectionChange="saleHandleSelectionChange"
                    @handleCurrentChange="saleHandleCurrentChange"
                    @goCurrentPage="saleGoCurrentPage"
                  ></swd-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="btnArr clearfix" v-if="activeName == 'second'">
          <div class="cancel fr" @click="cancel">{{$t('localization.Cancel')}}</div>
          <div class="confirm fr" @click="confirm">{{$t('localization.Confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable.vue";
import swdInput from "../form/swdInput1.vue";
export default {
  components: {
    swdTable,
    swdInput
  },
  data() {
    return {
      client: "",
      activeName: "second",
      tableAll: {
        select: false,
        handle: false,
        type: true
      },
      tableData: [1, 1, 1, 1],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.ClientName') },
        { prop: "corresponding", title: this.$t('localization.LoginName') },
        { prop: "nickname", title: this.$t('localization.Contacts') },
        { prop: "packName", title: this.$t('localization.ContactNumber') }
      ],
      pageSize: 10, //默认多少条一页
      pageIndex: 1, //初始页码

      // 销售表单
      saleTableAll: {
        select: false,
        handle: false,
        type: true
      },
      saleTableData: [1, 1, 1, 1],
      saleTotal: null, //总条数
      saleTableLabel: [
        { prop: "cardNo", title: this.$t('localization.ClientName') },
        { prop: "corresponding", title: this.$t('localization.LoginName') },
        { prop: "nickname", title: this.$t('localization.Contacts') },
        { prop: "packName", title: this.$t('localization.ContactNumber') }
      ],
      salePageSize: 10, //默认多少条一页
      salePageIndex: 1, //初始页码
      packPrice1: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
    handleClick(tab, event) {
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

    //表格子组件选择框触发方法
    saleHandleSelectionChange(obj) {
    },
    //分页按钮触发方法
    saleHandleCurrentChange(obj) {
      this.salePageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    saleGoCurrentPage(obj) {
      this.salePageIndex = obj.multipleSelection;
      //this.getFlow();
    },
    getAdd() {
    }
  }
};
</script>
<style lang="less" scoped>
.orderForm {
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
    width: 830px;
    height: 682px;
    box-sizing: border-box;
    padding: 26px 0 26px 36px;
    background: #fff;
    z-index: 1001;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    .header {
      .title {
        font-size: 14px;
        color: rgba(24, 38, 60, 1);
      }
      .close {
        color: #646a73;
        font-size: 14px;
      }
      padding-right: 36px;
    }
    .content {
      /deep/.search {
        padding-right: 36px;
        padding-top: 16px;
        .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 16px;
        }
        .el-input__prefix {
          top: -3px;
        }
      }
      /deep/.tabs {
        padding-top: 14px;
        // padding-right:36px;
        color: #666;
        .el-tabs__item {
          color: #666;
          font-size: 13px;
        }
        .el-tabs__header {
          margin: 0 36px 0 0;
        }
        .relationship {
          margin-top: 20px;
          .title {
            height: 16px;
            line-height: 16px;
            font-size: 13px;
            color: #666;
          }
          .relTable {
            margin-right: 36px;
            margin-top: 16px;
          }
        }
        .details {
          height: 460px;
          overflow-y: auto;
          .cardInfo {
            margin-top: 32px;
            .title {
              margin-bottom: 32px;
              .title_l {
                width: 4px;
                height: 16px;
                background: rgba(51, 112, 255, 1);
              }
              .title_r {
                padding-left: 16px;
                font-size: 14px;
                line-height: 16px;
                height: 16px;
                color: #000;
              }
            }
            .device_title {
              padding-top: 16px;
              padding-bottom: 32px;
              .title_l {
                width: 4px;
                height: 16px;
                background: rgba(51, 112, 255, 1);
              }
              .title_r {
                padding-left: 16px;
                font-size: 14px;
                line-height: 16px;
                height: 16px;
                color: #000;
              }
            }
          }
          .list {
            margin-bottom: 16px;
            .list_l {
              .list_l_t {
                font-size: 13px;
                color: #666;
                line-height: 16px;
                margin-bottom: 16px;
              }
              .shuru {
                width: 364px;
                height: 32px;
                background: rgba(244, 245, 249, 1);
                border-radius: 3px;
                line-height: 32px;
                color: #000;
                text-indent: 1em;
              }
            }
            .list_r {
              margin-left: 25px;
              .list_r_t {
                font-size: 13px;
                color: #666;
                line-height: 16px;
                margin-bottom: 16px;
              }
              .shuru_r {
                width: 364px;
                height: 32px;
                background: rgba(244, 245, 249, 1);
                border-radius: 3px;
                line-height: 32px;
                color: #000;
                text-indent: 1em;
              }
              .cont {
                .shuru {
                  width: 273px;
                  height: 32px;
                  background: rgba(244, 245, 249, 1);
                  border-radius: 3px;
                  line-height: 32px;
                  color: #000;
                  text-indent: 1em;
                }
                .btn {
                  margin-left: 13px;
                  width: 76px;
                  height: 32px;
                  background: rgba(255, 255, 255, 1);
                  border: 1px solid rgba(222, 224, 227, 1);
                  border-radius: 3px;
                  line-height: 32px;
                  font-size: 13px;
                  color: #000;
                  text-align: center;
                }
              }
            }
          }
        }
        .sales {
          .target {
            margin-top: 22px;
            .target_t {
              font-size: 13px;
              color: #333;
            }
            .targrt_s {
              margin-top: 16px;
              height: 32px;
              width: 364px;
              border: 1px solid #eee;
            }
          }
          .devices {
            margin-top: 16px;
            margin-right: 36px;
            .devices_t {
              font-size: 13px;
              color: #333;
            }
            .devices_con {
              margin-top: 16px;
              .cardShuru {
                .add {
                  padding: 0 16px;
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
          }
          .sales_table {
            margin-top: 22px;
            margin-right: 36px;
          }
        }
      }
      .btnArr {
        padding-top: 18px;
        margin-right: 36px;
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
