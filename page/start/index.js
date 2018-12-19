import pub from '/util/public';


var globalData = getApp().globalData
Page({
  ...pub.func,
  onShow(a) {
    this.getMenu()
  },
  onLoad(){
    this.checkLogin(function(){})
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
  //选人控件方法
  choosePeople(e){
    console.log('start choose people')
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: false,
      success: function(res) {
        console.log(res)
        // res = 
        // {
        //     selectedCount:1,                              //选择人数
        //     users:[{"name":"大猩猩","avatar":"","userId":"manager325"}],//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
        //     departments:[{"id":"","name":"","number":""}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        // }
        if(res.users.length > 0){
          let name = res.users[0].name
          let userId = res.users[0].userId
          that.setData({ DingData:{
            nickName:name,
            userid:userId
          } })
        }
      },
      fail: function(err) {

      }
    })
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
