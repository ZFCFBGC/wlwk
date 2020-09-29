<template>
  <div class="search-header">
    <el-form
      :inline="true"
      :model="formData"
      ref="formRef"
      class="form--label-left"
      label-width="180px"
    >
      <div class="clearfix">
        <div
          class="formData fl"
          v-for="(item, idx) in searchConfig.form"
          :key="idx"
        >
          <el-form-item
            label=""
            :prop="item.key"
            class="search-header-item"
            :rules="item.rules"
          >
            <!-- 输入框 -->
            <template v-if="item.type === 'input'">
              <div class="formInput clearfix">
                <div class="title fl">{{ item.label }}</div>
                <div class="input fl">
                  <el-input
                    v-model="formData[item.key]"
                    :placeholder="item.placeholder"
                    :size="item.size || 'mini'"
                  />
                </div>
              </div>
            </template>
            <!-- 下拉框1 -->
            <template v-else-if="item.type === 'select'">
              <div class="formInput clearfix">
                <div class="title fl" v-if="item.label">{{ item.label }}</div>
                <div class="input fl">
                  <el-select
                    v-model="formData[item.key]"
                    :placeholder="item.placeholder"
                    :size="item.size || 'mini'"
                    clearable
                  >
                    <el-option
                      v-for="(option, idx) in item.options"
                      :key="idx"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </div>
              </div>
            </template>
            <!-- 下拉框2 -->
            <template v-else-if="item.type === 'selectT'">
              <div class="clearfix">
                <div class="formInput clearfix fl">
                  <div class="title fl">{{ item.label }}</div>
                  <div class="input fl">
                    <el-select
                      v-model="formData[item.key]"
                      :placeholder="item.placeholder"
                      :size="item.size || 'mini'"
                      clearable
                    >
                      <el-option
                        v-for="(option, idx) in creationOptions"
                        :key="idx"
                        :value="option.value"
                        :label="option.label"
                        @click.native="getPackageInfo(option)"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="formInput clearfix fl" v-if="item.label1">
                  <div class="title fl">{{ item.label1 }}</div>
                  <div class="input fl">
                    <el-select
                      v-model="packageType"
                      :placeholder="item.placeholder1"
                      :size="item.size || 'mini'"
                      @change="getStatus"
                    >
                      <el-option
                        v-for="(option, idx) in options"
                        :key="idx"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </div>
                </div>
              </div>
            </template>
            <!-- 日期选择器 -->
            <template v-else-if="item.type === 'datePicker'">
              <div class="formTime clearfix">
                <div class="title fl">{{ item.label }}</div>
                <div class="input fl">
                  <el-date-picker
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    :type="item.config.type"
                    v-model="formData[item.key]"
                    :placeholder="item.config.placeholder"
                    :range-separator="item.config.rangeSeparator"
                    :start-placeholder="item.config.startPlaceholder"
                    :end-placeholder="item.config.endPlaceholder"
                    :size="item.size || 'medium'"
                  />
                </div>
              </div>
            </template>
            <template v-else-if="item.type === 'dateTimePicker'">
              <div class="formDateTime clearfix">
                <div class="title fl" v-if="item.label">{{ item.label }}</div>
                <div class="input fl">
                  <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="el-icon-date"
                    :type="item.config.type"
                    v-model="formData[item.key]"
                    :placeholder="item.config.placeholder"
                    :range-separator="item.config.rangeSeparator"
                    :start-placeholder="item.config.startPlaceholder"
                    :end-placeholder="item.config.endPlaceholder"
                    :size="item.size || 'medium'"
                  />
                </div>
              </div>
            </template>
            <!-- 树形选择器 -->
            <template v-else-if="item.type === 'tree'">
              <div class="formTree clearfix">
                <div class="title fl">{{ item.label }}</div>
                <div class="input fl">
                  <el-input
                    v-model="formData[item.key]"
                    :placeholder="item.placeholder"
                    :size="item.size || 'mini'"
                  >
                    <i
                      slot="suffix"
                      class="el-input__icon el-icon-caret-bottom"
                      @click="goClient"
                    ></i>
                  </el-input>
                </div>
                <div class="clientInfo" v-if="isClient">
                  <user-tree @getNode="getNode"></user-tree>
                </div>
              </div>
            </template>
            <!-- 选择框 -->
            <template v-else-if="item.type === 'checkBox'">
              <div class="formCheckBox clearfix">
                <el-checkbox v-model="formData[item.key]">
                  {{ item.label }}</el-checkbox
                >
              </div>
            </template>
            <!-- 下拉框2 -->
            <template v-else-if="item.type === 'selectTwo'">
              <div class="formSelectTwo clearfix">
                <el-select
                  v-model="formData[item.key]"
                  :placeholder="item.placeholder"
                  :size="item.size || 'mini'"
                  clearable
                >
                  <el-option
                    v-for="(option, idx) in item.options"
                    :key="idx"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </div>
            </template>
            <!-- 输入框2 -->
            <template v-else-if="item.type === 'inputTwo'">
              <div class="formInputTwo clearfix">
                <el-input
                  v-model="formData[item.key]"
                  :placeholder="item.placeholder"
                  :size="item.size || 'mini'"
                />
              </div>
            </template>
          </el-form-item>
        </div>
        <!-- 按钮 -->
        <div class="btn-arr fl">
          <el-button type="primary" @click="emitSearch">{{$t('localization.Query')}}</el-button>
          <!-- <el-button @click="emitReset" v-if="false">重置</el-button> -->
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import userTree from "../common/userTree.vue";
export default {
  components: {
    userTree
  },
  name: "searchPanel",
  props: {
    //查询配置项
    searchConfig: Object,
    default: {}
  },
  data() {
    return {
      formData: {}, // 表单参数
      creationOptions: [],
      isClient: false,
      packageType: null, //套餐状态联动
      options: [
        {
          value: null,
          label: this.$t('localization.All')
        },
        {
          value: "0",
          label: this.$t('localization.MonthlyCard')
        },
        {
          value: "1",
          label: this.$t('localization.AnnualCard')
        },
        {
          value: "2",
          label: this.$t('localization.GeneralVoice')
        }
      ]
    };
  },
  created() {
    this.goPackage();
  },
  methods: {
    // 初始化数据
    initFormData() {
      let [...dataArr] = this.searchConfig.form || [];
      let obj = {};
      dataArr.forEach(item => {
        obj[item.key] = item.value || null;
      });
      this.formData = Object.assign({}, obj);
    },
    goClient() {
      this.isClient = !this.isClient;
    },
    //获取套餐列表
    goPackage() {
      var url = "/package/queryPackageNameByUserId.do";
      this.$client.get(url).then(res => {
        if (res.code == 200) {
          this.creationOptions = res.data || [];
          this.creationOptions.map(item => {
            item.label = item.packName;
            item.value = item.packID;
            return;
          });
          this.initFormData();
        } else {
          this.initFormData();
        }
      });
    },
    //客户选择触发
    getNode(obj) {
      this.formData.package = obj.multipleSelection.nickname;
      this.formData.userId = obj.multipleSelection.userId;
      this.isClient = false;
    },
    //套餐名称点击事件
    getPackageInfo(info) {
      this.packageType = info.packType + "";
      this.formData.packageType = info.packType + "";
    },
    // 套餐类型值改变事件
    getStatus(e) {
      this.formData.packageType = e + "";
    },
    // 查询
    emitSearch() {
      this.$emit("search", Object.assign({}, this.formData));
    },
    // 清空
    emitReset() {
      this.initFormData();
      this.$refs.formRef && this.$refs.formRef.resetFields();
      this.$emit("reset", Object.assign({}, this.formData));
    }
  }
};
</script>
<style lang="less">
.search-header {
  //background:#f40;
  /deep/.formData {
    .el-form-item {
      margin: 0;
    }
  }
  /deep/.formInput {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 224, 227, 1);
    margin-right: 12px;
    border-radius: 3px;
    .title {
      padding-left: 10px;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      color: #666;
    }
    .input {
      height: 32px;
      .el-input,
      .el-select {
        height: 32px;
        display: block;
      }
      .el-input__inner {
        width: 122px;
        height: 32px;
        line-height: 32px;
        border: 0 none;
        display: block;
      }
      .el-input .el-input__suffix {
        top: -4px;
      }
      .is-focus .el-input__suffix {
        top: -4px;
      }
    }
  }
  /deep/.formInputTwo {
    width: 193px;
    margin-right: 12px;
    height: 32px;
    .el-input,
    .el-select {
      height: 32px;
      display: block;
    }
    .el-input__inner {
      width: 100%;
      height: 32px;
      line-height: 32px;
      display: block;
    }
  }
  /deep/.formSelectTwo {
    margin-right: 12px;
    height: 32px;
    width: 90px;
    .el-input,
    .el-select {
      height: 32px;
      display: block;
    }
    .el-input__inner {
      width: 100%;
      height: 32px;
      line-height: 32px;
      // border: 0 none;
      display: block;
    }
    .el-input .el-input__suffix {
      top: -4px;
    }
    .is-focus .el-input__suffix {
      top: -4px;
    }
  }
  .formTime{
  }
  .formDateTime{
    width:312px;
  }
  /deep/.formTime, .formDateTime{
    margin-right: 12px;
    background: #e1ecfe;
    border-radius: 3px;
    .title {
      padding-left: 10px;
      height: 34px;
      line-height: 34px;
      font-size: 13px;
      color: #627fcb;
    }
    .input {
      height: 34px;
      .el-input__inner {
        border: 0 none;
        height: 34px;
        width: 204px;
        line-height: 34px;
        background: #e1ecfe;
        &.el-date-editor--datetimerange{
          width:312px;
        }
      }
      .el-range-editor.el-input__inner {
        height: 34px;
        display: block;
        display: flex;
        background: #e1ecfe;
        .el-range-input {
          background: #e1ecfe;
          &::placeholder {
            color: #627fcb;
          }
        }
        .el-range__icon {
          position: absolute;
          right: 7px;
          color: #627fcb;
        }
        .el-icon-date {
          &::before {
          }
        }
      }
      .el-date-editor .el-range-input {
        height: 34px;
        display: block;
        font-size: 12px;
      }
      .el-date-editor .el-range__icon {
        line-height: 28px;
      }
      .el-date-editor .el-range-separator {
        line-height: 28px;
        color: #999;
      }
    }
  }
  .formTree {
    position: relative;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 224, 227, 1);
    border-radius: 3px;
    margin-right: 12px;
    .title {
      padding-left: 10px;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      color: #666;
    }
    /deep/.input {
      .el-input,
      .el-select {
        height: 32px;
        display: block;
      }
      .el-input__inner {
        width: 148px;
        height: 32px;
        line-height: 32px;
        border: 0 none;
        display: block;
      }
      .el-input__prefix,
      .el-input__suffix {
        top: -4px;
      }
    }
    .clientInfo {
      position: absolute;
      width: 100%;
      height: 200px;
      left: 0;
      top: 33px;
      overflow-y: auto;
      z-index: 1000000;
      background: #fff;
    }
  }
  /deep/.formCheckBox {
    padding:0 10px;
    margin-right: 12px;
    height: 32px;
    background: #E1EAFF;
    border-radius: 16px;
    line-height: 32px;
    text-align: center;
    .el-checkbox__label {
      color: #999;
    }
    .el-checkbox__inner {
      border-radius: 50%;
    }
  }
  /deep/.btn-arr {
    height: 34px;
    .el-button {
      padding: 8px 16px;
      height: 100%;
      background: rgba(51, 112, 255, 1);
      border-radius: 4px;
      border: 0;
      font-size: 13px;
    }
  }
}
</style>
