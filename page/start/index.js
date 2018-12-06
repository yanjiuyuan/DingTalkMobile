import pub from '/util/public';


var globalData = getApp().globalData
Page({
  ...pub.func,
  onShow(a) {
    this.getMenu()
  },
  data: {
    ...pub.data,
    pageName: 'component/index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    sort: [{
      SORT_ID: 4,
      SORT_NAME: '采购管理',
      IsEnable: 1,
      State: 1
    }],
    sort: []
  },
  getMenu(){
    var that = this
    this.requestData('GET', 'FlowInfo/LoadFlowSort?id=123', function(res) {
      that.sort = res
      that.requestData('GET', 'FlowInfo/LoadFlowInfo?id=123',function(res){
        var temp = that.mergeObjectArr(res.data,that.data.menu,'flowId')
        that.setData({
          menu: temp
        })
        console.log(temp)
      })
    })
  }
  
});
