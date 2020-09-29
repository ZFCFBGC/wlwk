<template>
  <div class="popUp">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="header clearfix">
        <div class="title fl pointer">{{$t('localization.NewRole')}}</div>
        <div class="close fr pointer" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="cont">
        <div class="list">
          <div class="title">{{$t('localization.RoleName')}}</div>
          <div class="popShuru">
            <swd-input
              :value="roleName"
              placeholder="请输入"
              v-model="roleName"
              :width="548"
            ></swd-input>
          </div>
        </div>
        <div class="checkGrounp">
          <div class="title">{{$t('localization.RoleSetting')}}</div>
          <div
            class="checkShuru"
            v-for="(item, index) in distributorsInfo"
            :key="index"
          >
            <div class="firstLevel clearfix">
              <div class="firstLevel_l fl">
                <el-checkbox
                  :indeterminate="item.indeterminate"
                  v-model="item.ischeckAll"
                  @change="handleCheckAllChange(item, index, $event)"
                ></el-checkbox>
              </div>
              <div class="firstLevel_r fl" @click="unfold(index)">
                <span>{{ item.checkName }}</span>
                <span v-if="!item.packupShow"
                  ><i class="el-icon-arrow-down"></i
                ></span>
                <span v-if="item.packupShow"
                  ><i class="el-icon-arrow-up"></i
                ></span>
              </div>
            </div>
            <div
              class="selectionList clearfix"
              v-if="item.children && item.packupShow"
            >
              <div
                v-for="(partition, partitionIndex) in item.children"
                :key="partitionIndex"
                :class="partition.children ? '' : 'fl'"
              >
                <div class="secondLevel clearfix">
                  <div class="secondLevel_l fl">
                    <el-checkbox
                      :indeterminate="partition.indeterminate"
                      v-model="partition.selected"
                      @change="
                        handleCheckedCountryAllChange(
                          index,
                          partitionIndex,
                          partition.partitionId,
                          $event
                        )
                      "
                    >
                    </el-checkbox>
                  </div>
                  <div
                    class="secondLevel_r fl"
                    @click="secondUnfold(index, partitionIndex)"
                  >
                    <div class="fl">{{ partition.partitionName }}</div>
                    <div
                      class="fl"
                      v-if="partition.children"
                      style="margin-left:4px;"
                    >
                      <span v-if="!partition.packupShow"
                        ><i class="el-icon-arrow-down"></i
                      ></span>
                      <span v-if="partition.packupShow"
                        ><i class="el-icon-arrow-up"></i
                      ></span>
                    </div>
                  </div>
                </div>
                <div
                  class="selectionList clearfix"
                  v-if="partition.children && partition.packupShow"
                >
                  <div
                    class="threeLevel clearfix fl"
                    v-for="limit in partition.children"
                    :key="limit.id"
                  >
                    <div class="threeLevel_l fl">
                      <el-checkbox
                        v-model="limit.selected"
                        @change="
                          handleCheckedCountryChange(
                            index,
                            partitionIndex,
                            limit.id,
                            partition.partitionId,
                            $event
                          )
                        "
                      ></el-checkbox>
                    </div>
                    <div class="threeLevel_r fl">{{ limit.fieldName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swdInput from "../form/swdInput.vue";
export default {
  components: {
    swdInput
  },
  data() {
    return {
      roleName: "",
      // distributorsInfo:[]
      distributorsInfo: [
        {
          ischeckAll: false,
          checkName: "概况",
          isIndeterminate: true,
          packupShow: false,
          children: [
            {
              partitionName: this.$t("localization.HRecharge"),
              selected: false,
              partitionId: 3,
              isIndeterminate: false,
              packupShow: false
            },
            {
              partitionName: this.$t("localization.HWithdrawal"),
              selected: false,
              partitionId: 4,
              isIndeterminate: false,
              packupShow: false
            }
          ]
        },
        {
          ischeckAll: false,
          checkName: "卡管理",
          isIndeterminate: true,
          packupShow: false,
          children: [
            {
              partitionName: this.$t('localization.HPackageManage'),
              selected: false,
              partitionId: 1,
              isIndeterminate: false,
              packupShow: false,
              children: [
                {
                  id: "1",
                  fieldName: this.$t('localization.NewPackage'),
                  selected: false
                },
                {
                  id: "2",
                  fieldName: "套餐上下架",
                  selected: false
                },
                {
                  id: "3",
                  fieldName: "套餐编辑",
                  selected: false
                }
              ]
            },
            {
              partitionName: "代理价格",
              selected: false,
              partitionId: 2,
              isIndeterminate: false,
              packupShow: false,
              children: [
                {
                  id: "5",
                  fieldName: "代理价格新增",
                  selected: false
                },
                {
                  id: "6",
                  fieldName: "代理价格上下架",
                  selected: false
                },
                {
                  id: "7",
                  fieldName: "代理价格编辑",
                  selected: false
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    close() {
      this.$emit("cancel");
    },
    handleCheckAllChange(info, index, e) {
      // //一级change事件
      this.distributorsInfo[index].ischeckAll = e;
      this.distributorsInfo[index].indeterminate = false;
      this.distributorsInfo[index].children.map(item => {
        item.selected = e;
        item.indeterminate = false; //去掉二级不确定状态
        if (item.children) {
          item.children.map(item1 => {
            //三级全选反选
            item1.selected = e;
            return;
          });
          return;
        }
      });
    },
    handleCheckedCountryAllChange(index, secondIndex, topId, e) {
      //二级change事件
      this.distributorsInfo[index].children[secondIndex].selected = e; //二级勾选后，子级全部勾选或者取消
      this.distributorsInfo[index].children[secondIndex].indeterminate = false; //去掉二级不确定状态
      var childrenArray = this.distributorsInfo[index].children[secondIndex]
        .children;
      if (childrenArray) {
        this.distributorsInfo[index].children[secondIndex].children.map(
          item => {
            item.selected = e;
          }
        );
      }
      this.getIsCheckAll(index);
    },
    handleCheckedCountryChange(index, thirdIndex, sonId, topId, e) {
      //三级change事件
      var childrenArray = this.distributorsInfo[index].children[thirdIndex]
        .children;
      var tickCount = 0;
      var unTickCount = 0;
      var len = this.distributorsInfo[index].children[thirdIndex].children
        .length;
      for (var i = 0; i < len; i++) {
        if (sonId == childrenArray[i].id) {
          this.distributorsInfo[index].children[thirdIndex].children[
            i
          ].selected = e;
        }
        if (childrenArray[i].selected == true) {
          tickCount++;
        }
        if (childrenArray[i].selected == false) {
          unTickCount++;
        }
      }
      if (tickCount == len) {
        //三级级全勾选
        this.distributorsInfo[index].children[thirdIndex].selected = true;
        this.distributorsInfo[index].children[thirdIndex].indeterminate = false;
      } else if (unTickCount == len) {
        //三级级全不勾选
        this.distributorsInfo[index].children[thirdIndex].selected = false;
        this.distributorsInfo[index].children[thirdIndex].indeterminate = false;
      } else {
        this.distributorsInfo[index].children[thirdIndex].selected = false;
        this.distributorsInfo[index].children[thirdIndex].indeterminate = true; //添加二级不确定状态
      }
      this.getIsCheckAll(index);
    },
    getIsCheckAll(index) {
      var tickCount = 0;
      var unTickCount = 0;
      var indeterminateCount = 0;
      var ArrLength = this.distributorsInfo[index].children.length;
      for (var j = 0; j < ArrLength; j++) {
        //全选checkbox状态
        if (this.distributorsInfo[index].children[j].selected == true) {
          tickCount++;
        }
        if (this.distributorsInfo[index].children[j].selected == false) {
          unTickCount++;
        }
        if (this.distributorsInfo[index].children[j].indeterminate == true) {
          indeterminateCount++;
        }
      }
      if (tickCount == ArrLength) {
        //二级全勾选
        this.distributorsInfo[index].ischeckAll = true;
        this.distributorsInfo[index].indeterminate = false;
      } else if (unTickCount == ArrLength) {
        //二级全不勾选
        this.distributorsInfo[index].ischeckAll = false;
        if (indeterminateCount > 0) {
          this.distributorsInfo[index].indeterminate = true;
        } else {
          this.distributorsInfo[index].indeterminate = false;
        }
      } else {
        this.distributorsInfo[index].ischeckAll = false;
        this.distributorsInfo[index].indeterminate = true; //添加一级不确定状态
      }
    },
    // 展开
    unfold(index) {
      this.distributorsInfo[index].packupShow = !this.distributorsInfo[index]
        .packupShow;
    },
    // 收起
    secondUnfold(index, secondIndex) {
      this.distributorsInfo[index].children[secondIndex].packupShow = !this
        .distributorsInfo[index].children[secondIndex].packupShow;
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
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    z-index: 999;
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 623px;
    height: 716px;
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
    .list {
      margin-bottom: 14px;
      .title {
        font-size: 13px;
        line-height: 16px;
        color: #666;
        margin-bottom: 14px;
      }
    }
    .checkGrounp {
      .title {
        font-size: 13px;
        line-height: 16px;
        color: #666;
        margin-bottom: 14px;
      }
      .checkShuru {
        .firstLevel {
          //padding: 8px 0;
          font-size: 13px;
          color: #666;
          .firstLevel_l {
            margin-right: 8px;
          }
        }
        .selectionList {
          // padding: 4px 0;
          margin-left: 20px;
          .secondLevel {
            // margin-right: 14px;
            margin: 12px 8px;
            color: #666;
            .secondLevel_l {
              margin-right: 8px;
            }
          }
          .threeLevel {
            margin-right: 14px;
            padding: 8px 0;
            color: #666;
            .threeLevel_l {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
