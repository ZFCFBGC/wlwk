<template>
  <div class="swd_checkbox">
    <label :class="currentValue?'swd_label':''">
      <span>
        <input
          v-if="group"
          type="checkbox"
          :value="label"
          :disabled="disabled"
          v-model="model"
          @change="handleChange"
        />
        <input
          v-else
          type="checkbox"
          :disabled="disabled"
          :checked="currentValue"
          @change="handleChange"
        />
      </span>
      <slot></slot>
    </label>
  </div>
</template>
<script>
import Emitter from "@/mixins/emitter";
import { findComponentUpward } from "@/utils/assist";
export default {
  mixins: [Emitter],
  name: "swd-checkbox",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw new Error("Value should be trueValue or falseValue");
      }
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, "swd-checkbox-group");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    handleChange(e) {
      if (this.disabled) {
        return;
      }
      const checked = e.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        this.dispatch("form-item", "on-form-change", value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  }
};
</script>
<style lang="less" scoped>
.swd_checkbox {
  position: relative;
}
label {
  height: 16px;
  display: inline-block;
  color: #666;
  line-height:16px;
  font-size:14px;
}
.swd_label{
  color:#409eff;
}
input[type="checkbox"] {
  width: 14px;
  height: 14px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
input[type="checkbox"]:checked {
  background-color: #409eff;
  border-color: #409eff;
}
input[type="checkbox"]:checked:after {
  transform: rotate(45deg) scaleY(1);
  box-sizing: content-box;
  content: "";
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 5px;
  position: absolute;
  top: 4px;
  width: 3px;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}
</style>
