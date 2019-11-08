import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	data: {
		...pub.data,
		FirstArray: [{ name: '是', label: true }, { name: '否', label: false }],//退回
		SecondArray: [{ name: '是', label: true }, { name: '否', label: false }],//抄送
		thirdArray: [{ name: '是', label: true }, { name: '否', label: false }],//选人
		firstNeedArray: [],
		secondNeedArray: [],
		thirdNeedArray: [],

	},
	onLoad(option) {
		let that = this;
		console.log(option);

		this._getData("FlowInfoNew/GetNodeInfos" + this.formatQueryStr(option), (res) => {
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
				if (node["NodePeople"] != null && node["NodePeople"] != "") {
					node["NodePeople"] = node["NodePeople"].split(",");
					node["PeopleId"] = node["PeopleId"].split(",");
				}

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
				FlowId: option
			})
		})
	},
	delete(e) {
		let that = this;
		let NodeId = e.currentTarget.dataset.NodeId;
		dd.confirm({
			content: "是否删除该节点？",
			confirmButtonText: promptConf.promptConf.Confirm,
			cancelButtonText: promptConf.promptConf.Cancel,
			success: (result) => {
				console.log(result);
				if (result.confirm == true) {
					for (let i = 0, lengh = that.data.nodeList.length; i < lengh - 1; i++) {
						if (NodeId == that.data.nodeList[i].NodeId) {
							that.data.nodeList.splice(i, 1);
							for (let j = i, lengh = that.data.nodeList.length; j < lengh; j++) {
								that.data.nodeList[j].NodeId -= 1;
								that.data.nodeList[j].PreNodeId -= 1;
							}
						}
					}
					console.log(that.data.nodeList);
					that.setData({
						nodeList: that.data.nodeList
					})
				}
			},
		})
	},
	add(e) {
		let that = this;
		let NodeId = e.currentTarget.dataset.NodeId;
		let length = this.data.nodeList.length;//减去结束节点
		let arr = [];
		for (let i = NodeId + 2; i < length; i++) {
			arr.push({ name: i, value: i });
		}
		this.setData({
			needChoose: arr,
			NodeId: NodeId,
			hidden: !this.data.hidden
		})
		this.createMaskShowAnim();
		this.createContentShowAnim();
	},
	choosePeople(e) {
		let that = this;
		console.log('start choose people');
		dd.complexChoose({
			...that.data.chooseParam,
			title: "选择审批人",
			multiple: true,
			success: function(res) {
				console.log(res);
			},
			fail: function(err) {

			}
		})
	},
	choosePeoples(e) {
		let that = this;
		console.log('start choose people');
		dd.complexChoose({
			...that.data.chooseParam,
			title: "选择审批人",
			multiple: that.data.multiple || false,
			success: function(res) {
				console.log(res);
				let names = [];
				let ids = [];
				let addPeoples = [];
				if (res.departments.length == 0) {
					for (let d of res.users) {
						names.push(d.name);
						ids.push(d.userId);
						addPeoples.push({
							name: d.name,
							userId: d.userId
						})
					}
					that.setData({
						Approver: names.join(','),
						PeopleId: ids.join(","),
					})

				}
				else {
					let deptId = [];
					for (let i of res.departments) {
						deptId.push(i.id);
					}
					that.postDataReturnData("DingTalkServers/GetDeptAndChildUserListByDeptId", (res) => {
						console.log(res.data);
						that.data.pickedUsers = [];
						that.data.pickedDepartments = [];
						let userlist = [];
						for (let i in res.data) {
							let data = JSON.parse(res.data[i]);
							that.data.pickedDepartments.push(i);
							userlist.push(...data.userlist);
							for (let d of data.userlist) {
								that.data.pickedUsers.push(d.userid);
								names.push(d.name);
								ids.push(d.userid);
								addPeoples.push({
									name: d.name,
									userId: d.userId
								})
								d.userId = d.userid;
							}
						}
						names = [...new Set(names)];//数组去重
						ids = [...new Set(ids)];//数组去重
						that.setData({
							Approver: names.join(','),
							PeopleId: ids.join(","),
						})
					}, deptId)

				}
			},
			fail: function(err) {

			}
		})
	},
	cancel() {
		this.setData({
			hidden: !this.data.hidden
		})
		this.createMaskHideAnim();
		this.createContentHideAnim();

	},
	radioChangeOne(e) {
		this.setData({
			IsBack: e.detail.value
		})
	},
	//是否抄送
	radioChangeTwo(e) {
		console.log(e);
		this.setData({
			Approver: "",
			isBack: false,
			show: false,
			multiple: e.detail.value,
			IsSend: e.detail.value
		})
	},
	radioChangeThree(e) {
		console.log(e);

		this.setData({
			show: e.detail.value
		})
	},
	onChanges(e) {
		console.log(e);

		let arr = e.detail.value.sort();

		let arr1 = [];
		let arr2 = [];
		let arr3 = [];
		let arr4 = [];

		for (let i = 0, len = arr.length; i < len; i++) {
			arr1.push({ name: arr[i], value: arr[i] });
			arr2.push({ name: arr[i], value: arr[i] });
			arr3.push({ name: arr[i], value: arr[i] });
		}

		for (let i = 0, length = this.data.needChoose.length; i < length; i++) {
			for (let j of arr) {
				if (j == this.data.needChoose[i].value) {
					arr4[i] = 1;
					break;
				}
				else {
					arr4[i] = 0;
				}
			}
		}
		this.setData({
			firstNeedArray: arr1,//需要多选节点
			secondNeedArray: arr2,//必选节点
			thirdNeedArray: arr3,//角色选人
			ChoseNodeId: arr4
		})
	},
	onChangeFisrt(e) {
		let arr = [];
		let value = e.detail.value;
		for (let i = 0, length = this.data.needChoose.length; i < length; i++) {
			for (let j of value) {
				if (j == this.data.needChoose[i].value) {
					arr[i] = 1;
					break;
				}
				else {
					arr[i] = 0;
				}
			}
		}
		this.setData({
			IsSelectMore: arr
		})
	},
	onChangeSecond(e) {
		let arr = [];
		let value = e.detail.value;
		for (let i = 0, length = this.data.needChoose.length; i < length; i++) {
			for (let j of value) {
				if (j == this.data.needChoose[i].value) {
					arr[i] = 1;
					break;
				}
				else {
					arr[i] = 0;
				}
			}
		}
		this.setData({
			IsMandatory: arr
		})
	},
	onChangeThird(e) {
		console.log(e);
		let arr = e.detail.value.sort();
		let arrs = [];
		for (let i of arr) {
			arrs.push({
				index: i,
				roleIndex: -1
			});
		}
		this.setData({
			choosePeopleArray: arrs
		})
	},
	change(e) {
		console.log(e);
		let item = e.currentTarget.dataset.item;
		for (let i of this.data.choosePeopleArray) {
			if (item.index == i.index) {
				i.roleIndex = e.detail.value;
			}
		}
		console.log(this.data.choosePeopleArray);
		this.setData({
			choosePeopleArray: this.data.choosePeopleArray
		})
	},
	onReady() {
		let that = this;
		this._postData("Role/GetRoleInfoList",
			(res) => {
				console.log(res);
				let roleList = [];
				for (let i in res) {
					roleList.push(i);
				}
				that.setData({
					roleList: roleList
				})
			},
		)
	},
	submit(e) {
		let that = this;
		let value = e.detail.value;
		let nodeInfo = {
			NodeId: that.data.NodeId + 1,
			FlowId: that.data.FlowId.flowId,
			NodeName: value.NodeName,
			NodePeople: value.NodePeople,
			PeopleId: that.data.PeopleId,
			PreNodeId: that.data.NodeId + 2,
			IsAllAllow: false,
			IsBack: value.IsBack || false,
			IsNeedChose: value.IsNeedChose || false,
			IsSend: that.data.IsSend,
			BackNodeId: value.BackNodeId || "",
			ChoseNodeId:that.data.ChoseNodeId ? that.data.ChoseNodeId.join(",") : "",
			IsSelectMore: that.data.IsSelectMore ? that.data.IsSelectMore.join(",") : "",
			IsMandatory: that.data.IsMandatory ? that.data.IsMandatory.join(",") : "",
			ChoseType: 0,
			RoleNames: [],
		}
		console.log(nodeInfo);
		console.log(e);
	}
});
