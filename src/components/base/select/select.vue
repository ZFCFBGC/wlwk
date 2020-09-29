<template>
  <div class="divSelect" :style="'width:' + width + 'px'">
    <div class="input">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="currentValue"
        @blur="inputBlur"
        @input="inputChange"
      />
      <span class="selectIcon">
        <i class="el-icon-arrow-down" v-if="!show"></i>
        <i class="el-icon-arrow-up" v-if="show"></i>
      </span>
      <div class="clickMask" @click="openValue"></div>
    </div>

    <div class="list" v-show="show && options.length > 0">
      <ul>
        <li
          @click="getvalue(index, item)"
          v-for="(item, index) in options"
          :key="item.index"
          :class="currentValue == item.label ? 'selected' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Emitter from "@/mixins/emitter";
export default {
  mixins: [Emitter],
  name: "swd-select",
  props: {
    value: {
      type: String
    },
    width: {
      type: Number,
      default: 364
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: "",
      show: false,
      id: null
    };
  },
  created() {
    if (this.value) {
      this.options.map(item => {
        if (this.value == item.value) {
          this.currentValue = item.label;
        }
      });
    } else {
      this.currentValue = "";
    }
  },
  methods: {
    openValue() {
      this.show = !this.show;
    },
    getvalue(index, item) {
      this.currentValue = item.label;
      this.id = item.value;
      this.show = false;
      this.$emit("input", this.id);
      this.dispatch("form-item", "on-form-change", this.id);
    },
    inputBlur () {
      this.dispatch('form-item', 'on-input-blur', this.currentValue)
    },
    inputChange (e) {
      //this.currentValue = e.target.value
      this.$emit('input', this.currentValue)
    }
  }
};
</script>
<style lang="less" scoped>
.divSelect {
  position: relative;
  ul li {
    list-style: none;
  }
  .input {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: relative;
    .clickMask {
      position: absolute;
      left: 0;
      top: 0px;
      height: 32px;
      background: rgba(255, 255, 255, 0);
      width: 100%;
    }
  }
  .input input {
    border: none;
    outline: none;
    width: 90%;
    color: #606266;
  }
  .input img {
    position: absolute;
    right: 34px;
    top: 48%;
  }
  .list {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 32px;
    z-index: 2001;
    background: #fff;
  }
  .list ul li {
    width: 100%;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
    font-size: 14px;
    color: #606266;
  }
  .list .selected {
    color: #409eff;
    font-weight: 700;
    font-size: 14px;
    // background: #f5f7fa;
  }
  .list ul li:hover {
    background-color: #f5f7fa;
  }
}
</style>
