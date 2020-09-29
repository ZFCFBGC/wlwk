<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl">{{$t('localization.New')}}</div>
        <div class="close fr pointer" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="list clearfix">
        <div class="selectList fl list_l">
          <div class="title">代理名称</div>
          <div class="shuru">
            <client-name
              :width="364"
              v-model="agentName"
              @nodeChange="getClientVal"
            ></client-name>
          </div>
        </div>
        <div class="selectList fl">
          <div class="title">{{$t('localization.CardForm')}}</div>
          <div class="shuru">
            <el-select v-model="cardForm" :placeholder="$t('localization.SelectPlaceholder')" size="mini">
              <el-option
                v-for="item in cardFormArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="list clearfix">
        <div class="selectList fl list_l">
          <div class="title">{{$t('localization.PackName')}}</div>
          <div class="shuru">
            <swd-select
              @change="getPackname"
              @getPackageInfo="getPackageInfo"
              :params="pakageObj"
            ></swd-select>
          </div>
        </div>
        <div class="selectList fl">
          <div class="title">{{$t('localization.SelectFile')}}</div>
          <div class="shuru clearfix">
            <div class="fl">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :limit="1"
                :auto-upload="false"
                :on-success="upFile"
                :http-request="httpRequest"
              >
                <div class="fileBtn fl">{{$t('localization.SelectFile')}}</div>
              </el-upload>
            </div>
            <div class="downFile fl pointer">点击下载文件模板</div>
          </div>
        </div>
      </div>
      <div class="list clearfix">
        <div class="selectList fl list_l">
          <div class="title">{{$t('localization.CompanyType')}}</div>
          <div class="shuru">
            <el-select v-model="cardType" :placeholder="$t('localization.SelectPlaceholder')" size="mini">
              <el-option
                v-for="item in cardTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="selectList fl">
          <!-- <div class="title">卡状态</div>
          <div class="shuru">
            <el-select v-model="status" :placeholder="$t('localization.SelectPlaceholder')" size="mini">
              <el-option
                v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
          <div class="title">{{$t('localization.APNType')}}</div>
          <div class="shuru">
            <el-select v-model="apnType" :placeholder="$t('localization.SelectPlaceholder')" size="mini">
              <el-option
                v-for="item in apnTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="list clearfix">
        <div class="selectList fl list_l"></div>
        <!-- <div class="selectList fl">
          <div class="title">状态时间段</div>
          <div class="shuru">
            <el-date-picker
              value-format="yyyy-MM-dd"
              type="daterange"
              v-model="times"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div> -->
      </div>
      <div class="selectList">
        <div class="title">{{$t('localization.Remarks')}}</div>
        <div class="shuru">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            :maxlength="100"
            v-model="Remark"
          >
          </el-input>
        </div>
      </div>
      <div class="btnArr clearfix selectList">
        <div class="cancel fr pointer" @click="close">{{$t('localization.Cancel')}}</div>
        <div class="confirm fr pointer" @click="confirm">{{$t('localization.Confirm')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import clientName from "../form/clientName.vue";
import swdSelect from "../form/swdSelect.vue";
export default {
  components: {
    clientName,
    swdSelect
  },
  data() {
    return {
      agentName: null,
      userId: "",
      packId: "", //套餐id
      cardForm: "0", //卡形态
      //fileName:null,//判断是否选择文件
      pakageObj: {
        url: "/package/queryPackageNameByUserId.do"
      },
      cardFormArr: [
        {
          value: "0",
          label: this.$t('localization.NonSMDcard')
        },
        {
          value: "1",
          label: this.$t('localization.ESIM')
        },
        {
          value: "2",
          label: "非贴片卡(需激活)"
        },
        {
          value: "3",
          label: "贴片卡(需激活)"
        }
      ],
      apnType: "0",
      apnTypeArr: [
        {
          value: "0",
          label: "CMMTM"
        },
        {
          value: "1",
          label: "CMIOT"
        }
      ],
      status: "0",
      statusArr: [
        {
          value: "0",
          label: this.$t('localization.TestPeriod')
        },
        {
          value: "1",
          label: "沉默期"
        },
        {
          value: "2",
          label: this.$t('localization.Active')
        }
      ],
      cardType: "1",
      cardTypeArr: [
        {
          value: "1",
          label: this.$t('localization.YS')
        },
        {
          value: "2",
          label: this.$t('localization.GZMobile')
        },
        {
          value: "3",
          label: "浙江移动"
        },
        {
          value: "4",
          label: "江西移动"
        },
        {
          value: "5",
          label: "广州国际A"
        },
        {
          value: "6",
          label: "广州国际B"
        },
        {
          value: "7",
          label: "国际卡C"
        },
        {
          value: "8",
          label: "广州移动EC"
        },
        {
          value: "9",
          label: "安徽EC"
        },
        {
          value: "10",
          label: "河南移动"
        },
        {
          value: "11",
          label: "广州国际卡D"
        }
      ],
      times: null,
      startTime: "",
      endTime: "",
      fileName: "", //文件名
      Remark: ""
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("handleIsPop");
    },
    httpRequest(param) {
      let formData = new FormData();
      this.fileName = param.file;
      formData.set("file", param.file);
      formData.set("token", this.$cookie.get("token"));
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      axios.post("api/card/loadFile.do", formData, headers).then(res => {
        if (res.data.code == 200) {
          this.fileName = res.data.data;
          this.exportCard();
        } else {
          swd.showInfo({
            title: "提示",
            content: res.msg ? res.msg : "网络故障,请检查网络设置。",
            errorCode: res.code
          });
        }
      });
    },
    upFile(response, file, fileList) {
    },
    confirm() {
      try {
        if (!this.userId) {
          throw "请选择代理名称";
        }
        if (!this.packId) {
          throw "请选择套餐名称";
        }
        // if (!this.times) {
        //   throw "请选择时间";
        // }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: error
        });
        return;
      }
      this.$refs.upload.submit();
    },
    exportCard() {
      var url = "/card/importCards.do";
      this.startTime = this.times ? this.times[0] : null;
      this.endTime = this.times ? this.times[1] : null;
      this.$client
        .get(url, {
          userId: this.userId, //批次号
          packId: this.packId, //套餐id
          cardType: this.cardType, //公司类型
          apnType: this.apnType,
          cardForm: this.cardForm,
          startTime: this.startTime,
          endTime: this.endTime,
          fileName: this.fileName,
          status: this.status,
          remark: this.remark
        })
        .then(res => {
          if (res.code == 200) {
            this.$emit("confirm");
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
      this.agentName = e.nickname;
      this.userId = e.userId;
    },
    getPackname(val) {
      // this.getCommonInfo(val);
    },
    //获取当前套餐基本类型信息
    getPackageInfo(val) {
      this.packId = val.packID;
      this.packType = val.packType ? val.packType : "0";
    }
  }
};
</script>
<style lang="less" scoped>
.popUp {
  .mask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .content {
    position: fixed;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    width: 830px;
    // height: 620px;
    padding: 0 31px;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 1000;
    padding-bottom: 30px;
    transform: translate(-50%, -50%);
    .header {
      padding-top: 26px;
      height: 69px;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 14px;
        height: 14px;
        // background: brown;
      }
    }
    .list_l {
      margin-right: 26px;
    }
    /deep/.selectList {
      margin-top: 16px;
      .title {
        font-size: 13px;
        color: #333;
        margin-bottom: 12px;
      }
      .shuru {
        height: 32px;
        .el-input__inner {
          height: 32px;
          line-height: 32px;
          width: 364px;
        }
        .el-textarea__inner {
          height: 32px;
          font-size: 12px;
        }
        .upload-demo {
          display: flex;
          .el-upload-list__item-name{
            font-size: 13px;
          }
        }
        .el-upload-list__item:first-child {
          margin-top: 0;
        }
        .el-range-editor.el-input__inner {
          height: 32px;
          display: block;
          display: flex;
        }
        .el-date-editor .el-range-input {
          height: 30px;
          display: block;
        }
        .el-date-editor .el-range__icon {
          line-height: 27px;
        }
        .el-date-editor .el-range-separator {
          line-height: 27px;
          color: #999;
        }
        .fileBtn {
          width: 100px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          color: #fff;
          font-size: 12px;
          margin-right: 14px;
        }
        .downFile {
          border-radius: 3px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #3370ff;
          font-size: 12px;
        }
      }
    }
    .btnArr {
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        margin-right: 12px;
      }
      .cancel {
        width: 74px;
        height: 30px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #333;
        margin-right: 12px;
      }
    }
  }
}
</style>
