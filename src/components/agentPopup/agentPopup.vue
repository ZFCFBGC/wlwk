<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl">{{ popInfo.title }}</div>
        <div class="close fr" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="popContent">
        <div class="popList clearfix">
          <div class="popList_l fl">
            <div class="title">代理名称</div>
            <div class="popShuru" v-if="popInfo.title == $t('localization.NewPackage')">
              <client-name
                v-model="client"
                @nodeChange="getClientVal"
              ></client-name>
            </div>
            <div class="popShuru" v-if="popInfo.title == '编辑套餐'">
              {{ nickname }}
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.PackName')}}</div>
            <div class="popShuru" v-if="popInfo.title == $t('localization.NewPackage')">
              <swd-select
                v-model="packName"
                @change="getPackname"
                @getPackageInfo="getPackageInfo"
                :params="pakageObj"
              ></swd-select>
            </div>
            <div class="popShuru" v-if="popInfo.title == '编辑套餐'">
              {{ packageName }}
            </div>
          </div>
        </div>

        <div class="popList clearfix">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.FlowSize')}}（M）</div>
            <div class="popShuru">
              <swd-input
                :value="tCFlow"
                placeholder="0.00"
                :disabled="true"
                v-model="tCFlow"
              ></swd-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.ExceedData')}}（M/{{$t('localization.Month1')}}）</div>
            <div class="popShuru">
              <swd-input
                :value="isOverstepFlow"
                placeholder="0.00"
                :disabled="true"
                v-model="isOverstepFlow"
              ></swd-input>
            </div>
          </div>
        </div>
        <!-- 月卡 -->
        <div style="margin-top:20px;" v-if="packType == 0">
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.TestData')}}（M/{{$t('localization.Month1')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="testFlow"
                  placeholder="0.00"
                  :disabled="true"
                  v-model="testFlow"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.DataUnitPrice')}}</div>
              <div class="popShuru">
                <swd-input
                  :value="flowPrice"
                  placeholder="0.00"
                  v-model="flowPrice"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.SingleMonth')}}（{{$t('localization.HYuan')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="packPrice5"
                  placeholder="0.00"
                  v-model="packPrice5"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.OneYear')}}（{{$t('localization.HYuan')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="packPrice1"
                  placeholder="0.00"
                  v-model="packPrice1"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.Status')}}</div>
              <div class="popShuru">
                <swd-select
                  v-model="isDelete"
                  @change="getStatus"
                  @getPackageInfo="getStaticInfo"
                  :options="packageStatusArr1"
                ></swd-select>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.Remarks')}}</div>
              <div class="popShuru">
                <swd-textarea
                  v-model="remark"
                  :value="remark"
                  placeholder="请输入内容"
                >
                </swd-textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 年卡 -->
        <div style="margin-top:20px;" v-if="packType == 1">
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.TestData')}}（M/{{$t('localization.Month1')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="testFlow"
                  placeholder="0.00"
                  :disabled="true"
                  v-model="testFlow"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.DataUnitPrice')}}</div>
              <div class="popShuru">
                <swd-input
                  :value="flowPrice"
                  placeholder="0.00"
                  v-model="flowPrice"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.OneYear')}}（{{$t('localization.HYuan')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="packPrice1"
                  placeholder="0.00"
                  v-model="packPrice1"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.Status')}}</div>
              <div class="popShuru">
                <swd-select
                  v-model="isDelete"
                  @change="getStatus"
                  @getPackageInfo="getStaticInfo"
                  :options="packageStatusArr1"
                ></swd-select>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="title">{{$t('localization.Remarks')}}</div>
            <div class="popShuru">
              <swd-textarea
                v-model="remark"
                :value="remark"
                :width="754"
                placeholder="请输入内容"
              >
              </swd-textarea>
            </div>
          </div>
        </div>
        <!-- 语音卡 -->
        <div style="margin-top:20px;" v-if="packType == 2">
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.TestData')}}（M/{{$t('localization.Month1')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="testFlow"
                  placeholder="0.00"
                  :disabled="true"
                  v-model="testFlow"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.VoiceSize')}}</div>
              <div class="popShuru">
                <swd-input
                  :value="tcVoice"
                  placeholder="0.00"
                  v-model="tcVoice"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.DataUnitPrice')}}</div>
              <div class="popShuru">
                <swd-input
                  :value="flowPrice"
                  placeholder="0.00"
                  v-model="flowPrice"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.VoiceUnitPriceWithUnit')}}</div>
              <div class="popShuru">
                <swd-input
                  :value="voicePrice"
                  placeholder="0.00"
                  v-model="voicePrice"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.SingleMonth')}}（{{$t('localization.HYuan')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="packPrice5"
                  placeholder="0.00"
                  v-model="packPrice5"
                ></swd-input>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.OneYear')}}（{{$t('localization.HYuan')}}）</div>
              <div class="popShuru">
                <swd-input
                  :value="packPrice1"
                  placeholder="0.00"
                  v-model="packPrice1"
                ></swd-input>
              </div>
            </div>
          </div>
          <div class="popList clearfix">
            <div class="popList_l fl">
              <div class="title">{{$t('localization.Status')}}</div>
              <div class="popShuru">
                <swd-select
                  :value="isDelete"
                  v-model="isDelete"
                  @change="getStatus"
                  @getPackageInfo="getStaticInfo"
                  :options="packageStatusArr1"
                ></swd-select>
              </div>
            </div>
            <div class="popList_r fr">
              <div class="title">{{$t('localization.Remarks')}}</div>
              <div class="popShuru">
                <swd-textarea
                  v-model="remark"
                  :value="remark"
                  placeholder="请输入内容"
                >
                </swd-textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="btnArr clearfix">
          <div class="save fl pointer" @click="goSave">{{$t('localization.Save')}}</div>
          <div class="cancel fl pointer" @click="goCancel">{{$t('localization.Cancel')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import clientName from "../form/clientName.vue";
import swdSelect from "../form/swdSelect.vue";
import swdInput from "../form/swdInput.vue";
import swdTextarea from "../form/swdTextarea.vue";
export default {
  components: {
    clientName,
    swdSelect,
    swdInput,
    swdTextarea
  },
  props: {
    popInfo: {
      type: Object
    }
  },
  watch: {
    popInfo: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.popInfo = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      packageStatusArr1: [
        {
          value: "0",
          label: this.$t('localization.OnShelf')
        },
        {
          value: "1",
          label: this.$t('localization.OffShelf')
        }
      ], //新增编辑套餐状态数组
      pakageObj: {},
      packType: 0,
      isClient: false,
      client: null, //代理名称
      userId: null, //代理ID
      packName: "", //套餐名称
      tCFlow: "", //套餐流量
      isOverstepFlow: "", //可超出流量
      testFlow: "", //测试流量
      tcVoice: "", //语音大小
      flowPrice: "", //流量单价
      voicePrice: "", //语音单价
      packPrice5: "", //单月价格
      packPrice1: "", //年价格
      isDelete: "", //
      remark: "", //
      nickname: "", //代理名称实名
      packageName: "" //代理套餐实名
    };
  },
  created() {
    if (this.popInfo.info) {
      this.packType = this.popInfo.info.packType;
      this.packName = this.popInfo.info.packID;
      this.packageName = this.popInfo.info.packName;
      this.client = this.popInfo.info.nickname;
      this.userId = this.popInfo.info.userId;
      this.nickname = this.popInfo.info.nickname;
      this.flowPrice = this.popInfo.info.flowPrice;
      this.packPrice5 = this.popInfo.info.packPrice5;
      this.packPrice1 = this.popInfo.info.packPrice1;
      this.isDelete = this.popInfo.info.isDelete;
      this.getCommonInfo(this.popInfo.info.packID);
    }
  },
  beforeDestroy() {},
  methods: {
    //打开代理套餐选择
    goClient() {
      this.isClient = !this.isClient;
    },
    close() {
      this.$emit("handleIsPop");
    },
    //新增套餐类型变化
    getType(val) {
    },
    goSave() {
      if (this.popInfo.title == this.$t('localization.NewPackage')) {
        this.addManage();
      } else {
        this.editMagage();
      }
    },
    goCancel() {
      this.$emit("handleIsPop");
    },
    // editManage
    editMagage() {
      var url = "/package/updateUserPackage.do";
      try {
        if (!this.packName) {
          throw "请选择套餐名称";
        }
        if (!this.flowPrice) {
          throw "请输入流量单价";
        }
        if (!this.voicePrice && this.packType == 2) {
          throw "请输入语音单价";
        }
        if (!this.packPrice5 && this.packType != 1) {
          throw "请输入单月价格";
        }
        if (!this.packPrice1) {
          throw "请输入年价格";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: error
        });
        return;
      }
      var params = {
        userId: this.userId,
        packId: this.packName,
        flowPrice: this.flowPrice,
        voicePrice: this.voicePrice,
        packPrice5: this.packPrice5,
        packPrice1: this.packPrice1,
        isDelete: this.isDelete,
        remark: this.remark
      };
      this.$client.get(url, params).then(res => {
        if (res.code == 200) {
          this.$emit("goAdd");
        } else {
          swd.showInfo({
            title: "提示",
            content: res.msg ? res.msg : "网络故障,请检查网络设置。",
            errorCode: res.code
          });
        }
      });
    },
    //新增套餐接口
    addManage() {
      var url = "/package/addUserPackage.do";
      try {
        if (!this.client) {
          throw "请选择代理名称";
        }
        if (!this.packName) {
          throw "请选择套餐名称";
        }
        if (!this.flowPrice) {
          throw "请输入流量单价";
        }
        if (!this.voicePrice && this.packType == 2) {
          throw "请输入语音单价";
        }
        if (!this.packPrice5 && this.packType != 1) {
          throw "请输入单月价格";
        }
        if (!this.packPrice1) {
          throw "请输入年价格";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: error
        });
        return;
      }
      var params = {
        userId: this.userId,
        packId: this.packName,
        flowPrice: this.flowPrice,
        voicePrice: this.voicePrice,
        packPrice5: this.packPrice5,
        packPrice1: this.packPrice1,
        isDelete: this.isDelete,
        remark: this.remark
      };
      this.$client.get(url, params).then(res => {
        if (res.code == 200) {
          this.$emit("goAdd");
        } else {
          swd.showInfo({
            title: "提示",
            content: res.msg ? res.msg : "网络故障,请检查网络设置。",
            errorCode: res.code
          });
        }
      });
    },
    getClientVal(e) {
      this.client = e.nickname;
      this.userId = e.userId;
      this.pakageObj = {
        params: {
          userId: e.userId
        },
        url: "/package/queryUserNotHavePackage.do"
      };
    },
    getPackname(val) {
      this.getCommonInfo(val);
    },
    //获取当前套餐基本类型信息
    getPackageInfo(val) {
      this.packType = val.packType ? val.packType : "0";
    },
    // 获取状态类型
    getStaticInfo(val) {
    },
    // 获取套餐基本信息
    getCommonInfo(id) {
      var url = "/package/queryPackageById.do";
      this.$client
        .get(url, {
          packId: id
        })
        .then(res => {
          if (res.code == 200) {
            this.isOverstepFlow = res.data.isOverstepFlow;
            this.tCFlow = res.data.tCFlow;
            this.testFlow = res.data.testFlow;
            this.tcVoice = res.data.tcVoice;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    getStatus(val) {}
  }
};
</script>
<style lang="less" scoped>
.popUp {
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 830px;
    // height: 620px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
    transform: translate(-50%, -50%);
    padding-bottom: 90px;
    .header {
      height: 69px;
      padding-left: 37px;
      padding-right: 31px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #18263c;
      }
      .close {
        width: 16px;
        height: 16px;
      }
    }
    .popContent {
      margin: 0 37px 0 37px;
      position: relative;
      .popList:first-child {
        margin-top: 0px;
      }
      .popList {
        margin-top: 20px;
        .title {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 13px;
        }
        .popList_l {
          width: 364px;
          .title {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 13px;
          }
          .popShuru {
            height: 32px;
          }
        }
        .popList_r {
          width: 364px;
          .title {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 13px;
          }
          .popShuru {
            height: 32px;
          }
        }
      }
      .remarks {
        margin-top: 12px;
        .title {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 13px;
        }
        /deep/.popShuru {
          height: 32px;
          .el-textarea__inner {
            height: 32px;
          }
        }
      }
      .btnArr {
        position: absolute;
        bottom: -72px;
        right: 38px;
        .save {
          width: 76px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          color: #fff;
          margin-right: 12px;
        }
        .cancel {
          width: 76px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}
</style>
