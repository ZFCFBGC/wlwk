<template>
  <!-- <keep-alive> -->
  <div class="tabBar">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="goPath"
      :collapse="isCollapse"
      :default-openeds="openeds"
      background-color="#1F3058"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="Home">
        <i class="el-icon-menu"></i>
        <span slot="title"> {{ this.$t("localization.Home") }}</span>
      </el-menu-item>
      <el-submenu index="PhoneCard">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{$t('localization.SimCardManage')}}</span>
        </template>
        <el-menu-item index="PhoneCardMan">{{$t('localization.HPackageManage')}}</el-menu-item>
        <el-menu-item index="PhoneCardPre">代理套餐价格管理</el-menu-item>
        <el-menu-item index="PhoneCardSal">卡导入</el-menu-item>
        <el-menu-item index="PhoneCardRef">卡刷新</el-menu-item>
        <el-menu-item index="FlowPool">流量池</el-menu-item>
      </el-submenu>
      <el-menu-item index="Manage">
        <i class="el-icon-menu"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>
      <el-submenu index="Finance">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">{{$t('localization.FinancialManage')}}</span>
        </template>
        <el-menu-item index="Account" v-if="false">{{$t('localization.AccountBalance')}}</el-menu-item>
        <el-menu-item index="AgentAccount">{{$t('localization.AccountBalance')}}</el-menu-item>
        <el-menu-item index="RechargeRecord">{{$t('localization.SimChargeRecord')}}</el-menu-item>
        <el-menu-item index="RebateRecord">{{$t('localization.RebateRecord')}}</el-menu-item>
      </el-submenu>
      <el-submenu index="Statement">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('localization.ReportStat')}}</span>
        </template>
        <el-menu-item index="StatementFlow">{{$t('localization.FlowStatistics')}}</el-menu-item>
        <el-menu-item index="StatementNote">{{$t('localization.MsgStatistics')}}</el-menu-item>
        <el-menu-item index="StatementPull">{{$t('localization.StopStartStat')}}</el-menu-item>
        <el-menu-item index="StatementPre">价格变动统计</el-menu-item>
        <el-menu-item index="StatementCancel">销号统计</el-menu-item>
      </el-submenu>
      <el-submenu index="Management">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">账号权限</span>
        </template>
        <el-menu-item index="ManagementRol">{{$t('localization.RolePermission')}}</el-menu-item>
        <el-menu-item index="ManagementCard">{{$t('localization.AccountManage')}}</el-menu-item>
        <el-menu-item index="OperationLog">{{$t('localization.OperationLog')}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  <!-- </keep-alive> -->
</template>
<script>
export default {
  name: "tabBar",
  props: {
    className: String,
    isCollapse: {
      type: Boolean
    }
  },
  watch:{
    isCollapse(newVal,oldVal){
      this.openeds = ["PhoneCard", "Finance", "Statement", "Management"]
    },
  },
  data() {
    return {
      active: "home",
      openeds: ["PhoneCard", "Finance", "Statement", "Management"], //必须是这种写法
      publicPath: {
        Home: {path:"/index"},
        PhoneCardMan: {path:'/index/phoneCard/phoneCardMan'},
        PhoneCardPre: {path:'/index/phoneCard/phoneCardPre'},
        PhoneCardSal: {path:'/index/phoneCard/phoneCardSal'},
        PhoneCardRef: {path:'/index/phoneCard/phoneCardRef'},
        FlowPool:{path:'/index/phoneCard/flowPool'},
        Manage: {path:'/index/manage/manage'},
        Account: {path:'/index/financialManage/account'},
        AgentAccount:{path:'/index/financialManage/agentAccount'},
        RechargeRecord: {path:'/index/financialManage/rechargeRecord'},
        RebateRecord:{path:'/index/financialManage/rebateRecord'},
        StatementFlow: {path:"/index/reportForms/statementFlow"},
        StatementNote: {path:"/index/reportForms/statementNote"},
        StatementPull: {path:"/index/reportForms/statementPull"},
        StatementPre: {path:"/index/reportForms/statementPre"},
        StatementCancel: {path:"/index/reportForms/StatementCancel"},
        ManagementRol: {path:'/index/management/managementRol'},
        ManagementCard: {path:'/index/management/managementCard'},
        OperationLog: {path:'/index/management/operationLog'},
       
      }
    };
  },
  created() {
    this.active = this.$cookie.get("active") ? this.$cookie.get("active") : "Home";
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    goPath(index, indexPath) {
      var that = this;
      this.active=index
      this.$emit('getValue', index)
      if (that.publicPath[index].path) {
        that.$router.push({ path: that.publicPath[index].path ,query:{ type: that.publicPath[index].type }});
      } else {
        this.$message({
          message: "该功能暂未开放",
          center: true,
          type:'info',
          offset:300
        });
      }
    }
  }
};
</script>
<style lang="less">
.tabBar {
  .el-menu {
    border-right: 0 none !important;
  }
  .el-menu-item.is-active {
    background-color: #409eff !important;
    color: #ffffff !important;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 48px !important;
    line-height: 48px !important;
    font-size: 14px !important;
    padding-left: 10px !important;
  }
  .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
  .el-tooltip {
    padding: 0 10px !important;
  }
}
.el-menu--vertical .el-menu--popup {
  .is-active {
    color: #f60 !important;
  }
}
.el-menu--vertical{
  left:42px !important;
}
.el-tooltip__popper.is-dark{
   left:42px !important;
}
</style>
