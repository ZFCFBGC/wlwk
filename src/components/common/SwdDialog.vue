<template>
  <el-dialog class="swd-dialog" :visible.sync="dlgVisible" :title="title" :before-close="cancel">
    <div class="custom-dialog">
      <div><span>{{$t('localization.FlowSuperposition')}}</span><el-input v-model="customData"></el-input>MB</div>
      <div>{{$t('localization.PayAmount')}}：<span style="color: #fb7823;"></span>{{$t('localization.HYuan')}}</div>
    </div>

    <div class="btn-center" v-if="btn === 'center'">
      <el-button type="primary"  @click="handleConfirm">{{$t('localization.Confirm')}}</el-button>
    </div>
    <div class="btn-center" v-if="btn === 'right'">
      <el-button type="primary">{{$t('localization.Confirm')}}</el-button>
      <el-button>{{$t('localization.Confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    title: String,
    visible: Boolean,
    btn: String,
  },
  components: {},
  data() {
    //这里存放数据
    return {
      customData:0,
      dlgVisible:true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleConfirm(){
      this.$emit('confirm', this.customData)
      this.dlgVisible=false
    },
    cancel(){
      this.$emit('dialog-cancel')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
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
.swd-dialog {
  border-radius: 8px;
  padding: 24px;
  /deep/.el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      .el-dialog__title {
        font-size: 13px;
        font-weight: 400;
        color: rgba(24, 38, 60, 1);
      }
    }
    .el-dialog__body {
      padding-top: 0;
      .custom-dialog {
        div {
          font-size: 13px;
          padding-top: 10px;
          .el-input{
              width:30%;
              margin:0 10px;
            .el-input__inner{
              line-height: 32px;
              display: inline-block;
              height:32px
            }
          }
        }
      }
    }
  }
  .btn-center {
    text-align: center;
    /deep/.el-button {
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 3px;
      line-height: 32px;
      font-size: 13px;
      padding: 0 25px;
    }
  }
}
</style>
