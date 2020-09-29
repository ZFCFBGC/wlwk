<template>
  <div class="crumbs clearfix">
    <div class="fl crumbs_l">{{ title }}</div>
    <div class="fr crumbs_r clearfix">
      <div class="fl">当前位置：</div>
      <div class="fr">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in items" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.crumbs {
  //height: 40px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  .crumbs_l{
    margin-top:11px;
    height:29px;
    font-size:18px;
    color:#333;
  }
  .crumbs_r{
    margin-top:14px;
    font-size:14px;
  }
}
</style>
