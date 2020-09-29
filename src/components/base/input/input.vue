<template>
  <div class="swdInputList" :style="'width:' + width + 'px'">
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="currentValue"
      @blur="inputBlur"
      @input="inputChange"
    />
  </div>
</template>
<script>
import Emitter from "@/mixins/emitter";
export default {
  mixins: [Emitter],
  name: "swd-input",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    width: {
      type: Number,
      default: 364
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  mounted() {},
  methods: {
    inputBlur() {
      this.dispatch("form-item", "on-input-blur", this.currentValue);
    },
    inputChange(e) {
      this.currentValue = e.target.value;
      this.$emit("input", this.currentValue);
    }
  }
};
</script>
<style lang="less" scoped>
input {
  border: 1px solid #dedede;
  border-radius: 4px;
  outline: none;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  text-shadow: none;
  -webkit-text-fill-color: initial;
  color: #eee;
}
</style>
