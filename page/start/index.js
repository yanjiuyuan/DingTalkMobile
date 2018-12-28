import pub from '/util/public';


var globalData = getApp().globalData
Page({
  ...pub.func,
  onShow(a) {
    this.getMenu()
  },
  onLoad(){
    this.checkLogin(function(){})
    this.getUserInfo()
  },
  data: {
    ...pub.data,
    pageName: 'component/index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    userIndex: -1,
    userList:[],
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
          var app = getApp()
          app.userInfo.name = name
          app.userInfo.userid = userId
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
  //选人操作
  selectUser(value) {
    console.log(value)
    console.log(value.detail.value)
    let userIndex = value.detail.value
    let name = this.data.userList[userIndex].NodePeople
    let userId = this.data.userList[userIndex].PeopleId
    var app = getApp()
    app.userInfo.name = name
    app.userInfo.userid = userId
    this.setData({ DingData:{
        nickName:name,
        userid:userId
      },
      userIndex:value.detail.value
    })
  },
  getUserInfo() {
      var that = this
      this.requestData('GET', 'FlowInfo/GetUserInfo',function(res){
        that.setData({
          userList: res.data
        })
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
