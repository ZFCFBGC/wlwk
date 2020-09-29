<template>
  <div class="swdInput">
    <div class="swdInputList" :style="'width:'+width+'px'">
      <el-input
        @input="myInputC"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="currentValue"
        @focus="focusHandler"
        @blur="onblur"
        @keyup="onKeyUp"
        ref="input"
        size="mini"
      >
        <i slot="prefix" :class="iconClass" v-if="icon"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
import dataset from "@/api/dataset";
export default {
  name: "ccb-input",
  props: {
    value: [String, Number],
    name: String,
    type: {
      type: String,
      default: "text"
    },
    width:{
      type:Number,
      default:364
    },
    icon: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String,
      default: ""
    },
    password: Boolean,
    placeholder: String,
    disabled: Boolean,
    min: Number,
    onInput: Function,
    onFocus: Function,
    onBlur: Function,
    onConfirm: Function
  },
  data() {
    return {
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: "",
      isFocus: false,
      isOnce: true
    };
  },
  methods: {
    myInputC(e) {
      let data = e;
      this.$emit("input", data);
    },
    onSubm() {
      if (this.onSubmit) {
        let e = JSON.stringify({
          value: {
            name: "value"
          }
        });
        this.onSubmit(e);
      }
    },
    onRst() {
      this.onReset && this.onReset();
    },
    setfocus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    focusHandler(e) {
      var data = dataset.getData(e, "focus");
      data.detail = {
        value: this.currentValue
      };
      this.$emit("focus", data);
      this.isFocus = true;
    },
    onblur(e) {
      this.isFocus = false;
      var data = dataset.getData(e, "blur");
      data.detail = {
        value: this.currentValue
      };
      this.$emit("blur", data);
    },
    onKeyUp(e) {
      if (e.key === "Enter") {
        e.target.blur();
        let obj = {
          detail: {
            value: this.currentValue
          }
        };
        this.$emit("confirm", obj, e);
      }
    }
  },
  computed: {
    inputType() {
      return this.password ? "password" : this.type;
    }
  },
  deactivated() {
    this.$refs.input.value = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      this.currentValue = newVal;
    },
    currentValue(newVal, oldVal) {
      this.currentValue = newVal;
    },
    isOnce(newVal, oldVal) {
    }
  },
  created() {
    this.currentValue =
      this.value === undefined || this.value === null ? "" : this.value;
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
