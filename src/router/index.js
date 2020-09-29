import Vue from 'vue'
import Router from 'vue-router'
import Cookies from "js-cookie";
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const index = ()=>import(/* webpackChunkName: "Index" */"@/page/index/index.vue")
const login = ()=>import(/* webpackChunkName: "Login" */ "@/page/login/login.vue")
const statementFlow = ()=>import(/* webpackChunkName: "statementFlow" */ "@/page/reportForms/statementFlow.vue")
const statementNote = ()=>import(/* webpackChunkName: "statementNote" */ "@/page/reportForms/statementNote.vue")
const statementPull = ()=>import(/* webpackChunkName: "statementPull" */ "@/page/reportForms/statementPull.vue")
const statementPre = ()=>import(/* webpackChunkName: "statementPre" */ "@/page/reportForms/statementPre.vue")
const statementCancel = ()=>import(/* webpackChunkName: "statementCancel" */ "@/page/reportForms/statementCancel.vue")
const home = ()=>import(/* webpackChunkName: "Home" */ "@/page/home/home.vue")
const phoneCardMan = ()=>import(/* webpackChunkName: "phoneCardMan" */ "@/page/phoneCard/phoneCardMan.vue")
const flowPool = ()=>import(/* webpackChunkName: "flowPool" */ "@/page/phoneCard/flowPool.vue")
const phoneCardPre = ()=>import(/* webpackChunkName: "phoneCardPre" */ "@/page/phoneCard/phoneCardPre.vue")
const phoneCardRef = ()=>import(/* webpackChunkName: "phoneCardRef" */ "@/page/phoneCard/phoneCardRef.vue")
const phoneCardSal = ()=>import(/* webpackChunkName: "phoneCardSal" */ "@/page/phoneCard/phoneCardSal.vue")
const salesDetails = ()=>import(/* webpackChunkName: "salesDetails" */ "@/page/phoneCard/salesDetails.vue")
const manage = ()=>import(/* webpackChunkName: "Manage" */ "@/page/manage/manage.vue")
const rebateRecord = ()=>import(/* webpackChunkName: "rebateRecord" */ "@/page/financialManage/rebateRecord.vue")
const rechargeRecord = ()=>import(/* webpackChunkName: "rechargeRecord" */ "@/page/financialManage/rechargeRecord.vue")
const account = ()=>import(/* webpackChunkName: "account" */ "@/page/financialManage/account.vue")
const agentAccount = ()=>import(/* webpackChunkName: "agentAccount" */ "@/page/financialManage/agentAccount.vue")
const operationLog = ()=>import(/* webpackChunkName: "operationLog" */ "@/page/management/operationLog.vue")
const managementCard = ()=>import(/* webpackChunkName: "managementCard" */ "@/page/management/managementCard.vue")
const managementRol = ()=>import(/* webpackChunkName: "managementRol" */ "@/page/management/managementRol.vue")

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta:{
        title:'物联网卡'
      }
    },
    {
      path: '/index',
      //name: 'Index',
      component: index,
      meta:{
        title:'物联网卡'
      },
      children:[{
        path: '/',
        name: 'Home',
        component: home,
      },{
        path: 'reportForms/statementFlow',
        name: 'StatementFlow',
        component: statementFlow,
      },{
        path: 'reportForms/statementNote',
        name: 'StatementNote',
        component: statementNote,
      },{
        path: 'reportForms/statementPull',
        name: 'StatementPull',
        component: statementPull,
      },{
        path: 'reportForms/statementPre',
        name: 'StatementPre',
        component: statementPre,
      },{
        path: 'reportForms/statementCancel',
        name: 'statementCancel',
        component: statementCancel,
      },{
        path: 'phoneCard/phoneCardMan',
        name: 'PhoneCardMan',
        component: phoneCardMan,
      },{
        path: 'phoneCard/flowPool',
        name: 'FlowPool',
        component: flowPool,
      },{
        path: 'phoneCard/phoneCardPre',
        name: 'PhoneCardPre',
        component: phoneCardPre,
      },{
        path: 'phoneCard/phoneCardRef',
        name: 'PhoneCardRef',
        component: phoneCardRef,
      },{
        path: 'phoneCard/phoneCardSal',
        name: 'PhoneCardSal',
        component: phoneCardSal,
      },{
        path: 'phoneCard/salesDetails',
        name: 'SalesDetails',
        component: salesDetails,
      },{
        path: 'manage/manage',
        name: 'Manage',
        component: manage,
      },{
        path: 'financialManage/rebateRecord',
        name: 'RebateRecord',
        component: rebateRecord,
      },{
        path: 'financialManage/rechargeRecord',
        name: 'RechargeRecord',
        component: rechargeRecord,
      },{
        path: 'financialManage/account',
        name: 'Account',
        component: account,
      },{
        path: 'financialManage/agentAccount',
        name: 'AgentAccount',
        component: agentAccount,
      },{
        path: 'management/operationLog',
        name: 'OperationLog',
        component: operationLog,
      },{
        path: 'management/managementCard',
        name: 'ManagementCard',
        component: managementCard,
      },{
        path: 'management/managementRol',
        name: 'ManagementRol',
        component: managementRol,
      }]
    },
    { path: '/', redirect: '/login' }
  ]
})
router.beforeEach((to, from, next) => {
  Cookies.set(
    "active",
    to.name //
  );
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
