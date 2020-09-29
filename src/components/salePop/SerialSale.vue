<!--  -->
<template>
  <div class="serial-sale" v-if="show">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">{{$t('localization.HConsecutiveSell')}}</div>
        <div class="close" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <div class="card-no">
          <el-input v-model="beginCard"
            ><template slot="prepend">开始卡号：</template></el-input
          >
          <el-input v-model="endCard"
            ><template slot="prepend">结束卡号：</template></el-input
          >
        </div>
      </div>
      <div class="btn-center">
        <el-button type="primary" @click="confirm">{{$t('localization.Confirm')}}</el-button>
        <el-button>{{$t('localization.Cancel')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: {
    show: false
  },
  data() {
    //这里存放数据
    return {
      beginCard: null,
      endCard: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
      this.beginCard=null
      this.endCard=null
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.serial-sale {
  .dialog {
    width: 440px;
    .content {
      /deep/.card-no {
        .el-input {
          display: flex-inline;
          width: 178px;
          position: relative;
          color: #555555;
          .el-input-group__prepend {
            background-color: #fff;
            font-size: 13px;
            border: 0;
            padding: 5px;
            border-radius: 3px 0 0 3px;
            border:1px solid rgba(222, 224, 227, 1);
            border-right:0;
          }
          .el-input__inner {
            height: 32px;
            border-radius: 0 3px 3px 0;
            border:1px solid rgba(222, 224, 227, 1);
            border-left:0;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
