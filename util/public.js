import lib from "/lib.js";
import template from "/util/template/template.js";
let app = getApp();
let logs = [];
let x = -54;
let y = -46;
let xTap = -90;
let yTap = -90;
let States = ["在研", "已完成", "终止"]
let ProjectTypes = ["自研项目", "纵向项目", "横向项目", "测试项目"]
let DeptNames = ["智慧工厂事业部", "数控一代事业部", "机器人事业部", "行政部", "财务部", "制造试验部", "项目推进部", "自动化事业部"]
let CompanyNames = ["泉州华中科技大学智能制造研究院", "泉州华数机器人有限公司"]
let IntellectualPropertyTypes = ["发明", "实用新型", "外观", "软件著作权"]
let localStorage = ""
export default {
	data: {
		...lib.data,
		...template.data,
		version: 2.691,
		DingData: {
			nickName: "",
			departName: "",
			userid: ""
		},
		departmentIdnex: 0,//选择部门时用到的下标
		hideMask: false,
		param: {},
		IsNeedChose: false,
		flowid: 0,
		taskid: 0,
		nodeid: 0,
		state: "",
		id: 0,
		nodeList: [],
		projectList: [],
		nodeInfo: {},
		FileUrl: "",
		FilePDFUrl: "",
		States: States, stateIndex: -1,
		localStorage: localStorage,
		ProjectTypes: ProjectTypes, projectIndex: -1,
		departIndex: -1,
		DeptNames: DeptNames, deptIndex: -1,
		CompanyNames: CompanyNames, companyIndex: 0,
		IntellectualPropertyTypes: IntellectualPropertyTypes, iptIndex: -1,

		dateStr: "",
		startDateStr: "",
		endDateStr: "",

		changeRemarkId: 0,
		changeRemarkNodeid: 0,
		hehe: "",
		menu:
			[
				{
					flowId: 1,
					sortId: 4,
					title: "办公用品申请",
					url: "officeSupplies/officeSupplies",
					position: (x + 4 * xTap) + "px " + (y + 0 * yTap) + "px"
				},
				{
					flowId: 8,
					sortId: 4,
					title: "零部件采购申请",
					url: "purchase/purchase",
					position: "-414px -137px"
				},
				{
					flowId: 12,
					sortId: 4,
					title: "物料编码申请",
					url: "meterieCode/meterieCode",
					position: "-54px -227px"
				},
				{
					flowId: 13,
					sortId: 6,
					title: "公车申请",
					url: "usePublicCar/usePublicCar",
					position: "-775px -317px"
				},
				{
					flowId: 14,
					sortId: 6,
					title: "私车申请",
					url: "useCar/useCar",
					position: "-504px -405px"
				},
				{
					flowId: 17,
					sortId: 7,
					title: "基地加班申请",
					url: "overTime/overTime",
					position: (x + 3 * xTap) + "px " + (y + 0 * yTap) + "px"
				},
				{
					flowId: 24,
					sortId: 7,
					title: "礼品招待领用申请",
					url: "gift/gift",
					position: (x + 0 * xTap) + "px " + (y + 4 * yTap) + "px"
				},
				{
					flowId: 26,
					sortId: 4,
					title: "领料申请",
					url: "picking/picking",
					position: (x + 1 * xTap) + "px " + (y + 4 * yTap) + "px"
				},
				{
					flowId: 27,
					sortId: 4,
					title: "入库申请",
					url: "intoStorage/intoStorage",
					position: (x + 3 * xTap) + "px " + (y + 4 * yTap) + "px"
				},
				{
					flowId: 30,
					sortId: 7,
					title: "外出申请",
					url: "goOut/goOut",
					position: (x + 1 * xTap) + "px " + (y + 3 * yTap) + "px"
				},
				{
					flowId: 32,
					sortId: 7,
					title: "跨部门协作申请",
					url: "crossHelp/crossHelp",
					position: (x + 6 * xTap) + "px " + (y + 3 * yTap) + "px"
				},
				{
					flowId: 34,
					sortId: 5,
					title: "项目技术支持",
					flowName: "项目技术支持",
					url: "techonologySupply/techonologySupply",
					position: (x + 2 * xTap) + "px " + (y + 1 * yTap) + "px"
				},
				{
					flowId: 35,
					sortId: 7,
					title: "跨部门协助",
					url: "letGoodsGo/letGoodsGo",
					position: (x + 8 * xTap - 4) + "px " + (y + 0 * yTap) + "px"
				},
				{
					flowId: 36,
					sortId: 5,
					title: "知识产权申请",
					url: "intellectualProperty/intellectualProperty",
					position: (x + 2 * xTap) + "px " + (y + 2 * yTap) + "px"
				},
				{
					flowId: 67,
					sortId: 4,
					title: "借入申请",
					url: "borrowThing/borrowThing",
					position: (x + 6 * xTap) + "px " + (y + 0 * yTap) + "px"
				},
				{
					flowId: 68,
					sortId: 4,
					title: "维修申请",
					url: "maintain/maintain",
					position: (x + 4 * xTap) + "px " + (y + 4 * yTap) + "px"
				},
				{
					flowId: 66,
					sortId: 4,
					title: "领料管理",
					url: "pickingManage/pickingManage",
					position: (x + 5 * xTap) + "px " + (y + 0 * yTap) + "px"
				},
				{
					flowId: 70,
					sortId: 9,
					title: "生产加工进度监控",
					flowName: "生产进度监控",
					url: "productionMonitoring/productionMonitoring",
					position: (x + 5 * xTap) + "px " + (y + 2 * yTap) + "px"
				},
				{
					flowId: 71,
					sortId: 11,
					flowName: "流程管理",
					title: "流程管理",
					url: "processManagement/processManagement",
					position: (x + 3 * xTap) + "px " + (y + 1 * yTap) + "px",
				}
			],

		//审批页面变量
		imgUrlList: [],
		imageList: [],
		fileList: [],
		pdfList: [],
		dingList: [],//需要钉一下的人
		tableInfo: {},//审批表单信息
		table: {},
		isback: false,
		hidden: true,
		hiddenCrmk: true,
		remark: "",

		disablePage: false,
	},

	func: {
		...lib.func,
		...template.func,

		start: {
			onLoad(param) {
				console.log("start page on load~~~~~~~~~~");


				let that = this;
				let title = "";
				for (let m of this.data.menu) {
					if (m.flowId == param.flowid) {
						title = m.title;
						break;
					}
				}
				this.setData({
					flowid: param.flowid,
					"tableInfo.Title": title
				})

				let callBack = function() {
					//临时保存后无需再向服务器请求数据
					if (app.globalData[`${param.flowid}`] == undefined || app.globalData[`${param.flowid}`] == false) {
						that.getNodeList();//获取审批列表
						that.getProjectList();//获取项目列表
						that.getNodeInfo();//获取审批列表当前节点的信息					
					}


					//临时保存
					if (app.globalData[`${param.flowid}`] == true) {
						that.readData(param.flowid);
					}
					//重新发起
					if (app.globalData.valid == true) {

						let data = JSON.parse(param.data);
						for (let d in data) {
							that.setData({
								[`${d}`]: data[d]
							})
						}
						that.setData({
							taskid: 0,
							purchaseList:that.data.tableData,// 发起的物料表单
							tableData:[]
						})
						app.globalData.valid = false;
					}

				}
				this.checkLogin(callBack);
			},
			//提交审批
			approvalSubmit(param = {}, callBack, param2 = {}) {
				if (!this.data.DingData.userid) {
					dd.alert({
						content: "尚未登录"
					});
					return;
				}
				let that = this;
				this.setData({ disablePage: true });
				let paramArr = [];
				let applyObj = {
					"ApplyMan": that.data.DingData.nickName,
					"ApplyManId": that.data.DingData.userid,
					"Dept": that.data.DingData.departmentList[this.data.departmentIdnex],
					"NodeId": "0",
					"ApplyTime": that._getTime(),
					"IsEnable": "1",
					"FlowId": that.data.flowid + "",
					"IsSend": false,
					"State": "1",
				}
				for (let p in param) {
					applyObj[p] = param[p]
				}

				paramArr.push(applyObj);
				for (let node of that.data.nodeList) {
					if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && (that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0 || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0))) || (node.NodeName.indexOf("申请人") >= 0 && node.NodeId > 0)) {
						if (node.AddPeople.length == 0) {
							dd.alert({ content: "您尚未选择审批人" })
							that.setData({
								disablePage: false
							})
							return
						}
						for (let a of node.AddPeople) {
							let tmpParam = {
								"ApplyMan": a.name,
								"ApplyManId": a.userId,
								"IsEnable": 1,
								"FlowId": that.data.flowid + "",
								"NodeId": node.NodeId + "",
								"IsSend": node.IsSend,
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
					let taskid = res;
					callBack(taskid);
				}, paramArr)
			},
			//搜索物料编码
			searchCode(e) {
				let value = e.detail.value
				console.log(value);
				if (!value || !value.keyWord) return
				let that = this
				that.requestData("GET", "Purchase/GetICItem" + that.formatQueryStr({ Key: value.keyWord }), function(res) {
					console.log(JSON.parse(res.data))
					that.setData({
						"tableParam.total": JSON.parse(res.data).length
					})
					that.data.data = JSON.parse(res.data)
					that.getData()
				})
			},
			//弹窗表单相关
			//显示弹窗表单
			chooseItem(e) {
				if (!e) return;
				console.log(e);
				this.data.good = e.target.targetDataset.row
				if (!this.data.good) return
				this.setData({
					hidden: !this.data.hidden
				})
				this.createMaskShowAnim();
				this.createContentShowAnim();
			},
			deleteItem(e) {
				if (!e) return
				console.log(e)
				let index = e.target.targetDataset.index
				if ((!index) && index != 0) return
				console.log(this.data.purchaseList)
				this.data.purchaseList.splice(index, 1)
				this.setData({
					purchaseList: this.data.purchaseList
				})
				console.log(this.data.purchaseList)
			},
		},
		dowith: {
			onLoad(param) {
				console.log("dowith page on load~~~~~~~~~~")
				console.log(param)
				let that = this
				this.setData({
					flowid: param.flowid,
					index: param.index,
					nodeid: parseInt(param.nodeid),
					taskid: param.taskid,
					state: param.state,
					flowname: param.flowname
				})

				let callBack = function() {
					that.getFormData();
					that.getBomInfo(param.flowid)
					that.getNodeList();
					that.getNodeInfo();
					that.getDingList(param.taskid);
					that.isWithdraw();
				}
				this.checkLogin(callBack)
			},

			//审批-同意
			aggreSubmit(param, param2 = {}) {
				if (!this.data.DingData.userid) {
					dd.alert({
						content: "尚未登录"
					});
					return
				}
				this.setData({
					disablePage: true
				})
				let paramArr = []
				let that = this
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
					if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0) || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0)) {
						//if ((that.data.nodeInfo.IsNeedChose && that.data.nodeInfo.ChoseNodeId && (that.data.nodeInfo.ChoseNodeId.indexOf(node.NodeId) >= 0 || (that.data.addPeopleNodes && that.data.addPeopleNodes.indexOf(node.NodeId) >= 0)))) {
						if (node.AddPeople.length == 0) {
							dd.alert({
								content: "您尚未选择审批人"
							});
							this.setData({
								disablePage: false
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
						content: "审批成功",
						success: () => {
							dd.switchTab({
								url: "/page/approve/approve"
								//url: "/page/start/index"
							})
						}
					});
				}, paramArr)
			},

			//撤回审批
			returnSubmit(e) {
				dd.confirm({
					title: "温馨提示",
					content: "是否确认撤回申请？",
					confirmButtonText: "确认",
					cancelButtonText: "取消",
					success: (result) => {

						if (result.confirm == true) {
							this.setData({
								disablePage: true
							})
							let that = this
							let param = {
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
							if (e && e.detail && e.detail.value) {
								param["Remark"] = e.detail.value.remark
							} else {
								param["NodeId"] = 0
							}
							that._postData("FlowInfoNew/FlowBack", function(res) {
								dd.alert({
									content: "撤回成功",
									buttonText: "确认",
									success: () => {
										dd.switchTab({
											url: "/page/approve/approve"
										})
									}
								});
							}, param)
						}
					},
				});

			},

			//判断是否可以撤回参数
			isWithdraw() {
				console.log(this.data.nodeList);
				console.log(this.data.nodeInfo);

			},
			//获取审批表单信息
			getFormData() {
				let that = this
				let param = {
					ApplyManId: this.data.DingData.userid,
					nodeId: this.data.nodeid,
					TaskId: this.data.taskid
				}
				this._getData("FlowInfoNew/GetApproveInfo" + this.formatQueryStr(param),
					function(res) {
						that.setData({
							tableInfo: res
						})
						that.handleUrlData(res)
					}, this.data.DingData)
			},
			//获取审批表单Bom表数据
			getBomInfo(flowid) {
				let that = this;
				let url = "";
				switch (flowid) {
					case "1": url = "OfficeSupplies/ReadTable"; break;
					case "6": url = "DrawingUploadNew/GetPurchase"; break;
					case "8": url = "PurchaseNew/ReadPurchaseTable"; break;
					case "12": url = "ItemCodeAdd/GetTable"; break;
					case "26": url = "Pick/Read"; break;
					case "27": url = "Godown/Read"; break;
					case "33": url = "DrawingChange/Read"; break;
					case "67": url = "Borrow/Read"; break;
					case "68": url = "Maintain/Read"; break;
					// case "69": url = "ProjectClosure/Read"; break;
				}
				if (!url) return
				if (flowid == "12") {
					this.requestData("GET", url, (res) => {
						if (flowid == "1") {
							res = JSON.parse(res.data)
						}
						if (flowid == "12") {
							res = res.data
						}

						this.setData({
							data: res,
							"tableParam.total": res.length
						})
						this.getData()
					}, { TaskId: this.data.taskid })
					return
				}
				this._getData(url + this.formatQueryStr({ TaskId: this.data.taskid }),
					function(res) {
						if (flowid == "33") {
							res = res.DrawingChangeList;
							for (let r of res) {
								r.ChangeType == 1 ? r.ChangeType = "添加" : r.ChangeType = "删除";
							}
						}
						that.setData({
							data: res,
							"tableParam.total": res.length
						})
						that.getData()
					}, that.data.DingData)
			},
			//根据taskId获取下一个需要审批的人，即要钉的人
			getDingList(taskId) {
				let that = this
				this._getData("DingTalkServers/Ding?taskId=" + taskId, function(data) {
					if (data == null) {
						return;
					}
					if (data.ApplyManId != null) {
						that.data.dingList.push(data.ApplyManId)
					}
					else that.data.dingList = []
				})
			},
			//钉一下功能
			ding() {
				console.log(this.data);
				let param = {
					userId: this.data.dingList[0],
					title: "请帮我审核一下流水号为 " + this.data.taskid + " 的流程",
					applyMan: this.data.DingData.nickName,
					taskId: this.data.taskid,
					flowName: this.data.flowname,
					linkUrl: "eapp://page/approve/approve?index=0"
					// linkUrl: "eapp://" + this.route + this._formatQueryStr(obj)
				}
				this._postData("DingTalkServers/sendOaMessage" + this.formatQueryStr(param), (res) => {
					dd.alert({
						content: "已为你催办~"
					})
				})
			},
			//打印流程表单
			print() {
				this._postData("PurchaseNew/PrintAndSend",
					function(res) {
						dd.alert({ content: "获取成功" })
					},
					{
						UserId: this.data.DingData.userid,
						TaskId: this.data.taskid
					}
				)
			},
			output() {
				this._getData("api/PurchaseManage" + this.formatQueryStr({ UserId: this.data.DingData.userid, TaskId: this.data.taskid }),
					function(res) {
						dd.alert({ content: "获取成功" })
					}
				)
			},
			//处理表单中的图片、PDF等文件显示
			handleUrlData(data) {
				let that = this;
				let imageList = [];
				let fileList = [];
				let pdfList = [];
				if (data.ImageUrl && data.ImageUrl.length > 5) {
					let tempList = data.ImageUrl.split(",")
					for (let img of tempList) {
						imageList.push(that.data.dormainName + (img.substring(2)).replace(/\\/g, "/"))
					}
					that.setData({ imageList: imageList })
				}
				if (data.FileUrl && data.FileUrl.length > 5) {
					that.data.FileUrl = data.FileUrl
					let urlList = data.FileUrl.split(",")
					let oldUrlList = data.OldFileUrl.split(",")
					let MediaIdList = data.MediaId ? data.MediaId.split(",") : []
					for (let i = 0; i < urlList.length; i++) {
						fileList.push({
							name: oldUrlList[i],
							path: urlList[i].replace(/\\/g, "/"),
							url: that.data.dormainName + (urlList[i].substring(2)).replace(/\\/g, "/"),
							mediaId: MediaIdList[i]
						})
					}
					that.setData({ fileList: fileList })
				}
				if (data.FilePDFUrl && data.FilePDFUrl.length > 5) {
					that.data.FilePDFUrl = data.FilePDFUrl
					let urlList = data.FilePDFUrl.split(",")
					let oldUrlList = data.OldFilePDFUrl.split(",")
					let MediaIdList = data.MediaIdPDF ? data.MediaIdPDF.split(",") : []
					let stateList = data.PdfState ? data.PdfState.split(",") : []
					for (let i = 0; i < urlList.length; i++) {
						pdfList.push({
							name: oldUrlList[i],
							url: that.data.dormainName + (urlList[i].substring(2)).replace(/\\/g, "/"),
							mediaId: MediaIdList[i],
							state: stateList[i] || 1,
						})
					}

					that.setData({ pdfList: pdfList })
				}


			}
		},
		//审批所有流程通过，后续处理
		doneSubmit(text) {
			if (!text) text = "提交审批成功"
			dd.alert({
				content: text,
				success() {
					dd.switchTab({
						url: "/page/start/index"
					})
				}
			})
		},
		//获取节点列表
		getNodeList() {
			let that = this;
			let param = {
				FlowId: this.data.flowid,
				TaskId: this.data.taskid
			}
			this._getData("FlowInfoNew/GetSign" + this.formatQueryStr(param), (res) => {
				let lastNode = {};
				let tempNodeList = [];
				//审批人分组         
				for (let node of res) {
					if (lastNode.NodeName == node.NodeName && !lastNode.ApplyTime && !node.ApplyTime && (lastNode.NodeName == "抄送" || lastNode.NodeName == "抄送相关人员" || lastNode.NodeName == "抄送小组成员" || lastNode.NodeName == "抄送所有人") && (node.NodeName == "抄送" || node.NodeName == "抄送相关人员" || node.NodeName == "抄送小组成员" || node.NodeName == "抄送所有人")) {
						tempNodeList[tempNodeList.length - 1].ApplyMan = tempNodeList[tempNodeList.length - 1].ApplyMan + "," + node.ApplyMan;
					}
					else {
						tempNodeList.push(node);
					}
					lastNode = node;
				}
				for (let node of tempNodeList) {
					node["AddPeople"] = [];
					//抄送人分组
					if (node.ApplyMan && node.ApplyMan.length > 0) {
						node.NodePeople = node.ApplyMan.split(",");
					}

					//申请人设置当前人信息
					if (node.NodeName.indexOf("申请人") >= 0 && !node.ApplyMan) {
						node.ApplyMan = that.data.DingData.nickName;
						node.AddPeople = [{
							name: that.data.DingData.nickName,
							userId: that.data.DingData.userid
						}]
					}
				}

				console.log(tempNodeList);
				that.setData({
					nodeList: tempNodeList,
					isBack: res[0].IsBack
				})
			})
		},

		getNodeList_done(nodeList) {

		},
		//获取项目列表
		getProjectList() {
			let that = this
			this._getData("ProjectNew/GetAllProJect", function(res) {
				that.setData({
					projectList: res
				})
			})
		},
		//获取当前节点信息
		getNodeInfo() {
			let that = this
			this._getData("FlowInfoNew/getnodeinfo" + this.formatQueryStr({ FlowId: this.data.flowid, nodeId: this.data.nodeid }),
				function(res) {
					that.setData({
						nodeInfo: res[0],
						IsNeedChose: res[0].IsNeedChose
					})
				})
		},


		//选择时间
		selectStartDateTime() {
			dd.datePicker({
				format: "yyyy-MM-dd HH:mm",
				currentDate: this.data.DateStr + " " + this.data.TimeStr,
				startDate: this.data.DateStr + " " + this.data.TimeStr,
				endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day + " " + this.data.TimeStr,
				success: (res) => {
					this.setData({
						startDateStr: res.date,
						"table.StartTime": res.date
					})
				},
			});
		},
		selectEndDateTime() {
			dd.datePicker({
				format: "yyyy-MM-dd HH:mm",
				currentDate: this.data.DateStr + " " + this.data.TimeStr,
				startDate: this.data.DateStr + " " + this.data.TimeStr,
				endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day + " " + this.data.TimeStr,
				success: (res) => {
					this.setData({
						endDateStr: res.date,
						"table.EndTime": res.date
					})
				},
			});
		},
		//选择时间
		selectDate() {
			dd.datePicker({
				currentDate: this.data.DateStr,
				startDate: this.data.DateStr,
				endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
				success: (res) => {
					this.setData({
						dateStr: res.date,
						"table.dateStr": res.date
					})
				},
			});
		},
		selectStartDate() {
			dd.datePicker({
				format: "yyyy-MM-dd",
				currentDate: this.data.DateStr,
				startDate: this.data.DateStr,
				endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
				success: (res) => {
					this.setData({
						startDateStr: res.date,
						"table.StartTime": res.date
					})
				},
			});
		},
		selectEndDate() {
			dd.datePicker({
				format: "yyyy-MM-dd",
				currentDate: this.data.DateStr,
				startDate: this.data.DateStr,
				endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
				success: (res) => {
					this.setData({
						endDateStr: res.date,
						"table.EndTime": res.date
					})
				},
			});
		},

		//预览图片
		previewImg(e) {
			console.log(e.target.dataset.url)
			dd.previewImage({
				urls: [e.target.dataset.url],
			});
		},
		//上传图片
		uploadImg(e) {
			let that = this
			dd.chooseImage({
				count: 2,
				success: (res) => {
					that.setData({ imageList: that.data.imageList })
					//dd.alert({content:"ues " + JSON.stringify(res)})
					for (let p of res.apFilePaths) {
						that.data.imageList.push(p)
						that.setData({ disablePage: true })
						dd.uploadFile({
							url: that.data.dormainName + "drawingupload/Upload",
							fileType: "image",
							fileName: p.substring(7),
							filePath: p,
							success: (res) => {
								//dd.alert({content:"你返回的 " + JSON.stringify(res)})
								console.log(JSON.parse(res.data).Content)
								that.data.imgUrlList.push(JSON.parse(res.data).Content)
								that.setData({ disablePage: false })
							},
							fail: (err) => {
								dd.alert({ content: "sorry" + JSON.stringify(err) })
							}
						});
					}
					that.setData({ imageList: that.data.imageList })
				},
			});
		},
		//显示弹窗表单
		tapReturn(e) {
			if (!e) return
			this.setData({
				hidden: !this.data.hidden
			})
			this.createMaskShowAnim();
			this.createContentShowAnim();
		},
		changeSuggest(e) {
			console.log(e.target.dataset.Id)
			this.data.changeRemarkId = e.target.dataset.Id
			this.data.changeRemarkNodeid = e.target.dataset.NodeId
			if (!e) return
			this.setData({
				hiddenCrmk: !this.data.hiddenCrmk,
				//hehe: e.target.dataset.remark
			})
			this.createMaskShowAnim();
			this.createContentShowAnim();
		},
		changeRemark(e) {
			this.setData({
				disablePage: true
			})
			let param = {
				Id: this.data.changeRemarkId,
				Remark: e.detail.value.remark
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
			this._postData("DingTalkServers/ChangeRemark", (res) => {
				this.setData({
					disablePage: false
				})
				dd.alert({ content: "修改成功" })
				this.onModalCloseTap2()
			}, param)
			return
			this._getData("FlowInfoNew/ChangeRemark?Id=" + param.Id + "&Remark=" + param.Remark, (res) => {
				this.setData({
					disablePage: false
				})
				dd.alert({ content: "修改成功" })
			})
		},
		//隐藏弹窗表单
		onModalCloseTap() {
			this.createMaskHideAnim();
			this.createContentHideAnim();
			setTimeout(() => {
				this.setData({
					hidden: true,
					a: true
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
		downloadFile(e) {
			console.log("下载文件~~~~~~~~~~")
			let url = "DingTalkServers/sendFileMessage"
			let param = {
				UserId: this.data.DingData.userid,
				Media_Id: e.target.dataset.mediaId
			}
			console.log(e)
			this.requestData("POST", url, function(res) {
				dd.alert({ content: "提示信息:" + JSON.parse(res.data).errmsg })
			}, param)
		},
		//检查是否登录
		checkLogin(callBack) {
			let that = this;
			//检查登录
			if (app.userInfo) {
				let DingData = {
					nickName: app.userInfo.nickName,
					departName: app.userInfo.departName,
					userid: app.userInfo.userid,
					departmentList: app.userInfo.departmentList
				}

				that.setData({ DingData: DingData });
				callBack();
				return;
			}
			dd.showLoading({
				content: "登录中..."
			});
			dd.getAuthCode({
				success: (res) => {
					console.log(res.authCode)

					lib.func._getData("LoginMobile/Bintang" + lib.func.formatQueryStr({ authCode: res.authCode }), (res) => {
						let result = res;
						dd.httpRequest({
							url: that.data.dormainName + "DingTalkServers/getUserDetail" + lib.func.formatQueryStr({ userid: res.userid }),
							method: "POST",
							data: "",
							headers: { "Content-Type": "application/json; charset=utf-8", "Accept": "application/json", },
							success: function(res) {

								console.log(res);
								let name = res.data.name;

								if (!result.userid) {
									dd.alert({
										content: res.errmsg + ",请关掉应用重新打开试试~"
									});
									return
								}
								app.userInfo = result
								let DingData = {
									nickName: name || result.name,
									departName: result.dept,
									userid: result.userid,
									departmentList: res.data.dept,

								}
								// console.log(DingData);
								dd.hideLoading()
								that.setData({ DingData: DingData })
								callBack()
							}


						})

					})
				},
			})
		},

		// 检查登录
		checkLogin2(callBack) {
			let that = this;
			//检查登录
			if (app.userInfo) {
				let DingData = {
					nickName: app.userInfo.nickName,
					departName: app.userInfo.departName,
					userid: app.userInfo.userid,
					departmentList: app.userInfo.departmentList
				}

				that.setData({ DingData: DingData });
				callBack();
				return;
			}
			dd.showLoading({
				content: "登录中..."
			});

			dd.getAuthCode({
				success: (res) => {
					console.log(res.authCode);
					lib.func._getData("LoginMobile/Bintang" + lib.func.formatQueryStr({ authCode: res.authCode }), (res) => {
						let result = res;
						dd.httpRequest({
							url: that.data.dormainName + "DingTalkServers/getUserDetail" + lib.func.formatQueryStr({ userid: res.userid }),
							method: "POST",
							data: "",
							headers: { "Content-Type": "application/json; charset=utf-8", "Accept": "application/json", },
							success: function(res) {

								console.log(res);
								let name = res.data.name;
								if (!result.userid) {
									dd.alert({
										content: res.errmsg + ",请关掉应用重新打开试试~"
									});
									return;
								}

								let DingData = {
									nickName: name || result.name,
									departName: result.dept,
									userid: result.userid,
									departmentList: res.data.dept,
								}
								app.userInfo = DingData;

								console.log(DingData);
								dd.hideLoading();
								that.setData({ DingData: DingData });
								callBack();
							}


						})

					})
				},
			})
		},



		//选择项目名称之后 修改审批节点和标题
		bindPickerChange(e) {
			//for循环是判断是否需要需要审批节点
			for (let i = 0; i < this.data.nodeList.length; i++) {
				if (this.data.nodeList[i].NodeName.indexOf("项目负责人") >= 0) {
					this.data.nodeList[i].AddPeople =
						[{
							name: this.data.projectList[e.detail.value].ResponsibleMan,
							userId: this.data.projectList[e.detail.value].ResponsibleManId
						}]
					this.setData({
						nodeList: this.data.nodeList
					});
				}
			}
			//选择完项目名称后修改标题
			let newTitle = this.data.projectList[e.detail.value].ProjectId + "-" + this.data.projectList[e.detail.value].ProjectName;
			if (newTitle.indexOf("undefined") > -1) {
				newTitle = undefined;
			}
			let a = this.data.projectList[e.detail.value].ContractNo + "-" + this.data.projectList[e.detail.value].ContractName;
			console.log("picker发送选择改变，携带值为" + e.detail.value);
			this.setData({
				["tableInfo.Title"]: newTitle || a,
				projectIndex: e.detail.value,
			})

		},

		//选择部门函数
		bindDeptChange(e) {
			this.setData({
				departIndex: e.detail.value,
			});
		},

		//重新发起审批
		relaunch(e) {
			app.globalData.table = this.data.table;
			app.globalData.valid = true;
			console.log(this.data);
			let str = JSON.stringify(this.data);
			let arr = this.route.split("/");
			let url = "/page/start/" + arr[2] + "/" + arr[3];
			dd.redirectTo({
				url: url + "?" + "flowid=" + this.data.tableInfo.FlowId + "&" + "data=" + str,
			})
		},
		//計算相差天數
		DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
			let aDate, oDate1, oDate2, iDays;
			aDate = sDate1.split("-");
			oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为9-25-2017格式 
			aDate = sDate2.split("-");
			oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
			iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数 
			return iDays;
		},

		//临时保存
		temporaryPreservation(e) {
			let that = this;
			dd.setStorage({
				key: `${that.data.flowid}`,
				data: {
					data: that.data,
				},
				success: function() {
					app.globalData[`${that.data.flowid}`] = true;
					dd.alert({
						content: "临时保存成功，下次打开这个页面时生效。",
						buttonText: "确认"
					});

				}
			});


		},// 读取临时保存数据
		readData(flowid) {
			let that = this;
			dd.getStorage({
				key: `${flowid}`,
				success: function(res) {
					that.data = res.data.data;
					for (let d in that.data) {
						that.setData({
							[`${d}`]: that.data[d]
						})
					}
					dd.removeStorage({
						key: `${flowid}`,
						success: function() {
							app.globalData[`${flowid}`] = false;
						}
					});
				},
				fail: function(res) {
				}
			});
		},
		//流程图
		processOn() {
			console.log("我执行了");
			dd.navigateTo({
				url: "/page/processOn/processOn" + "?" + "flowid=" + this.data.flowid
			})
		},
		//保存表单数据函数
		inputToTable(e) {
			let name = e.currentTarget.dataset.name;
			this.data.table[name] = e.detail.value;
		},
		inputToTableInfo(e) {
			let name = e.currentTarget.dataset.name;
			this.data.tableInfo[name] = e.detail.value;
		},
		//checkBox选择按钮更新
		onChange(e) {
			let value = e.detail.value;
			for (let j of this.data.items) {
				j.checked = false;
				for (let i of value) {
					if (i == j.name) {
						j.checked = true;
						break;
					}
				}
			}
		},
		//部门选择函数
		bindObjPickerChange(e) {
			console.log("picker发送选择改变，携带值为", e.detail.value);
			this.setData({
				departmentIdnex: e.detail.value,
			});
		},

	},
};