<template>
  <div class="userTree">
    <div class="userTree_c">
      <div v-if="clientArr.length > 0" class="treeInfo">
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="id"
          :default-expanded-keys="[id]"
          lazy
          @node-click="getNode"
          @node-expand="getExpand"
          @node-collapse="getColse"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="userTreeTitle">{{node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'userTree',
  props: {
    root: null
  },
  data() {
    return {
      iconClass: "el-icon-circle-plus-outline",
      id: null,
      props: {
        label: "nickname",
        children: "children",
        isLeaf: "leaf"
      },
      clientArr: []
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
  methods: {
    getUserInfo(node, resolve) {
      if (!this.root) {
        var url = "/user/getUserInfo.do";
        this.$client.get(url).then(res => {
          if (res.code == "200") {
            var obj = res.data;
            obj.leaf = false;
            this.id = obj.id;
            obj.userId = obj.id;
            this.clientArr.push(obj);
          }
        });
      }else{
        let url = "/user/getByUserId.do";
        let params={
          userId:this.root
        }
        this.$client.get(url, params).then(res => {
          if (res.code == "200") {
            let obj = res.data;
            obj.leaf = false;
            this.id = obj.id;
            obj.userId = obj.id;
            this.clientArr.push(obj);
          }
        });
      }
    },
    getExpand() {},
    getColse() {},
    getNode(item) {
      this.$emit("getNode", {
        multipleSelection: item
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
          userId: node.data.userId
        })
        .then(res => {
          if (res.code == 200) {
            var arr = res.data;
            arr.map(item => {
              item.leaf = item.isHaveChild > 0 ? false : true;
            });
            resolve(arr);
          } else {
            swd.showInfo({
              title: "提示",
              content: res.msg ? res.msg : "网络故障,请检查网络设置。",
              errorCode: res.code
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.userTree {
  height: 100%;
  width: 100%;
  .userTree_c {
    height: 100%;
    width: 100%;
    .treeInfo {
      height: 100%;
      min-width: 260px;
      //height: 828px;
      width: 100%;
      overflow-y: auto;
    }
  }

  .userTreeTitle {
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    display: inline-block;
  }
}
</style>
