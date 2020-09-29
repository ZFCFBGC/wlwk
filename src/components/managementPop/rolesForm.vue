<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl pointer">新增账号</div>
        <div class="close fr pointer" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="cont">
        <!-- <swd-input v-model="name"></swd-input> -->
        <!-- <swd-radio v-model="gqg" label="3">单选</swd-radio> -->
        <!-- <swd-checkbox name="gqg" v-model="gqg">多选</swd-checkbox> -->
        <!-- <swd-checkbox-group v-model="checkedArr">
          <swd-checkbox
            v-for="(item, index) in checkboxText"
            :key="index"
            :label="item"
            >{{ item }}</swd-checkbox
          >
        </swd-checkbox-group>
        <swd-select v-model="professional" :options="options">
        </swd-select> -->
        <swd-form :rules="validateRules" :modes="validateModes" ref="form">
          <!-- <form-item label=this.$t('localization.Name1') prop="name">
            <swd-input name="name" v-model="validateModes.name" />
          </form-item> -->
          <!-- <form-item label="邮箱" prop="email">
            <swd-input name="email" v-model="validateModes.email" />
          </form-item> -->
          <form-item label="专业" prop="professional">
              <swd-select
                v-model="validateModes.professional"
                :options="options"
              >
              </swd-select>
          </form-item>
          <button type="button" class="submit_btn" @click="handleSubmit">
            表单验证
          </button>
        </swd-form>
      </div>
      <!-- <div class="gqg" @click="goClick">股权哦</div> -->
    </div>
  </div>
</template>
<script>
import swdInput from "../base/input/input";
import swdRadio from "../base/radio/radio";
import swdCheckbox from "../base/checkbox/checkbox";
import swdCheckboxGroup from "../base/checkbox/checkbox-group";
import swdSelect from "../base/select/select";
import swdForm from "../base/form/form";
import FormItem from "../base/form-item/form-item";
import { loginRules } from "@/utils/validateRules";
export default {
  components: {
    swdInput,
    swdRadio,
    swdCheckbox,
    swdCheckboxGroup,
    swdSelect,
    swdForm,
    FormItem
  },
  data() {
    return {
      validateRules: loginRules,
      validateModes: {
        name: "",
        email: "",
        sex: "",
        checkedArr: [],
        own: false,
        professional: ""
      },
      name: "",
      gqg: false,
      checkedArr: [],
      checkboxText: ["电影", "跑步", "运动", "逛街", "看书"],
      professional: "111",
      options: [
        {
          value: "111",
          label: "自动化",
          disabled: false
        },
        {
          value: "222",
          label: "计算机",
          disabled: false
        },
        {
          value: "333",
          label: "信息安全",
          disabled: false
        },
        {
          value: "444",
          label: "幼师",
          disabled: false
        }
      ]
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("handleIsPop");
    },
    goClick() {
    },
    handleSubmit() {
      this.$refs.form.validateAll().then(valid => {
        if (valid) {
          alert("验证通过");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.popUp {
  .mask {
    position: fixed;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 830px;
    height: 464px;
    background: #fff;
    border-radius: 8px;
    padding-left: 31px;
    padding-right: 31px;
    box-sizing: border-box;
    z-index: 1001;
    transform: translate(-50%, -50%);
    .header {
      height: 69px;
      line-height: 69px;
      .title {
        font-size: 14px;
        color: #333333;
        font-family: Microsoft YaHei;
      }
      .close {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
