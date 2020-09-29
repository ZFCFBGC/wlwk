<template>
  <div class="userTree">
    <div class="userTree_c">
      <div v-if="clientArr.length > 0" class="treeInfo">
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="id"
          :expand-on-click-node="false"
          :default-expanded-keys="[id]"
          lazy
          icon-class="el-icon-circle-plus"
          @node-click="getNode"
          @node-expand="getExpand"
          @node-collapse="getColse"
          @node-contextmenu="rightClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span
              :class="{
                userTreeTitle: 1,
                select: (currentNode = node.data.id),
              }"
              @click="getClickNode(node)"
            >
              <img
                src="@/assets/images/customer_icon.png"
                class="customer-icon"
                alt="icon"
              />

              {{ node.label }}</span
            >
          </span>
        </el-tree>
      </div>
    </div>
    <div
      class="swdMenu"
      v-if="menu"
      :style="'position:fixed;left:' + clientX + 'px;top:' + clientY + 'px;'"
    >
      <div class="menuList" @click="goHandleRight('sales')">{{$t('localization.SalesCard')}}</div>
      <div class="menuList" @click="goHandleRight('add')">{{$t('localization.NewUsers')}}</div>
      <div class="menuList" @click="goHandleRight('set')">{{$t('localization.SetPack')}}</div>
      <div class="menuList" @click="goHandleRight('transfer')">{{$t('localization.ClientTransfer')}}</div>
      <div class="menuList" @click="goHandleRight('detele')">
        {{ clientInfo.isDelete == 1 ? $t('localization.Deactivate') : $t('localization.Enable') }}
      </div>
      <div class="menuList" @click="goHandleRight('reset')">{{$t('localization.ResetPassword')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      props: {
        label: "nickname",
        children: "children",
        isLeaf: "leaf",
      },
      currentNode: "",
      menu: false,
      clientArr: [],
      clientX: "",
      clientY: "",
      clientInfo: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    // 点击其他地方关闭右键菜单
    this.$nextTick(() => {
      document.addEventListener("click", (e) => {
        if (e.target.className != "swdMenu") {
          this.menu = false;
        }
      });
    });
  },
  methods: {
    getUserInfo(node, resolve) {
      var url = `/user/getUserInfo.do`;
      this.$client.get(url).then((res) => {
        if (res.code == "200") {
          var obj = res.data;
          obj.leaf = false;
          this.id = obj.id;
          obj.userId = obj.id;
          this.clientArr.push(obj);
        } else {
          swd.showInfo({
            title: "提示",
            content: res.msg ? res.msg : "网络故障,请检查网络设置。",
            errorCode: res.code,
          });
        }
      });
    },
    getExpand() {
      this.menu = false;
    },
    getColse() {
      this.menu = false;
    },
    getNode(item) {
      this.$emit("getNode", {
        multipleSelection: item,
      });
    },
    loadNode(node, resolve) {
      var that = this;
      if (node.level === 0) {
        return resolve(this.clientArr);
      }
      if (node.level > 0) {
        this.getChildrenNode(node, resolve);
      }
    },
    getChildrenNode(node, resolve) {
      var url = `/user/querySubordinateUsers.do`;
      this.$client
        .get(url, {
          userId: node.data.userId,
        })
        .then((res) => {
          if (res.code == 200) {
            var arr = res.data;
            arr.map((item) => {
              item.leaf = item.isHaveChild > 0 ? false : true;
            });
            resolve(arr);
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code,
            });
          }
        });
    },
    // 点击节点文字
    getClickNode(node) {
      this.menu = false;
      this.currentNode = node.data.userId;
      this.$emit("clickNode", {
        userId: node.data.userId,
      });
    },
    //右键菜单
    rightClick(event, data) {
      if (event.clientY > 720) {
        this.clientY = event.clientY - 240;
      } else {
        this.clientY = event.clientY;
      }
      this.menu = true; //让菜单显示
      this.clientInfo = data;
      this.clientX = event.clientX;

      document.removeEventListener("click", this.Listen); //添加监听，监听鼠标事件
    },
    Listen() {
      this.menu = false;
      document.removeEventListener("click", this.Listen);
    },
    //右键菜单事项
    goHandleRight(val) {
      this.menu = false;
      this.$emit("goHandleRight", {
        multipleSelection: val,
        info: this.clientInfo,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.userTree {
  height: 100%;
  .userTree_c {
    height: 100%;
    /deep/.treeInfo {
      height: 100%;
      width: 100%;
      // .is-current {
      //   background-color: #dfecff;
      // }
    }
  }
  .custom-tree-node {
    display: block;
    width: 100%;
    .customer-icon{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .userTreeTitle {
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    display: block;
    width: 100%;
  }
  .swdMenu {
    width: 92px;
    height: 240px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    .menuList {
      color: #333333;
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #9da4bd;
      }
    }
  }
}
</style>
