import lib from "/lib.js"
import template from "/util/template/template.js"

let logs = [];

export default {
  data:{
    ...lib.data,
    ...template.data,
    DingData:{
      nickName:'詹姆斯',
      departName:'图书馆',
      userid:'manager325'
    },
    hideMask: false,
    param: {},
    IsNeedChose:false,
    flowid:0,
    taskid:0,
    nodeId:0,
    projectIndex:0,
    nodeList:[],
    projectList:[],
    nodeInfo:{},
    isback: false,
    disablePage:false
  },

  func:{
    ...lib.func,
    ...template.func,
    onReady() {
      this.checkLogin()
    },
    start: {
      onLoad(a) {
        console.log('on load~~~~~~~~~~')
        console.log(a)
        this.data.flowid == a.flowid
        this.setData({
          flowid:8
        })
        this.getNodeList()
        this.getProjectList()
        this.getNodeInfo()
      },

      onUnload() {
      },

      onHide() {
      },
      //提交审批
      approvalSubmit(param = {}, callBack, param2 = {}) {
          var that = this
          that.disablePage = true
          var paramArr = []
          var applyObj = {
              "ApplyMan": that.data.DingData.nickName,
              "ApplyManId": that.data.DingData.userid,
              "Dept": that.data.DingData.departName,
              "NodeId": "0",
              "ApplyTime": that._getTime(),
              "IsEnable": "1",
              "FlowId": that.data.flowid + '',
              "IsSend": false,
              "State": "1",
          }
          for (let p in param) {
              applyObj[p] = param[p]
          }
          paramArr.push(applyObj)
          for (let node of that.data.nodeList) {
              if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0) || (node.NodeName.indexOf('申请人') >= 0 && node.NodeId>0)) {
                  if (node.AddPeople.length == 0) {
                      dd.alert({
                        content:'您尚未选择审批人'
                      })
                      that.data.disablePage = false
                      return
                  }
                  for (let a of node.AddPeople) {
                      let tmpParam = {
                          "ApplyMan": a.name,
                          "ApplyManId": a.userId,
                          "IsEnable": 1,
                          "FlowId": that.data.flowid + '',
                          "NodeId": node.NodeId + '',
                          "IsSend": false,
                          "State": 0,
                          "OldFileUrl": null,
                          "IsBack": null
                      }
                      for (let p2 in param2) {
                            tmpParam[p2] = param2[p2]
                      }
                      paramArr.push(tmpParam)
                  }
              }
          }
          console.log('提交审批参数')
          console.log(paramArr)
          that.requestData('POST', "FlowInfo/CreateTaskInfo", function(res) {
            let taskid = res.data.Content
            console.log(taskid)
            callBack(taskid)
          },JSON.stringify(paramArr))
      },
    },
    dowith: {
      onLoad(a) {

      },

      onUnload() {
      },

      onHide() {
      },
    },
    //审批所有流程通过，后续处理
    doneSubmit(text) {
        if (!text) text = '提交审批成功'
        dd.alert({
          content:text,
          success(){
            dd.navigateTo({
              url: 'start/index'
            })
          }
        })
        
    },
    getNodeList() {
      var that = this
      let param = {
        FlowId:this.data.flowid,
        TaskId:this.data.taskid
      }
      if(this.data.taskid == 0)
        param = {
          FlowId:this.data.flowid
        }
      this.requestData('GET', "FlowInfo/GetSign" + this.formatQueryStr(param), function(res) {
        let lastNode = {}
        let tempNodeList = []
        //审批人分组
        for (let node of res.data) {
            if (lastNode.NodeName == node.NodeName && !lastNode.ApplyTime && !node.ApplyTime) {
                tempNodeList[tempNodeList.length - 1].ApplyMan = tempNodeList[tempNodeList.length - 1].ApplyMan + ',' + node.ApplyMan
            }
            else {
                tempNodeList.push(node)
            }
            lastNode = node
        }
        for (let node of tempNodeList) {
            node['AddPeople'] = []
            //抄送人分组
            if (node.ApplyMan && node.ApplyMan.length > 0)
                node.NodePeople = node.ApplyMan.split(',')
            //申请人设置当前人信息
            if (node.NodeName.indexOf('申请人') >= 0 && !node.ApplyMan) {
                node.ApplyMan = that.data.DingData.nickName
                node.AddPeople = [{
                    name: that.data.DingData.nickName,
                    emplId: that.data.DingData.userid
                }]
            }
        }
        console.log('~~~~~~~~~~~!!!')
        console.log(tempNodeList)
        that.setData({
          nodeList:tempNodeList,
          isBack:res.data[0].IsBack
        })
      })
    },
    getProjectList() {
      var that = this
      this.requestData('GET', "Project/GetAllProJect", function(res) {
        that.setData({
          projectList:res.data
        })
      })
    },
    getNodeInfo() {
      var that = this
      this.requestData('GET', "FlowInfo/getnodeinfo" + this.formatQueryStr({FlowId:this.data.flowid,nodeId:this.data.nodeId}),
       function(res) {
        that.setData({
          nodeInfo:res.data[0],
          IsNeedChose: res.data[0].IsNeedChose
        })
      })
    },
    checkLogin(){
      var that = this
      //检查登录
      this.createMaskShowAnim()
      var app = getApp()
      var interval = setInterval(function() {
        app = getApp()
        if (app.userInfo && app.userInfo.data) {
          that.createMaskHideAnim()
          that.setData({ hideMask: true })
          clearInterval(interval)
          return
        }
      }, 200)
    },
    bindPickerChange(e){
      this.setData({
      projectIndex: e.detail.value,
    });
    }
  },
  

  
};

