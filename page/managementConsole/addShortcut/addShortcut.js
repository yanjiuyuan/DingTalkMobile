const app = getApp();
Page({
  data: {},
  onLoad(options) {
    let item = JSON.parse(options.item);
    console.log(item);
    this.setData({
      menu:app.globalData.menu,
      sort_one:item,
      title:item.SORT_NAME
    })
  },


  //添加
  add(e){
    let item = e.target.dataset.item;
    item.sortName = this.data.title;
    this.data.sort_one.flows.push(item);
    
  }
});
