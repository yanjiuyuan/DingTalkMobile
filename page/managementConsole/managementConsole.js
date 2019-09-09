const app = getApp();
Page({
  data: {},
  onLoad() {
    console.log(app.globalData.sort);
    this.setData({
      sort:app.globalData.sort,
      menu:app.globalData.menu,
      sortItems:app.globalData.sortItems,

    })
  },

  //添加快捷方式
  addShortcut(e){
    console.log(e);
    let title = e.target.dataset.title;
      dd.navigateTo({
        url: '/page/managementConsole/addShortcut/addShortcut?title=' + title　　
      })
  },

  //修改名字
  modifyName(){
    dd.alert({
      content:"修改名字"
    })
  },

  //删除一整个分组
  delete(e){

    let item = e.target.dataset.item;
    dd.alert({
      content:"是否删除" + item.SORT_NAME + "整个分组"
    })
  },
  //删除这一项
  deleteItem(e){
    console.log(e);
    let item = e.target.dataset.item;
    dd.alert({
      content:"是否删除" + item.FlowName
    })
  },
  

  // 新增
  increase(){
      dd.alert({
      content:"是否新增"
    })
  },

  //排序
  sort(){
    dd.navigateTo({
        // url: "/page/managementConsole/sort/sort"
        // url: "/page/managementConsole/sortTest/sortTest"
        url: "/page/managementConsole/sortTest_1/sortTest_1"


    })
  }

});
