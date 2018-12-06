import pub from '/util/public';
Page({
  ...pub.func,
  data: {
    ...pub.data,
    activeItem:0,
    pageIndex:1,
    pageCount:0,
    items:[
      {
        index:0,
        name:'待我审批',
        image:'../../image/1.png'
      },
      {
        index:1,
        name:'我已审批',
        image:'../../image/1.png'
      },
      {
        index:2,
        name:'我发起的',
        image:'../../image/2.png'
      },
      {
        index:3,
        name:'抄送我的',
        image:'../../image/3.png'
      }
    ],
    approveList:[]
  },
  onLoad() {
    this.checkLogin()
    let app = getApp()
    var DingData = {
      nickName:app.userInfo.name,
      departName:app.userInfo.dept,
      userid:app.userInfo.userid
    }
    console.log('get list~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(app.userInfo)
    this.setData({
      DingData:DingData
    })
    this.getApproveList(0)
  },
  onReady() {
  },
  changeItem(e)
  {
    let index = e.target.dataset.index
    if(index == this.data.activeItem) return
    this.setData({
      activeItem:index
    })
    this.getApproveList(index)
  },
  //获取审批列表
  getApproveList(index){
    var that = this
    that.requestData('GET', 'FlowInfo/GetFlowStateDetail' + that.formatQueryStr({Index:index,ApplyManId:that.data.DingData.userid,IsSupportMobile:true}) , function(res) { 
      that.setData({
        'approveList': res.data.slice(0,20),
        pageCount:Math.ceil(res.data.length/5)
      })
    })
  },
  //跳转到详细页面
  toDetial(e){
    let row = e.target.dataset.row
    var that = this
    console.log(row)
    if(this.data.activeItem == 3){
      that.requestData('GET', 'FlowInfo/ChangeSendState' + that.formatQueryStr({TaskId:row.TaskId,UserId:that.data.DingData.userid}) , function(res) { 
        that.router(row)
      })
    }else{
      that.router(row)
    }
  },
  router(row){
    if (row.TaskId && row.FlowId) {
        let param = {
            taskid: row.TaskId,
            flowid: row.FlowId,
            nodeid: row.NodeId,
            id: row.Id,
            index: this.data.activeItem,
            state: row.State
        }
        if (row.FlowId == 8) {
            dd.navigateTo({
              url: '/page/approveDetail/purchase/purchase' + this._formatQueryStr(param)
            })
            return
        }
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    
  }
});
