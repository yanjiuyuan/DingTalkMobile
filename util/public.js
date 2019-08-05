import lib from "/lib.js";
import template from "/util/template/template.js";
let app =getApp();
let logs = [];
var x = -54
var y = -46
var xTap = -90
var yTap = -90
let States = ['在研', '已完成', '终止']
let ProjectTypes = ['自研项目', '纵向项目', '横向项目','测试项目']
let DeptNames = ['', '智慧工厂事业部', '数控一代事业部', '机器人事业部', '行政部', '财务部', '制造试验部', '项目推进部']
let CompanyNames = ['泉州华中科技大学智能制造研究院', '泉州华数机器人有限公司']
let IntellectualPropertyTypes = ['发明','实用新型','外观','软件著作权']
let localStorage = ''
export default {
  data:{
    ...lib.data,
    ...template.data,
    version: 2.42,
    DingData:{
      nickName:'',
      departName:'',
      userid:''
    },
    hideMask: false,
    param: {},
    IsNeedChose:false,
    flowid:0,
    taskid:0,
    nodeid:0,
    state:'',
    id:0,
    nodeList:[],
    projectList:[],
    nodeInfo:{},
    FileUrl:'',
    FilePDFUrl:'',
    States: States,  stateIndex:0,
    localStorage: localStorage,
    ProjectTypes: ProjectTypes,  projectIndex:-1,
    departIndex: 0,
    DeptNames: DeptNames,  deptIndex:0,  
    CompanyNames: CompanyNames,  companyIndex:0,
    IntellectualPropertyTypes:IntellectualPropertyTypes,  iptIndex:0,

    dateStr: '',
    startDateStr:'',
    endDateStr:'',

    changeRemarkId:0,
    changeRemarkNodeid:0,
    hehe:'',
    menu:[ {
        flowId: 1,
        sortId: 4,
        title:'办公用品申请',
        url: 'officeSupplies/officeSupplies',
        position: (x + 4 * xTap) +  'px ' + (y + 0 * yTap) + 'px'},{
      flowId: 8,
      sortId: 4,
      title:'零部件采购申请',
      url: 'purchase/purchase',
      position: '-414px -137px'},{
      flowId: 12,
      sortId: 4,
      title:'物料编码申请',
      url: 'meterieCode/meterieCode',
      position: '-54px -227px'},{
        flowId: 13,
        sortId: 6,
        title:'公车申请',
        url: 'usePublicCar/usePublicCar',
        position: '-775px -317px'},{
        flowId: 14,
        sortId: 6,
        title:'私车申请',
        url: 'useCar/useCar',
        position: '-504px -405px'},
        {
        flowId: 17,
        sortId: 7,
        title:'基地加班申请',
        url: 'overTime/overTime',
        position: (x + 3 * xTap) + 'px ' + (y + 0 * yTap) + 'px'},
         {
        flowId: 26,
        sortId: 4,
        title:'领料申请',
        url: 'picking/picking',
        position: (x + 1 * xTap) + 'px ' + (y + 4 * yTap) + 'px'}, {
        flowId: 27,
        sortId: 4,
        title:'入库申请',
        url: 'intoStorage/intoStorage',
        position: (x + 3 * xTap) + 'px ' + (y + 4 * yTap) + 'px' }, {
        flowId: 30,
        sortId: 7,
        title:'外出申请',
        url: 'goOut/goOut',
        position: (x + 1 * xTap) + 'px ' + (y + 3 * yTap) + 'px' },
        //  {
        // flowId: 31,
        // sortId: 5,
        // title:'立项申请',
        // url: 'createProject/createProject',
        // position: (x + 8 * xTap -3) + 'px ' + (y + 1 * yTap - 3) + 'px'},
        {
            flowId: 32,
            sortId: 7,
            title:'跨部门协助',
            url: 'crossHelp/crossHelp',
            position: (x + 6 * xTap) + 'px ' + (y + 3 * yTap) + 'px'
        },
          {
            flowId: 34,
            sortId: 5,
            title:'项目技术支持',
            flowName:"项目技术支持",
            url: 'techonologySupply/techonologySupply',
            position: (x + 2 * xTap) + 'px ' + (y + 1 * yTap) + 'px'
        },
        {
            flowId: 35,
            sortId: 7,
            title:'跨部门协助',
            url: 'letGoodsGo/letGoodsGo',
            position: (x + 8 * xTap -4) + 'px ' + (y + 0 * yTap) + 'px'
        },{
            flowId: 36,
            sortId: 5,
            title:'知识产权申请',
            url: 'intellectualProperty/intellectualProperty',
            position: (x + 2 * xTap) + 'px ' + (y + 2 * yTap) + 'px'
        },{
            flowId: 67,
            sortId: 4,
            title:'借入申请',
            url: 'borrowThing/borrowThing',
            position: (x + 6 * xTap) + 'px ' + (y + 0 * yTap) + 'px'
        },{
            flowId: 68,
            sortId: 4,
            title:'维修申请',
            url: 'maintain/maintain',
            position: (x + 4 * xTap) + 'px ' + (y + 4 * yTap) + 'px'
        },{
            flowId:66,
            sortId:4,
            title:'领料管理',
            url:'pickingManage/pickingManage',
            position: (x + 5 * xTap) + 'px ' + (y + 0 * yTap) + 'px'
        }
        ],

        //审批页面变量
        imgUrlList:[],
        imageList: [],
        fileList: [],
        pdfList: [],     
        dingList:[],//需要钉一下的人
        tableInfo:{},//审批表单信息
        isback: false,
        hidden: true,
        hiddenCrmk: true,
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
        console.log("sssssss");
        if(app.globalData.valid == true){
            dd.alert({
              content:"日期、选人、项目请重新选择"
            })
            this.setData({
                table:app.globalData.table
            })
            app.globalData.valid = false;
        }
    
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
          that.getNodeList()
          that.getProjectList()
          that.getNodeInfo()
          that.loadReApproval()
        }
        this.checkLogin(callBack)
      },
      //提交审批
      approvalSubmit(param = {}, callBack, param2 = {}) {
          if(!this.data.DingData.userid){
            dd.alert({
              content:'尚未登录'
            });
            return
          }
          var that = this
          this.setData({disablePage:true})
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
              if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && (that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0 || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0))) || (node.NodeName.indexOf('申请人') >= 0 && node.NodeId>0)) {
                  if (node.AddPeople.length == 0) {
                      dd.alert({ content:'您尚未选择审批人'})
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
         
          that._postData("FlowInfoNew/CreateTaskInfo", function(res) {
            let taskid = res
            console.log(taskid)
            callBack(taskid)
          },paramArr)
      },
      //加载重新发起数据
      loadReApproval(){
        let localStorage = this.data.localStorage
        if (!localStorage || !localStorage.valid) return
        localStorage.valid = false
        if(localStorage.flowid == 8){
          this.setData({
            purchaseList: localStorage.data
          })
        }else{
          this.setData({
            data: localStorage.data
          })
        }
        this.setData({
          'tableInfo.Title': localStorage.title,
          flowid:localStorage.flowid,
          tableItems: localStorage.tableItems,
          localStorage: localStorage
        })
      },
      //搜索物料编码
      searchCode(e){
        var value = e.detail.value
        console.log(value) 
        if (!value || !value.keyWord) return
        var that = this
        that.requestData('GET', 'Purchase/GetICItem' + that.formatQueryStr({Key:value.keyWord}) , function(res) { 
          console.log(JSON.parse(res.data))
          that.setData({
            'tableParam.total': JSON.parse(res.data).length
          })
          that.data.data =  JSON.parse(res.data)
          that.getData()
        })
      },
      //弹窗表单相关
      //显示弹窗表单
      chooseItem(e){
        if(!e) return
        console.log(e)
        this.data.good = e.target.targetDataset.row
        if(!this.data.good) return
        this.setData({
          hidden: !this.data.hidden
        })
        this.createMaskShowAnim();
        this.createContentShowAnim();
      },
      deleteItem(e){
        if(!e) return
        console.log(e)
        let index = e.target.targetDataset.index
        if((!index) && index != 0)  return
        console.log(this.data.purchaseList)
        this.data.purchaseList.splice(index, 1)
        this.setData({
          purchaseList:this.data.purchaseList
        })
        console.log(this.data.purchaseList)
      },
    },
    dowith: {
      onLoad(param) {
        console.log('dowith page on load~~~~~~~~~~')
        console.log(param)
        var that = this
        this.setData({
          flowid:param.flowid,
          index:param.index,
          nodeid:parseInt(param.nodeid),
          taskid:param.taskid,
          state:param.state
        })
        
        let callBack = function(){
          that.getFormData()
          that.getBomInfo(param.flowid)
          that.getNodeList()
          that.getNodeInfo()
          that.getDingList(param.taskid)
        }
        this.checkLogin(callBack)
      },

      //审批-同意
      aggreSubmit(param, param2 = {}){
        if(!this.data.DingData.userid){
          dd.alert({
            content:'尚未登录'
          });
          return
        }
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
            if ( (that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0) || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0) )  {
            //if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && (that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0 || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0)))) {
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
                        "ApplyManId": a.userId,
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
        // console.log(paramArr)
        // that.setData({"disablePage":false})
        // return
        that._postData("FlowInfoNew/SubmitTaskInfo", function(res) {
            dd.alert({
              content:'审批成功',
              success: () => {
                dd.switchTab({
                  url: '/page/approve/approve'
                  //url: '/page/start/index'
                })
              }
            });
          },paramArr)
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
            "Id": that.data.tableInfo.Id
        }
        if(e && e.detail && e.detail.value){
          param["Remark"] = e.detail.value.remark
        }else{
          param["NodeId"] = 0
        }
        that._postData("FlowInfoNew/FlowBack", function(res) {
            dd.alert({
              content:'退回成功',
              success: () => {
                dd.switchTab({
                  url: '/page/approve/approve'
                })
              }
            });
          },param)
      },

      //重新发起
      reApproval(){
        this.data.localStorage = JSON.stringify({
            valid: true,
            flowid:this.data.flowid,
            //data: this.data.data,
            data: this.data.tableData,
            title: this.data.tableInfo.Title,
            tableItems: this.data.tableItems
          })
        this.setData({
          disablePage:true
        })
        for (let m of this.data.menu) {
            if (m.flowId == this.data.flowid) {
              dd.redirectTo({
                url: '/page/start/' + m.url + '?flowid=' + m.flowId
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
        this._getData("FlowInfoNew/GetApproveInfo" + this.formatQueryStr(param),
        function(res) {
          that.setData({
            tableInfo: res
          })
          that.handleUrlData(res)
        },this.data.DingData)
      },
      //获取审批表单Bom表数据
      getBomInfo(flowid){
        var that = this
        var url = ''
        switch(flowid){
          case '1': url = "OfficeSupplies/ReadTable"; break;
          case '6': url = "DrawingUploadNew/GetPurchase"; break;
          case '8': url = "PurchaseNew/ReadPurchaseTable"; break;
          case '12': url = "ItemCodeAdd/GetTable"; break;
          case '26': url = "Pick/Read"; break;
          case '27': url = "Godown/Read"; break;
          case '33': url = "DrawingChange/Read"; break;
          case '67': url = "Borrow/Read"; break;
          case '68': url = "Maintain/Read"; break;
        }
        if(!url) return
        if(flowid == '12'){
          this.requestData('GET', url , (res) => { 
            if(flowid == '1'){
              res = JSON.parse(res.data)
            }
            if(flowid == '12'){
              res = res.data
            }
            
            this.setData({
              data: res,
              'tableParam.total': res.length
            })
            this.getData()
          },{TaskId:this.data.taskid})
          return
        }
        this._getData(url + this.formatQueryStr({TaskId:this.data.taskid}),
            function(res) {
              if(flowid == '33') {
                res = res.DrawingChangeList
                for(let r of res){
                  r.ChangeType == 1 ? r.ChangeType = '添加' : r.ChangeType = '删除'
                }
              }
              
              that.setData({
                data: res,
                'tableParam.total': res.length
              })
              that.getData()
          },that.data.DingData)
      },
      //根据taskId获取下一个需要审批的人，即要钉的人
      getDingList(taskId) {
          var that = this
          this._getData('DingTalkServers/Ding?taskId=' + taskId, function (data) {
              if (data.ApplyManId) {
                  that.data.dingList.push(data.ApplyManId)
              }
              else that.data.dingList = []
          })
      },
      //钉一下功能
      ding(){
        dd.createDing({
          users : this.data.dingList,// 用户列表，工号
          type: 1, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text: '请帮我审批一下，审批编号为:'+ this.data.taskid,  // 正文
        });
      },
      //打印流程表单
      print(){
        this._postData('PurchaseNew/PrintAndSend',
          function(res){
            dd.alert({content:'获取成功'})
          },
          {
            UserId: this.data.DingData.userid,
            TaskId: this.data.taskid
          }
        )
      },
      output(){
        this._getData('api/PurchaseManage' + this.formatQueryStr({UserId:this.data.DingData.userid,TaskId: this.data.taskid}),
          function(res){
            dd.alert({content:'获取成功'})
          }
        )
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
            that.data.FileUrl = data.FileUrl
            var urlList = data.FileUrl.split(',')
            var oldUrlList = data.OldFileUrl.split(',')
            var MediaIdList = data.MediaId ? data.MediaId.split(',') : []
            for (var i = 0; i < urlList.length; i++) {
                fileList.push({
                    name: oldUrlList[i],
                    path: urlList[i].replace(/\\/g, "/"),
                    url: that.data.dormainName + (urlList[i].substring(2)).replace(/\\/g, "/"),
                    mediaId: MediaIdList[i]
                })
            }
            that.setData({fileList:fileList})
        }
        if (data.FilePDFUrl && data.FilePDFUrl.length > 5) {
            that.data.FilePDFUrl = data.FilePDFUrl
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
      this._getData("FlowInfoNew/GetSign" + this.formatQueryStr(param), (res)=> {
        let lastNode = {}
        let tempNodeList = []
        console.log("aaaaaaaaaaaaaaaaa")
        console.log(res);
        //审批人分组
        for (let node of res) {
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
        this.getNodeList_done(tempNodeList)
        that.setData({
          nodeList:tempNodeList,
          isBack:res[0].IsBack
        })
      })
    },
    getNodeList_done(nodeList){
      
    },
    //获取项目列表
    getProjectList() {
      var that = this
      this._getData("ProjectNew/GetAllProJect", function(res) {
        that.setData({
          projectList:res
        })
      })
    },
    //获取当前节点信息
    getNodeInfo() {
      var that = this
      this._getData("FlowInfoNew/getnodeinfo" + this.formatQueryStr({FlowId:this.data.flowid,nodeId:this.data.nodeid}),
       function(res) {
        that.setData({
          nodeInfo:res[0],
          IsNeedChose: res[0].IsNeedChose
        })
      })
    },


     //选择时间
    selectStartDateTime(){
        dd.datePicker({
          format: 'yyyy-MM-dd HH:mm',
          currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
          startDate: this.data.DateStr + ' ' + this.data.TimeStr,
          endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
          success: (res) => {
            this.setData({
              startDateStr: res.date,
              'table.StartTime': res.date
            })
          },
        });
      },
      selectEndDateTime(){
        dd.datePicker({
          format: 'yyyy-MM-dd HH:mm',
          currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
          startDate: this.data.DateStr + ' ' + this.data.TimeStr,
          endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
          success: (res) => {
            this.setData({
              endDateStr: res.date,
              'table.EndTime': res.date
            })
          },
        });
      },
      //选择时间
      selectDate(){
        dd.datePicker({
          currentDate: this.data.DateStr,
          startDate: this.data.DateStr,
          endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
          success: (res) => {
            this.setData({
              dateStr: res.date,
              'table.dateStr': res.date
            })
          },
        });
      },
      selectStartDate(){
        dd.datePicker({
          format: 'yyyy-MM-dd',
          currentDate: this.data.DateStr,
          startDate: this.data.DateStr,
          endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
          success: (res) => {
            this.setData({
              startDateStr: res.date,
              'table.StartTime': res.date
            })
          },
        });
      },
      selectEndDate(){
        dd.datePicker({
          format: 'yyyy-MM-dd',
          currentDate: this.data.DateStr,
          startDate: this.data.DateStr,
          endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
          success: (res) => {
            this.setData({
              endDateStr: res.date,
              'table.EndTime': res.date
            })
          },
        });
      },
 
    //预览图片
    previewImg(e){
      console.log(e.target.dataset.url)
      dd.previewImage({
        urls: [e.target.dataset.url],
      });
    },
    //上传图片
    uploadImg(e){
      var that = this
      dd.chooseImage({
        count: 2,
        success: (res) => {
          that.setData({imageList:that.data.imageList})
          //dd.alert({content:'ues ' + JSON.stringify(res)})
          for(let p of res.apFilePaths){
            that.data.imageList.push(p)
            that.setData({disablePage:true})
            dd.uploadFile({
              url: that.data.dormainName + 'drawingupload/Upload',
              fileType: 'image',
              fileName: p.substring(7),
              filePath: p,
              success: (res) => {
                //dd.alert({content:'你返回的 ' + JSON.stringify(res)})
                console.log(JSON.parse(res.data).Content)
                that.data.imgUrlList.push(JSON.parse(res.data).Content)
                that.setData({disablePage:false})
              },
              fail:(err) => {
                dd.alert({content:'sorry' + JSON.stringify(err)})
              }
            });
          }
          that.setData({imageList:that.data.imageList})
        },
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
    changeSuggest(e){
      console.log(e.target.dataset.Id)
      this.data.changeRemarkId = e.target.dataset.Id
      this.data.changeRemarkNodeid = e.target.dataset.NodeId
      if(!e) return
      this.setData({
        hiddenCrmk: !this.data.hiddenCrmk,
        //hehe: e.target.dataset.remark
      })
      this.createMaskShowAnim();
      this.createContentShowAnim();
    },
    changeRemark(e){
      this.setData({
        disablePage:true
      })
      let param = {
        Id:this.data.changeRemarkId,
        Remark:e.detail.value.remark
        //nodeId: this.data.changeRemarkNodeid
      }
      let id = this.data.changeRemarkNodeid
      this.setData({
        [`nodeList[${id}].Remark`]: param.Remark
      })
      //console.log(param)
      // if(e && e.detail && e.detail.value){
      //   param["Remark"] = e.detail.value.remark
      // }else{
      //   param["NodeId"] = 0
      // }//returnSubmit
      console.log("DingTalkServers/ChangeRemark   !!!!!!!")
      console.log(param)
      this._postData("DingTalkServers/ChangeRemark",(res)=>{
        this.setData({
          disablePage:false
        })
        dd.alert({content:'修改成功'})
        this.onModalCloseTap2()
      },param)
      return
      this._getData("FlowInfoNew/ChangeRemark?Id="+param.Id+'&Remark='+param.Remark, (res)=> {
          this.setData({
            disablePage:false
          })
          dd.alert({content:'修改成功'})
        })
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
    onModalCloseTap2() {
      this.createMaskHideAnim();
      this.createContentHideAnim();
      setTimeout(() => {
        this.setData({
          hiddenCrmk: true,
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
      console.log(e)
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

        that.setData({DingData:DingData })
        callBack()
        return.0
      }
      dd.showLoading({
        content: '登录中...'
      });
      console.log("我执行了");
      dd.getAuthCode({
        success: (res) => {
          console.log(res.authCode)
          lib.func._getData('LoginMobile/Bintang' + lib.func.formatQueryStr({authCode:res.authCode}),function(res){
            app.userInfo = res
            var DingData = {
              nickName:res.name,
              departName:res.dept,
              userid:res.userid
            }
            dd.hideLoading()
            that.setData({ DingData:DingData })
            callBack()
          })
        },
      })
    },
    checkLogin2(callBack){
      var that = this
      var app = getApp()
      dd.getAuthCode({
        success: (res) => {
          console.log(res.authCode)
          lib.func._getData('LoginMobile/Bintang' + lib.func.formatQueryStr({authCode:res.authCode}),function(res){
            if(!res.userid){
              dd.alert({
                content:res.errmsg+',请关掉应用重新打开试试~'
              });
              return
            }
            app.userInfo = res
            var DingData = {
              nickName:res.name,
              departName:res.dept,
              userid:res.userid
            }
            dd.hideLoading()
            that.setData({ DingData:DingData })
            callBack()
          })
        },
      })
    },
    bindPickerChange(e){
      for(let i = 0;i<this.data.nodeList.length;i++){
        if(this.data.nodeList[i].NodeName.indexOf('项目负责人') >= 0){
          this.data.nodeList[i].AddPeople = 
            [{
                name: this.data.projectList[e.detail.value].ResponsibleMan,
                userId: this.data.projectList[e.detail.value].ResponsibleManId
            }]
          this.data.nodeList[i].ApplyMan = this.data.projectList[e.detail.value].ResponsibleMan;
          // this.data.nodeList[i].NodePeople=[ this.data.projectList[e.detail.value].ResponsibleMan];
          console.log(this.data.nodeList);
          this.setData({
            nodeList: this.data.nodeList
          });
        }
      } 
      this.setData({
        projectIndex: e.detail.value,
      });
    },
    bindDeptChange(e){
        this.setData({
        departIndex: e.detail.value,
      });
    },

    //重新发起审批
    relaunch(e){
      console.log("重新发起审批");
      console.log(this.data.table);
      app.globalData.table = this.data.table;
      app.globalData.valid = true;
      console.log(app.globalData.table);

      let arr = this.route.split("/");
      let url = "/page/start/" + arr[2] + "/" + arr[3];
      dd.redirectTo({
      url: url + "?" + "flowid=" + this.data.tableInfo.FlowId
      })
    }

    },
};

