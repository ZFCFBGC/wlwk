<template>
  <div class="search clearfix">
    <div class="formTime clearfix fl">
      <div class="title fl">{{$t('localization.SubmitTime')}}：</div>
      <div class="shuru fl">
        <el-date-picker
          value-format="yyyy-MM-dd"
          type="daterange"
          :editable="false"
          v-model="timer"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        />
      </div>
    </div>
    <div class="formInput clearfix fl">
      <div class="title fl">{{$t('localization.IncomeExpense')}}：</div>
      <div class="shuru fl">
        <el-select
          v-model="incomeType"
          :placeholder="$t('localization.SelectPlaceholder')"
          size="mini"
          @change="pitchIncome"
          clearable
        >
          <el-option
            v-for="(option, idx) in incomeOptions"
            :key="idx"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </div>
    </div>
    <div class="formInput clearfix fl" v-if="incomeType != null">
      <div class="title fl">支出类型：</div>
      <div class="shuru fl">
        <el-select
          v-model="expendType"
          :placeholder="$t('localization.SelectPlaceholder')"
          size="mini"
          clearable
        >
          <el-option
            v-for="(option, idx) in expendOptions"
            :key="idx"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </div>
    </div>
    <div class="btnArr fl">
      <el-button type="primary" @click="emitSearch">{{$t('localization.Query')}}</el-button>
      <el-button @click="emitReset" v-if="false">{{$t('localization.Reset')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      incomeType: null,
      incomeOptions: [
        {
          value: null,
          label: this.$t('localization.All')
        },
        {
          value: "0",
          label: this.$t('localization.Income')
        },
        {
          value: "1",
          label: this.$t('localization.Expense')
        }
      ],
      expendType: null,
      expendOptions: []
    };
  },
  methods: {
    pitchIncome(val) {
      if (val == 1) {
        this.expendOptions = [
          {
            value: null,
            label: this.$t('localization.All')
          },
          {
            value: "0",
            label: this.$t('localization.RenewSimCard')
          },
          {
            value: "1",
            label: this.$t('localization.FlowCharge')
          },
          {
            value: "2",
            label: this.$t('localization.FlowCharge')
          },
          {
            value: "3",
            label: this.$t('localization.SMSCost')
          },
          {
            value: "4",
            label: this.$t("localization.HWithdrawal")
          }
        ];
      } else {
        this.expendOptions = [
          {
            value: null,
            label: this.$t('localization.All')
          },
          {
            value: "0",
            label: this.$t('localization.ChargeOnline')
          },
          {
            value: "1",
            label: this.$t('localization.OfflineCharge')
          },
          {
            value: "2",
            label: this.$t('localization.Rebate')
          }
        ];
      }
    },
    emitSearch(){
      this.$emit('search',{
        timer:this.timer,
        incomeType:this.incomeType,
        expendType:this.expendType
      })
    }
  }
};
</script>
<style lang="less" scoped>
.search {
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
        width: 122px;
        height: 32px;
        line-height: 32px;
        border: 0 none;
        display: block;
      }
      .el-input .el-input__suffix {
        top: 0;
      }
      .is-focus .el-input__suffix {
        top: 0;
      }
    }
  }
  /deep/.formTime {
    margin-right: 12px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 224, 227, 1);
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
      .el-input__inner {
        border: 0 none;
        height: 32px;
        width: 204px;
        line-height: 32px;
        font-size: 13px;
      }
      .el-range-editor.el-input__inner {
        height: 32px;
        display: block;
        display: flex;
      }
      .el-date-editor .el-range-input {
        height: 32px;
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
  /deep/.btnArr {
    height: 32px;
    .el-button {
      padding: 8px 16px;
    }
    .el-button--primary{
      background-color: #3371FF;
    }
  }
}
</style>
