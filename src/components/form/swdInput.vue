<template>
  <div class="swdInput">
    <div class="swdInputList" :style="'width:' + width + 'px'">
      <el-input
        v-model="val"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="sendInputVal"
        @focus="focusHandler"
        @blur="onblur"
        @keyup="onKeyUp"
      >
        <i slot="suffix" :class="iconClass" v-if="icon"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    icon: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      default: ""
    },
    width: {
      type: Number,
      default: 364
    },
    maxlength: {
      type: Number,
      default: null
    },
    setWarnVal: Function,
  },
  watch: {
    value(newVal, oldVal) {
      // if (newVal !== oldVal) {
        this.val = newVal;
      // }
    }
  },
  data() {
    return {
      //套餐数组
      val: null
    };
  },
  created() {
    this.val =
      this.value === undefined || this.value === null ? "" : this.value;
  },
  methods: {
    // 核心代码
    sendInputVal() {
      //this.val = this.value
      this.$emit("input", this.val);
    },
    focusHandler(e) {
      this.$emit("focus", this.val);
    },
    onblur(e) {
      this.$emit("blur", this.val);
    },
    onKeyUp(e) {
      if (e.key === "Enter") {
        e.target.blur();
        this.$emit("confirm", this.val, e);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.swdInput {
  /deep/.swdInputList {
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
