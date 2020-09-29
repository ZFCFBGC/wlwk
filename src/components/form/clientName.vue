<template>
  <div class="client">
    <div class="client-input" :style="'width:' + width + 'px'">
      <el-input
        v-model="val"
        :placeholder="placeholder"
        @input="sendInputVal"
        @focus="focusHandler"
        @blur="onblur"
        @keyup="onKeyUp"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-caret-bottom"
          @click="goClient"
        ></i>
      </el-input>
    </div>
    <div class="client-info" v-if="isClient" :style="'width:' + width + 'px'">
      <user-tree @getNode="getNode" :root="root"></user-tree>
    </div>
  </div>
</template>
<script>
import userTree from "../common/userTree.vue";
export default {
  components: {
    userTree
  },
  props: {
    placeholder: {
      type: String
    },
    width: {
      type: Number,
      default: 364
    },
    value: {
      default: ""
    },
    root:null
  },
  data() {
    return {
      isClient: false,
      val: null
    };
  },
  created() {
    this.val =
      this.value === undefined || this.value === null ? "" : this.value;
  },
  methods: {
    //客户选择触发
    getNode(obj) {
      this.val = obj.multipleSelection.nickname;
      this.userId = obj.multipleSelection.userId;
      this.isClient = false;
      this.$emit("nodeChange", obj.multipleSelection);
    },
    goClient() {
      this.isClient = !this.isClient;
    },
    sendInputVal() {
      this.$emit("input", this.val);
    },
    focusHandler(e) {
      this.$emit("focus", this.val);
      this.isFocus = true;
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
.client {
  position: relative;
  /deep/.client-input {
    .el-input__icon{
      height:32px;
      line-height: 32px;
      cursor: pointer;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      width: 100%;
      font-size: 13px;
      padding-left: 8px;
    }
    .el-input__prefix,
    .el-input__suffix {
        height:32px;
    }
  }
  .client-info {
    position: absolute;
    // width: 360px;
    height: 200px;
    left: 0;
    top: 33px;
    overflow-y: auto;
    z-index: 1000000;
    background: #fff;
  }
}
</style>
