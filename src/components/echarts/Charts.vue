<template>
  <div :class="className" :id="id" :style="styles"></div>
</template>
<script>
import echarts from "./echarts.js";
export default {
  name: "echarts",
  props: {
    className: String,
    id: String,
    styles: {
      type: Object,
      default: {
        height: "300px",
        width: "300px"
      }
    },
    items: {
      type: Object
    }
  },
  watch: {
    styles: {
      handler(newVal, oldVal) {
        this.styles = newVal;
      },
      immediate: true,
      deep: true
    },
    items: {
      handler(newVal, oldVal) {
        this.items = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      timeName: null
    };
  },
  mounted() {
    var that = this;
    //使用定时器避免接收不到数据
    that.timeName = setTimeout(() => {
      const myChart = echarts.init(document.getElementById(that.id));
      let options = that.items;
      myChart.setOption(options);
    }, 0);
  },
  beforeDestroy() {
    //清楚定时器
    clearInterval(this.timeName);
  }
};
</script>
