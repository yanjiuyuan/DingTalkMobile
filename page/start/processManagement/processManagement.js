import pub from '/util/public';
const app = getApp();
Page({
	...pub.data,
	...pub.func,
	data: {
		List: []
	},
	onLoad() { },

	choosePeople(e) {
		let that = this;
		dd.complexChoose({
			title: "选择离职人员",            //标题
			multiple: false,            //是否多选
			limitTips: "超出了人数范围", //超过限定人数返回提示
			maxUsers: 10,            //最大可选人数
			pickedUsers: [],            //已选用户 
			pickedDepartments: [],          //已选部门
			appId: app.globalData.appId,              //微应用的Id
			responseUserOnly: false,        //返回人，或者返回人和部门
			startWithDepartmentId: 0,   // 0表示从企业最上层开始},
			success: function(res) {
				that._getData("FlowInfoNew/GetNodeInfoInfoByApplyManId?applyManId=" + res.users[0].userId, (result) => {
					if (JSON.stringify(result) == "{}") {
						dd.alert({
							content: "该用户无配置节点信息。",
							buttonText: "确认"
						})
						that.setData({
							severanceOfficer: res.users[0].name,
							severanceOfficerId: res.users[0].userId
						})
						return;
					}
					let processData = [];
					let resultKey = Object.keys(result);
					for (let i in result) {
						processData.push(result[i]);
					}
					for (let i in processData) {
						processData[i] = {
							flowName: resultKey[i],
							nodeList: that.Arrangement(processData[i], res.users[0].name, res.users[0].userId)
						}
					}
					console.log(processData);
					that.setData({
						processData: processData,
						severanceOfficer: res.users[0].name,
						severanceOfficerId: res.users[0].userId
					})

				})
			},
			fail: function(err) {
			}
		})
	},
	//整理数组
	Arrangement(array, name, id) {

		let tempNodeList = [];
		console.log("sssss");
		console.log(array)
		for (let i of array) {
			if ( i.PeopleId != null && i.PeopleId.indexOf(id) != -1) {
				i.AddPeople = [{ name: name, userId: id }]
			}
		}
		console.log(array);
		return array;
	}
});
