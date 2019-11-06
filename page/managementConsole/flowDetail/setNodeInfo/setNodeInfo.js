import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	data: {
		...pub.data,
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
	delete() {
		dd.confirm({
			content:"是否删除该节点？",
			confirmButtonText: promptConf.promptConf.Confirm,
			cancelButtonText: promptConf.promptConf.Cancel
		})
	},
	add(){
		dd.alert({
			content:"添加节点",
			buttonText:promptConf.promptConf.Confirm,
		})
	},
	choosePeople(e) {
		let that = this;
		console.log('start choose people');
		dd.complexChoose({
			...that.data.chooseParam,
			title:"选择审批人",
			multiple: true,
			success: function(res) {
				console.log(res);
			},
			fail: function(err) {

			}
		})
	},
});
