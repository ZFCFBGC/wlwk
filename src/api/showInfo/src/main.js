import Vue from 'vue'
import showInfoVue from './main.vue'
const swdShowInfoConstructor = Vue.extend(showInfoVue)
const swdShowInfo = function() {}
var instance = new swdShowInfoConstructor({
  el: document.createElement('div')
})
swdShowInfo.show = (options) => {
  document.body.appendChild(instance.$el)
  instance.show = true;
  if(eleExist(options)){
    if(eleExist(options.title) ){
      instance.title = options.title;
    }
    if(eleExist(options.content)){
      instance.content = options.content;
    }
    if(eleExist(options.errorTitle)){
      instance.errorTitle = options.errorTitle;
    }
    if(eleExist(options.errorCode)){
      instance.errorCode = options.errorCode;
    }
    if(eleExist(options.btnList)){
      instance.items = options.btnList;
    }else{
      instance.items = [{"text":"确认","active":true}];
    }
    instance.btnClick = function(index){
      instance.show = false;
      if(typeof(options.success) == 'function'){
        options.success(index);
      }
      if(typeof(options.complete) == 'function'){
        options.complete(index);
      }
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
export default swdShowInfo
