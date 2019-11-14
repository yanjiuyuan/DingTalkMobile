import pub from '/util/public';
import lib from '/lib.js';
import promptConf from "/util/promptConf.js";
let app = getApp();
let good = {}

Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		addPeopleNodes: [1],
		names: [],
		array1: ['研发类', '产品类', '教育类'],
		index1: -1,
		array2: ['高', '中', '低'],
		index2: 0,
		items: [
			{ name: '工业软件研发部', value: '工业软件研发部' },
			{ name: '数控一代事业部', value: '数控一代事业部' },
			{ name: '机器人事业部', value: '机器人事业部' },
			{ name: '行政部', value: '行政部' },
			{ name: '财务部', value: '财务部' },
			{ name: '制造试验部', value: '制造试验部' },
			{ name: '项目推进部', value: '项目推进部' },
			{ name: '自动化事业部', value: '自动化事业部' },
		],
		OtherEngineers: "",
		ResponsibleMan: "",
		rotate: "RotateToTheRight",
		show: "hidden"
	},

	//选人控件方法
	choosePeoples(e) {
		console.log('start choose people');
		let nodeId = e.target.targetDataset.NodeId;
		let that = this;
		dd.complexChoose({
			...that.data.chooseParam,
			multiple: false,
			title: "项目负责人",
			success: function(res) {
				console.log(res)
				let names = []//userId
				for (let d of res.users) names.push(d.name);
				for (let node of that.data.nodeList) {
					if (node.NodeId == 1) {
						node.AddPeople = res.users;
					}
				}
				that.setData({
					'table.ResponsibleMan': names.join(','),
					ResponsibleMan: res.users[0],
					nodeList: that.data.nodeList
				})
			},
			fail: function(err) {

			}
		})
	},


	//选人 可以实现 
	choosePeople(e) {
		console.log('start choose people');
		let nodeId = e.target.targetDataset.NodeId;
		let that = this;
		dd.complexChoose({
			...that.data.chooseParam,
			pickedUsers: that.data.pickedUsers || [],            //已选用户
			multiple: true,
			title: "其他工程师",
			success: function(res) {
				console.log(res);
				let names = [];//userId
				if (res.departments.length == 0) {
					that.data.pickedUsers = [];
					for (let d of res.users) {
						that.data.pickedUsers.push(d.userId);
						names.push(d.name);
					}
					that.setData({
						'table.OtherEngineers': names.join(','),
						OtherEngineers: res.users,

					})
				}
				else {
					let deptId = [];
					for (let i of res.departments) {
						deptId.push(i.id);
					}

					that.postDataReturnData("DingTalkServers/GetDeptAndChildUserListByDeptId", (result) => {
						console.log(result.data);
						that.data.pickedUsers = [];
						that.data.pickedDepartments = [];
						let userlist = [];
						for (let i in result.data) {
							let data = JSON.parse(result.data[i]);
							that.data.pickedDepartments.push(i);
							userlist.push(...data.userlist);
							for (let d of data.userlist) {
								that.data.pickedUsers.push(d.userid);
								names.push(d.name);
								d.userId = d.userid;
							}
						}
						that.data.pickedUsers = [...new Set(that.data.pickedUsers)];
						names = [...new Set(names)];//数组去重
						that.setData({
							'table.OtherEngineers': names.join(','),
							OtherEngineers: [...new Set(userlist)],//去重

						})
					},deptId)

				}

			},
			fail: function(err) {

			}
		})
	},


	// 项目大类选择
	bindPickerChangeOne(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			index1: e.detail.value,
		});
	},

	// 紧急情况选择
	bindPickerChangeTwo(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			index2: e.detail.value,
		});
	},



	submit(e) {
		let value = e.detail.value;
		console.log(value);
		let that = this;
		if (value.title.trim() == "") {
			dd.alert({
				content: `标题不能为空，请输入！`,
				buttonText: promptConf.promptConf.Confirm,
			})
		}
		let OtherEngineers = "";
		let OtherEngineersId = "";
		for (let i = 0, len = that.data.OtherEngineers.length; i < len; i++) {
			OtherEngineers = OtherEngineers + that.data.OtherEngineers[i].name + ",";
			OtherEngineersId = OtherEngineersId + that.data.OtherEngineers[i].userId + ",";
		}
		OtherEngineers = OtherEngineers.substr(0, OtherEngineers.length - 1);
		OtherEngineersId = OtherEngineersId.substr(0, OtherEngineersId.length - 1);




		let CreateTaskInfo = [
			{
				ApplyMan: this.data.DingData.nickName,
				ApplyManId: this.data.DingData.userid,
				ApplyTime: value.TimeRequired,
				Dept: this.data.DingData.departmentList[this.data.departmentIdnex],
				FlowId: "34",
				IsEnable: "1",
				IsSend: false,
				NodeId: "0",
				Remark: value.remark,
				State: "1",
				Title: value.title,
			},
			{
				ApplyMan: that.data.ResponsibleMan.name || value.ResponsibleMan,
				ApplyManId: that.data.ResponsibleMan.userId || that.data.table.ResponsibleManId,
				FlowId: "34",
				IsBack: null,
				IsEnable: 1,
				IsSend: false,
				NodeId: "1",
				OldFileUrl: null,
				State: 0,
			}
		]


		let body = {

			"DeptName": value.DeptName.toString(),
			"Customer": value.Customer,
			"EmergencyLevel": that.data.array2[that.data.index2],
			"OtherEngineers": OtherEngineers || value.OtherEngineers,
			"OtherEngineersId": OtherEngineersId || that.data.table.OtherEngineersId,
			"ResponsibleMan": that.data.ResponsibleMan.name || value.ResponsibleMan,
			"ResponsibleManId": that.data.ResponsibleMan.userId || that.data.table.ResponsibleManId,
			"ProjectOverview": value.ProjectOverview.replace(/\s+/g, ""),
			"ProjectType": that.data.array1[that.data.index1],
			"Title": value.title,
			"TaskId": "",
			"TimeRequired": value.TimeRequired,
			"remark": value.remark,
			"MainPoints": value.MainPoints.replace(/\s+/g, ""),

		}

		if (!body.ResponsibleMan || !body.Customer || !body.Title || !body.ProjectType || !body.TimeRequired || !body.MainPoints || !body.ProjectOverview) {
			dd.alert({
				content: "请完整填写表单",
				buttonText:promptConf.promptConf.Confirm,
			})
		}
		else {
			this._postData("FlowInfoNew/CreateTaskInfo", (data) => {
				body.TaskId = data;
				this._postData("TechnicalSupport/Save", (data) => {
					that.setData({
						names: []
					})
					dd.alert({
						content: promptConf.promptConf.Submission,
						buttonText:promptConf.promptConf.Confirm,
						success: () => {
							dd.navigateBack({
								delta: 2
							})
						}
					});
				}, body);
			}, CreateTaskInfo);
		}
	},

	showOrClose() {
		if (this.data.rotate == "RotateToTheRight") {
			this.setData({
				rotate: "Rotate-downward",
				show: "show"
			})
		}

		else if (this.data.rotate == "Rotate-downward") {
			this.setData({
				rotate: "RotateToTheRight",
				show: "hidden"
			})
		}
	},
	//选择时间
	selectStartDateTime() {
		dd.datePicker({
			format: 'yyyy-MM-dd HH:mm',
			currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
			startDate: this.data.DateStr + ' ' + this.data.TimeStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
			success: (res) => {
				this.setData({
					startDateStr: res.date,
					'table.TimeRequired': res.date
				})
			},
		});
	},
	onShow() {
		// 页面被关闭
		if (app.globalData[`${this.data.flowid}`] == false || app.globalData[`${this.data.flowid}`] == undefined ) {
			this.data.items = [
				{ name: '工业软件研发部', value: '工业软件研发部' },
				{ name: '数控一代事业部', value: '数控一代事业部' },
				{ name: '机器人事业部', value: '机器人事业部' },
				{ name: '行政部', value: '行政部' },
				{ name: '财务部', value: '财务部' },
				{ name: '制造试验部', value: '制造试验部' },
				{ name: '项目推进部', value: '项目推进部' },
				{ name: '自动化事业部', value: '自动化事业部' },
			];
			this.setData({
				items: this.data.items
			})
		}


	},

})



