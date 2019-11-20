import pub from '/util/public';
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
	...pub.func,
	data: {

		IsEnableArray: [{ name: '是', label: 1 }, { name: '否', label: 0 }],
		IsSupportMobileArray: [{ name: '是', label: true }, { name: '否', label: false }],
		IsFlowArray: [{ name: '是', label: true }, { name: '否', label: false }],
	},
	onLoad(option) {
		let that = this;
		let item = JSON.parse(option.item);
		let sort = JSON.parse(option.sort);

		console.log(item);
		console.log(sort);

		for (let i of this.data.IsEnableArray) {
			if (item.IsEnable == i.label) {
				i.checked = true;
				break;
			}
			else {
				i.checked = false;
			}
		}
		for (let i of this.data.IsSupportMobileArray) {
			if (item.IsSupportMobile == i.label) {
				i.checked = true;

			}
			else {
				i.checked = false;
			}
		}

		for (let i of this.data.IsFlowArray) {
			if (item.IsFlow == i.label) {
				i.checked = true;

			}
			else {
				i.checked = false;
			}
		}
		this.setData({
			tableInfo: item,
			sort: sort,
			IsEnableArray: this.data.IsEnableArray,
			IsSupportMobileArray: this.data.IsSupportMobileArray,
			IsFlowArray: this.data.IsFlowArray
		})

	},
	//配置节点信息
	setNodeInfo() {
		dd.navigateTo({
			url: "setNodeInfo/setNodeInfo?flowId=" + this.data.tableInfo.flowId
		})
	},
	choosePeople(e) {

		console.log('start choose people');
		let that = this;
		dd.complexChoose({
			...that.data.chooseParam,
			pickedUsers: that.data.pickedUsers || [],            //已选用户
			multiple: true,
			title: "权限成员",
			success: function(res) {
				console.log(res);
				let names = [];//userId
				let ids = [];
				if (res.departments.length == 0) {
					that.data.pickedUsers = [];
					for (let d of res.users) {
						that.data.pickedUsers.push(d.userId);
						names.push(d.name);
						ids.push(d.userId);

					}
					that.setData({
						"tableInfo.ApplyMan": names.join(','),
						"tableInfo.ApplyManId": ids.join(','),

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
								ids.push(d.userid);
								d.userId = d.userid;
							}
						}
						that.data.pickedUsers = [...new Set(that.data.pickedUsers)];
						names = [...new Set(names)];//数组去重
						ids = [...new Set(ids)];//数组去重

						that.setData({
							"tableInfo.ApplyMan": names.join(','),
							"tableInfo.ApplyManId": ids.join(','),

						})
					}, deptId)

				}

			},
			fail: function(err) {

			}
		})

	},
	submit(e) {
		let value = e.detail.value;	
		for (let i in this.data.tableInfo) {
			for (let j in value) {
				if (i == j) {
					this.data.tableInfo[i] = value[j];
				}
			}
		}

		this.data.sort.flows = [this.data.tableInfo];
		let obj = {
			applyManId: app.userInfo.userid,
			FlowSortList: [this.data.sort]
		}
		this._postData("FlowInfoNew/LoadFlowModify", (res) => {
			dd.alert({
				content: promptConf.promptConf.UpdateSuccess,
				buttonText: promptConf.promptConf.Confirm
			})
		}, obj)
	}

});
