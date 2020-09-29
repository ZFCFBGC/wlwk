<template>
  <div class="managementCard">
    <div class="operationCont">
      <div class="condition clearfix">
        <div class="fl">
          <search-panel
            :searchConfig="searchConfig"
            @search="goSearch"
          ></search-panel>
        </div>
        <div class="fl pointer export-btn">
          {{this.$t('localization.Export')}}
          <img
                      class="export-arrow"
                      src="@/assets/images/export.png"
                      alt="export"
                  />
        </div>
        <div class="add-account pointer fr">+&nbsp;新增账号</div>
      </div>
      <div class="operationTable">
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
            slot="isDelete"
          >
            <div class="static">
              <span>
                <el-popover
                  trigger="hover"
                  :visible-arrow="false"
                  popper-class="swd_popUp"
                  placement="right-start"
                  :offset="0"
                  :content="props.row.isDelete == 1 ? $t('localization.OffShelf') : $t('localization.OnShelf')"
                >
                  <i
                    slot="reference"
                    :class="props.row.isDelete == 1 ? 'soldOut' : 'launched'"
                  ></i>
                </el-popover>
              </span>
            </div>
          </template>
          <template
            slot-scope="props"
            v-if="props.row != undefined"
            slot="handle"
          >
            <div class="handle">{{$t('localization.Edit')}}</div>
            <div class="handle">
              {{ props.row.isDelete == 1 ? $t('localization.Enable') : $t('localization.Deactivate') }}
            </div>
          </template>
        </swd-table>
      </div>
    </div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
import searchPanel from "../../components/searchPanel/searchPanel.vue";
export default {
  components: {
    swdTable,
    searchPanel
  },
  data() {
    return {
      // 整个搜索内容
      searchConfig: {
        form: [
          {
            label: this.$t('localization.Role'),
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: `${this.$t('localization.ShowAll')}`
              },
              {
                value: "2",
                label: "admin"
              },
              {
                value: "3",
                label: this.$t('localization.Finance')
              },
              {
                value: "4",
                label: "业务"
              },
              {
                value: "5",
                label: "终端用户"
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: `${this.$t('localization.Status')}：`,
            key: "isInternational",
            type: "select",
            value: "",
            options: [
              {
                value: "1",
                label: `${this.$t('localization.ShowAll')}`
              },
              {
                value: "2",
                label: this.$t('localization.Enable')
              },
              {
                value: "3",
                label: this.$t('localization.Deactivate')
              }
            ],
            placeholder: this.$t('localization.SelectPlaceholder')
          },
          {
            label: `${this.$t('localization.Account')}：`,
            key: "cardNumber",
            type: "input",
            value: "",
            placeholder: this.$t('localization.SelectPlaceholder'),
            rules: {
              required: false,
              trigger: "blur",
              validator: () => {}
            }
          },
          {
            label: `${this.$t('localization.AddTime')}：`,
            key: "timers",
            type: "datePicker",
            value: [],
            config: {
              type: "daterange", //daterange 日期范围类型
              rangeSeparator: "~",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期"
            }
          }
        ]
      },
      tableAll: {
        select: false,
        handle: false,
        type: true
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "", title: this.$t('localization.LoginID') },
        { prop: "", title: this.$t('localization.Name1') },
        { prop: "", title: this.$t('localization.Role') },
        { prop: "", title: this.$t('localization.PhoneNum') },
        { prop: "isDelete", title: this.$t('localization.Status'), slot: true },
        { prop: "", title: "新增加时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1 //初始页码
    };
  },
  methods: {
    // 搜索内容
    goSearch(info) {
    }
  }
};
</script>
<style lang="less" scoped>
.managementCard {
  .operationCont {
    margin-top: 16px;
    height: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    border-radius: 5px 5px 5px 5px;
    padding: 16px 30px;
    .condition {
      border-bottom: 1px solid #e9eaf2;
      padding-bottom: 17px;
      .export-btn {
        position: relative;
        margin-left: 12px;
        width: 64px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 4px;
        line-height: 30px;
        font-size: 13px;
        color: #333;
        text-align: center;
      }
      .add-account {
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
    .operationTable {
      .launched {
        width: 14px;
        height: 14px;
        background: rgba(103, 194, 58, 1);
        border-radius: 50%;
        display: block;
      }
      .soldOut {
        width: 14px;
        height: 14px;
        background: rgba(147, 147, 147, 1);
        border-radius: 50%;
        display: block;
      }
      .handle {
        display: inline-block;
        font-size: 12px;
        color: #3370ff;
      }
    }
  }
}
</style>
