import Vue from 'vue'
import confirmVue from './main.vue'
const swdPayConstructor = Vue.extend(confirmVue)
const swdPay = function() {}
var instance = new swdPayConstructor({
  el: document.createElement('div')
})
swdPay.show = (options) => {
  document.body.appendChild(instance.$el);
  instance.show = true;
  if(eleExist(options)){
    if(eleExist(options.title)){
      instance.title = options.title;
    }else{
      instance.titleShow = false;
    }
    //价格必传
    if(eleExist(options.price)){
      instance.price = options.price;
    }else{
      instance.priceShow = false;
    }

    if(eleExist(options.showTime)){
      instance.showTime = options.showTime;
    }else{
      instance.showTime = false;
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
export default swdPay
