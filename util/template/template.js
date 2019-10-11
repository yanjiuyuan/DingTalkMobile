
var globalData = getApp().globalData;
import pub from '/util/public';
import lib from '/lib.js';
export default {
	data: {

		animMaskData: [],
		animContentData: [],
		//选人变量
		nodeList: [],
		chooseParam: {
			title: "审批选人",            //标题
			multiple: false,            //是否多选
			limitTips: "超出了人数范围", //超过限定人数返回提示
			maxUsers: 10,            //最大可选人数
			pickedUsers: [],            //已选用户 
			pickedDepartments: [],          //已选部门
			appId: globalData.appId,              //微应用的Id
			responseUserOnly: false,        //返回人，或者返回人和部门
			startWithDepartmentId: 0,   // 0表示从企业最上层开始},
		},
		//表格变量
		tableData: [],
		tableParam: {
			size: 5,
			now: 1,
			total: 0
		},
	},
	func: {


		//选人控件方法
		choosePeople(e) {
			console.log('start choose people');
			console.log(this.data.nodeList);

			var nodeId = e.target.targetDataset.NodeId;
			var that = this;
			let arr = that.data.nodeList;
			let index = nodeId;
			let IsMultipleSelection = 0;
			for (let i = nodeId - 1; 0 <= i; i--) {
				if (arr[i].NodeName.indexOf("项目负责人") == 0 || arr[i].NodeName.indexOf("抄送") == 0) {
					index--;
				}
				if (arr[i].NodeName.indexOf("项目负责人") == -1 && arr[i].IsSelectMore != null) {
					let IsSelectMoreArray = arr[i].IsSelectMore.split(",");
					console.log(IsSelectMoreArray);
					IsMultipleSelection = IsSelectMoreArray[index - 1];
					console.log("index:" + (index - 1));
					console.log(IsMultipleSelection);

				}

			}


			dd.complexChoose({
				...that.data.chooseParam,
				multiple: IsMultipleSelection == 0 || IsMultipleSelection == undefined ? false : true,
				success: function(res) {
					let result = res;
					dd.httpRequest({
						url: that.data.dormainName + "DingTalkServers/getUserDetail" + lib.func.formatQueryStr({ userid: res.users[0].userId }),
						method: 'POST',
						headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
						success: function(res) {

							let name = res.data.name;

							for (let node of that.data.nodeList) {
								if (node.NodeId == nodeId) {
									result.users.name = name;
									node.AddPeople = result.users;
								}
							}
							console.log("选择了一个人");
							console.log(that.data.nodeList);
							that.setData({
								nodeList: that.data.nodeList
							})

						}

					})

				},
				fail: function(err) {

				}
			})
		},









		NodePeople(e) {
			console.log(e.currentTarget.dataset.NodePeople);
			let that = this;
			dd.complexChoose({
				title: "已选人数",            //标题
				success: function(res) {
				},
				fail: function(err) {
					console.log("fail!!");
				}
			})
		},





		//翻頁相關事件
		getData() {
			var start = this.data.tableParam.size * (this.data.tableParam.now - 1)
			var arr = this.data.data.slice(start, start + this.data.tableParam.size)
			this.setData({
				tableData: arr
			})
			console.log(this.data.tableData)
		},
		handleCurrentChange: function(event) {
			var page = event.target.dataset.page
			this.setData({
				"tableParam.now": page
			})
			this.getData()
		},
		//遮罩相关方法
		createMaskShowAnim() {
			const animation = dd.createAnimation({
				duration: 200,
				timingFunction: 'cubic-bezier(.55, 0, .55, .2)',
			});
			this.maskAnim = animation;
			animation.opacity(1).step();
			this.setData({
				animMaskData: animation.export(),
			});
		},
		createMaskHideAnim() {
			this.maskAnim.opacity(0).step();
			this.setData({
				animMaskData: this.maskAnim.export(),
			});
		},
		createContentShowAnim() {
			const animation = dd.createAnimation({
				duration: 200,
				timingFunction: 'cubic-bezier(.55, 0, .55, .2)',
			});
			this.contentAnim = animation;
			animation.translateY(0).step();
			this.setData({
				animContentData: animation.export(),
			});
		},
		createContentHideAnim() {
			this.contentAnim.translateY('100%').step();
			this.setData({
				animContentData: this.contentAnim.export(),
			});
		},
		//季老师修改意见
		changeSuggest(e) {
			this.setData({
				changeRemarkId: e.target.targetDataset.NodeId
			})
		},



		bindObjPickerChange(e) {
			this.setData({
				departmentIdnex: e.detail.value,
			});
		},
	},
};
