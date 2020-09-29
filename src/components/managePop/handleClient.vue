<template>
  <div class="flowRecharge">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        <div class="title">
          {{ type == "edit" ? "编辑用户" : $t('localization.NewUsers') }}
        </div>
        <div class="close pointer" @click="cancel">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="cont clearfix">
            <div class="cont_l fl">
              <div class="list" v-if="type == 'edit'">
                <div class="title">上级用户</div>
                <div class="input">
                  <el-form-item prop="superiorName">
                    <div class="user">
                      {{
                        ruleForm.superiorName
                          ? ruleForm.superiorName
                          : ruleForm.nickname
                      }}
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type == 'add'">
                <div class="title">上级用户</div>
                <div class="input">
                  <el-form-item prop="superiorName">
                    <client-name
                      v-model="ruleForm.superiorName"
                      @nodeChange="getClientVal"
                      :value="ruleForm.superiorName"
                    ></client-name>
                  </el-form-item>
                </div>
              </div>
              <div class="list">
                <div class="title">{{$t('localization.ClientName')}}</div>
                <div class="input">
                  <el-form-item prop="nickname">
                    <el-input
                      v-model="ruleForm.nickname"
                      maxlength="100"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type == 'add'">
                <div class="title">登录账号</div>
                <div class="input">
                  <el-form-item prop="loginName">
                    <el-input
                      v-model="ruleForm.loginName"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type == 'edit'">
                <div class="title">{{$t('localization.LoginID')}}</div>
                <div class="input">
                  <el-form-item prop="loginName">
                    <div class="user">
                      {{ ruleForm.loginName }}
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type === 'edit'">
                <div class="title">{{$t('localization.Password')}}</div>
                <div class="input">
                  <el-form-item prop="pass">
                    <div class="btnPwd" @click="resetPwd">{{$t('localization.ResetPassword')}}</div>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type === 'edit'">
                <div class="title">{{$t('localization.AddTime')}}</div>
                <div class="input">
                  <el-form-item prop="createTime">
                    <div class="creatTime">{{ ruleForm.createTime }}</div>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type == 'add'">
                <div class="cleafix">
                  <div class="title fl">{{$t('localization.Password')}}</div>
                  <div class="progress" v-if="ruleForm.passWord">
                    <span v-if="percentage === 33" style="color:#FF4040"
                      >弱</span
                    >
                    <span v-if="percentage === 66" style="color:#e6a23c"
                      >中</span
                    >
                    <span v-if="percentage === 99" style="color:#67c23a"
                      >强</span
                    >
                    <el-progress
                      :percentage="percentage"
                      :color="customColorMethod"
                    ></el-progress>
                  </div>
                </div>
                <div class="input">
                  <el-form-item prop="passWord">
                    <el-input
                      v-model="ruleForm.passWord"
                      show-password
                      @input="checkPsw"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="list" v-if="type == 'add'">
                <div class="title">{{$t('localization.ConfirmPW')}}</div>
                <div class="input">
                  <el-form-item prop="confirmPsw">
                    <el-input
                      v-model="ruleForm.confirmPsw"
                      show-password
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="cont_r fl">
              <div class="list">
                <div class="title">{{$t('localization.Type')}}</div>
                <div class="input" v-if="ruleForm.grade != 0">
                  <el-form-item prop="grade">
                    <el-radio-group v-model="ruleForm.grade" @change="changeGrade">
                      <el-radio :label="1">
                        <div class="radioTitle">
                          <span>{{$t('localization.Agent')}}</span>
                          <!-- <el-tooltip
                            popper-class="tip-class"
                            :visible-arrow="false"
                            placement="right"
                            content="功能权限说明文字功能权限说明文字功能权限说明文字功能权限说明文字功能权限说明文字功能权限说明文字"
                          > -->
                            <span class="radio-icon el-icon-question"></span>
                          <!-- </el-tooltip> -->
                        </div>
                      </el-radio>
                      <el-radio :label="2">
                        <div class="radioTitle">
                          <span>终端客户</span>
                          <!-- <el-tooltip
                            popper-class="tip-class"
                            placement="right"
                            :visible-arrow="false"
                          > -->
                            <span class="radio-icon el-icon-question"></span>
                          <!-- </el-tooltip> -->
                        </div>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="input" v-else>
                  <el-form-item prop="grade">
                    <div>admin</div>
                  </el-form-item>
                </div>
              </div>
              <div class="list">
                <div class="static">{{$t('localization.Status')}}</div>
                <div class="input" v-if="ruleForm.grade != 0">
                  <el-form-item prop="isDelete">
                    <el-radio-group v-model="ruleForm.isDelete">
                      <el-radio :label="0">
                        <div class="radioTitle">
                          <span>{{$t('localization.Enable')}}</span>
                        </div>
                      </el-radio>
                      <el-radio :label="1">
                        <div class="radioTitle">
                          <span>{{$t('localization.Deactivate')}}</span>
                        </div>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="input" v-else>
                  <el-form-item prop="isDelete">
                    <div>{{$t('localization.Enable')}}</div>
                  </el-form-item>
                </div>
              </div>
              <div class="list">
                <div class="title">{{$t('localization.ContactNumber')}}</div>
                <div class="input">
                  <el-form-item prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="list">
                <div class="title">{{$t('localization.Email')}}</div>
                <div class="input">
                  <el-form-item prop="mailbox">
                    <el-input v-model="ruleForm.mailbox"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="list">
                <div class="address">{{$t('localization.Address')}}</div>
                <div class="input">
                  <el-form-item prop="address">
                    <el-input
                      v-model="ruleForm.address"
                      maxlength="200"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="btn-right">
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('localization.Save')}}</el-button>
        <el-button @click="cancel">{{$t('localization.Cancel')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import clientName from "../form/clientName.vue";
export default {
  components: {
    clientName
  },
  props: {
    editClientInfo: {
      type: Object
    },
    type: {
      type: String,
      default: "add"
    },
    clientInfo: {
      type: Object,
      default: null
    }
  },
  watch: {
    editClientInfo: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.userInfo = newVal;
        this.ruleForm = newVal;
      },
      deep: true
    }
  },
  data() {
    var checkSuperior = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("上级用户不能为空"));
      } else {
        callback();
      }
      callback();
    };
    var checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("客户名称不能为空"));
      } else {
        callback();
      }
      callback();
    };
    var checkLoginName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("登录账号不能为空"));
      } else {
        callback();
      }
      callback();
    };
    var checkPassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value) {
        setTimeout(() => {
          if (value.length > 24 || value.length < 6) {
            return callback(new Error("密码长度为6-24位，请按要求设置密码"));
          }
        });
      } else {
        callback();
      }
      callback();
    };
    var checkConfirmPsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
      callback();
    };
    var checkGrade = (rule, value, callback) => {
      if (!value && value != 0) {
        return callback(new Error("请选择用户状态"));
      } else {
        callback();
      }
      callback();
    };
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else if (value) {
        setTimeout(() => {
          if (!Tools.phonevalid(value)) {
            callback(new Error("请输入有效的手机号码"));
          } else {
            callback();
          }
        }, 500);
      } else {
        callback();
      }
      callback();
    };
    var checkMailbox = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (value) {
        setTimeout(() => {
          if (!Tools.emailvalid(value)) {
            callback(new Error("请输入有效的邮箱号码"));
          } else {
            callback();
          }
        }, 500);
      } else {
        callback();
      }
      callback();
    };
    return {
      percentage: 33, //密码强度
      userInfo: {},
      ruleForm: {
        client: "",
        address: "",
        createTime: "",
        fullCode: "",
        grade: 1,
        id: null,
        isDelete: 0,
        loginName: "",
        mailbox: "",
        name: "",
        nickname: "",
        parentCode: "",
        passWord: "",
        confirmPsw: "",
        roles: "",
        sex: "",
        superior: null,
        superiorName: "",
        tel: ""
      },
      rules: {
        superior: [{ validator: checkSuperior, trigger: "change" }],
        nickname: [{ validator: checkNickname, trigger: "change" }],
        loginName: [{ validator: checkLoginName, trigger: "change" }],
        passWord: [{ validator: checkPassWord, trigger: "change" }],
        confirmPsw: [{ validator: checkConfirmPsw, trigger: "change" }],
        grade: [{ validator: checkGrade, trigger: "change" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        mailbox: [{ validator: checkMailbox, trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.editClientInfo) {
      this.userInfo = this.editClientInfo;
      this.ruleForm = this.editClientInfo;
    }
    if (this.clientInfo) {
      this.ruleForm.superior = this.clientInfo.userId;
      this.ruleForm.superiorName = this.clientInfo.nickname;
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.type == "add") {
            this.addClientInfo();
          } else {
            this.updateInfo();
          }
        } else {
          this.$message({
            message: "表单校验失败，请检查表单项目",
            type: "warning"
          });
          return false;
        }
      });
    },
    getClientVal(e) {
      this.ruleForm.superior = e.userId;
      this.ruleForm.superiorName = e.nickname;
    },
    // 重置密码
    resetPwd() {
      var that = this;
      swd.compop({
        title: this.$t('localization.Edit'),
        content: "重置后密码：123456<br/>是否确定重置",
        success: function(res) {
          if (res.confirm == true) {
            var url = `/user/resetUserPassWord.do`;
            that.$client
              .get(url, {
                userId: that.userInfo.id
              })
              .then(res => {
                if (res.code == "200") {
                  swd.compop({
                    title: this.$t('localization.Edit'),
                    content: "重置成功",
                    autoClose: true
                  });
                }
              });
          }
        }
      });
    },
    // 修改用户资料
    updateInfo() {
      var url = `/user/editUser.do`;
      this.$client
        .post(url, {
          userId: this.ruleForm.id,
          nickname: this.ruleForm.nickname,
          grade: this.ruleForm.grade,
          phone: this.ruleForm.tel,
          mailbox: this.ruleForm.mailbox,
          isDelete: this.ruleForm.isDelete,
          address: this.ruleForm.address
        })
        .then(res => {
          if (res.code == 200) {
            this.$emit("confirm");
          }
        });
    },
    // 新增用户
    addClientInfo() {
      let url = `/user/addUser.do`;
      this.$client
        .get(url, {
          //userId: this.ruleForm.id,
          superior: this.ruleForm.superior,
          nickname: this.ruleForm.nickname,
          loginName: this.ruleForm.loginName,
          passWord: this.ruleForm.passWord,
          grade: this.ruleForm.grade,
          phone: this.ruleForm.tel,
          mailbox: this.ruleForm.mailbox,
          isDelete: this.ruleForm.isDelete,
          address: this.ruleForm.address
        })
        .then(res => {
          if (res.code == 200) {
            this.$emit("confirm");
          } else {
            swd.compop({
              title:'提示',
              content:res.msg
            })
          }
        });
    },
    changeGrade(val){
      if(val===1){
        swd.compop({
          title:'提示',
          content:'当下代理下仍有客户和设备，请转移后再进行修改!'
        })
      }else{
        swd.compop({
          title:'提示',
          content:'确定将该普通用户角色修改为代理商角色吗？'
        })
      }
    },
    checkPsw(e) {
      var numasc = 0;
      var charasc = 0;
      var otherasc = 0;
      for (var i = 0; i < e.length; i++) {
        var asciiNumber = e.substr(i, 1).charCodeAt();
        if (asciiNumber >= 48 && asciiNumber <= 57) {
          numasc += 1;
        }
        if (
          (asciiNumber >= 65 && asciiNumber <= 90) ||
          (asciiNumber >= 97 && asciiNumber <= 122)
        ) {
          charasc += 1;
        }
        if (
          (asciiNumber >= 33 && asciiNumber <= 47) ||
          (asciiNumber >= 58 && asciiNumber <= 64) ||
          (asciiNumber >= 91 && asciiNumber <= 96) ||
          (asciiNumber >= 123 && asciiNumber <= 126)
        ) {
          otherasc += 1;
        }
      }
      // 只有数字或字母numasc不为0，其他为0或者charasc不为0，其他为0
      if (
        (numasc != 0 && charasc == 0 && otherasc == 0) ||
        (numasc == 0 && charasc != 0 && otherasc == 0)
      ) {
        this.percentage = 33;
      } else if (numasc != 0 && charasc != 0 && otherasc == 0) {
        this.percentage = 66;
      } else if (numasc != 0 && charasc != 0 && otherasc != 0) {
        this.percentage = 99;
      } else {
        this.percentage = 66;
      }
    },
    customColorMethod(percentage) {
      if (percentage <= 33) {
        return "#FF4040";
      } else if (percentage <= 66) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.flowRecharge {
  .dialog {
    width: 830px;
    .content {
      padding-top: 24px;
      .cont {
        .title,
        .static,
        .address {
          font-size: 13px;
          line-height: 16px;
          color: #666;
          margin-bottom: 14px;
        }
        /deep/.progress {
          margin-left: 80px;
          display: flex;
          span {
            font-size: 13px;
            line-height: 16px;
          }
          .el-progress {
            margin-left: 8px;
            height: 100%;
            width: 194px;
          }
          .el-progress__text {
            display: none;
          }
        }
        .title:after {
          content: "*";
          color: #f56c6c;
          margin-left: 4px;
        }
        /deep/.input {
          .el-form-item__content {
            line-height: 32px;
          }
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            width: 364px;
          }
          .el-radio {
            padding: 0 16px;
            height: 32px;
            background: rgba(225, 234, 255, 1);
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
          }
          .radioTitle {
            display: inline-block;
            position: relative;
            span {
              height: 15px;
              line-height: 15px;
              color: #666;
              font-size: 13px;
            }
            .radio-icon {
              font-size: 18px;
              vertical-align: middle;
            }
          }
        }
        .cont_r {
          margin-left: 24px;
        }
        .btnPwd {
          width: 90px;
          height: 32px;
          background: rgba(51, 112, 255, 1);
          border-radius: 3px;
          line-height: 32px;
          text-align: center;
          color: #fff;
          font-size: 13px;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
        .user,
        .creatTime {
          // margin-top:2px;
          width: 364px;
          height: 34px;
          background: rgba(244, 245, 249, 1);
          border-radius: 3px;
          line-height: 34px;
          text-indent: 1em;
          color: #333;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
<style>
.el-tooltip__popper.tip-class {
  font-size: 12px;
  line-height: 26px;
  width: 326px;
  height: 104px;
  color: #000000 !important;
  background: #fff !important;
  z-index: 10000;
}
</style>
