<template>
  <label>
    <input
      type="radio"
      class="radio_type"
      :name="name"
      v-model="model"
      :value="currentValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <slot></slot>
  </label>
</template>
<script>
import Emitter from "@/mixins/emitter";
export default {
  mixins: [Emitter],
  name: "swd-radio",
  props: {
    name: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.label,
      model: this.value
    };
  },
  methods: {
    handleChange(e) {
      const val = e.target.value;
      this.model = val;
      this.$emit("input", val);
      this.dispatch("form-item", "on-form-change", val);
    },
    //  chcekRadio ($event) {
    //   let that = this;
    //   window.setTimeout(() => {
    //     if (!!this.model && this.model == $event.target.value) {
    //       $event.target.checked = false
    //       that.model = ''
    //     }else{
    //        $event.target.checked = true
    //         that.model = $event.target.value
    //     }
    //   }, 0);
    // },
  }
};
</script>
<style lang="less" scoped>
label {
  height: 16px;
  display: inline-block;
  color: #666;
  line-height:16px;
  font-size:14px;
}
.radio_type {
  width: 16px;
  height: 16px;
  appearance: none;
  position: relative;
}
.radio_type:before {
  content: "";
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.radio_type:checked:before {
  content: "";
  width: 14px;
  height: 14px;
  border: 1px solid #409eff;
  background: #409eff;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.radio_type:checked:after {
  content: "";
  width: 5px;
  height: 5px;
  display: block;
  position: absolute;
  background:#fff;
  border-radius: 50%;
  top: 51%;
  left: 50%;
  transform:translate(-50%,-50%)
}
.radio_type:checked + label {
  color: #c59c5a;
}
</style>
