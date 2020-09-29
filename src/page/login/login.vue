<template>
  <div class="index">
    <div class="header">
      <div class="container clearfix">
        <div class="header_logo fl">
          <img
            src="@/assets/images/clwlogo.png"
            alt="logo"
            v-if="this.$i18n.locale == 'zh-CN'"
          />
          <img
            src="@/assets/images/clwlogo_en.png"
            alt="logo"
            v-if="this.$i18n.locale == 'en-US'"
          />
        </div>
        <div class="tab_list fr">
          <div class="help" @click="goHelp">
            {{ this.$t("localization.HelpCenter") }}
          </div>
          <div class="interface" @click="goOpen">
            {{ this.$t("localization.Api") }}
          </div>
          <div class="menu" @mouseenter="enter()" @mouseleave="leave()">
            <span class="earth"
              ><img src="@/assets/images/earth.png" alt="earth"
            /></span>
            <span>{{ languageVal }}</span>
            <span><i class="el-icon-caret-bottom" color="#fff"></i></span>
            <div class="list" v-show="list_show">
              <div
                class="lang"
                v-if="this.$i18n.locale == 'en-US'"
                @click="switchLanguage('zh-CN')"
              >
                中文简体
              </div>
              <div
                class="lang"
                v-if="this.$i18n.locale == 'zh-CN'"
                @click="switchLanguage('en-US')"
              >
                English
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="images">
          <img src="@/assets/images/loginLogo.png" alt="主Logo" />
        </div>
        <div class="login">
          <div class="loginc" :class="message_show ? 'messageLgin' : ''">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              :stretch="true"
            >
              <el-tab-pane
                :label="this.$t('localization.LoginForAccount')"
                name="first"
              >
                <div class="account">
                  <!-- 报错提示框 -->
                  <div
                    class="messge clearfix"
                    v-if="message_show && this.$i18n.locale == 'zh-CN'"
                  >
                    <div class="messageIcon fl">
                      <img src="@/assets/images/messge.png" alt="" />
                    </div>
                    <div class="messageTips">{{ message_main }}</div>
                  </div>
                  <div class="username">
                    <el-input
                      v-model="username"
                      :placeholder="this.$t('localization.Username')"
                      style="height: 46px"
                    ></el-input>
                  </div>
                  <div class="password">
                    <el-input
                      :placeholder="this.$t('localization.Password')"
                      v-model="password"
                      :show-password="true"
                    ></el-input>
                  </div>
                  <!-- 滑块验证 -->
                  <div class="verify" v-if="verify_show">
                    <!-- <Verify
                      :type="3"
                      :showButton="false"
                      explain="请按住滑块，拖动到最右边"
                      @success="success"
                      :barSize="{ width: '321px', height: '34px' }"
                    ></Verify> -->
                    <drag-verify
                      ref="dragVerify"
                      :width="319"
                      :height="34"
                      progressBarBg="#66cc66"
                      background="#F5F5F5"
                      :isPassing.sync="isPassing"
                      :text="handleText"
                      :successText="successText"
                      handlerIcon="el-icon-d-arrow-right"
                      successIcon="el-icon-circle-check"
                      @passcallback="passcallback2"
                    >
                    </drag-verify>
                  </div>
                  <div class="loginBtn">
                    <el-button
                      type="primary"
                      style="width: 319px;height: 50px;"
                      @click="goLogin"
                      >{{ this.$t("localization.Login") }}</el-button
                    >
                  </div>
                  <div class="tip_warm clearfix">
                    <div class="checkbox fl">
                      <el-checkbox v-model="checked" @change="goChoice">{{
                        this.$t("localization.Remember")
                      }}</el-checkbox>
                    </div>
                    <div class="forgot fr">
                      {{ this.$t("localization.ForgotPassword") }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                :label="this.$t('localization.Wechat')"
                name="second"
              >
                <div class="wechat">
                  <div class="title">
                    {{ this.$t("localization.WechatTips") }}
                  </div>
                  <div class="wechatImage">
                    <img src="@/assets/images/weixin.jpg" alt="微信LOGO" />
                  </div>
                  <div class="wechatTips">
                    <div class="clearfix wechatlogin">
                      <div class="screen fl">
                        <img src="@/assets/images/screen.png" alt="扫一扫" />
                      </div>
                      <div class="sao fl">
                        {{ this.$t("localization.WechatLogin") }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <div class="links clearfix">
          <div class="tips fl">
            Copyright©2008-2015 All rights reserved. 版权所有
            {{ this.$t("localization.WebName") }}
          </div>
          <div class="linkc fr" v-if="this.$i18n.locale == 'zh-CN'">
            友情链接：
            <span v-for="(item, index) in linkArr" :key="index">
              <a :href="item.url" class="lianjie">{{ item.name }}</a>
            </span>
          </div>
        </div>
        <div class="linkb clearfix">
          <div class="images fl">
            <img src="@/assets/images/guohui.png" alt="guihui" />
          </div>
          <div class="basic fl">
            <a href="http://www.beian.miit.gov.cn/" class="lianjie">
              粤ICP备16079067号-3
            </a>
          </div>
          <div class="basic fl">
            <a
              href="https://new.cnzz.com/v1/login.php?siteid=1273588327"
              class="lianjie"
              ><img src="@/assets/images/pic.gif" alt="gif" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import Verify from "vue2-verify";
import dragVerify from "@/components/common/dragVerify.vue";
export default {
  components: {
    dragVerify
  },
  data() {
    return {
      handleText: "",
      successText: "",
      isPassing: false,
      list_show: false,
      languageVal: "", //为了把下拉框的默认值和全局变量的值一致，以此实现载入页面时显示的语言和数据配置一致
      language: [
        {
          value: "en-US",
          label: "English"
        },
        {
          value: "zh-CN",
          label: "中文简体"
        }
      ],
      linkArr: [
        {
          name: "中移物联网",
          url: "http://iot.10086.cn/cn/"
        },
        {
          name: "广东省智能交通协会",
          url: "http://www.gditsa.org/"
        },
        {
          name: "中国移动",
          url: "http://www.10086.cn/index/gd/index_200_200.html"
        },
        {
          name: "广东省物联网协会",
          url: "http://www.gdiot.org/font/font.action"
        },
        {
          name: "中国智慧城市网",
          url: "http://www.cnscn.com.cn/"
        },
        {
          name: "中国智慧交通网",
          url: "http://www.citnet.cn/"
        }
      ],
      activeName: "first",
      username: "", //用户名
      password: "", //密码
      checked: false, //是否选中记住密码
      message_show: false, //报错提示
      message_main: "", //错误提示内容
      verify_show: false, //滑块验证开启
      verify_success: false, //前端验证成功状态
      ErrorNum: "", //账户密码错误次数
      lang: ""
    };
  },
  watch: {
    languageVal(val, oldVal) {
      //设置滑块成功提示
      this.successText = this.$t("localization.VerifyPass");
      //设置滑块操作提示
      this.handleText = this.$t("localization.DragTips");
    }
  },
  created() {
    //设置滑块成功提示
    this.successText = this.$t("localization.VerifyPass");
    //设置滑块操作提示
    this.handleText = this.$t("localization.DragTips");
    this.language.map(item => {
      if (item.value == this.$i18n.locale) {
        this.languageVal = item.label;
      }
    });
    //设置登录错误次数
    if (this.$cookie.get("ErrorNum")) {
      if (this.$cookie.get("ErrorNum") >= 3) {
        this.verify_show = true;
        this.ErrorNum = this.$cookie.get("ErrorNum");
      } else {
        this.ErrorNum = this.$cookie.get("ErrorNum");
      }
    } else {
      this.$cookie.set("ErrorNum", 1);
      this.ErrorNum = this.$cookie.get("ErrorNum");
    }

    //判断用户名/密码是否存在,记住密码是否勾选
    this.username = this.$cookie.get("username")
      ? this.$cookie.get("username")
      : "";
    this.password = this.$cookie.get("password")
      ? this.$cookie.get("password")
      : "";
    this.checked = this.$cookie.get("password") ? true : false;

    this.$client.get('/getArticleList?pageSize=10&pageNum=1').then(res => {

    });
  },
  mounted() {},
  methods: {
    goHelp() {
      window.location.href =
        "http://www.simcards.cn/ExeclDwon/%e8%bd%a6%e8%81%94%e7%bd%91%e8%90%a5%e4%b8%9a%e5%8e%85%e4%bd%bf%e7%94%a8%e8%af%b4%e6%98%8e%20%20pc%20%202019.03.21.pdf";
    },
    goOpen() {},
    //鼠标移出
    enter() {
      this.list_show = true;
    },
    //鼠标移入
    leave() {
      this.list_show = false;
    },
    //语言切换
    switchLanguage(value) {
      if (value == "zh-CN") {
        this.$i18n.locale = "zh-CN";
        this.languageVal = "中文简体";
      } else if (value == "en-US") {
        this.$i18n.locale = "en-US";
        this.languageVal = "English";
      }
      //在选择了显示的语言后，将配置保存到Cookie中

      this.$cookie.set(
        "lang",
        value //
      );
    },
    //tab栏
    handleClick(tab, event) {},
    //复选框
    goChoice(status) {
      if (status == true) {
        this.$cookie.set("username", this.username, { path: "" });
        this.$cookie.set("password", this.password, { path: "" });
      } else {
        this.$cookie.remove("username", { path: "" });
        this.$cookie.remove("password", { path: "" });
      }
    },

    //登录按钮
    goLogin() {
      try {
        if (!this.username) {
          throw "请输入用户名";
        }
        if (!this.password) {
          throw "请输入密码";
        }
        if (this.verify_success == false && this.verify_show == true) {
          this.$message.warning("请拖动滑块完成验证");
        }
      } catch (error) {
        this.message_show = true;
        this.message_main = error;
        return;
      }
      var lang =
        this.$cookie.get("DefaultLanguage") == "en-US" ? "en-US" : "zh-CN";
      this.$client
        .get(
          `/user/login.do?LoginName=${this.username}&PassWord=${this.password}&lang=${lang}`
        )
        .then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            var obj = res.data;
            this.$cookie.set("ASP.NET_SessionId", obj["ASP.NET_SessionId"]);
            this.$cookie.set("Grade", obj.Grade);
            this.$cookie.set("token", obj.token);
            //window.location.href = 'http://iotlink.gpsnow.net/HomePage/AdminIndex'
            this.$router.push({ path: "/index" });
          } else {
            this.$message.warning(res.msg);
            this.ErrorNum++;
            this.$cookie.set("ErrorNum", this.ErrorNum);
            this.message_show = true;
            this.message_main = res.msg
              ? res.msg
              : "网络故障，请确认网络后重新登录";
            if (this.$cookie.get("ErrorNum") >= 3) {
              this.verify_show = true;
            }
          }
        });
    },
    passcallback2() {
      this.verify_success = true;
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    background: #111214;
    padding: 4px 0;
    width: 100%;
    .container {
      width: 80%;
      margin: 0 auto;
      .tab_list {
        height: 40px;
        .help,
        .interface {
          margin-top: 11px;
          display: inline-block;
          color: #ffffff;
          font-size: 14px;
          margin-right: 20px;
          cursor: pointer;
        }
        .menu {
          display: inline-block;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          position: relative;
          height: 40px;
          .earth {
            display: inline-block;
            vertical-align: middle;
          }
          .list {
            position: absolute;
            //background: red;
            top: 31px;
            left: 0;
            border-radius: 3px;
            .lang {
              background: #111214;
              padding: 8px 3px;
              width: 90px;
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              color: #fff;
              //margin-top: 12px;
            }
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    // height: 514px;
    flex: 1;
    background: #f4f4f4;
    clear: both;
    margin-top: 100px;
    .container {
      width: 80%;
      margin: 0 auto;
      position: relative;
      .login {
        width: 420px;
        height: 450px;
        position: absolute;
        top: 0;
        right: 0;
        border: solid 1px #e4e4e4;
        box-shadow: 0px 0px 8px 4px #e4e4e4;
        background: #fff;
        .loginc {
          width: 319px;
          margin: 36px auto 0 auto;
          .account {
            margin-top: 37px;
            position: relative;
            .messge {
              position: absolute;
              left: 0;
              top: -37px;
              width: 317px !important;
              height: 35px;
              border: 1px solid #ffb5a7;
              margin-top: 1px;
              line-height: 35px;
              color: #666;
              background-color: #fef1f1;
              font-size: 14px;
              z-index: 9999 !important;
              .messageIcon {
                margin-left: 10px;
                margin-right: 19px;
                margin-top: 10px;
              }
              .messageTips {
                height: 35px;
                line-height: 35px;
                color: #666;
                font-size: 14px;
              }
            }
            .password {
              margin-top: 16px;
              margin-bottom: 16px;
            }
            .verify {
              height: 34px;
            }
            .loginBtn {
              margin-top: 16px;
            }
            .tip_warm {
              margin-top: 13px;
              padding: 0 13px;
              color: #666;
              font-size: 13px;
              cursor: pointer;
            }
          }
        }
      }
      .wechat {
        margin-top: 16px;
        .title {
          text-align: center;
          height: 60px;
          font-size: 16px;
          line-height: 60px;
          color: #666;
        }
        .wechatImage {
          height: 143px;
          img {
            height: 143px;
            margin: 0 auto;
            text-align: center;
          }
        }
        .wechatTips {
          margin-top: 20px;
          position: relative;
          height: 22px;
          .wechatlogin {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .screen {
            width: 21px;
            height: 22px;
          }
          .sao {
            font-size: 16px;
            color: #666;
            height: 22px;
            line-height: 22px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .footer {
    background: #111214;
    height: 74px;
    font-size: 13px;
    // position: fixed;
    width: 100%;
    // bottom: 0;
    padding-bottom: 20px;
    .container {
      width: 1200px;
      margin: 0 auto;
    }
    .links {
      margin-top: 10px;
      .tips {
        color: #666666;
        line-height: 27px;
        width: 428px;
      }
      .linkc {
        color: #666666;
        width: 64%;
      }
      .lianjie {
        color: #8b8484;
        line-height: 27px;
        margin: 0 5px;
      }
      .lianjie:hover {
        color: #0a51fb;
      }
    }
    .linkb {
      .basic {
        margin-top: 4px;
        margin-left: 4px;
        .lianjie:hover {
          color: #0a51fb;
        }
      }
    }
  }
}
</style>
<style lang="less">
.index {
  .content {
    .messageLgin {
      .el-tabs__active-bar {
        height: 0px !important;
        background-color: #999 !important;
      }
    }
  }
  .login {
    .el-tabs__active-bar {
      height: 3px !important;
      background-color: #0195ff !important;
    }
    .el-tabs__item.is-active {
      color: #0195ff !important;
    }
    .el-tabs__item {
      font-size: 16px !important;
    }
    .el-tabs__item:hover {
      color: #666;
      cursor: pointer;
    }
    .el-input__inner {
      height: 46px !important;
    }
    .el-button span {
      font-size: 20px !important;
    }
    .el-tabs__header {
      margin: 0;
    }
  }
  .verify {
    .verify-bar-area {
      height: 34px !important;
      line-height: 34px !important;
      background: #e8e8e8 !important;
      color: #666 !important;
      border: 0 none;
    }
    .verify-move-block {
      height: 32px !important;
      line-height: 32px !important;
      background-color: #fff !important;
      border: 1px solid #ccc !important;
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
    }
    .icon-check:before {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
        no-repeat center !important;
    }
    .icon-right:before b {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
        no-repeat center !important;
    }
    .verify-left-bar {
      height: 33px !important;
      line-height: 32px !important;
      border: 1px solid #ccc !important;
      background-color: #7ac23c !important;
    }
  }
}
</style>
