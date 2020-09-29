<template>
  <div class="swdTextarea" :style="'width:'+width+'px'">
    <div class="swdTextareaList" :style="'width:'+width+'px'">
      <el-input
       type="textarea"
        v-model="val"
        :placeholder="placeholder"
        @input="sendInputVal"
        @focus="focusHandler"
        @blur="onblur"
        @keyup="onKeyUp"
      >
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
    value: {
      default: ""
    },
    width:{
      default:'364'
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.val = newVal;
      }
    }
  },
  data() {
    return {
      //套餐数组
      val: null
    };
  },
  created() {},
  methods: {
    // 核心代码
    sendInputVal() {
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
.swdTextarea {
  //width: 364px;
  /deep/.swdTextareaList {
    //width: 364px;
    .el-textarea__inner {
      width: 100%;
      height: 32px;
      line-height: 30px;
      min-height:32px !important;
      box-sizing: border-box;
      padding:0 15px;
    }
  }
}
</style>