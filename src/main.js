// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import swd from "@/api"
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import {
  Button,
  Select,
  Dialog,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Icon,
  Tabs,
  TabPane,
  Input,
  Checkbox,
  CheckboxGroup,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Pagination,
  Popover,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  Message,
  Autocomplete,
  MessageBox,
  Tooltip,
  Upload,
  RadioGroup,
  Radio,
  Tree,
  Form,
  Progress,
  FormItem,
  Loading
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import Cookies from "js-cookie";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import twLocale from "element-ui/lib/locale/lang/zh-TW";
import VueI18n from "vue-i18n";

/* 初始化CSS, 公共类样式*/
import "@/assets/css/base.less";

//工具类函数
import Tools from "@/assets/js/tools.js";
//console.log('工具',Tools)

//请求封装函数
import client from "@/assets/js/client.js";
Vue.prototype.$client = client;

//sentry 错误监控
process.env.NODE_ENV === "production" &&Sentry.init({
  dsn: 'https://28a939eadd9345b2a0662d6013dc8246@o424289.ingest.sentry.io/5355890',
  integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
});

// cookie插件的引用挂载
Vue.use(Cookies);
Vue.prototype.$cookie = Cookies;

// 设置语言
Vue.use(VueI18n);
locale.use(lang);

// InitLanguage  这里引入了js-cookie,是为了将用户选择的语言存储到Cookie里，在以后访问站点不需要重新选择语言
function InitLanguage() {
  //console.log("cookie", Cookies);
  return Cookies.get("lang") == null ? "zh-CN" : Cookies.get("lang");
}

const i18n = new VueI18n({
  locale: InitLanguage(), // 语言标识,默认汉语,先去cookie查找，如果存在并有效，cookie值即为默认语言类型；否则默认为中文简体
  messages: {
    "en-US": Object.assign(require("../static/lang/en"), enLocale),
    "zh-CN": Object.assign(require("../static/lang/zh-CN"), zhLocale),
    "zh-TW": Object.assign(require("../static/lang/zh-TW"), twLocale)
  },
  silentTranslationWarn: true
});
//element ui按需加载国际化
locale.i18n((key, value) => i18n.t(key, value));

// 在调用 Vue.use 前，给 Message 添加 install 方法
// Message.install = function (Vue, options) {
//   Vue.prototype.$message = Message
// }

// 引入组件
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DatePicker);
Vue.use(Autocomplete);
Vue.use(Tree);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Progress);
Vue.use( Dialog);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;

/* 事件总线：保存全局变量，用于组件通讯 */
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  components: { App },
  template: "<App/>",
  beforeCreate() {
    window.Tools = Tools;
    window.swd = swd;
  }
});
