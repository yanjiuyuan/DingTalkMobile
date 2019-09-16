const app = getApp();
Page({
  data: {
    ifName: false,
    title:"请输入分组名称",
    animMaskData:[],//遮罩层
  },
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
    this.setData({
      ifName:!this.data.ifName
    })
  },

  //排序
  sort(){
    dd.navigateTo({
        // url: "/page/managementConsole/sort/sort"
        url: "/page/managementConsole/sortTest/sortTest"
        // url: "/page/managementConsole/sortTest_1/sortTest_1"



    })
  },
  Submit(e){
    let groupName = e.detail.value.groupName;
    this.setData({
      ifName:!this.data.ifName
    })
  },

  cancel(){
    this.setData({
      ifName:!this.data.ifName
    })
  }

});
