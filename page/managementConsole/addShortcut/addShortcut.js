const app = getApp();
Page({
  data: {},
  onLoad(options) {
    let title = options.title;
    console.log(app.globalData.menu);
    this.setData({
      menu:app.globalData.menu,
      title:title
    })
  },

});
