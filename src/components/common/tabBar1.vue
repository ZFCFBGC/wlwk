<template>
  <!-- <keep-alive> -->
  <div class="tabBar">
    <!-- <el-popover placement="right-end" width="150" trigger="click">
      <div class="homeList">
        <div><span class="list">首页</span></div>
      </div>
       <div class="home" slot="reference"><i class="el-icon-house"></i></div>
    </el-popover> -->
    <div class="home" :class="active == '1' ? 'active' : ''">
      <i class="el-icon-house"></i>
      <div class="homeList">
        <div><span class="list">首页</span></div>
      </div>
    </div>
    <div class="SIMMagage" :class="active == '2' ? 'active' : ''">
      <i class="el-icon-mobile"></i>
      <div class="SIMList">
        <div class="list"><span>套餐管理</span></div>
        <div class="list"><span>代理套餐管理</span></div>
        <div class="list"><span>SIM卡销售</span></div>
        <div class="list"><span>SIM卡状态刷新</span></div>
      </div>
    </div>
    <div class="clientManage" :class="active == '3' ? 'active' : ''">
      <i class="el-icon-water-cup"></i>
      <div class="clientList">
        <div class="list"><span>客户管理</span></div>
      </div>
    </div>
    <div class="financeManage" :class="active == '4' ? 'active' : ''">
      <i class="el-icon-refrigerator"></i>
      <div class="financeList">
        <div class="list"><span>{{$t('localization.AccountBalance')}}</span></div>
        <div class="list"><span>SIM卡充值记录</span></div>
        <div class="list"><span>返利记录</span></div>
      </div>
    </div>
    <div class="statistics" :class="active == '5' ? 'active' : ''">
      <i class="el-icon-coffee"></i>
      <div class="statisticsList">
        <div class="list"><span>流量统计</span></div>
        <div class="list"><span>短信统计</span></div>
        <div class="list"><span>停开机统计</span></div>
        <div class="list"><span>价格变动统计</span></div>
      </div>
    </div>
    <div class="management" :class="active == '6' ? 'active' : ''">
      <i class="el-icon-ice-tea"></i>
      <div class="managementList">
        <div class="list"><span>角色权限</span></div>
        <div class="list"><span>账号管理</span></div>
        <div class="list"><span>操作日志</span></div>
      </div>
    </div>
  </div>
  <!-- </keep-alive> -->
</template>
<script>
export default {
  name: "tabBar",
  props: {
    className: String
  },
  data() {
    return {
      active: "1",
      isCollapse: false
    };
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    goPath(index, indexPath) {
      var that = this;
      this.$cookie.set(
        "active",
        index //
      );
    }
  }
};
</script>
<style lang="less" scoped>
.tabBar {
  .home {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .SIMMagage {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .clientManage {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .financeManage {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .statistics {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .management {
    position: relative;
    height: 17px;
    width: 15px;
    padding: 15px 16px 15px 16px;
  }
  .active {
    background: #409eff;
  }
  .homeList {
    background: orangered;
    position: fixed;
    width:100px;
    height:100px;
    top:70px;
    left:47px;
    z-index:999;
  }
}
</style>