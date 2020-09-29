<template>
  <div class="transferTable">
    <div class="mask"></div>
    <div :class="{ dialog: true, round: !showTemplate }">
      <div class="header">
        <div class="title">{{ $t("localization.SendMsg") }}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="contact">
          <div class="reciever">
            {{ $t("localization.Addressee") }}:<span>10647283272</span>
          </div>
          <div class="checkBox">
            <el-checkbox v-model="checked">{{
              $t("localization.WithChinese")
            }}</el-checkbox>
          </div>
        </div>
        <div class="text-box">
          <div class="anyMore">{{ $t("localization.SeeMoreMsg") }}</div>
          <div
            class="clearfix"
            v-for="(item, index) in msgArr"
            :key="index"
            :class="item.msgType == 1 ? 'send' : 'receive'"
          >
            <div :class="item.msgType == 1 ? 'fr' : 'fl'">
              <div class="send-time">2020-12-27 17:08:33</div>
              <div class="sendCont clearfix" v-if="item.msgType == 1">
                <div class="sendCont_l fl">已发送</div>
                <div class="sendCont_r fl">
                  GPRSSET#dahsakdjsahdhisoa
                </div>
              </div>
              <div class="sendCont" v-else>
                啊是的好哇很简单撒的厚爱的就是撒海飞丝asdfjasjdioafjiAOJDSAjioAJXIZohcfASIO
              </div>
            </div>
          </div>
        </div>
        <div class="sendNote clearfix">
          <div class="sendinput fl">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入短信内容......"
              v-model="smsContent"
              class="textarea"
            >
            </el-input>
          </div>
          <div class="fl pointer form-btn" @click="toogleTemplate">
            {{ $t("localization.Template") }}
          </div>
          <div class="fl pointer send-btn">{{ $t("localization.Send") }}</div>
        </div>
      </div>
      <div class="instruction" v-if="showTemplate">
        <div class="header">
          <div class="title">指令模板</div>
          <div class="close">
            <i class="el-icon-close pointer"></i>
          </div>
        </div>
        <div class="instructionSearch clearfix">
          <div class="fl">
            <swd-input
              :icon="true"
              iconClass="el-input__icon el-icon-search"
              v-model="packPrice1"
              :value="packPrice1"
              placeholder="搜索指令"
              :width="323"
            ></swd-input>
          </div>
          <div class="fr newDirective pointer" @click="openTemplate(2)">
            新建指令
          </div>
        </div>
        <div class="insList">
          <div
            class="list clearfix"
            v-for="(item, index) in directiveArr"
            :key="index"
          >
            <div class="list_l fl">{{ item.msgTitle }}</div>
            <div class="list_r fr">
              <span class="list_btn pointer" @click="openTemplate(0, item)">{{
                $t("localization.Edit")
              }}</span>
              <span class="list_btn pointer" @click="openTemplate(1, item)">{{
                $t("localization.Look")
              }}</span>
              <span class="list_btn pointer" @click="deleteTemplate(item)">{{
                $t("localization.Delete")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="maskPop" v-if="maskPopShow"></div>
    <div class="view-details" v-if="maskPopShow">
      <div class="header clearfix">
        <div class="title fl">
          {{ title }}
        </div>
        <div class="close fr" @click="closePop">
          <i class="el-icon-close pointer"></i>
        </div>
      </div>
      <div class="viewDetailsTitle">
        <div class="title">指令名称</div>
        <div class="input">
          <swd-input
            v-model="templateName"
            :value="templateName"
            placeholder="搜索指令"
            :disabled="operateType === 1"
            :width="467"
          ></swd-input>
        </div>
      </div>
      <div class="viewTextarea">
        <div class="title">指令内容</div>
        <div class="input">
          <el-input
            type="textarea"
            placeholder="请输入指令"
            v-model="templateContent"
            :disabled="operateType === 1"
            class="textarea"
          >
          </el-input>
        </div>
      </div>
      <div class="viewArr clearfix">
        <div class="cancel pointer fr" @click="closePop">{{ $t("localization.Cancel") }}</div>
        <div class="confirm pointer fr" @click="confirmTempl">{{ $t("localization.Confirm") }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import swdInput from "../form/swdInput1.vue";
export default {
  components: {
    swdInput,
  },
  data() {
    return {
      templateName: "",
      templateContent: "",
      checked: false,
      msgArr: [{ msgType: 1 }, { msgType: 0 }, { msgType: 1 }],
      directiveArr: [],
      maskPopShow: false,
      showTemplate: false,
      title: "",
      operateType: null,
      smsContent:'',
      packPrice1:null
    };
  },
  watch: {
    operateType(val) {
      switch (val) {
        case 0:
          this.title = this.$t("localization.Edit");
          break;
        case 1:
          this.title = this.$t("localization.Look");
          break;
        case 2:
          this.title = this.$t("localization.New");
          break;
        default:
          break;
      }
    },
  },
  created() {},
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    closePop() {
      this.maskPopShow = false;
      this.templateName='',
      this.templateContent=''
    },
    toogleTemplate() {
      this.showTemplate = !this.showTemplate;
      this.showTemplate && this.getSMSTemplate();
    },
    getSMSTemplate() {
      let userId = this.$cookie.get("userId");
      let url = "/sms/queryMsgTemplateList.do";
      let params = {
        userId,
      };
      this.$client.get(url, params).then((res) => {
        this.directiveArr = res.data;
      });
    },
    deleteTemplate(item) {
      let url="/sms/deleteMsgTemplate.do"
      // console.log(item);
      let userId = this.$cookie.get("userId");

      let params={
        id:item.id,
        userId
      }
      this.$client.get(url, params).then(res=>{
        if(res.code==="200"){
          swd.compop({
            title:'提示',
            content:'删除成功',
            autoClose:true
          })
          this.getSMSTemplate()
          this.closePop()
        }else{
          swd.compop({
            title:'提示',
            content:'删除失败',
            autoClose:true
          })
        }
      })
    },

    addTemplate(){
      let userId = this.$cookie.get("userId");
      let url="/sms/addMsgTemplate.do"
      let params={
        userId,
        msgTitle:this.templateName,
        msgContent:this.templateContent
      }
      this.$client.get(url, params).then(res=>{
        if(res.code==='200'){
          swd.compop({
            title:'提示',
            content:'添加成功',
            autoClose:true
          })
          this.getSMSTemplate()
          this.closePop()
        }else{
          swd.compop({
            title:'提示',
            content:'添加失败',
            autoClose:true
          })
        }
      })
    },
    openTemplate(type, item) {
      this.operateType = type;
      this.maskPopShow = true;
      if(item){

      this.templateName = item.msgTitle;
      this.templateContent = item.msgContent;
      }
    },
    editTemplate(){
      let userId = this.$cookie.get("userId");
      let url="/sms/updateTemplate.do"
      let params={
        userId,
        msgTitle:this.templateName,
        msgContent:this.templateContent
      }
      this.$client.get(url, params).then(res=>{
        if(res.code==='200'){
          swd.compop({
            title:'提示',
            content:'修改成功',
            autoClose:true
          })
          this.getSMSTemplate()
          this.closePop()
        }else{
          swd.compop({
            title:'提示',
            content:'修改失败',
            autoClose:true
          })
        }
      })
    },
    confirmTempl(){
      switch (this.operateType) {
        case 0:
          this.editTemplate()
          break;
        case 2:
          this.addTemplate()
          break;
        default:
          break;
      }
    }
  },
};
</script>
<style lang="less" scoped>
.transferTable {
  .maskPop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 2000;
  }
  .view-details {
    border-radius: 8px;
    width: 543px;
    height: 548px;
    box-sizing: border-box;
    padding: 26px 36px;
    background: #fff;
    z-index: 2001;
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
        color: #646a73;
        font-size: 14px;
      }
    }
    .viewDetailsTitle {
      padding-top: 42px;
      .title {
        font-size: 13px;
        color: rgba(51, 51, 51, 1);
      }
      .input {
        margin-top: 14px;
      }
    }
    .viewTextarea {
      padding-top: 16px;
      .title {
        font-size: 13px;
        color: rgba(51, 51, 51, 1);
      }
      .input {
        margin-top: 14px;
        /deep/.textarea {
          width: 467px;
          height: 271px;
          background: rgba(255, 255, 255, 1);
          font-size: 13px;
          .el-textarea__inner {
            width: 467px;
            height: 271px;
          }
        }
      }
    }
    .viewArr {
      margin-top: 30px;
      .cancel {
        width: 76px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        font-size: 13px;
        color: #333;
        text-align: center;
        line-height: 32px;
      }
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        font-size: 13px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-right: 12px;
      }
    }
  }
  .dialog {
    width: 734px;
    height: 531px;
    left: 40%;
    border-radius: 8px 0 0 8px;
    &.round {
      border-radius: 8px;
    }
    .content {
      .contact {
        line-height: 32px;
        height: 32px;
        display: flex;
        .reciever {
          flex: 1;
          font-size: 13px;
          color: #888888;
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          padding: 0 10px;
          margin-right: 10px;
          span {
            margin-left: 10px;
            background: rgba(218, 231, 240, 1);
            border-radius: 10px;
            padding: 3px;
          }
        }
      }
      .text-box {
        margin-top: 16px;
        width: 659px;
        height: 303px;
        background: rgba(247, 247, 250, 1);
        overflow-y: auto;
        .anyMore {
          height: 25px;
          font-size: 13px;
          line-height: 25px;
          text-align: center;
          color: rgba(162, 162, 162, 1);
        }
        .send {
          margin-right: 24px;
          margin-bottom: 16px;
          text-align: right;
          .send-time {
            display: inline-block;
            width: 131px;
            height: 19px;
            background: rgba(218, 218, 218, 1);
            border-radius: 2px;
            font-size: 12px;
            color: #fff;
            line-height: 19px;
            text-align: center;
          }
          .sendCont {
            margin-top: 11px;
            position: relative;
            .sendCont_l {
              width: 36px;
              position: absolute;
              left: -48px;
              top: 50%;
              transform: translate(0, -50%);
              line-height: 32px;
              font-size: 12px;
              color: rgba(162, 162, 162, 1);
              margin-right: 12px;
            }
            .sendCont_r {
              max-width: 243px;
              padding: 8px 12px;
              font-size: 12px;
              line-height: 16px;
              background: rgba(158, 234, 106, 1);
              border-radius: 2px;
              color: #333;
              word-wrap: break-word;
              word-break: normal;
            }
          }
        }
        .receive {
          margin-left: 24px;
          margin-bottom: 16px;
          .send-time {
            width: 131px;
            height: 19px;
            background: rgba(218, 218, 218, 1);
            border-radius: 2px;
            font-size: 12px;
            color: #fff;
            line-height: 19px;
            text-align: center;
          }
          .sendCont {
            margin-top: 11px;
            max-width: 243px;
            padding: 8px 12px;
            background: #fff;
            font-size: 12px;
            line-height: 16px;
            color: #333;
            word-wrap: break-word;
            word-break: normal;
            border-radius: 2px;
          }
        }
      }
      .sendNote {
        margin-top: 24px;
        .sendinput {
          .textarea {
            width: 477px;
            font-size: 13px;
            color: #333;
            height: 57px;
          }
        }
        .form-btn {
          margin-left: 18px;
          margin-top: 12px;
          width: 74px;
          height: 30px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 3px;
          font-size: 13px;
          text-align: center;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
        }
        .send-btn {
          margin-top: 12px;
          width: 76px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          font-size: 13px;
          text-align: center;
          color: #fff;
          line-height: 32px;
          margin-left: 12px;
        }
      }
    }
    .instruction {
      position: absolute;
      width: 424px;
      height: 531px;
      border-left: 1px solid #e2e7eb;
      border-radius: 0 8px 8px 0;
      background: #fff;
      top: 0;
      right: -465px;
      padding: 0 20px;
      .header {
        // margin: 28px 0 27px 0;
        margin-top: 26px;
        .title {
          font-size: 14px;
          color: rgba(24, 38, 60, 1);
        }
        .close {
          color: #646a73;
          font-size: 14px;
        }
      }
      .newDirective {
        width: 76px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        font-size: 13px;
        color: rgba(51, 51, 51, 1);
        line-height: 32px;
        text-align: center;
      }
      .insList {
        margin-top: 12px;
        border-top: 1px solid #e9eaf2;
        height: 378px;
        overflow-y: auto;
        width: 405px;
        .list {
          height: 45px;
          border-bottom: 1px solid #e9eaf2;
          .list_l {
            line-height: 43px;
            font-size: 13px;
            color: rgba(85, 85, 85, 1);
          }
          .list_r {
            padding-right: 30px;
            .list_btn {
              line-height: 43px;
              font-size: 13px;
              color: #3370ff;
            }
          }
        }
      }
    }
  }
}
</style>
