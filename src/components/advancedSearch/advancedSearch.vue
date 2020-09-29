<template>
  <div class="swd-search">
    <div class="search-form">
      <div class="status">
        <div class="select">
          <div class="title">{{$t('localization.Package')}}：</div>
          <div class="input">
            <el-select
              v-model="packId"
              :placeholder="$t('localization.SelectPlaceholder')"
              size="mini"
              clearable
            >
              <el-option
                v-for="(option, i) in options1"
                :key="i"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </div>
        </div>
        <div class="select">
          <div class="title">{{$t('localization.Status')}}：</div>
          <div class="input">
            <el-select
              v-model="packStatus"
              :placeholder="$t('localization.SelectPlaceholder')"
              size="mini"
              clearable
            >
              <el-option
                v-for="(option, idx) in options2"
                :key="idx"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="date">
        <div class="date-range">
          <div class="title">{{$t('localization.ActivationTime')}}：</div>
          <el-date-picker
            :editable="false"
            v-model="activeTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="～"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="date-range">
          <div class="title">{{$t('localization.ExpirationDate')}}：</div>
          <el-date-picker
            :editable="false"
            v-model="expireTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="～"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="date-range">
          <div class="title">{{$t('localization.SearchByMonth')}}：</div>
          <el-date-picker
            :editable="false"
            v-model="MonthTime"
            value-format="yyyy-MM"
            type="monthrange"
            range-separator="～"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="NO-range">
        <div class="range-label">连号查询:</div>
        <div class="NO-input">
          <div class="title">开始卡号:</div>
          <el-input v-model="startNum" placeholder="请输入"></el-input>
        </div>
        <div class="NO-input">
          <div class="title">结束卡号:</div>
          <el-input v-model="endNum" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="data-range-wrapper">
        <div class="range-label">按流量使用范围查询:</div>
        <div class="data-range">
          <div class="data-input">
            <el-input v-model="startFlow" placeholder="请输入"></el-input>&nbsp;M
          </div>
          <div class="separator">{{$t('localization.Data')}}</div>
          <div class="data-input">
            <el-input v-model="endFlow" placeholder="请输入"></el-input>&nbsp;M
          </div>
        </div>
      </div>
      </div>
    <div class="searchList clearfix">
      <div class="fl">
        <div class="formCheckBox clearfix">
          <el-checkbox v-model="isHaveChild">{{$t('localization.IncludeSub')}}</el-checkbox>
        </div>
      </div>
    </div>
    <div class="searchList clearfix">
      <div class="search fl" @click="getSearch">{{$t('localization.Query')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHaveChild: false,
      startNum: "",
      endNum: "",
      startFlow: "",
      endFlow: "",
      activeTime: null,
      expireTime: null,
      MonthTime: null,
      packId: null,
      isBatch:null,
      options1: [],
      packStatus: null,
      options2: [
        {
          value: null,
          label: this.$t('localization.All')
        },
        {
          value: "0",
          label: this.$t('localization.Normal')
        },
        {
          value: "1",
          label: this.$t('localization.Stop')
        },
        {
          value: "2",
          label: this.$t('localization.UNN')
        }
      ]
    };
  },
  created() {
    this.goPackage();
  },
  methods: {
    //获取套餐列表
    goPackage() {
      var url = "/package/queryPackageNameByUserId.do";
      this.$client.get(url).then(res => {
        if (res.code == 200) {
          this.options1 = res.data || [];
          this.options1.map(item => {
            item.label = item.packName;
            item.value = item.packID;
            return;
          });
        }
      });
    },
    getSearch() {
      this.$emit("confirm", {
        isHaveChild: this.isHaveChild,
        startNum: this.startNum,
        endNum: this.endNum,
        startFlow: this.startFlow,
        endFlow: this.endFlow,
        activeTime: this.activeTime,
        expireTime: this.expireTime,
        MonthTime: this.MonthTime,
        packId: this.packId,
        packStatus: this.packStatus
      });
    },
    getPackUp() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.swd-search {
  padding-top: 16px;
  width: 100%;
  .search-form {
    color: #555555;
    .status {
      display: flex;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(85, 85, 85, 1);
      line-height: 35px;
      margin-bottom: 17px;
    }
    .select {
      box-sizing: border-box;
      width: 178px;
      white-space: nowrap;
      border: 1px solid rgba(222, 224, 227, 1);
      border-radius: 3px;
      height: 32px;
      line-height: 32px;
      padding: 0 14px;
      margin-right: 13px;
    }
    .date-range {
      width: 369px;
      box-sizing: border-box;
      white-space: nowrap;
      border: 1px solid rgba(222, 224, 227, 1);
      border-radius: 3px;
      height: 32px;
      line-height: 32px;
      padding: 0 14px;
      margin-right: 13px;
      display: flex;
      margin-bottom: 17px;
      .el-range-editor {
        flex: 1;
        border: 0;
        height: 30px;
        /deep/.el-range__icon {
          display: none;
        }
        .el-icon-date {
          &::before {
            display: none;
          }
        }
      }
    }
    .NO-range {
      margin-bottom: 14px;
      .NO-input {
        display: inline-flex;
        width: 178px;
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        height: 32px;
        line-height: 32px;
        padding: 0 14px;
        margin-right: 13px;
      }
      /deep/.el-input {
        flex: 1;
        .el-input__inner {
          height: 30px;
          line-height: 30px;
          border: 0;
        }
      }
    }

    .data-range-wrapper {
      .data-range {
        display: flex;
        .separator {
          line-height: 32px;
          height: 32px;
          font-size: 13px;
          color: #666;
          padding: 0 13px;
        }
        .separator:before,
        .separator:after {
          content: "";
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(../../assets/images/xiaoyu.png) no-repeat center
            center;
        }
        .data-input {
          white-space: nowrap;
          margin-right: 20px;
          /deep/.el-input {
            flex: 1;
            .el-input__inner {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }

    .range-label {
      font-size: 14px;
      height: 30px;
      vertical-align: top;
    }
    .title {
      display: inline-block;
      // width: 23%;
      font-size: 14px;
      height: 30px;
      vertical-align: top;
    }
    /deep/.input {
      height: 30px;
      box-sizing: border-box;
      display: inline-block;
      .el-select {
        vertical-align: top;
      }
      .el-input {
        width: 77%;
        height: 30px;
        display: flex;
        align-items: ceil;
      }
      .el-input__inner {
        border: 0;
        height: 30px;
        font-size: 13px;
        // line-height: 30px;
      }
    }
  }
  .searchList {
    padding-top: 16px;
    width: 100%;
    .search {
      width: 64px;
      height: 32px;
      background: rgba(51, 112, 255, 1);
      border-radius: 4px;
      font-size: 13px;
      line-height: 32px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
    .packUp {
      margin-left: 12px;
      padding: 0 20px 0 5px;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      color: #3370ff;
      position: relative;
      .Icon {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .listTitle {
      line-height: 32px;
      height: 32px;
      font-size: 13px;
      color: #666;
    }
    .unit {
      line-height: 32px;
      height: 32px;
      font-size: 13px;
      color: #666;
    }

    /deep/.formCheckBox {
      margin: 0 0;
      height: 32px;
      padding:0 10px;
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
      .shuru {
        height: 32px;
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
        .el-input .el-input__suffix {
          top: 0px;
        }
        .is-focus .el-input__suffix {
          top: 0px;
        }
      }
    }
    /deep/.formTime {
      margin-right: 12px;
      background: rgba(255, 255, 255, 1);
      // border: 1px solid rgba(222, 224, 227, 1);
      background:rgba(255,255,255,1);
      border-radius: 3px;
      .title {
        padding-left: 6px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        color: #666;
      }
      .shuru {
        height: 32px;
        .el-input__inner {
          border: 0 none;
          height: 32px;
          width: 212px;
          line-height: 32px;
        }
        .el-range-editor.el-input__inner {
          height: 32px;
          display: block;
          display: flex;
          padding-right: 0px;
        }
        .el-date-editor .el-range-input {
          height: 32px;
          display: block;
        }
        .el-date-editor .el-range__icon {
          line-height: 28px;
        }
        .el-date-editor .el-range__close-icon {
          width: 0px;
        }
        .el-date-editor .el-range-separator {
          line-height: 28px;
          color: #999;
        }
      }
    }
  }
}
</style>
