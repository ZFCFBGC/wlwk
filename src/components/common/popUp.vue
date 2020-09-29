<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl">{{ popInfo.title }}</div>
        <div class="close fr pointer" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="popContent">
        <div class="popList clearfix" v-if="popInfo.title == '编辑套餐'">
          <div class="popList_l fl">
            <div class="title1">
              {{$t('localization.PackageType')}}：{{ popInfo.info ? popInfo.info.packType1 : "" }}
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title1">
              {{$t('localization.PackName')}}：{{ popInfo.info ? popInfo.info.packName : "" }}
            </div>
          </div>
        </div>
        <div class="popList clearfix" v-if="popInfo.title != '编辑套餐'">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.PackageType')}}</div>
            <div class="popShuru">
              <el-select
                v-model="packType"
                :placeholder="$t('localization.SelectPlaceholder')"
                @change="getType"
              >
                <el-option
                  v-for="item in packageType1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.PackName')}}</div>
            <div class="popShuru">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="packName"
                :maxlength="60"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="popList clearfix">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.DataSize')}}（M）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="TCFlow"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.ExcessFlow')}}（M/{{$t('localization.Month1')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="IsOverstepFlow"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 语音开始 -->
        <div class="popList clearfix" v-if="packType == 2">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.VoiceSize')}}（Min）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="TCVoice"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.VoicePrice')}}（{{$t('localization.HYuan')}}/30Min）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="VoicePrice"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 语音结束 -->
        <div class="popList clearfix">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.TestData')}}（M/{{$t('localization.Month1')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="TestFlow"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.FlowPrice')}}（{{$t('localization.HYuan')}}/M）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="FlowPrice"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <!--年包开始  -->
        <div class="popList clearfix" v-if="packType == 1">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.CostPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Year')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="PackPrice1"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.RetailPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Year')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="IsPackPrice1"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 年包结束 -->

        <!-- 月包开始 -->
        <div class="popList clearfix" v-if="packType == 0 || packType == 2">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.CostPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Month1')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="PackPrice5"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.CostPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Year')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="PackPrice1"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="popList clearfix" v-if="packType == 0 || packType == 2">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.RetailPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Month1')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="IsPackPrice5"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="title">{{$t('localization.RetailPrice')}}（{{$t('localization.HYuan')}}/{{$t('localization.Year')}}）</div>
            <div class="popShuru">
              <el-input
                placeholder="0.00"
                v-model="IsPackPrice1"
                oninput="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 月包结束 -->
        <div class="popList clearfix">
          <div class="popList_l fl">
            <div class="title">{{$t('localization.Status')}}</div>
            <div class="popShuru">
              <el-select v-model="IsDelete" :placeholder="$t('localization.SelectPlaceholder')">
                <el-option
                  v-for="item in packageStatusArr1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="popList_r fr">
            <div class="remarks">
              <div class="title">{{$t('localization.Remarks')}}</div>
              <div class="popShuru">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :maxlength="100"
                  v-model="Remark"
                >
                </el-input>
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
export default {
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
      packageType1: [
        {
          label: "月包流量",
          value: "0"
        },
        {
          label: "年包流量",
          value: "1"
        },
        {
          label: this.$t('localization.GeneralVoice'),
          value: "2"
        }
      ], //新增/编辑套餐类型数组
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
      sendObj: {
        packName: "", //套餐名称
        packType: "0", //新增/编辑套餐类型id
        TCFlow: "", //套餐流量
        TCVoice: "", //套餐语音
        IsOverstepFlow: "", //赠送流量
        TestFlow: "", //测试流量
        PackPrice5: "", //续费月价格
        PackPrice1: "", //续费年价格
        FlowPrice: "", //流量单价
        VoicePrice: "", //语音单价
        IsPackPrice5: "", //零售月单价
        IsPackPrice1: "", //零售一年续费价格
        IsDelete: "0", //
        Remark: "" //
      },
      packName: "", //套餐名称
      packType: "0", //新增/编辑套餐类型id
      TCFlow: "", //套餐流量
      TCVoice: "", //套餐语音
      IsOverstepFlow: "", //赠送流量
      TestFlow: "", //测试流量
      PackPrice5: "", //续费月价格
      PackPrice1: "", //续费年价格
      FlowPrice: "", //流量单价
      VoicePrice: "", //语音单价
      IsPackPrice5: "", //零售月单价
      IsPackPrice1: "", //零售一年续费价格
      IsDelete: "0", //
      Remark: "" //
    };
  },
  created() {
    if (this.popInfo.info) {
      this.packName = this.popInfo.info.packName || "";
      this.packType = this.popInfo.info.packType || "0";
      this.TCFlow = this.popInfo.info.tCFlow || "0.00";
      this.TCVoice = this.popInfo.info.tCVoice || "0.00";
      this.IsOverstepFlow = this.popInfo.info.isOverstepFlow || "0.00";
      this.TestFlow = this.popInfo.info.testFlow || "0.00";
      this.PackPrice5 = this.popInfo.info.packPrice5 || "0.00";
      this.PackPrice1 = this.popInfo.info.packPrice1 || "0.00";
      this.FlowPrice = this.popInfo.info.flowPrice || "0.00";
      this.VoicePrice = this.popInfo.info.voicePrice || "0.00";
      this.IsPackPrice5 = this.popInfo.info.lsPackPrice5 || "0.00";
      this.IsPackPrice1 = this.popInfo.info.lsPackPrice1 || "0.00";
      this.IsDelete = this.popInfo.info.IsDelete || "0";
      this.Remark = this.popInfo.info.Remark || "";
    }
  },
  beforeDestroy() {
    this.packName = "";
    this.packType = "0";
    this.TCFlow = "";
    this.TCVoice = "";
    this.IsOverstepFlow = "";
    this.TestFlow = "";
    this.PackPrice5 = "";
    this.PackPrice1 = "";
    this.FlowPrice = "";
    this.VoicePrice = "";
    this.IsPackPrice5 = "";
    this.IsPackPrice1 = "";
    this.IsDelete = "0";
    this.Remark = "";
  },
  methods: {
    close() {
      this.$emit("handleIsPop");
    },
    //新增套餐类型变化
    getType(val) {
    },
    goSave() {
      if (this.popInfo.title == "新增套餐") {
        this.addManage();
      } else {
        this.editMagage();
      }
    },
    goCancel() {
      this.$emit("handleIsPop");
    },
    // input值输入事件
    getInputVal(e, val) {
      val = "gqg";
    },
    // editManage
    editMagage() {
      var url = "/package/updatePackage.do";
      try {
        if (!this.packName) {
          throw "请输入套餐名称";
        }
        if (!this.TCFlow) {
          throw "请输入流量大小";
        }
        if (!this.IsOverstepFlow) {
          throw "请输入可超出流量";
        }
        if (!this.TCVoice && this.packType == 2) {
          throw "请输入语音大小";
        }
        if (!this.VoicePrice && this.packType == 2) {
          throw "请输入语音单价";
        }
        if (!this.TestFlow) {
          throw "请输入测试流量";
        }
        if (!this.FlowPrice) {
          throw "请输入流量单价";
        }
        if (!this.PackPrice5 && this.packType != 1) {
          throw "请输入成本价（元/月）";
        }
        if (!this.PackPrice1) {
          throw "请输入成本价（元/年）";
        }
        if (!this.IsPackPrice5 && this.packType != 1) {
          throw "请输入零售价（元/月）";
        }
        if (!this.IsPackPrice1) {
          throw "请输入零售价（元/年）";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: error
        });
        return;
      }
      var params = {
        PackID: this.popInfo.info.packID, //套餐名称
        TCFlow: this.TCFlow, //套餐流量
        TCVoice: this.TCVoice, //套餐语音
        IsOverstepFlow: this.IsOverstepFlow, //赠送流量
        TestFlow: this.TestFlow, //测试流量
        PackPrice5: this.PackPrice5, //续费月价格
        PackPrice1: this.PackPrice1, //续费年价格
        FlowPrice: this.FlowPrice, //流量单价
        VoicePrice: this.VoicePrice, //语音单价
        lsPackPrice5: this.IsPackPrice5, //零售月单价
        lsPackPrice1: this.IsPackPrice1, //零售一年续费价格
        IsDelete: this.IsDelete, //
        Remark: this.Remark //
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
      var url = "/package/addPackage.do";
      try {
        if (!this.packName) {
          throw "请输入套餐名称";
        }
        if (!this.TCFlow) {
          throw "请输入流量大小";
        }
        if (!this.IsOverstepFlow) {
          throw "请输入可超出流量";
        }

        if (!this.TCVoice && this.packType == 2) {
          throw "请输入语音大小";
        }
        if (!this.VoicePrice && this.packType == 2) {
          throw "请输入语音单价";
        }
        if (!this.TestFlow) {
          throw "请输入测试流量";
        }
        if (!this.FlowPrice) {
          throw "请输入流量单价";
        }
        if (!this.PackPrice5 && this.packType != 1) {
          throw "请输入成本价（元/月）";
        }
        if (!this.PackPrice1) {
          throw "请输入成本价（元/年）";
        }
        if (!this.IsPackPrice5 && this.packType != 1) {
          throw "请输入零售价（元/月）";
        }
        if (!this.IsPackPrice1) {
          throw "请输入零售价（元/年）";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: error
        });
        return;
      }
      var params = {
        PackName: this.packName, //套餐名称
        PackType: this.packType, //新增/编辑套餐类型id
        TCFlow: this.TCFlow, //套餐流量
        TCVoice: this.TCVoice, //套餐语音
        IsOverstepFlow: this.IsOverstepFlow, //赠送流量
        TestFlow: this.TestFlow, //测试流量
        PackPrice5: this.PackPrice5, //续费月价格
        PackPrice1: this.PackPrice1, //续费年价格
        FlowPrice: this.FlowPrice, //流量单价
        VoicePrice: this.VoicePrice, //语音单价
        lsPackPrice5: this.IsPackPrice5, //零售月单价
        lsPackPrice1: this.IsPackPrice1, //零售一年续费价格
        IsDelete: this.IsDelete, //
        Remark: this.Remark //
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
    }
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
        .title1 {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
        }
        .popList_l {
          width: 364px;
          .title {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 13px;
          }
          /deep/.popShuru {
            height: 32px;
            .el-input__inner {
              width: 364px;
              height: 32px;
              line-height: 32px;
            }
            .el-input .el-input__suffix {
              top: 3px;
            }
            .is-focus .el-input__suffix {
              top: -3px;
            }
          }
        }
        .popList_r {
          width: 364px;
          .title {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 13px;
          }
          /deep/.popShuru {
            height: 32px;
            .el-input__inner {
              width: 364px;
              height: 32px;
              line-height: 32px;
            }
            .el-input .el-input__suffix {
              top: 3px;
            }
            .is-focus .el-input__suffix {
              top: -3px;
            }
          }
        }
      }
      .remarks {
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
