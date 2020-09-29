<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content" v-if="isMain">
      <div class="header clearfix">
        <div class="title fl">{{ popInfo.title }}</div>
        <div class="close pointer fr" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="popContent" v-if="editShow">
        <div class="stepOne clearfix">
          <div class="fl firstStep">1.新建流量池</div>
          <div class="fl secondStep">2.导入SIM卡</div>
        </div>
        <div class="popList">
          <div class="title">代理名称</div>
          <div class="popShuru">
            {{ detailsInfo.nickname }}
          </div>
        </div>
        <div class="popList">
          <div class="title">流量池名称</div>
          <div class="popShuru">
            {{ detailsInfo.poolName }}
          </div>
        </div>
        <div class="popList">
          <div class="title">{{$t('localization.PackName')}}</div>
          <div class="popShuru">
            {{ detailsInfo.packName }}
          </div>
        </div>
        <div class="popList">
          <div class="title">单月卡流量</div>
          <div class="cardflow">{{ tCFlow }}</div>
        </div>
        <div class="btnArr clearfix">
          <div class="cancel pointer fr">{{$t('localization.Cancel')}}</div>
          <div class="save pointer fr" @click="firstEdit">{{$t('localization.Next')}}</div>
        </div>
      </div>
      <div class="popContent" v-if="firstShow">
        <div class="stepOne clearfix">
          <div class="fl firstStep">1.新建流量池</div>
          <div class="fl secondStep">2.导入SIM卡</div>
        </div>
        <div class="popList">
          <div class="title">代理名称</div>
          <div class="popShuru">
            <client-name
              v-model="client"
              @nodeChange="getClientVal"
              :width="467"
            ></client-name>
          </div>
        </div>
        <div class="popList">
          <div class="title">流量池名称</div>
          <div class="popShuru">
            <swd-input
              :value="poolName"
              placeholder="请输入"
              :maxlength="20"
              v-model="poolName"
              :width="467"
            ></swd-input>
          </div>
        </div>
        <div class="popList">
          <div class="title">{{$t('localization.PackName')}}</div>
          <div class="popShuru">
            <swd-select
              v-model="packId"
              @change="getPackId"
              @getPackageInfo="getPackIdInfo"
              :options="packIdArr"
              :width="467"
            ></swd-select>
          </div>
        </div>
        <div class="popList">
          <div class="title">单月卡流量</div>
          <div class="cardflow">{{ tCFlow }}</div>
        </div>
        <div class="btnArr clearfix">
          <div class="cancel pointer fr" @click="close">{{$t('localization.Cancel')}}</div>
          <div class="save pointer fr" @click="firstConfirm">{{$t('localization.Next')}}</div>
        </div>
      </div>
      <div class="popContent" v-if="secondShow">
        <div class="stepTwo clearfix">
          <div class="fl firstStep">1.新建流量池</div>
          <div class="fl secondStep">2.导入SIM卡</div>
        </div>
        <div class="popList">
          <div class="title clearfix">
            <span class="title_l fl">池子成员</span>
            <span class="icon pointer fl" @click="goMember">+</span>
          </div>
          <div class="cardflow">
            <span v-if="cardsCount" @click="goCardTable"
              >{{$t('localization.Currently')}}{{ cardsCount }}{{$t('localization.item')}}</span
            >
          </div>
        </div>
        <div class="popList">
          <div class="title">池子总量</div>
          <div class="cardflow">{{ totalFlow }}</div>
        </div>
        <div class="popList">
          <div class="title">流量池到停</div>
          <div class="popShuru">
            <el-radio-group v-model="isFlowOverStop">
              <el-radio :label="0">{{$t('localization.Yes')}}</el-radio>
              <el-radio :label="1">{{$t('localization.NO')}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="popList">
          <div class="title">预警阈值（%）</div>
          <div class="popShuru">
            <el-input
              v-model="warnThreshold"
              placeholder="请输入"
              @input="setWarnVal"
            ></el-input>
          </div>
        </div>
        <div class="popList">
          <div class="title">池子状态</div>
          <div class="popShuru">
            <el-radio-group v-model="poolStatus">
              <el-radio :label="0">{{$t('localization.Yes')}}</el-radio>
              <el-radio :label="1">{{$t('localization.NO')}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="popList">
          <div class="title">{{$t('localization.WarningPhone')}}</div>
          <div class="popShuru">
            <swd-input
              :value="warnPhone"
              placeholder="请输入"
              v-model="warnPhone"
              :width="467"
            ></swd-input>
          </div>
        </div>
        <div class="popList">
          <div class="title">{{$t('localization.Remarks')}}</div>
          <div class="popShuru">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :maxlength="40"
              v-model="Remark"
            >
            </el-input>
          </div>
        </div>
        <div class="btnArr clearfix">
          <div class="cancel pointer fr" @click="close">{{$t('localization.Cancel')}}</div>
          <div class="save pointer fr" @click="backStep">上一步</div>
          <div class="finish pointer fr" @click="updateFlow">{{$t('localization.Finish')}}</div>
        </div>
      </div>
    </div>
    <div class="member" v-if="isMember">
      <div class="header clearfix">
        <div class="title fl">添加池子成员</div>
        <div class="close pointer fr" @click="memberCancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="memberCont">
        <el-tabs v-model="way">
          <el-tab-pane label="普通添加" name="0">
            <div class="cardnumTitle fl">请输入卡号，当前：{{ cardNum }}个</div>
            <div class="shuru">
              <el-input
                type="textarea"
                :rows="15"
                placeholder="请输入内容"
                v-model="tellPhone"
                @input="getPhoneVal"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="连号导入" name="1">
            <div class="numExport clearfix">
              <div class="start fl clearfix">
                <div class="title fl">开始卡号：</div>
                <div class="startshuru fl">
                  <el-input
                    v-model="startNum"
                    :placeholder="$t('localization.PlsInputCardNum')"
                  ></el-input>
                </div>
              </div>
              <div class="start fl clearfix">
                <div class="title fl">结束卡号：</div>
                <div class="startshuru fl">
                  <el-input
                    v-model="endNum"
                    :placeholder="$t('localization.PlsInputCardNum')"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文件导入" name="2">
            <div class="fileExport">
              <div class="tips">{{$t('localization.PlsUploadFile')}}</div>
              <div class="fileShuru clearfix">
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
                    <div class="fileBtn pointer fl">选取文件</div>
                  </el-upload>
                </div>
                <div class="downFile pointer fl">点击下载文件模板</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="btnMemberArr clearfix">
        <div class="memberCancel pointer fr" @click="memberCancel">{{$t('localization.Cancel')}}</div>
        <div class="memberSave pointer fr" @click="cardSave">{{$t('localization.Save')}}</div>
      </div>
    </div>
    <div class="cardtable" v-if="isCardtable">
      <div class="header clearfix">
        <div class="title fl">{{$t('localization.CardList')}}</div>
        <div class="close fr" @click="cardClose">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="cardshuru clearfix">
        <div class="shuru fl">
          <el-input placeholder="请输入内容" v-model="ICCID">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="addBtn fr" @click="goMember" v-if="origin != 'flowPool'">
          {{$t('localization.Add')}}
        </div>
      </div>
      <div class="tableList">
        <swd-table
          :table="tableAll"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :total="null"
          @handleSelectionChange="handleSelectionChange"
          @handleCurrentChange="handleCurrentChange"
          @goCurrentPage="goCurrentPage"
        >
          <template slot-scope="props" v-if="props.item != undefined">
            <div class="handle" @click="goDetele(props.item)">{{$t('localization.Delete')}}</div>
          </template>
        </swd-table>
      </div>
      <div class="closeBtn pointer" @click="cardClose">关闭</div>
    </div>
  </div>
</template>
<script>
import swdTable from "../swdTable/swdTable.vue";
import clientName from "../form/clientName.vue";
import swdSelect from "../form/swdSelect.vue";
import swdInput from "../form/swdInput.vue";
import axios from "axios";
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
  components: {
    swdTable,
    clientName,
    swdSelect,
    swdInput
  },
  data() {
    return {
      isMain: true, //主弹窗
      poolName: "", //流量池名称
      client: "",
      userId: "", //用户id
      packId: "", //套餐id
      tCFlow: "", //套餐流量
      poolNumber: "", //池子编号
      packIdArr: [],
      firstShow: true, //第一步
      secondShow: false, //第二步
      editShow: false, //编辑第一步页面
      isFlowOverStop: 0, //流量池到停选中
      poolStatus: 1, //池子状态
      totalFlow: null, //上传卡流量总数
      cardsCount: null, //上传卡成功总数
      warnThreshold: "", //预警阈值
      warnPhone: "", //预警手机
      Remark: "", //备注
      detailsInfo: "", //传过来的信息
      isMember: false, //池子弹窗
      way: "0", //文件上传类型
      startNum: "", //开始卡号
      endNum: "", //结束卡号
      cardNum: null, //池子卡号个数
      tellPhone: null, //手机号码
      isCardtable: false, //卡号表格弹窗
      ICCID: null, //输入框
      origin: "", //判断卡号的来源
      fileName: null, //文件名
      tableAll: {
        select: false,
        handle: true,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum') },
        { prop: "corresponding", title: "ICCID" },
        { prop: "useFlow", title: "本月流量（MB）" }
      ],
      pageSize: 10, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  created() {
    if (this.popInfo.info) {
      this.firstShow = false;
      this.secondShow = true;
      this.detailsInfo = this.popInfo.info;
      this.tCFlow = this.popInfo.info.tcFlow;
      this.totalFlow = this.popInfo.info.totalFlow;
      this.cardsCount = this.popInfo.info.totalCards;
      this.poolNumber = this.popInfo.info.id;
      this.userId = this.popInfo.info.userId; //用户id
      this.packId = this.popInfo.info.packID; //套餐id
      this.warnPhone = this.popInfo.info.phone;
      this.isFlowOverStop = this.popInfo.info.isFlowOverStop;
      this.poolStatus = this.popInfo.info.poolStatus;
      this.Remark = this.popInfo.info.remark;
      this.warnThreshold = this.popInfo.info.threshold * 100;
    }
    if (this.popInfo.origin && this.popInfo.origin == "flowPool") {
      this.origin = this.popInfo.origin;
      this.isMain = false;
      this.isMember = false;
      this.isCardtable = true;
      this.poolNumber = this.popInfo.id;
      this.getCardData();
    }
  },
  beforeDestroy() {
    this.isMain = true; //主弹窗
    this.poolName = ""; //流量池名称
    this.client = "";
    this.userId = ""; //用户id
    this.packId = ""; //套餐id
    this.tCFlow = ""; //套餐流量
    this.poolNumber = ""; //池子编号
    this.packIdArr = [];
    this.firstShow = true; //第一步
    this.secondShow = false; //第二步
    this.editShow = false; //编辑第一步页面
    this.radio = 3; //流量池到停选中
    this.static = 6; //池子状态
    this.totalFlow = null; //上传卡流量总数
    this.cardsCount = null; //上传卡成功总数
    this.warnThreshold = ""; //预警阈值
    this.warnPhone = ""; //预警手机
    this.Remark = ""; //备注
    this.detailsInfo = ""; //传过来的信息
    this.isMember = false; //池子弹窗
    this.cardNum = null; //池子卡号个数
    this.tellPhone = null; //手机号码
    this.isCardtable = false; //卡号表格弹窗
    this.ICCID = null; //输入框
    this.origin = ""; //判断卡号的来源
  },
  methods: {
    close() {
      this.$emit("handleIsPop");
    },
    //代理方法
    getClientVal(info) {
      this.userId = info.userId;
      this.client = info.nickname;
      this.getPackage();
    },
    getPackId(info) {
    },
    getPackIdInfo(info) {
      this.tCFlow = info.tCFlow;
      this.packId = info.packID;
    },
    //获取用户月套餐列表
    getPackage() {
      var url = "/package/queryMonthPackageNameByUserId.do";
      this.$client
        .get(url, {
          userId: this.userId
        })
        .then(res => {
          this.get;
          if (res.code == 200) {
            this.packIdArr = res.data || [];
            this.packIdArr.map(item => {
              item.label = item.packName;
              item.value = item.packID;
              return;
            });
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    // 第一步添加池子
    firstConfirm() {
      try {
        if (!this.userId) {
          throw "请选择代理名称";
        }
        if (!this.poolName) {
          throw "请输入流量池名称";
        }
        if (!this.packId) {
          throw "请选择您的套餐";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: "请输入您要执行的卡号"
        });
        return;
      }
      var url = "/card/addFlowPool.do";
      this.$client
        .get(url, {
          userId: this.userId,
          poolName: this.poolName,
          packId: this.packId
        })
        .then(res => {
          this.get;
          if (res.code == 200) {
            this.poolNumber = res.data;
            this.firstShow = false;
            this.secondShow = true;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //编辑池子第一步
    firstEdit() {
      this.firstShow = false;
      this.secondShow = true;
      this.editShow = false;
    },
    // 上一步
    backStep() {
      if (this.popInfo.info) {
        this.firstShow = false;
        this.secondShow = false;
        this.editShow = true;
      } else {
        this.firstShow = true;
        this.secondShow = false;
        this.editShow = false;
      }
    },
    //打开添加池子弹窗
    goMember() {
      this.secondShow = false;
      this.isMember = true;
      this.isCardtable = false;
    },

    //卡号输入值改变监听方法
    getPhoneVal(e) {
      this.tellPhone = e.replace(/\，/g, ",");
      this.cardNum = this.tellPhone.split(",").length;
    },
    //池子成员取消按钮
    memberCancel() {
      this.isMember = false;
      this.secondShow = true;
    },
    cardSave() {
      if (this.way == 0) {
        var params = {
          userId: this.userId,
          Id: this.poolNumber,
          packId: this.packId,
          way: "0",
          cards: this.tellPhone
        };
        this.memberSave(params);
      } else if (this.way == 1) {
        try {
          if (!this.startNum) {
            throw "请输入开始卡号";
          }
          if (!this.endNum) {
            throw "请输入结束卡号";
          }
        } catch (error) {
          swd.toast({
            type: "fail",
            content: "请输入您要执行的卡号"
          });
          return;
        }
        var card = this.startNum + "," + this.endNum;
        var params = {
          userId: this.userId,
          Id: this.poolNumber,
          packId: this.packId,
          way: "1",
          cards: card
        };
        this.memberSave(params);
      } else if (this.way == 2) {
        this.$refs.upload.submit();
      }
    },
    //添加池子成员接口
    memberSave(param) {
      var url = "/card/addCardsToFlowPool.do";
      this.$client.get(url, param).then(res => {
        if (res.code == 200) {
          this.isMember = false;
          this.secondShow = true;
          this.viewFlow();
        } else {
          swd.showInfo({
            title: "提示",
            content: res.msg ? res.msg : "网络故障,请检查网络设置。",
            errorCode: res.code
          });
        }
      });
    },
    // 文件上传
    httpRequest(param) {
      let formData = new FormData();
      this.fileName = param.file;
      formData.set("file", param.file);
      formData.set("token", this.$cookie.get("token"));
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      axios
        .post("api//card/loadFile.do", formData, {
          "Content-type": "multipart/form-data"
        })
        .then(res => {
          if (res.data.code == 200) {
            this.fileName = res.data.data;
            var params = {
              userId: this.userId,
              Id: this.poolNumber,
              packId: this.packId,
              way: "2",
              cards: this.fileName
            };
            this.memberSave(params);
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
    // 预警法治监听
    setWarnVal(e) {
      this.warnThreshold = Tools.validNumber(e);
    },
    // 更新池子，即点击完成按钮
    updateFlow() {
      try {
        if (!this.warnThreshold) {
          throw "请输入预警阈值";
        }
        if (!this.warnPhone) {
          throw "请输入手机号码";
        }
        if (!Tools.phonevalid(this.warnPhone)) {
          throw "请输入正确的手机号码";
        }
      } catch (error) {
        swd.toast({
          type: "fail",
          content: "请输入您要执行的卡号"
        });
        return;
      }
      var url = "/card/updateCardsPoolById.do";
      this.$client
        .get(url, {
          poolId: this.poolNumber,
          isFlowOverStop: this.isFlowOverStop,
          threshold: this.warnThreshold / 100,
          poolStatus: this.poolStatus,
          phone: this.warnPhone,
          remark: this.Remark
        })
        .then(res => {
          if (res.code == 200) {
            this.$emit("handleIsPop");
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //卡号列表弹窗
    goCardTable() {
      this.isMain = false;
      this.isCardtable = true;
      this.getCardData();
    },
    // 获取卡号表格数据
    getCardData() {
      var url = "/card/queryCardsNoByPoolIdPage.do";
      this.$client
        .get(url, {
          poolId: this.poolNumber,
          cardNo: this.ICCID,
          pageSize: this.pageSize, //默认多少条一页
          pageIndex: this.pageIndex //初始页码
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data || [];
            this.total = res.total;
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    //池子成员弹窗
    cardClose() {
      if (this.origin) {
        this.isCardtable = false;
        this.$emit("handleIsPop");
      } else {
        this.isCardtable = false;
        this.isMain = true;
        this.secondShow = true;
        this.viewFlow();
      }
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
    //删除卡号
    goDetele(info) {
      var url = "/card/removeCardFromPool.do";
      this.$client
        .get(url, {
          poolId: this.poolNumber,
          cardNo: info.cardNo
        })
        .then(res => {
          this.get;
          if (res.code == 200) {
            this.getCardData();
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    },
    // 查看池子
    viewFlow() {
      var url = "/card/queryCardsPool.do";
      this.$client
        .get(url, {
          poolId: this.poolNumber
        })
        .then(res => {
          if (res.code == 200) {
            this.totalFlow = res.data.totalFlow;
            this.cardsCount = res.data.totalCards;
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
  .mask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 999;
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      padding-left: 31px;
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
      padding: 0 37px 0 37px;
      max-height: 541px;
      overflow-y: auto;
      .stepOne {
        margin-bottom: 28px;
        width: 467px;
        height: 24px;
        background: rgba(244, 245, 249, 1);
        border-radius: 12px;
        .firstStep {
          width: 236px;
          height: 24px;
          background: rgba(52, 112, 255, 1);
          border-radius: 12px;
          line-height: 24px;
          font-size: 12px;
          color: #fff;
          text-align: center;
        }
        .secondStep {
          width: 231px;
          line-height: 24px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      }
      .stepTwo {
        margin-bottom: 28px;
        width: 467px;
        height: 24px;
        background: rgba(244, 245, 249, 1);
        border-radius: 12px;
        .secondStep {
          width: 236px;
          height: 24px;
          background: rgba(52, 112, 255, 1);
          border-radius: 12px;
          line-height: 24px;
          font-size: 12px;
          color: #fff;
          text-align: center;
        }
        .firstStep {
          width: 231px;
          line-height: 24px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      }
      .popList {
        margin-bottom: 14px;
        .title {
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 14px;
          //  height: 17px;
          .title_l {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            height: 17px;
            line-height: 17px;
            display: block;
            margin-right: 4px;
          }
          .icon {
            width: 17px;
            height: 17px;
            background: rgba(80, 134, 255, 1);
            border-radius: 50%;
            font-size: 13px;
            line-height: 17px;
            text-align: center;
            display: block;
            color: #fff;
          }
        }
        .cardflow {
          height: 32px;
          line-height: 32px;
          background: #F4F5F9;
          color: #000;
          text-indent: 1em;
          font-size: 13px;
          border-radius: 3px;
        }
        /deep/.popShuru {
          font-size: 13px;
          line-height: 32px;
          color: #666;
          .el-input__inner {
            width: 467px;
            height: 32px;
            line-height: 32px;
            display: block;
          }
          .el-textarea__inner {
            height: 30px;
          }
          .el-radio {
            padding-top: 8px;
            height: 24px;
            width: 75px;
            background: rgba(245, 246, 247, 1);
            border-radius: 16px;
            text-align: center;
          }
          .is-checked {
            background: rgba(225, 234, 255, 1);
          }
        }
      }
      .btnArr {
        padding-bottom: 24px;
        padding-top: 14px;
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
        .finish {
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
  .member {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 477px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    padding-left: 31px;
    padding-right: 31px;
    z-index: 1001;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      // padding-left: 37px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 16px;
        height: 16px;
      }
    }
    .memberCont {
      .cardnumTitle {
        font-size: 13px;
        line-height: 16px;
        color: #666;
        margin-bottom: 16px;
      }
      /deep/.shuru {
        width: 415px;
        height: 300px;
        // background: rgba(247, 247, 250, 1);
        border-radius: 3px;
        .el-textarea__inner {
          font-size: 12px;
          line-height: 17px;
          background: rgba(247, 247, 250, 1);
        }
      }
    }
    .numExport {
      .start {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        margin-right: 12px;
        border-radius: 3px;
        .title {
          padding-left: 10px;
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          color: #666;
        }
        /deep/.startshuru {
          height: 32px;
          .el-input,
          .el-select {
            height: 32px;
            display: block;
          }
          .el-input__inner {
            width: 118px;
            height: 32px;
            line-height: 32px;
            border: 0 none;
            display: block;
          }
          .el-input .el-input__suffix {
            top: -4px;
          }
          .is-focus .el-input__suffix {
            top: -4px;
          }
        }
      }
    }
    /deep/.fileExport {
      .tips {
        font-size: 13px;
        line-height: 16px;
        color: #333;
        margin-bottom: 12px;
      }
      .upload-demo {
        display: flex;
      }
      .el-upload-list__item:first-child {
        margin-top: 0;
      }
      .el-range-editor.el-input__inner {
        height: 32px;
        display: block;
        display: flex;
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
    .btnMemberArr {
      margin-top: 24px;
      margin-right: 31px;
      margin-bottom: 24px;
      .memberSave {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        font-size: 13px;
        margin-right: 12px;
      }
      .memberCancel {
        width: 74px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        line-height: 30px;
        text-align: center;
        border: 1px solid rgba(222, 224, 227, 1);
        color: #333333;
        font-size: 13px;
      }
    }
  }
  .cardtable {
    width: 654px;
    height: 699px;
    padding: 0 31px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      // padding-left: 37px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 16px;
        height: 16px;
      }
    }
    /deep/.cardshuru {
      .shuru {
        .el-input__inner {
          height: 32px;
          line-height: 32px;
          width: 572px;
        }
        .el-input__prefix,
        .el-input__suffix {
          top: -3px;
        }
      }
      .addBtn {
        width: 64px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 13px;
      }
    }
    .tableList {
      margin-top: 10px;
      max-height: 494px;
    }
    .closeBtn {
      position: absolute;
      right: 31px;
      bottom: 32px;
      width: 76px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 3px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
