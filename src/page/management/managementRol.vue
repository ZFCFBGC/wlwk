<template>
  <div class="operationLog">
    <div class="tips">
      说明：代理商可创建角色，并为角色分配权限，在账号管理-新建账号时，可为每个账户赋予对应的角色权限（仅适用于内部账号角色，不影响新建客户时角色权限）。
    </div>
    <div class="operationCont">
      <div class="condition">
        <div class="newAccount pointer">+&nbsp;{{$t('localization.NewRole')}}</div>
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
    <div class="rolesPop" v-if="rolesPopShow">
      <roles-pop></roles-pop>
    </div>
    <div class="rolesForm" v-if="rolesFormShow"><roles-form></roles-form>`</div>
  </div>
</template>
<script>
import swdTable from "../../components/swdTable/swdTable1.vue";
import rolesPop from "../../components/managementPop/rolesPop.vue";
import rolesForm from "../../components/managementPop/rolesForm.vue";
export default {
  components: {
    swdTable,
    rolesPop,
    rolesForm
  },
  data() {
    return {
      tableAll: {
        select: false,
        handle: false,
        type: false
      },
      tableData: [],
      total: null, //总条数
      tableLabel: [
        { prop: "", title: "ID" },
        { prop: "", title: "角色名" },
        { prop: "", title: this.$t('localization.CreateDate') },
        { prop: "", title: "修改时间" },
        { prop: "handle", title: this.$t('localization.Operation'), slot: true }
      ],
      pageSize: 15, //默认多少条一页
      pageIndex: 1, //初始页码
      rolesPopShow: false,
      rolesFormShow: false
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.operationLog {
  margin-top:20px;
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
