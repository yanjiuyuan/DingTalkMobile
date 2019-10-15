import pub from '/util/public';
import lib from '/lib.js';
let good = {}

Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		addPeopleNodes: [1],
		names: [],


		items: [
			{ name: '智慧工厂事业部', value: '智慧工厂事业部', checked: true },
			{ name: '数控一代事业部', value: '数控一代事业部', },
			{ name: '机器人事业部', value: '机器人事业部' },
			{ name: '行政部', value: '行政部' },
			{ name: '财务部', value: '财务部' },
			{ name: '制造试验部', value: '制造试验部' },
			{ name: '项目推进部', value: '项目推进部' },
			{ name: '自动化事业部', value: '自动化事业部' },
		],

		array1: ['研发类', '产品类', '教育类'],
		index1: -1,
		array2: ['高', '中', '低'],
		index2: 0,

		OtherEngineers: "",
		ResponsibleMan: "",
		rotate: "RotateToTheRight",
		show: "hidden"
	},

	//选人控件方法
	choosePeoples(e) {
		console.log('start choose people');
		var nodeId = e.target.targetDataset.NodeId;
		var that = this;
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



	choosePeople(e) {
		console.log('start choose people');
		let nodeId = e.target.targetDataset.NodeId;
		let that = this;
		dd.complexChoose({
			...that.data.chooseParam,
			multiple: true,
			title: "其他工程师",
			success: function(res) {
				console.log(res);
				let names = []//userId
				if (res.departments.length == 0) {
					for (let d of res.users) names.push(d.name);
					that.data.names = [...new Set(that.data.names)];
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
					that.getDataReturnData("DingTalkServers/GetDeptUserListByDeptId?deptId=" + res.departments[0].id, (res) => {
						for (let d of JSON.parse(res.data).userlist) {
							names.push(d.name);
						}
						that.setData({
							'table.OtherEngineers': names.join(','),
							OtherEngineers: JSON.parse(res.data).userlist,

						})
					})

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
		let that = this;
		console.log(that.data.OtherEngineers);
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
				Dept: this.data.DingData.departName,
				FlowId: "34",
				IsEnable: "1",
				IsSend: false,
				NodeId: "0",
				Remark: value.remark,
				State: "1",
				Title: value.title,
			},
			{
				ApplyMan: that.data.ResponsibleMan.name,
				ApplyManId: that.data.ResponsibleMan.userId,
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
			"OtherEngineers": OtherEngineers,
			"OtherEngineersId": OtherEngineersId,
			"ResponsibleMan": that.data.ResponsibleMan.name,
			"ResponsibleManId": that.data.ResponsibleMan.userId,
			"ProjectOverview": value.ProjectOverview.replace(/\s+/g, ""),
			"ProjectType": that.data.array1[that.data.index1],
			"Title": value.title,
			"TaskId": "",
			"TimeRequired": value.TimeRequired,
			"remark": value.remark,
			"MainPoints": value.MainPoints.replace(/\s+/g, ""),

		}

		console.log(body);
		if (!body.ResponsibleMan || !body.Customer || !body.Title || !body.ProjectType || !body.TimeRequired || !body.MainPoints || !body.ProjectOverview) {
			dd.alert({
				content: "请完整填写表单"
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
						content: "提交审批成功",
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
	}
})



