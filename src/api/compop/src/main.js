import Vue from 'vue'
import compopVue from './main.vue'
const swdCompopConstructor = Vue.extend(compopVue)
const swdCompop = function() {}
var instance = new swdCompopConstructor({
  el: document.createElement('div')
})
swdCompop.show = (options) => {
  document.body.appendChild(instance.$el);
  instance.show = true;
  // if(eleExist(options)){
  //   if(eleExist(options.title)){
  //     instance.title = options.title;
  //   }else{
  //     instance.titleShow = false;
  //   }
  //   if(eleExist(options.content)){
  //     instance.content = options.content;
  //   }else{
  //     instance.contentShow = false;
  //   }
  //   if(eleExist(options.cont)){
  //     instance.cont = options.cont;
  //   }else{
  //     instance.contShow = false;
  //   }
  //   if(eleExist(options.)){
  //     instance.confirmTxt = options.confirmButtonText;
  //   }
  //   if(eleExist(options.cancelButtonText)){
  //     instance.cancelTxt = options.cancelButtonText;
  //   }
  // }
  if(options){
    Object.assign(instance, options)
    instance.title?instance.titleShow = true:instance.titleShow = false
    instance.content?instance.contentShow = true:instance.contentShow = false
    instance.contShow?instance.contShowShow = true:instance.contShowShow = false
    instance.confirmButtonText?instance.confirmButtonTextShow = true:instance.confirmButtonTextShow = false
    instance.cancelTxt?instance.cancelTxtShow = true:instance.cancelTxtShow = false
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
  };
  if(options.autoClose===true){
    setTimeout(() => {
      instance.show = false;
    }, 2000);
  }
}
function eleExist(el){
  if(el != undefined && el != null){
    return true
  }else{
    return false
  }
}
export default swdCompop
