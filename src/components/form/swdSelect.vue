<template>
  <div class="swdSelect">
    <div class="swdSelectList" :style="'width:' + width + 'px'">
      <el-select
        v-model="val"
        :placeholder="placeholder"
        @change="onChangeMember"
      >
        <el-option
          v-for="item in creationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click.native="getPackageInfo(item)"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    },
    value: {
      default: ""
    },
    width: {
      type: Number,
      default: 364
    }
  },
  data() {
    return {
      //套餐数组
      creationOptions: [],
      val: null
    };
  },
  watch: {
    params: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.params = newVal;
        this.goPackage();
      },
      deep: true
    },
    options: {
      handler(newVal, oldVal) {
        this.creationOptions = newVal;
      },
      deep: true
    }
  },
  created() {
    console.log(this.options);
    this.val =
      this.value === undefined || this.value === null ? "" : this.value + "";
    if (Array.isArray(this.options)&&this.options.length>0) {
      this.creationOptions = this.options;
    } else {
      this.goPackage();
    }
  },
  methods: {
    // 核心代码
    onChangeMember(v) {
      if (this.val) {
        this.selected = this.creationOptions.find(item => {
          return item.value === this.val;
        });
      } else {
        this.selected = {};
      }
      this.$emit("input", this.val, this.selected);
      this.$emit("change", this.val, this.selected);
    },
    getPackageInfo(info) {
      this.$emit("getPackageInfo", info);
    },
    //获取套餐列表
    goPackage() {
      if (this.params&&this.params.url) {
        this.$client.get(this.params.url, this.params.params).then(res => {
          if (res.code == 200) {
            this.creationOptions = res.data || [];
            this.creationOptions.map(item => {
              item.label = item.packName;
              item.value = item.packID;
              return;
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.swdSelect {
  /deep/.swdSelectList {
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      width: 100%;
      height: 32px;
      line-height: 32px;
    }
    .el-input .el-input__suffix {
      top: 3px;
    }
    .is-focus .el-input__suffix {
      top: -3px;
    }
  }
}
</style>
