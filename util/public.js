import lib from "/lib.js"
import template from "/util/template/template.js"

let logs = [];

export default {
  data:{
    ...lib.data,
    ...template.data,
    DingData:{
      // nickName:'詹姆斯',
      // departName:'图书馆',
      // userid:'manager325'
    },
    hideMask: false,
    param: {},
    IsNeedChose:false,
    flowid:0,
    taskid:0,
    nodeid:0,
    id:0,
    projectIndex:0,
    nodeList:[],
    projectList:[],
    nodeInfo:{},
    //审批页面变量
    imageList: [],
    fileList: [],
    pdfList: [],
    dingList:[],//需要钉一下的人
    tableInfo:{},//审批表单信息
    isback: false,
    hidden: true,
    remark:'',
    ReApprovalTempData:{},//重新发起的临时变量
    disablePage:false
  },

  func:{
    ...lib.func,
    ...template.func,
    
    start: {
      onLoad(param) {
        console.log('start page on load~~~~~~~~~~')
        console.log(param)
        var that = this
        let title = ''
        for(let m of this.data.menu){
          if(m.flowId == param.flowid){
            title = m.title
            break
          }
        }
        this.setData({
          flowid:param.flowid,
          'tableInfo.Title':title
        })
        let callBack = function(){
          //that.loadReApproval()
          that.getNodeList()
          that.getProjectList()
          that.getNodeInfo()
        }
        this.checkLogin(callBack)
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
      //加载重新发起数据
      loadReApproval(){
        let ReApprovalTempData = JSON.parse(localStorage.getItem("ReApprovalTempData"))
        if (!ReApprovalTempData || !ReApprovalTempData.valid) return
        console.log('重新发起的数据~~~~~~~~~~~')
        console.log(ReApprovalTempData)
        ReApprovalTempData.valid = false
        if(ReApprovalTempData.flowid == 8){
          this.setData({
            purchaseList: ReApprovalTempData.data
          })
        }else{
          this.setData({
            data: ReApprovalTempData.title
          })
        }
        this.setData({
          'tableInfo.Title': ReApprovalTempData.title,
          flowid:ReApprovalTempData.flowid,
          tableItems: ReApprovalTempData.tableItems
        })
        localStorage.setItem("ReApprovalTempData",JSON.stringify(ReApprovalTempData))
      }
    },
    dowith: {
      onLoad(param) {
        console.log('dowith page on load~~~~~~~~~~')
        console.log(param)
        var that = this
        this.setData({
          flowid:param.flowid,
          index:param.index,
          nodeid:param.nodeid,
          taskid:param.taskid,
          state:param.state
        })
        let callBack = function(){
          that.getFormData()
          that.getBomInfo(param.flowid)
          that.getNodeList()
          that.getNodeInfo()
        }
        this.checkLogin(callBack)
        
      },
      onReady() {
        
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
      returnSubmit(e) {
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
            "Remark": e.detail.value.remark
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

      //重新发起
      reApproval(){
        localStorage.setItem('ReApprovalTempData',
          JSON.stringify({
              valid: true,
              flowid:this.data.flowid,
              data: this.data.data,
              title: this.data.tableInfo.Title,
              tableItems: this.data.tableItems
          }))
        this.setData({
          disablePage:true
        })
        for (let m of this.data.menu) {
            if (m.flowId == this.data.flowid) {
              dd.navigateTo({
                url: '/page/start/' + m.url
              })
            }
        }
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
          that.handleUrlData(res.data)
        })
      },
      //获取审批表单Bom表数据
      getBomInfo(flowid){
        var that = this
        let url = ''
        console.log(flowid)
        if(flowid == 6) url = "DrawingUpload/GetPurchase"
        else if(flowid == 8){
          url = "Purchase/ReadPurchaseTable"
          this.requestData('GET', url + this.formatQueryStr({TaskId:this.data.taskid}),
            function(res) {
              that.setData({
                data: JSON.parse(res.data),
                'tableParam.total': JSON.parse(res.data).length
              })
              that.getData()
          })
          return
        } 
        this.requestData('GET', url + this.formatQueryStr({TaskId:this.data.taskid}),
            function(res) {
              that.setData({
                data: res.data,
                'tableParam.total': res.data.length
              })
              that.getData()
          })
      },
      //处理表单中的图片、PDF等文件显示
      handleUrlData(data) {
        var that = this
        let imageList = []
        let fileList = []
        let pdfList = []
        if (data.ImageUrl && data.ImageUrl.length > 5) {
            var tempList = data.ImageUrl.split(',')
            for (let img of tempList) {
                imageList.push(that.data.dormainName + (img.substring(2)).replace(/\\/g, "/"))
            }
            that.setData({imageList:imageList})
        }
        if (data.FileUrl && data.FileUrl.length > 5) {
            var urlList = data.FileUrl.split(',')
            var oldUrlList = data.OldFileUrl.split(',')
            var MediaIdList = data.MediaId ? data.MediaId.split(',') : []
            for (var i = 0; i < urlList.length; i++) {
                fileList.push({
                    name: oldUrlList[i],
                    url: that.data.dormainName + (urlList[i].substring(2)).replace(/\\/g, "/"),
                    mediaId: MediaIdList[i]
                })
            }
            that.setData({fileList:fileList})
        }
        if (data.FilePDFUrl && data.FilePDFUrl.length > 5) {
            var urlList = data.FilePDFUrl.split(',')
            var oldUrlList = data.OldFilePDFUrl.split(',')
            var MediaIdList = data.MediaIdPDF ? data.MediaIdPDF.split(',') : []
            var stateList = data.PdfState ? data.PdfState.split(',') : []
            for (var i = 0; i < urlList.length; i++) {
                pdfList.push({
                    name: oldUrlList[i],
                    url: that.data.dormainName + (urlList[i].substring(2)).replace(/\\/g, "/"),
                    mediaId: MediaIdList[i],
                    state: stateList[i]
                })
            }
            that.setData({pdfList:pdfList})
        }
    }
    },
    //审批所有流程通过，后续处理
    doneSubmit(text) {
        if (!text) text = '提交审批成功'
        dd.alert({
          content:text,
          success(){
            dd.switchTab({
              url: '/page/start/index'
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
                    userId: that.data.DingData.userid
                }]
            }
        }
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
    //预览图片
    previewImg(e){
      console.log(e.target.dataset.url)
      dd.previewImage({
        urls: [e.target.dataset.url],
      });
    },
    //显示弹窗表单
    tapReturn(e){
      if(!e) return
      this.setData({
        hidden: !this.data.hidden
      })
      this.createMaskShowAnim();
      this.createContentShowAnim();
    },
    //隐藏弹窗表单
    onModalCloseTap() {
      this.createMaskHideAnim();
      this.createContentHideAnim();
      setTimeout(() => {
        this.setData({
          hidden: true,
        });
      }, 210);
    },
    //下载文件
    downloadFile(e){
      console.log('下载文件~~~~~~~~~~')
      var url = "DingTalkServers/sendFileMessage"
      var param = {
        UserId: this.data.DingData.userid,
        Media_Id: e.target.dataset.mediaId
      }
      console.log(url)
      this.requestData('POST', url , function(res) { 
        dd.alert({content:'提示信息:' + JSON.parse(res.data).errmsg})
      },param)
    },
    //检查是否登录
    checkLogin(callBack){
      var that = this
      var app = getApp()
      //检查登录
      if (app.userInfo) {
        var DingData = {
          nickName:app.userInfo.name,
          departName:app.userInfo.dept,
          userid:app.userInfo.userid
        }
        // DingData.nickName='蔡兴桐'
        // DingData.userid='083452125733424957'
        // DingData.nickName='张鹏辉'
        // DingData.userid='100328051024695354'

        //如果有全局变量，优先使用 ---- 切换用户需要
        // var app = getApp()
        // if (app.userInfo) {
        //   DingData = {
        //     nickName:app.userInfo.name,
        //     userid:app.userInfo.userid
        //   }
        // }

        that.setData({DingData:DingData })
        callBack()
        return
      }
      dd.showLoading({
        content: '登录中...'
      });
      
      dd.getAuthCode({
        success: (res) => {
          console.log(res.authCode)
          lib.func.requestData('GET','LoginMobile/Bintang',function(res){
            console.log(res.data.data)
            app.userInfo = res.data.data
            var DingData = {
              nickName:res.data.data.name,
              departName:res.data.data.dept,
              userid:res.data.data.userid
            }
            // DingData.nickName='蔡兴桐'
            // DingData.userid='083452125733424957'
            // DingData.nickName='张鹏辉'
            // DingData.userid='100328051024695354'
            that.setData({ DingData:DingData })
            dd.hideLoading()
            callBack()
          },{authCode:res.authCode})
        },
        fail: (err) => {
          console.log('免登失败')
          dd.alert({ content: "免登失败" });
          dd.alert({ content: JSON.stringify(err) })
        }
      })



      return
      var app = getApp()
      var interval = setInterval(function() {
        app = getApp()
        //dd.alert({content:'在登录了~~~~'})
        if (app.userInfo) {
          that.createMaskHideAnim()
          var DingData = {
            nickName:app.userInfo.name,
            departName:app.userInfo.dept,
            userid:app.userInfo.userid
          }
          that.setData({ hideMask: true,DingData:DingData })
          clearInterval(interval)
          callBack()
          //dd.alert({content:'我登录了~~~~'})
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

