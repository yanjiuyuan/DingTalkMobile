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
    nodeid:0,
    projectIndex:0,
    nodeList:[],
    projectList:[],
    nodeInfo:{},
    //审批页面变量
    dingList:[],//需要钉一下的人
    tableInfo:{},//审批表单信息
    isback: false,
    remark:'',

    disablePage:false
  },

  func:{
    ...lib.func,
    ...template.func,
    onReady() {
      this.checkLogin()
    },
    start: {
      onLoad(param) {
        console.log('start page on load~~~~~~~~~~')
        console.log(param)
        this.data.flowid == param.flowid
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
      onLoad(param) {
        console.log('dowith page on load~~~~~~~~~~')
        console.log(param)
        this.setData({
          flowid:param.flowid,
          index:param.index,
          nodeid:param.nodeid,
          taskid:param.taskid,
          state:param.state
        })
        this.getFormData()
        this.getBomInfo()
        this.getNodeList()
        this.getNodeInfo()
      },

      onUnload() {
      },

      onHide() {
      },
      //审批-同意
      aggreSubmit(param){
        this.setData({
          disablePage:true
        })
        var paramArr = []
        var that = this
        paramArr.push({
            "TaskId": that.data.taskid,
            "ApplyMan": that.data.DingData.nickName,
            "ApplyManId": that.data.DingData.userid,
            "Dept": that.data.DingData.departName,
            "NodeId": that.data.nodeid,
            "ApplyTime": that._getTime(),
            "IsEnable": "1",
            "FlowId": that.data.flowid,
            "IsSend": "false",
            "State": "1",
            "Id": that.data.tableInfo.Id,
            "Remark": that.data.remark
        })
        for (let p in param) {
            paramArr[0][p] = param[p]
        }
        for (let node of this.data.nodeList) {
            if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0) || (node.NodeName == "采购员采购" && node.AddPeople.length >0)) {
                if (node.AddPeople.length == 0) {
                    dd.alert({
                      content:'您尚未选择审批人'
                    });
                    this.setData({
                      disablePage:false
                    })
                    return
                }
                for (let a of node.AddPeople) {
                    let tmpParam = {
                        "ApplyMan": a.name,
                        "ApplyManId": a.emplId,
                        "TaskId": that.data.taskid,
                        "ApplyTime": null,
                        "IsEnable": 1,
                        "FlowId": that.data.flowid,
                        "NodeId": node.NodeId,
                        "Remark": null,
                        "IsSend": node.IsSend,
                        "State": 0,
                        "ImageUrl": null,
                        "FileUrl": null,
                        "IsPost": false,
                        "OldImageUrl": null,
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
        console.log('同意审批了~~~~~~~~~')
        console.log(this.data.nodeList)
        console.log(paramArr)
        that.requestData('POST', "FlowInfo/SubmitTaskInfo", function(res) {
            let daat = res.data
            if (res.data && res.data.errorCode == 0) {
                  dd.alert({
                    content:'审批成功',
                    success: () => {
                      dd.navigateTo({
                        url: '/page/approve/approve'
                      })
                    }
                  });
                } else {
                  dd.alert({
                    content:'审批发生错误'
                  });
                }
          },JSON.stringify(paramArr))
      },

      //退回审批
      returnSubmit(option) {
        this.setData({
          disablePage:true
        })
        var that = this
        var param = {
            "TaskId": that.data.taskid,
            "ApplyMan": that.data.DingData.nickName,
            "ApplyManId": that.data.DingData.userid,
            "Dept": that.data.DingData.departName,
            "NodeId": that.data.nodeid,
            "ApplyTime": that._getTime(),
            "IsEnable": "1",
            "FlowId": that.data.flowid,
            "IsSend": "false",
            "State": "1",
            "BackNodeId": that.data.nodeInfo.BackNodeId,
            "Id": that.data.tableInfo.Id,
            "Remark": that.data.remark
        }
        for (let o in option) {
            param[o] = option[o]
        }
        that.requestData('POST', "FlowInfo/FlowBack", function(res) {
            let daat = res.data
            if (res.data && res.data.errorCode == 0) {
                  dd.alert({
                    content:'审批成功',
                    success: () => {
                      dd.navigateTo({
                        url: '/page/approve/approve'
                      })
                    }
                  });
                } else {
                  dd.alert({
                    content:'审批发生错误'
                  });
                }
          },JSON.stringify(param))
      },

      //获取审批表单信息
      getFormData(){
        var that = this
        var param = {
          ApplyManId:this.data.DingData.userid,
          nodeId:this.data.nodeid,
          TaskId:this.data.taskid
        }
        this.requestData('GET', "FlowInfo/GetApproveInfo" + this.formatQueryStr(param),
        function(res) {
          that.setData({
            tableInfo: res.data
          })
        })
      },
      //获取审批表单Bom表数据
      getBomInfo(){
        var that = this
          this.requestData('GET', "Purchase/ReadPurchaseTable" + this.formatQueryStr({TaskId:this.data.taskid}),
          function(res) {
            that.setData({
              data: JSON.parse(res.data),
              'tableParam.total': JSON.parse(res.data).length
            })
            that.getData()
          })
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
    //获取节点列表
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
    //获取项目列表
    getProjectList() {
      var that = this
      this.requestData('GET', "Project/GetAllProJect", function(res) {
        that.setData({
          projectList:res.data
        })
      })
    },
    //获取当前节点信息
    getNodeInfo() {
      var that = this
      this.requestData('GET', "FlowInfo/getnodeinfo" + this.formatQueryStr({FlowId:this.data.flowid,nodeId:this.data.nodeid}),
       function(res) {
        that.setData({
          nodeInfo:res.data[0],
          IsNeedChose: res.data[0].IsNeedChose
        })
      })
    },


    
    //检查是否登录
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

