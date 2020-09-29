<template>
  <div class="index">
    <div class="menu-expand" v-if="!isCollapse">
      <div class="logo">
        <img class="logo-item" src="@/assets/images/logo_main.png" alt="logo" />
      </div>
      <div class="menu-bar">
        <tab-bar
          :isCollapse="isCollapse"
          @getValue="getValue"
          ref="tabBarChild"
        ></tab-bar>
      </div>
    </div>
    <div class="menu-collapse" v-if="isCollapse">
      <div class="logo">
        <img class="logo-item" src="@/assets/images/logo.png" alt="logo" />
      </div>
      <div class="menu-bar">
        <tab-bar :isCollapse="isCollapse"></tab-bar>
      </div>
    </div>
    <div :class="isCollapse ? 'content1' : 'content'" v-if="isShow">
      <div class="header clearfix">
        <div class="unfold" @click="goHandle">
          <img v-if="!isCollapse" src="@/assets/images/close.png" alt="">
          <img v-else src="@/assets/images/expand.png" alt="">
        </div>
        <div class="crumbs">{{ location }}</div>
        <div class="search clearfix">
          <div class="fl searchType">
            <el-select v-model="searchType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="fl search_r">
            <input
              type="text"
              v-model="searchName"
              class="searchInput"
              :placeholder="$t('localization.SearchPlaceHolder')"
            />
            <span class="searchIcon">
              <i class="el-icon-search" color="#3370FF" @click="goSearch"></i
            ></span>
          </div>
        </div>
        <div class="news">99+</div>
        <div class="loginInfo">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="circle">{{$t('localization.avatar')}}</span>
              <span class="circleIcon"
                ><i class="el-icon-caret-bottom el-icon--right"></i
              ></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="none">admin</el-dropdown-item>
              <el-dropdown-item command="none">{{$t('localization.Account')}}：swd</el-dropdown-item>
              <el-dropdown-item command="goInfo">{{
                this.$t("localization.AccountInfo")
              }}</el-dropdown-item>
              <el-dropdown-item command="goServer">{{
                this.$t("localization.HBMC")
              }}</el-dropdown-item>
              <el-dropdown-item command="goLogOut">{{
                this.$t("localization.LogOut")
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="main">
        <router-view :key="this.$route.path" />
      </div>
    </div>
    <div :class="[isCollapse ? 'is-collapse' : 'not-collapse', 'notify']">
      <img class="notify-img" src="@/assets/images/notify_1.png" />
      <div class="notify-msg">
        系统公告或者超额停机/到期提醒消息
        <el-button type="text">{{$t('localization.ViewDetail')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import tabBar from "../../components/common/tabBar.vue";
export default {
  components: { tabBar },
  data() {
    return {
      isShow: true,
      location: "首页",
      options: [
        {
          value: this.$t('localization.CardNum'),
          label: this.$t('localization.CardNum'),
        },
        {
          value: this.$t('localization.User'),
          label: this.$t('localization.User'),
        },
      ],
      locationObj: {
        Home: this.$t('localization.Home'),
        PhoneCardMan: this.$t('localization.PackManagement'),
        PhoneCardPre: "代理套餐价格管理",
        PhoneCardSal: "卡导入",
        PhoneCardRef: "卡刷新",
        FlowPool: "流量池",
        Manage: "客户管理",
        Account: this.$t('localization.AccountBalance'),
        AgentAccount: this.$t('localization.AccountBalance'),
        RechargeRecord: this.$t('localization.SimChargeRecord'),
        RebateRecord: this.$t('localization.RebateRecord'),
        StatementFlow: this.$t('localization.FlowStatistics'),
        StatementNote: this.$t('localization.MsgStatistics'),
        StatementPull: this.$t('localization.StopStartStat'),
        StatementPre: "价格变动统计",
        ManagementRol: this.$t('localization.RolePermission'),
        ManagementCard: this.$t('localization.AccountManage'),
        OperationLog: this.$t('localization.OperationLog'),
        salesDetails: "卡导入-详情",
      },
      searchType: this.$t('localization.CardNum'), //搜索类型
      searchName: "", //搜索框输入
      isCollapse: false, //展开收起
    };
  },
  mounted() {
    var that = this;
    this.location = this.locationObj[this.$refs.tabBarChild.active];
  },
  methods: {
    goSearch() {
    },
    goHandle() {
      this.isCollapse = !this.isCollapse;
    },
    goInfo() {
    },
    //服务商
    goServer() {
    },
    //退出
    goLogOut() {
      var that = this;
      that.$cookie.remove("ASP.NET_SessionId");
      that.$cookie.remove("Grade");
      that.$cookie.remove("token");
      that.$router.push({ path: "/login" });
    },
    //获取子tabBar传来的值
    getValue(value) {
      this.location = this.locationObj[value];
    },
    handleCommand(command){
      eval("this."+command+"()")
    }
  },
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  .menu-expand {
    width: 229px;
    height: 100%;
    min-width: 229px;
    position: relative;
    background: #1f3058;
    z-index: 10;
    .logo {
      width: 229px;
      height: 70px;
      position: fixed;
      left: 0;
      top: 0;
      background: #1f3058;
      .logo-item {
        margin: 0 auto;
        transform: translateY(50%);
      }
    }
    .menu-bar {
      width: 229px;
      position: fixed;
      background: #1f3058;
      left: 0;
      top: 70px;
      bottom: 0;
      overflow-y: auto;
    }
    .menu-bar::-webkit-scrollbar {
      display: none;
    }
  }
  .menu-collapse {
    width: 47px;
    height: 100%;
    position: relative;
    background: #1f3058;
    z-index: 10;
    .logo {
      width: 47px;
      height: 70px;
      position: fixed;
      left: 0;
      top: 0;
      background: #1f3058;
      .logo-item {
        margin: 0 auto;
        transform: translateY(50%);
      }
    }
    .menu-bar {
      width: 47px;
      position: fixed;
      background: #1f3058;
      left: 0;
      top: 70px;
      bottom: 0;
      overflow-y: auto;
    }
    .menu-bar::-webkit-scrollbar {
      display: none;
    }
  }
  .content {
    height: 100%;
    width: calc(100% - 229px);
  }
  .content1 {
    height: 100%;
    width: calc(100% - 47px);
  }
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    background: #fff;
    border-bottom: 1px solid #e9eaf2;
    position: relative;
    .unfold {
      cursor: pointer;
      display: inline-block;
      margin-left: 23px;
      margin-top: 27px;
      font-size: 20px;
    }
    .el-icon-s-fold {
      font-size: inherit;
    }
    .el-icon-s-unfold {
      font-size: inherit;
    }
    .crumbs {
      display: inline-block;
      margin-left: 16px;
      margin-top: 23px;
      color: #1c2656;
      font-size: 20px;
    }
    .search {
      display: inline-block;
      width: 319px;
      height: 33px;
      margin-top: 17px;
      margin-left: 50%;
      .searchType {
        width: 67px;
        height: 31px;
        border: 1px solid #dee0e3;
        border-radius: 17px 0 0 17px;
        color: #404040;
      }
      .search_r {
        position: relative;
        /deep/.searchIcon {
          color: #3370ff;
          cursor: pointer;
          position: absolute;
          right: 12px;
          top: 10px;
        }
      }
      .searchInput {
        font-size: 12px;
        color:#8F959E;
        width: 235px;
        height: 31px;
        padding-left: 14px;
        border: 1px solid #dee0e3;
        border-left: 0 none;
        border-radius: 0 17px 17px 0;
      }
    }
    .news {
      position: absolute;
      top: 26px;
      width: 30px;
      height: 14px;
      line-height: 14px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(198, 201, 203, 1);
      border-radius: 8px;
      right: 7%;
      font-size: 12px;
      color:#FF6935;
      text-align: center;
    }
    .loginInfo {
      position: absolute;
      top: 16px;
      right: 2%;
      width: 62px;
      height: 36px;

      .circle {
        display: inline-block;
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 11px;
        color: #fff;
        border-radius: 50%;
        background: #4F8AFF;
      }
      .circleIcon {
        cursor: pointer;
        display: inline-block;
        width: 21px;
        height: 16px;
        position: absolute;
        right: -24px;
        top: 10px;
      }
    }
  }
  .main {
    height: calc(100% - 103px);
    padding: 30px 16px 16px 16px;
    background: #fbfbfd;
  }
  .notify {
    height: 30px;
    background-color: #e0e3eb;
    position: absolute;
    top: 70px;
    line-height: 30px;
    padding-left: 26px;
    box-sizing: border-box;
    .notify-img {
      display: inline-block;
      vertical-align: middle;
    }
    /deep/.notify-msg {
      // vertical-align: middle;
      font-size: 13px;
      display: inline-block;
      height: 20px;
      .el-button--text {
        padding: 0;
        font-size: 13px;
      }
    }
    &.is-collapse {
      width: 1863px;
      left: 47px;
    }
    &.not-collapse {
      width: 1680px;
      left: 230px;
    }
  }
}
.loginMenu {
  width: 157px;
  height: 172px;
  .menuList {
    height: 40px;
    margin: 0 10px;
    border-bottom: 1px solid #f2f2f2;
    color: #646464;
    .menuList_title {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      margin-left: 15px;
    }
    .user {
      padding-left: 8px;
      font-size: 13px;
      line-height: 15px;
      margin-bottom: 9px;
    }
    .userAccount {
      padding-left: 8px;
      font-size: 13px;
    }
  }
  .menuList_last {
    border-bottom: 0 none;
    height: 40px;
    margin: 0 10px;
    color: #646464;
    .menuList_title {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      margin-left: 15px;
    }
  }
}
</style>
<style lang="less">
.searchType {
  overflow: hidden;
  .el-input__inner {
    border: 0 none !important;
    height: 33px !important;
    font-size: 12px !important;
    line-height: 33px !important;
    padding-right: 15px !important;
  }
  .el-input .el-input__suffix {
    top: 3px !important;
  }
  .is-focus .el-input__suffix {
    top: -3px !important;
  }
}
// .el-dropdown-menu {
//   margin: 0 !important;
//   padding: 10px 0 0 0 !important;
// }
</style>
