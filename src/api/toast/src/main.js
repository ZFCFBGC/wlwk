import Vue from 'vue'
import toastVue from './main.vue'
const swdToastConstructor = Vue.extend(toastVue)
const swdToast = function(options, success) {}
var instance = new swdToastConstructor({
  el: document.createElement('div')
})
var timer
swdToast.show = (options) => {
  document.body.appendChild(instance.$el);
  instance.show = true;
  if(options.type == undefined || options.type == 'undefined' || options.type == 'success'){
    instance.showIcon = true;
    instance.styleClass = 'cont';
    instance.className = 'icon iconfont icon-success';
    instance.msg = '操作成功';
  }else if(options.type == 'fail'){
    instance.showIcon = true;
    instance.styleClass = 'failCont';
    instance.className = 'icon iconfont icon-error1';
    instance.msg = '操作失败';
  }else if(options.type == 'exception'){
    instance.showIcon = true;
    instance.styleClass = 'cont';
    instance.className = 'icon iconfont icon-shibaibiaoqing';
    instance.msg = '网络异常';
  }else if(options.type == 'none'){
    instance.showIcon = false;
    instance.styleClass = 'cont none';
    instance.msg = '网络异常';
  }
  if(options.content != undefined){
    instance.msg = options.content;
  }
  setTimeout(() => {
    if(options != undefined){
      if(typeof(options.success) == 'function'){
        options.success();
      }
      if(typeof(options.complete) == 'function'){
        options.complete();
      }
    }
  },0)
  var duration = options.duration || 2000;
  timer = setTimeout(function(){
    instance.show = false;
  },duration);
}
swdToast.hide = (options) => {
  clearTimeout(timer);
  instance.show = false
}

export default swdToast
