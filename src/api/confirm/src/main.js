import Vue from 'vue'
import confirmVue from './main.vue'
const swdConfirmConstructor = Vue.extend(confirmVue)
const swdConfirm = function() {}
var instance = new swdConfirmConstructor({
  el: document.createElement('div')
})
swdConfirm.show = (options) => {
  document.body.appendChild(instance.$el);
  instance.show = true;
  if(eleExist(options)){
    if(eleExist(options.title)){
      instance.title = options.title;
    }else{
      instance.titleShow = false;
    }
    // 判断内容是否带有type
    if(eleExist(options.type)){
      instance.type = options.type;
    }else{
      instance.typeShow = false;
    }
    // type类型的tips
    if(eleExist(options.typeTips)){
      instance.typeTips = options.typeTips;
    }else{
      instance.typeTipShow = false;
    }

    if(eleExist(options.content)){
      instance.content = options.content;
    }else{
      instance.contentShow = false;
    }
    if(eleExist(options.confirmButtonText)){
      instance.confirmTxt = options.confirmButtonText;
    }
    if(eleExist(options.cancelButtonText)){
      instance.cancelTxt = options.cancelButtonText;
    }
  }
  instance.confirmClick = function(){
    instance.show = false;
    if(typeof(options.success) == 'function'){
      options.success({
        confirm: true,
        cancel: false
      });
    }
    if(typeof(options.complete) == 'function'){
      options.complete({
        confirm: true,
        cancel: false
      });
    }
  };
  instance.cancelClick = function(){
    instance.show = false;
    if(typeof(options.success) == 'function'){
      options.success({
        confirm: false,
        cancel: true
      });
    }
    if(typeof(options.complete) == 'function'){
      options.complete({
        confirm: false,
        cancel: true
      });
    }
  }
}
function eleExist(el){
  if(el != undefined && el != null){
    return true
  }else{
    return false
  }
}
export default swdConfirm
