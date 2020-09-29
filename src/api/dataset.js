const dataset = {
  /**
   * @param {*} el:event事件对象
   * @param {*} type:事件类型
   */
  getData(el,type){
    var _this = this;
    var dataset = {};
    var currentDataset = {};
    var attrs = el.target.attributes;
    var currentAttrs = el.currentTarget.attributes;
    for(var s in attrs){
      if(attrs[s].name != undefined && attrs[s].name != 'undefined'){
        if(attrs[s].name.indexOf('data-') >= 0){
          if(attrs[s].name.indexOf('data-v-') < 0){
            var str = attrs[s].name.split('data-')[1];
            dataset[str] = attrs[s].value;
          }
        }
      }
    }
    for(var s in currentAttrs){
      if(currentAttrs[s].name != undefined && currentAttrs[s].name != 'undefined'){
        if(currentAttrs[s].name.indexOf('data-') >= 0){
          if(currentAttrs[s].name.indexOf('data-v-') < 0){
            var str = currentAttrs[s].name.split('data-')[1];
            currentDataset[str] = currentAttrs[s].value;
          }
        }
      }
    }
    var data = {
      changedTouches:{
        clientX: el.clientX || '',
        clientY: el.clientY || '',
        pageX: el.pageX || '',
        pageY: el.pageY || ''
      },
      currentTarget:{
        dataset: currentDataset,
        id: el.currentTarget.id,
        offsetLeft: el.currentTarget.offsetLeft,
        offsetTop: el.currentTarget.offsetTop,
        timeamp: el.timeStamp
      },
      target:{
        dataset: dataset,
        id: el.target.id,
        offsetLeft: el.target.offsetLeft,
        offsetTop: el.target.offsetTop,
        timeamp: el.timeStamp
      },
      touches:[
        {
          clientX: el.clientX || '',
          clientY: el.clientY || '',
          pageX: el.pageX || '',
          pageY: el.pageY || ''
        }
      ],
      type: type
    };
    return data;
  }
}
export default dataset
