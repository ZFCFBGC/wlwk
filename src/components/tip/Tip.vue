<template>
  <div class="swd-tip" :style="{color:color, 'border-color':color}">
    <el-popover
    placement="right"
    trigger="hover"
    popper-class="swd-popper"
    :visible-arrow="false"
    :content="content">
    <span slot="reference">?</span>
  </el-popover>
  </div>
</template>

<script>

export default {
  props:{
    content:String,
    color:{type:String, default:'#fff'}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.swd-tip {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid rgba(255, 255, 255, 1);
  opacity: 0.7;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 14px;
  line-height: 15px;
}
</style>
