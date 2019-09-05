const app = getApp();
Page({
  data: {
    str1:"+",
    
  },
  onLoad() {
    console.log(app.globalData.menu);
    this.setData({
      menu:app.globalData.menu,
      sort:app.globalData.sort
    })
  },
  onShow() {},

  //打开显示隐藏
  showOrClose(){
    
  }
});
