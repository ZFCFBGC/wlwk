<template>
  <div class="operationLog">
    <div class="tips">
      广州EC、安徽和oneSIM供应商的卡在有效期结束后，进入保号期，为待销号状态，在保号期30天内，若发生充值续费，卡状态变为正常，若30天内不续费，将进行销号，销号后，卡为空卡；
    </div>
    <div class="operationCont">
      <div class="cancel-search">
        <search-panel
          :searchConfig="searchConfig"
          @search="goSearch"
        ></search-panel>
        <div class="export">
          <el-button
            >{{ this.$t("localization.Export") }}
            <img
              class="export-arrow"
              src="@/assets/images/export.png"
              alt="export"
          /></el-button>
        </div>
      </div>
      <div class="cancel-card-table">
        <swd-table
          :table="tableAll"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :total="total"
          :more="false"
        >
          <template
            slot-scope="props"
            v-if="props.row != undefined"
            slot="handle"
          >
            <div class="handle">
              {{$t('localization.Delete')}}
            </div>
          </template>
        </swd-table>
      </div>
    </div>
    <div class="rolesPop" v-if="rolesPopShow">
      <roles-pop></roles-pop>
    </div>
    <div class="rolesForm" v-if="rolesFormShow"><roles-form></roles-form>`</div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1";
import searchPanel from "../../components/searchPanel/searchPanel";

export default {
  components: {
    swdTable,
    searchPanel,
  },
  data() {
    return {
      tableAll: {
        select: false,
        handle: false,
        type: false,
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "", title: "ID" },
        { prop: "", title: "角色名" },
        { prop: "", title: this.$t('localization.CreateDate') },
        { prop: "", title: "修改时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true },
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      searchConfig: {
        form: [
          {
            label: "",
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: "停机时间"
              },
              {
                value: "2",
                label: "销号时间"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: "",
            key: "timers",
            type: "dateTimePicker",
            value: [],
            config: {
              type: "datetimerange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: `${this.$t('localization.BeginTime')}`,
              endPlaceholder: `${this.$t('localization.EndTime')}`,
            },
          },
          {
            label: `${this.$t('localization.Customer')}：`,
            key: "package",
            type: "tree",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
          },
          {
            label: this.$t('localization.CardNum'),
            key: "cardNumber",
            type: "input",
            value: "",
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {},
            },
          },
          {
            label: `${this.$t('localization.Type')}：`,
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: this.$t('localization.DemoSMS')
              },
              {
                value: "2",
                label: "国外短信"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          }
        ],
      },
    };
  },
  methods: {
    goSearch(info) {
    },
  },
};
</script>
<style lang="less" scoped>
.operationLog {
  margin-top: 20px;
  .tips {
    line-height: 13px;
    font-size: 13px;
    color: rgba(134, 145, 163, 1);
  }
  .operationCont {
    margin-top: 16px;
    height: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    border-radius: 5px 5px 5px 5px;
    padding: 16px 30px;
    .cancel-search {
      display: flex;
      justify-content: space-between;
      /deep/.export {
        display: inline-block;
        .el-button {
          height: 32px;
          padding: 0 19px;
          position: relative;
          .el-button__inner {
            height: 32px;
            line-height: 32px;
          }
        }
      }
    }
    .cancel-card-table {
      margin-top: 18px;
    }
    .condition {
      border-bottom: 1px solid #e9eaf2;
      padding-bottom: 17px;
      .newAccount {
        width: 102px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        font-size: 13px;
      }
    }
  }
}
</style>
