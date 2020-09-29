<template>
  <div class="manage clearfix">
    <div class="client-list fl">
      <div class="client-search">
        <div class="client-input">
          <el-autocomplete
            class="inline-input"
            v-model="clientName"
            :fetch-suggestions="querySearch"
            placeholder="请输入客户名字"
            @select="handleSelect"
            @keyup.enter.native="searchClient"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-autocomplete>
        </div>
        <span class="client-add" @click="addClient">+</span>
      </div>
      <div class="client-tree" v-if="updateKey">
        <user-tree
          @goHandleRight="goHandleRight"
          @clickNode="getClientInfo"
        ></user-tree>
      </div>
    </div>
    <div class="manage-info fl">
      <div class="client-info">
        <div class="user-info">
          <div>
            {{ userInfo.nickname ? userInfo.nickname : "" }}
          </div>
          <div>
            {{$t('localization.LoginName')}}：{{ userInfo.loginName ? userInfo.loginName : "" }} |
          </div>
          <div>{{$t('localization.Role')}}：{{ userInfo.roles ? userInfo.roles : "" }} |</div>
          <div>{{$t('localization.Contacts')}}：{{ userInfo.name ? userInfo.name : "" }}</div>
          <div class="edit" @click="editUser">
            <i class="el-icon-edit" />
            {{$t('localization.Edit')}}
          </div>
        </div>
        <div class="cart-static clearfix">
          <div class="card-total fl">
            <div class="title">{{this.$t('localization.CardTotal')}}</div>
            <div class="num">{{ cardStat.cardsCount }}</div>
          </div>
          <div class="card-stock fl" v-if="grade===0||grade===1">
            <div class="title">{{this.$t('localization.Inventory')}}</div>
            <div class="num">99999</div>
          </div>
          <div class="card-active fl">
            <div class="title">{{this.$t('localization.Active')}}</div>
            <div class="num">{{ cardStat.activeCardsCount }}</div>
          </div>
          <div class="card-due fl">
            <div class="title">{{this.$t('localization.ExpireSoon')}}</div>
            <div class="num">{{ cardStat.dueSoonCardsCount }}</div>
          </div>
          <div class="card-suspended fl">
            <div class="title">已停机</div>
            <div class="num">{{ cardStat.expireCardsCount }}</div>
          </div>
        </div>
      </div>
      <div class="client-table">
        <div class="client-tab">
          <el-tabs v-model="activeName" ref="tabs">
            <el-tab-pane label="SIM卡" name="first">
              <div class="sim-manage">
                <transition name="fade">
                  <div class="sim-search" v-if="searchShow">
                    <advanced-search
                      @cancel="getCancel"
                      @confirm="advancedSearch"
                    ></advanced-search>
                  </div>
                </transition>
                <el-button
                  v-if="!searchShow"
                  type="text"
                  class="search"
                  @click="searchShow = true"
                  >{{this.$t('localization.AdvancedSearch')}}</el-button
                >
                <el-button
                  v-else
                  type="text"
                  class="search"
                  @click="searchShow = false"
                  >{{$t('localization.Collapse')}}</el-button
                >
                <div class="sim-operate" v-if="!searchShow">
                  <el-button @click="saleShow = true">{{
                    $t("localization.Sell")
                  }}</el-button>
                  <el-button @click="batchRenewShow = true">{{$t('localization.BatchRenewal')}}</el-button>
                  <el-button @click="goDataCharge">{{$t('localization.FillingFlow')}}</el-button>
                  <el-button>{{$t('localization.BatchMsg')}}</el-button>
                  <el-button>批量停机</el-button>
                  <el-button>批量开机</el-button>
                  <el-button @click="goBatchRemarks">{{$t('localization.Import')}}{{$t('localization.Remarks')}}</el-button>
                  <el-button class="export"
                    >{{ this.$t("localization.Export")
                    }}<img
                      class="export-arrow"
                      src="@/assets/images/export.png"
                      alt="export"
                  /></el-button>
                </div>
                <div class="sim-table" v-if="!searchShow">
                  <swd-table
                    :table="tableAll"
                    :tableData="tableData"
                    :tableLabel="tableLabel"
                    :total="total"
                    :maxHeight="tableHeight"
                    @select="handleTableSelect"
                    @handleSelectionChange="handleSelectionChange"
                    @handleCurrentChange="handleCurrentChange"
                    @goCurrentPage="goCurrentPage"
                    @more="goMore"
                    ref="simTable"
                  >
                    <template
                      slot-scope="props"
                      v-if="props.row != undefined"
                      slot="abnormal"
                    >
                      <div class="static">
                        <span>
                          <el-popover
                            trigger="hover"
                            :visible-arrow="false"
                            popper-class="swd_popUp"
                            placement="right-start"
                            :offset="0"
                            :content="staticObj[props.row.abnormal]"
                          >
                            <i
                              slot="reference"
                              :class="classObj[props.row.abnormal]"
                            >
                            </i>
                          </el-popover>
                        </span>
                      </div>
                    </template>
                    <template
                      slot-scope="props"
                      v-if="props.row != undefined"
                      slot="handle"
                    >
                      <el-dropdown trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          <img src="@/assets/images/more.png" :alt="$t('localization.More')" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            @click.native="checkDetail(props.row)"
                            >{{$t('localization.Confirm')}}</el-dropdown-item
                          >
                          <el-dropdown-item>{{$t('localization.Export')}}</el-dropdown-item>
                          <el-dropdown-item @click.native="sendSMSShow = true"
                            >发送短信</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="refresh"
                            >{{$t('localization.StopTurning')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="goChargeVoice(props.row)"
                            >{{$t('localization.RechargeVoice')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="goSingleCharge(props.row)"
                            >{{$t('localization.FillingFlow')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="refresh"
                            >{{$t('localization.Renew')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="refresh"
                            >{{$t('localization.IntelDiagnosis')}}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                    <template
                      slot-scope="props"
                      v-if="props.row != undefined"
                      slot="refresh"
                    >
                      <div class="handle" @click="goRefresh(props.row)">
                        <img
                          :class="refreshing ? 'rotate' : ''"
                          src="@/assets/images/refresh.png"
                          alt="refresh"
                        />
                      </div>
                    </template>
                  </swd-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('localization.SubUser')" name="second">
              <div class="downClient">
                <div class="downSearch clearfix">
                  <div class="fl">
                    <search-panel
                      :searchConfig="searchConfig"
                      @search="goSearch"
                      ref="downReset"
                    ></search-panel>
                  </div>
                  <div class="clientExport pointer fr" @click="getExport">
                    {{ this.$t("localization.Export") }}
                    <img
                  class="export-arrow balance-arrow"
                  src="@/assets/images/export.png"
                  alt="export"
                />
                  </div>
                </div>
                <div class="customer-table">
                  <swd-table
                    :more="false"
                    :table="tableDown"
                    :tableData="tableDownData"
                    :tableLabel="tableDownLabel"
                    :total="tableDownTotal"
                    :pageSize="downPageSize"
                    @handleSelectionChange="tableDownChange"
                    @handleCurrentChange="tableDownCurrentChange"
                    @goCurrentPage="tableDownPage"
                    @more="goMore"
                  >
                    <template
                      slot-scope="props"
                      v-if="props.row != undefined"
                      slot="isDelete"
                    >
                      <div class="static">
                        <span>
                          <el-popover
                            trigger="hover"
                            :visible-arrow="false"
                            popper-class="swd_popUp"
                            placement="right-start"
                            :offset="0"
                            :content="staticObj[props.row.isDelete]"
                          >
                            <i
                              slot="reference"
                              :class="
                                props.row.isDelete == 0 ? 'normal' : 'halt'
                              "
                            ></i>
                          </el-popover>
                        </span>
                      </div>
                    </template>
                    <template
                      slot-scope="props"
                      v-if="props.row != undefined"
                      slot="handle"
                    >
                      <div class="handle" @click="editSubUser(props.row)">
                        {{$t('localization.Modification')}}
                      </div>
                      <div class="handle">
                        {{ props.row.isDelete === 0 ? $t('localization.Enable') : $t('localization.Deactivate') }}
                      </div>
                      <div class="handle" @click="resetPwd(props.row)">
                        {{$t('localization.ResetPassword')}}
                      </div>
                      <div class="handle" @click="openTansferTable(props.row)">
                        {{$t('localization.Transfer')}}
                      </div>
                    </template>
                  </swd-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 二级操作弹窗开始 -->
    <!-- 自定义列弹窗 -->
    <div class="selfDefine" v-if="selfDefineShow">
      <div class="mask"></div>
      <div class="dialog">
        <div class="header">
          <div class="title">自定义项</div>
          <div class="close" @click="closeSelfDefine">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="checkBoxGrounp">
          <el-checkbox-group v-model="checkedArr" @change="getCheckedData">
            <el-checkbox
              v-for="self in selfDefineArr"
              :label="self"
              :key="self.props"
              >{{ self.title }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div class="btn-right">
          <el-button type="primary" @click="confirmSelfDefine">{{$t('localization.Confirm')}}</el-button>
          <el-button @click="closeSelfDefine">{{$t('localization.Cancel')}}</el-button>
        </div>
      </div>
    </div>
    <!-- 客户转移记录表格 -->
    <div class="transferTable" v-if="transferTableShow">
      <transfer-table @cancel="transferTableCancel"></transfer-table>
    </div>
    <!-- 客户转移操作弹窗 -->
    <div class="transferHandle" v-if="transferHandleShow">
      <transfer-pop
        @cancel="transferHandleCancel"
        @confirm="transferSub"
        @history="openHistory"
        ref="transferTable"
        :parentId="userInfo.id"
      ></transfer-pop>
    </div>
    <!-- 销售弹窗 -->
    <SaleDialog :show="saleShow" @cancel="saleShow = false" />
    <!-- 详单弹窗 -->
    <Detail
      v-if="showDetailDialog"
      :card="currentCard"
      @cancel="showDetailDialog = false"
    ></Detail>
    <!-- 客户流量充值 -->
    <div class="flowRecharge" v-if="dataRechargeShow">
      <flow-recharge
        :data="renewDataCards"
        :type="packType"
        @cancel="flowRechargeCancel"
      ></flow-recharge>
    </div>
    <!-- 批量导入卡续费 -->
    <div class="batchRenew" v-if="batchRenewShow">
      <batch-renew
        @cancel="batchRenewCancel"
        @confirm="batchRenew"
      ></batch-renew>
    </div>
    <!-- 批量导入文件弹窗 -->
    <div class="batchExport" v-if="batchExportShow">
      <batch-import @cancel="batchExportCancel"></batch-import>
    </div>
    <!-- 批量导入备注弹窗 -->
    <div class="batchExport" v-if="batchRemarkShow">
      <batch-import @cancel="batchRemarkCancel" type="remark"></batch-import>
    </div>
    <!-- 用户操作弹窗 -->
    <div class="handleClient" v-if="handleClientShow">
      <handle-client
        :type="type"
        :clientInfo="clientInfo"
        :editClientInfo="editClientInfo"
        @cancel="handleClientCancel"
        @confirm="handleClientConfirm"
      ></handle-client>
    </div>
    <!-- 批量查询 -->
    <div class="batchSearch" v-if="batchSearchShow">
      <batch-search @cancel="batchSearchCancel"></batch-search>
    </div>
    <!-- 订单弹窗 -->
    <div class="orderForm" v-if="orderFormShow">
      <order-form @cancel="orderFormCancel"></order-form>
    </div>
    <!-- 短信相关弹窗 -->
    <div class="sendNote" v-if="sendSMSShow">
      <SendSMS @cancel="handleSMSClose" />
    </div>
    <!-- 续费充值相关弹窗 -->
    <Charge ref="charge" @close="closeBatchCharge" :title="$t('localization.Renew')" />
    <Charge ref="voiceCharge" :title="$t('localization.VoiceCharge')" :showVoice="true"/>
    <!-- 二级操作弹窗结束 -->
  </div>
</template>
<script>
import userTree from "../../components/common/userTree1";
import swdTable from "../../components/swdTable/swdTable1";
import userTree1 from "../../components/common/userTree";
import advancedSearch from "../../components/advancedSearch/advancedSearch";
import searchPanel from "../../components/searchPanel/searchPanel";
import transferTable from "../../components/managePop/transferTable";
import transferPop from "../../components/managePop/transferPop";
import flowRecharge from "../../components/managePop/flowRecharge";
import batchRenew from "../../components/managePop/batchRenew";
import batchImport from "../../components/managePop/batchImport";
import handleClient from "../../components/managePop/handleClient";
import batchSearch from "../../components/managePop/batchSearch";
import orderForm from "../../components/managePop/orderForm";
import SendSMS from "../../components/managePop/SendSMS";
import SaleDialog from "../../components/managePop/SaleDialog";
import Detail from "../../components/managePop/detail";
import Charge from "../../components/charge/charge";
export default {
  components: {
    userTree,
    swdTable,
    userTree1,
    advancedSearch,
    searchPanel,
    transferTable,
    transferPop,
    flowRecharge,
    batchRenew,
    batchImport,
    handleClient,
    batchSearch,
    orderForm,
    SendSMS,
    Detail,
    Charge,
    SaleDialog,
  },
  data() {
    return {
      updateKey: true, //组件更新标志
      userId: "", //用户id
      currentUser: "", //当前选中的用户
      userInfo: {}, //用户信息
      searchShow: false, //高级搜索展示
      selfDefineShow: false, //自定义表头弹窗
      checkedArr: [], //选中数组
      showDetailDialog: false,
      refreshing: false,
      isHaveChild: 1,
      currentCard: null,
      packType: null,
      tableHeight: 490,
      voiceCard:'',
      grade:null,
      selfDefineArr: [
        { prop: "cardNo", title: this.$t('localization.CardNum'), width: 160 },
        { prop: "corresponding", title: "ICCID", width: 160 },
        { prop: "distributionTime", title: this.$t('localization.ActivationTime'), width: 160 },
        { prop: "expireTime", title: this.$t('localization.ExpirationDate'), width: 160 },
        { prop: "c", title: this.$t('localization.RemainData'), width: 160 },
        { prop: "useSMSfee", title: `${this.$t('localization.CurrentMsg')}（${this.$t('localization.Loaf')}）`, width: 160 },
        { prop: "g", title: "IMSI", width: 160 },
        { prop: "useVoice", title: `${this.$t('localization.MonthVoiceUsed')}(min)`, width: 160 },
        { prop: "J", title: this.$t('localization.PackageType'), width: 160 },
        { prop: "N", title: this.$t('localization.OrPlace'), width: 160 },
        { prop: "abnormal", title: this.$t('localization.Status'), width: 160 },
        { prop: "packName", title: this.$t('localization.Type'), width: 160 },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true, width: 160 },
        { prop: "remarks", title: this.$t('localization.Remarks'), width: 160 },
      ],
      clientName: "", //客户搜索
      activeName: "first",
      tableAll: {
        select: true,
        handle: true,
        type: true,
      },
      cardStat:{
        cardsCount:null,
        activeCardsCount:null,
        dueSoonCardsCount:null,
        expireCardsCount:null
      },
      //状态键值对
      staticObj: [this.$t('localization.Normal'), this.$t('localization.UNN'), this.$t('localization.OverStop'), this.$t('localization.ExpirationStop')],
      classObj: ["normal", "empty", "halt", "halt"],
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "cardNo", title: this.$t('localization.CardNum'), minWidth: 110 },
        { prop: "corresponding", title: "ICCID", minWidth: 150 },
        { prop: "distributionTime", title: this.$t('localization.ActivationTime'), minWidth: 140 },
        { prop: "expireTime", title: this.$t('localization.ExpirationDate'), minWidth: 140 },
        { prop: "surplusFlow", title: this.$t('localization.MonthFlow') },
        { prop: "useSMSfee", title: `${this.$t('localization.CurrentMsg')}（${this.$t('localization.Loaf')}）` },
        { prop: "packName", title: this.$t('localization.PackageType') },
        { prop: "abnormal", title: this.$t('localization.Status'), slot: true },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
        { prop: "refresh", title: this.$t('localization.Refresh'), slot: true },
        { prop: "remarks", title: this.$t('localization.Remarks') },
      ],
      pageSize: 15, //默认页数
      pageIndex: 1, //初始页码
      // 下级用户表格开始
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: `${this.$t('localization.Status')}：`,
            key: "packageStatus",
            type: "select",
            value: "",
            options: [
              {
                value: null,
                label: this.$t('localization.All'),
              },
              {
                value: "0",
                label: this.$t('localization.Enable'),
              },
              {
                value: "1",
                label: this.$t('localization.Deactivate'),
              },
            ],
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
          {
            label: `${this.$t('localization.AddTime')}：`,
            key: "timers",
            type: "datePicker",
            value: [],
            config: {
              type: "daterange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期",
            },
          },
        ],
      },
      tableDown: {
        select: false,
        handle: true,
        type: true,
      },
      tableDownData: [],
      tableDownTotal: null, //总条数
      tableDownLabel: [
        { prop: "nickname", title: this.$t('localization.ClientName') },
        { prop: "loginName", title: this.$t('localization.Account') },
        { prop: "grade1", title: this.$t('localization.Type') },
        { prop: "name", title: this.$t('localization.Contacts') },
        { prop: "tel", title: this.$t('localization.Phone') },
        { prop: "purchaseCount", title: this.$t('localization.QuantityIn') },
        { prop: "isDelete", title: this.$t('localization.Status'), slot: true },
        { prop: "createTime", title: this.$t('localization.AddTime') },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true, width: 200 },
      ],
      downPageSize: 10, //默认多少条一页
      downPageIndex: 1, //初始页码
      beginCreateTime: null, //下级用户开始时间
      endCreateTime: null, //下级用户结束时间
      //下级用户表格结束
      packageStatus: null, //套餐状态

      // 操作类弹窗数据
      transferTableShow: false, //客户转移记录表格弹窗显示隐藏
      transferHandleShow: false, //客户转移操作弹窗显示隐藏
      dataRechargeShow: false,
      batchRenewShow: false,
      batchExportShow: false,
      batchRemarkShow: false,
      handleClientShow: false,
      type: "add", //客户弹窗类型
      clientInfo: null,
      batchSearchShow: false,
      orderFormShow: false,
      sendSMSShow: true,
      saleShow: false,
      // 各类弹窗传参
      editclientInfo: null,
      renewDataCards:[]
    };
  },
  created() {
    let _this = this;
    this.getLoginInfo();
  },
  mounted() {
    document.onkeydown = (e) => {
      let key = e.keyCode;
      if (key === 9) {
        e.preventDefault();
        this.activeName = this.activeName === "first" ? "second" : "first";
        this.handleClick();
      }
    };
  },
  methods: {
    getStat(){
      let url = "/statistics/queryCardsStatistics.do";
      let params = {
        userId: this.userId,
      };
      this.$client.get(url, params).then((res) => {
        if (res.code === "200") {
          Object.assign(this.cardStat, res.data);
        }
      });
    },
    goHandleRight(obj) {
      let select = obj.multipleSelection;
      switch (select) {
        case "add":
          this.addClient(obj.info);
          break;
        case "set":
          this.goSetPlan(obj.info.userId);
          break;
        case "reset":
          this.resetPwd(obj.info);
          break;
        case "transfer":
          this.openTansferTable(obj.info);
          break;
        case "sales":
          this.saleShow = true;
          break;
        default:
          break;
      }
    },
    //批量导入备注
    goBatchRemarks() {
      this.batchRemarkShow = true;
    },
    batchRemarkCancel() {
      this.batchRemarkShow = false;
    },
    goSingleCharge(card){
      let arr=[]
      arr.push(card)
      this.renewDataCards=arr
      this.goDataCharge()
    },
    handleSMSClose() {
      this.sendSMSShow = false;
    },
    closeBatchCharge() {
      this.batchRenewShow = false;
    },
    //设置套餐
    goSetPlan(userId) {
      this.$router.push({
        path: "/index/phoneCard/phoneCardPre",
        query: { userId: userId },
      });
    },
    //点击树节点事件
    getClientInfo(e) {
      this.userId = e.userId;
      // 清空搜索条件
      this.downPageSize = 10;
      this.downPageIndex = 1;
      this.beginCreateTime = null; //下级用户开始时间
      this.endCreateTime = null;
      this.packageStatus = null;
      this.goReset();
      this.getUserInfoById();
      this.getUserTable();
      this.getSimCard();
    },
    //批量续费
    batchRenew(cards) {
      let priceArr = cards.map((item) => {
        return item.packPrice1;
      });
      let amount = priceArr.reduce((total, value) => {
        return total + value;
      });
      let cardList = [];
      cardList = cards.map((item) => {
        return item.cardNo;
      });
      let url = "/pay/addBatchGoRechargeOrder.do";
      cardList = cardList.join(",");
      let params = {
        cards: cardList,
        totalPay: amount,
      };
      this.$client.get(url, params).then((res) => {
        if (res.code === "200") {
          let info = {
            title: this.$t('localization.Renew'),
            showTime: false,
          };
          this.$refs.charge.open(
            res.data.totalPay,
            res.data.out_trade_no
          );
        }
      });
    },
    addClient(parent) {
      this.type = "add";
      parent ? (this.clientInfo = parent) : null;
      this.handleClientShow = true;
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.getSimCard();
      } else {
        this.getUserTable();
      }
    },
    //流量充值
    goDataCharge() {
      if(this.renewDataCards.length!==0){
        this.dataRechargeShow = true;
      }
    },
    goChargeVoice(row){
      if(row.packType!==2){
        swd.compop({
          title: this.$t('localization.VoiceSuperposition'),
          content: '该卡号暂不支持语音叠加',
          autoClose:false
        })
        return
      }
      this.$refs.voiceCharge.open(0,null,row.cardNo)
    },
    //输入建议
    querySearch(queryString, cb) {
      let suggestions = [];
      this.$cookie.get("suggetions") &&
        JSON.parse(this.$cookie.get("suggestions"));
      let result = [];
      if (!suggestions.length) cb(result);
      suggestions = suggestions.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
      });
      suggestions.forEach((item) => {
        result.push({
          value: item,
        });
      });
      cb(result);
    },
    //搜索客户并存入历史记录
    searchClient() {
      if (this.clientName) {
        if (this.$cookie.get("suggestions")) {
          let arr = JSON.parse(this.$cookie.get("suggestions"));
          arr.push(this.clientName);
          if (arr.length > 10) {
            arr = arr.slice(arr.length - 9, arr.length);
          }
          this.$cookie.set("suggestions", JSON.stringify(arr));
        } else {
          let arr = [];
          arr.push(this.clientName);
          this.$cookie.set("suggestions", JSON.stringify(arr));
        }
      }
    },
    // 刷新列表
    goRefresh() {
      this.refreshing = true;
      this.getSimCard();
    },
    //续费dialog
    goCharge() {
      let info = {
        title: this.$t('localization.Renew'),
        showTime: true,
      };
      this.$refs.charge.open(info);
    },
    checkDetail(row) {
      this.currentCard = row.cardNo;
      this.showDetailDialog = true;
    },
    //打开客户转移记录
    openHistory() {
      this.transferTableShow = true;
    },
    //表格子组件选择框触发方法
    handleSelect(e) {},
    handleTableSelect(selection, row) {
      if (selection.length) {
        let packType = selection[0].packType;
        let valid = selection.every((item) => {
          return item.packType === packType;
        });
        if (!valid) {
          this.$message.warning("月卡和年卡暂不支持共同叠加流量");
          this.$refs.simTable.toggleSelection(row, false);
        }
      }
    },
    handleSelectionChange(obj) {
      this.renewDataCards=obj.multipleSelection
    },
    //分页按钮触发方法
    handleCurrentChange(obj) {
      this.pageIndex = obj;
      this.getSimCard();
    },
    goCurrentPage(obj) {
      this.pageIndex = obj.multipleSelection;
      this.getSimCard();
    },
    // 获取数据
    getSimCard() {
      let url = "/card/queryCardListPage.do";
      this.$client
        .post(url, {
          userId: this.userId,
          useFlowBegin: this.useFlowBegin,
          useFlowEnd: this.useFlowEnd,
          isHaveChild: this.isHaveChild,
          packId: this.packId,
          abnormal: this.abnormal,
          activeTimeBegin: this.activeTimeBegin,
          activeTimeEnd: this.activeTimeEnd,
          expireTimeBegin: this.expireTimeBegin,
          expireTimeEnd: this.expireTimeEnd,
          cardNoBegin: this.cardNoBegin,
          cardNoEnd: this.cardNoEnd,
          isBatch: this.isBatch,
          cards: this.cards,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.total;
            if (this.refreshing) {
              this.refreshing = false;
            }
          }
        });
    },
    //测试自定义列选用
    goMore() {
      this.selfDefineShow = true;
    },
    refresh() {},
    //自定义列的方法
    getCheckedData(info) {},
    //关闭自定义列弹窗
    closeSelfDefine() {
      this.selfDefineShow = false;
    },
    //确认自定义列选项按钮
    confirmSelfDefine() {
      this.tableLabel = this.checkedArr;
      this.selfDefineShow = false;
    },
    // 高级搜索展示
    getAdvanced() {
      this.searchShow = true;
    },
    //收起高级搜索
    getCancel() {
      this.searchShow = false;
    },
    //高级搜索查询
    advancedSearch(info) {
      let url = "/card/queryCardListPage.do";
      this.$client
        .post(url, {
          userId: this.userId,
          useFlowBegin: info.startFlow,
          useFlowEnd: info.endFlow,
          isHaveChild: info.isHaveChild,
          packId: info.packId,
          abnormal: info.packStatus,
          activeTimeBegin: info.activeTime && info.activeTime[0],
          activeTimeEnd: info.activeTime && info.activeTime[1],
          expireTimeBegin: info.expireTime && info.expireTime[0],
          expireTimeEnd: info.expireTime && info.expireTime[1],
          cardNoBegin: info.startNum,
          cardNoEnd: info.endNum,
          isBatch: info.isBatch,
          cards: this.cards,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.total;
          }
        });
    },

    //下级用户的方法开始
    //down表格方法开始
    //表格子组件选择框触发方法
    tableDownChange(obj) {},
    //分页按钮触发方法
    tableDownCurrentChange(obj) {
      this.downPageIndex = obj;
      this.getUserTable();
    },
    tableDownPage(obj) {
      this.downPageIndex = obj;
      this.getUserTable();
    },
    //down表格方法结束
    goSearch(info) {
      this.packageStatus = info.packageStatus;
      this.beginCreateTime = info.timers ? info.timers[0] : null;
      this.endCreateTime = info.timers ? info.timers[1] : null;
      this.getUserTable();
    },
    goReset() {
      this.$refs.downReset.emitReset();
    },
    // 获取下级用户列表
    getUserTable() {
      var url = "/user/queryAllSubordinateUsersPage.do";
      this.$client
        .get(url, {
          userId: this.userId,
          beginCreateTime: this.beginCreateTime,
          endCreateTime: this.endCreateTime,
          isDelete: this.packageStatus,
          pageSize: this.downPageSize,
          pageIndex: this.downPageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableDownData = res.data;
            this.tableDownData.map((item) => {
              item.createTime = item.createTime.substring(0, 10);
              if (item.grade == 1) {
                item.grade1 = this.$t('localization.Agent');
              } else if (item.grade == 2 || item.grade == 3) {
                item.grade1 = this.$t('localization.NormalUser');
              } else {
                item.grade1 = "admin";
              }
            });
            this.tableDownTotal = res.total;
          }
        });
    },
    // 下级用户表格{{I18N.common.Export}}
    getExport() {
      var url = `/user/exportSubordinateUsers.do`;
      this.$client.downLoad(url, {
        userId: this.userId,
        beginCreateTime: this.beginCreateTime,
        endCreateTime: this.endCreateTime,
        isDelete: this.packageStatus,
      });
    },
    // 重置密码
    resetPwd(user) {
      var that = this;
      swd.compop({
        title: this.$t('localization.Edit'),
        content: `将重置${user.nickname}的密码为：123456`,
        success: function (res) {
          if (res.confirm == true) {
            var url = `/user/resetUserPassWord.do`;
            that.$client
              .get(url, {
                // userId: subUser.id
              })
              .then((res) => {
                if (res.code == "200") {
                  swd.compop({
                    title: this.$t('localization.Edit'),
                    content: "重置成功",
                    autoClose: true,
                    success: function (res) {},
                  });
                }
              });
          }
        },
      });
    },
    //关闭客户转移列表弹窗
    transferTableCancel() {
      this.transferTableShow = false;
    },
    transferHandleCancel() {
      this.transferHandleShow = false;
    },
    transferSub(subClient,targetClient) {
      var that = this;
      swd.compop({
        title: this.$t('localization.ClientTransfer'),
        content: `确定要将${subClient.nickname}以及其下级用户和SIM卡转移给${targetClient.nickname}?`,
        success: function (res) {
          if (res.confirm == true) {
            var url = `/user/transferCustomers.do`;
            let params={
              userId:subClient.id,
              superiorId:targetClient.userId
            }
            that.$client
              .get(url, params)
              .then((res) => {
                if (res.code == "200") {
                  swd.compop({
                    title: that.$t('localization.ClientTransfer'),
                    content: "转移成功",
                    success: function (res) {
                      that.transferHandleShow=false
                    },
                  });
                } else {
                  swd.compop({
                    title: that.$t('localization.ClientTransfer'),
                    content: "转移失败",
                    success: function (res) {},
                  });
                }
              });
          }
        },
      });
    },
    //打开客户转移dialog
    openTansferTable(info) {
      this.transferHandleShow = true;
      this.$nextTick(() => {
        this.$refs.transferTable.open(info);
      });
    },
    //关闭流量充值操作窗口
    flowRechargeCancel() {
      this.dataRechargeShow = false;
    },

    //关闭批量导入续费
    batchRenewCancel() {
      this.batchRenewShow = false;
    },
    batchExportCancel() {
      this.batchExportShow = false;
    },
    handleClientCancel() {
      this.handleClientShow = false;
    },
    handleClientConfirm() {
      swd.compop({
        title: "提示",
        content: this.$t('localization.EditSuccess1'),
        autoClose: true,
      });
      this.handleClientShow = false;
      this.updateKey = false;
      setTimeout(() => {
        this.updateKey = true;
      }, 500);
      this.getUserInfoById();
    },
    batchSearchCancel() {
      this.batchSearchShow = false;
    },
    orderFormCancel() {
      this.orderFormShow = false;
    },

    // 打开各类弹窗
    editUser() {
      this.editClientInfo = this.userInfo;
      this.type = "edit";
      this.clientInfo = null;
      this.handleClientShow = true;
    },
    //修改下级用户
    editSubUser(userInfo) {
      this.editClientInfo = userInfo;
      this.type = "edit";
      this.clientInfo = null;
      this.handleClientShow = true;
    },
    // 接口逻辑
    //获取用户信息
    getLoginInfo() {
      var url = `/user/getUserInfo.do`;
      this.$client.get(url).then((res) => {
        if (res.code == "200") {
          this.userId = res.data.id;
          this.grade=res.data.grade
          this.getUserInfoById();
          this.getStat()
          if (this.activeName == "first") {
            this.getSimCard();
          } else {
            this.getUserTable();
          }
        }
      });
    },
    getUserInfoById() {
      var url = `/user/getByUserId.do`;
      this.$client
        .get(url, {
          userId: this.userId,
        })
        .then((res) => {
          if (res.code == "200") {
            this.userInfo = res.data;
            let grade = this.userInfo.grade;
            switch (grade) {
              case 1:
                this.userInfo.roles = this.$t('localization.Agent');
                break;
              case 2:
                this.userInfo.roles = this.$t('localization.NormalUser');
                break;
              case 3:
                this.userInfo.roles = this.$t('localization.NormalUser');
                break;
              case 4:
                this.userInfo.roles = this.$t('localization.Finance');
                break;
              default:
                this.userInfo.roles = "admin";
                break;
            }
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.manage {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 5px 5px;
  background-color: #fff;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .client-list {
    height: 100%;
    width: 260px;
    border-right: 1px solid #e9eaf2;
    .client-search {
      height: 32px;
      padding: 21px 10px 13px 14px;
      /deep/.client-input {
        display: inline-block;
        .el-input__inner {
          height: 30px;
          line-height: 30px;
          width: 209px;
          border-radius: 16px;
          font-size: 13px;
        }
        .el-input__icon {
          line-height: 30px;
        }
      }
      .client-add {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: rgba(156, 163, 189, 1);
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        margin: 8px 0 8px 4px;
        &:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      }
    }
    .client-tree {
      height: calc(100% - 66px);
      overflow-y: auto;
      width: 260px;
    }
  }
  .manage-info {
    padding-top: 14px;
    padding-left: 5px;
    width: calc(100% - 261px);
    box-sizing: border-box;
    .user-info {
      margin-left: 24px;
      display: flex;
      font-size: 13px;
      color: rgba(85, 85, 85, 1);
      line-height: 18px;
      div {
        margin-left: 18px;
      }
      div:first-child {
        margin-left: 0;
      }
      .edit {
        cursor: pointer;
        color: #3370ff;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .cart-static {
      box-sizing: border-box;
      padding-left: 24px;
      padding-top: 34px;
      width: 100%;
      .card-total {
        width: 15.8%;
        height: 90px;
        background: #4163ff;
        border-radius: 6px 6px 6px 6px;
        margin-right: 4%;
      }
      .card-stock {
        width: 15.8%;
        height: 90px;
        background: #5393ff;
        border-radius: 6px 6px 6px 6px;
        margin-right: 4%;
      }
      .card-active {
        width: 15.8%;
        height: 90px;
        background: #6fbd27;
        border-radius: 6px 6px 6px 6px;
        margin-right: 4%;
      }
      .card-due {
        width: 15.8%;
        height: 90px;
        background: #ef7e02;
        border-radius: 6px 6px 6px 6px;
        margin-right: 4%;
      }
      .card-suspended {
        width: 15.8%;
        height: 90px;
        background: #909399;
        border-radius: 6px 6px 6px 6px;
      }
      .card-total,
      .card-stock,
      .card-active,
      .card-due,
      .card-suspended {
        position: relative;
        &::before {
          position: absolute;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          background: linear-gradient(130deg, #fff, transparent);
          clip-path: polygon(
            nonzero,
            70px 0px,
            215px 0px,
            215px 90px,
            0px 90px
          );
          opacity: 0.2;
          transform: translateX(30%);
        }
        .title {
          margin-left: 22px;
          margin-top: 16px;
          color: #fff;
          font-size: 12px;
        }
        .num {
          margin-left: 22px;
          margin-top: 22px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  /deep/.client-table {
    padding-left: 24px;
    // padding-top: 20px;
    padding-right: 30px;
    .el-tabs__header {
      margin: 0;
    }
    .sim-manage {
      position: relative;
      background: #fff;
      /deep/.sim-operate {
        .export {
          position: absolute;
          right: 0;
        }
        .el-button {
          height: 32px;
          padding: 10px 20px;
          font-size: 13px;
        }
      }
    }
    .sim-table {
      height: 550px;
      padding-top: 10px;
      .halt {
        &::after {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #ff8800;
          border-radius: 50%;
        }
      }
      .empty {
        &::after {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #909399;
          border-radius: 50%;
        }
      }
      .normal {
        &::after {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: rgba(103, 194, 58, 1);
          border-radius: 50%;
        }
      }
      .mwc {
        width: 16px;
        height: 16px;
        background: brown;
      }
    }
    .downClient {
      min-height: 608px;
      padding-top: 20px;
      .downSearch {
        .clientExport {
          position: relative;
          width: 64px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 224, 227, 1);
          border-radius: 4px;
          font-size: 13px;
          color: rgba(85, 85, 85, 1);
          line-height: 32px;
          text-align: center;
        }
      }
    }
    /deep/.customer-table {
      margin-top: 18px;
      .handle {
        cursor: pointer;
        display: inline-block;
        color: #3370ff;
        &:hover {
          opacity: 0.8;
        }
      }
      .normal {
        &::after {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: rgba(103, 194, 58, 1);
          border-radius: 50%;
        }
      }
      .halt {
        &::after {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: rgba(144, 147, 153, 1);

          border-radius: 50%;
        }
      }
    }
  }
  .selfDefine {
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
    .dialog {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 543px;
      height: 356px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      z-index: 1001;
      box-sizing: border-box;
      padding: 26px 36px;
      .header {
        .title {
          font-size: 14px;
          color: rgba(24, 38, 60, 1);
          line-height: 16px;
        }
        .close {
          width: 13px;
          height: 13px;
          color: rgba(100, 106, 115, 1);
          font-size: 12px;
        }
      }
      /deep/.checkBoxGrounp {
        padding-top: 43px;
        .el-checkbox {
          //width:155px;
          font-size: 12px;
          color: #555;
          width: 120px;
          margin-bottom: 16px;
        }
      }
      .btnArr {
        padding-top: 24px;
        .confirm {
          width: 76px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          color: #fff;
          font-size: 13px;
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
          color: #333;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
