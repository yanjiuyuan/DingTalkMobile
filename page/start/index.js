import pub from '/util/public';


var globalData = getApp().globalData
Page({
  ...pub.func,
  onLoad(){
    this.getMenu()
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
    sort: []
  },
  //选人控件方法
  choosePeople(e){

    // this.upLoadFile()
    // return
    console.log('start choose people')
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: false,
      success: function(res) {
        console.log(res)
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

  upLoadFile(){
    dd.uploadAttachmentToDingTalk({
        image:{multiple:true,compress:false,max:9,spaceId: "12345"},
        space:{spaceId:"12345",isCopy:1 , max:9},
        file: {spaceId:"12345",max:1},
        types:["photo","camera","file","space"],//PC端仅支持["photo","file","space"]
        success: (res) => {
          console.log(res)
          dd.alert({
              content:JSON.stringify(res)
          })
          /*
          {
              type:'', // 用户选择了哪种文件类型 ，image（图片）、file（手机文件）、space（钉盘文件）
              data: [
                {
                  spaceId: "232323",
                  fileId: "DzzzzzzNqZY",
                  fileName: "审批流程.docx",
                  fileSize: 1024,
                  fileType: "docx"
                },
                {
                  spaceId: "232323",
                  fileId: "DzzzzzzNqZY",
                  fileName: "审批流程1.pdf",
                  fileSize: 1024,
                  fileType: "pdf"
                },
                {
                  spaceId: "232323",
                  fileId: "DzzzzzzNqZY",
                  fileName: "审批流程3.pptx",
                  fileSize: 1024,
                  fileType: "pptx"
                }
              ]
    
          }
            */
        },
        fail: (err) =>{
            dd.alert({
                content:JSON.stringify(err)
            })
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
      this._getData('FlowInfoNew/GetUserInfo',function(data){
        that.setData({
          userList: data
        })
      })
  },
  getMenu(){
    var that = this
    this._getData('FlowInfoNew/LoadFlowSort?id=123', function(data) {
      let sorts = data
      that.setData({sort:data})
      that._getData('FlowInfoNew/LoadFlowInfo?id=123',function(data){
        var temp = that.mergeObjectArr(data,that.data.menu,'flowId')
        for(let s of sorts){
          s['show'] = false
          for(let t of temp){
            if(t.url && t.sortId == s.SORT_ID){
              s['show'] = true
              break
            }
          }
        }
        that.setData({
          sort:sorts,
          menu: temp
        })
      })
    })
  }
  
});
