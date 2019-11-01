import pub from '/util/public';


let globalData = getApp().globalData;
let app = getApp();
Page({
	...pub.func,
	onLoad() {
		let that = this;
		this.checkLogin2(function() {
			that.getMenu();
			// that.getProjectList();
		});
		this.getUserInfo();
	},
	data: {
		...pub.data,
		pageName: 'component/index',
		pageInfo: {
			pageId: 0,
		},
		curIndex: 0,
		userIndex: -1,
		userList: [],
		sort: [],
		sortItems: [],


	},
	//选人控件方法
	choosePeople(e) {

		console.log('start choose people');
		let that = this
		dd.complexChoose({
			...that.chooseParam,
			multiple: false,
			success: function(res) {
				console.log(res)
				if (res.users.length > 0) {
					let name = res.users[0].name
					let userId = res.users[0].userId
					let app = getApp()
					app.userInfo.name = name
					app.userInfo.userid = userId
					app.userInfo.nickName = name
					that.setData({
						DingData: {
							nickName: name,
							userid: userId
						}
					})
				}
			},
			fail: function(err) {

			}
		})
	},

	upLoadFile() {
		dd.uploadAttachmentToDingTalk({
			image: { multiple: true, compress: false, max: 9, spaceId: "12345" },
			space: { spaceId: "12345", isCopy: 1, max: 9 },
			file: { spaceId: "12345", max: 1 },
			types: ["photo", "camera", "file", "space"],//PC端仅支持["photo","file","space"]
			success: (res) => {
				console.log(res)
				dd.alert({
					content: JSON.stringify(res)
				})
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	},
	//选人操作
	selectUser(value) {

		let userIndex = value.detail.value
		let name = this.data.userList[userIndex].NodePeople
		let userId = this.data.userList[userIndex].PeopleId
		let app = getApp()
		app.userInfo.name = name
		app.userInfo.userid = userId
		app.userInfo.nickName = name

		this.setData({
			DingData: {
				nickName: name,
				userid: userId
			},
			userIndex: value.detail.value
		})
	},
	getUserInfo() {
		let that = this
		this._getData('FlowInfoNew/GetUserInfo', function(data) {
			that.setData({
				userList: data
			})
		})
	},

	// getMenu() {
	// 	let that = this;
	// 	this._getData('FlowInfoNew/LoadFlowSort?userId=' + app.userInfo.userid, function(data) {
	// 		let sorts = data;
	// 		that.setData({ sort: data });
	// 		let sortItem = [];//用于存放sort打开展开收起的数据
	// 		let tempdata = [];//用于存放流程数据
	// 		for (let s of sorts) {
	// 			for (let f of s.flows) {
	// 				f.flowId = f.FlowId;
	// 				f.sortName = s.SORT_NAME;
	// 				f.flowName = f.FlowName;

	// 				tempdata.push(f);
	// 			}

	// 		}
	// 		let temp = that.mergeObjectArr(tempdata, that.data.menu, 'flowId');
	// 		for (let s of sorts) {
	// 			let item = {
	// 				text: "收起",
	// 				class: "dropdown-content-show"
	// 			}
	// 			sortItem.push(item);
	// 			s['show'] = false;
	// 			for (let t of temp) {
	// 				if (t.url && t.sortId == s.Sort_ID) {
	// 					s['show'] = true;
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		console.log(sorts);
	// 		console.log(temp);
	// 		console.log(sortItem);
	// 		console.log(that.data.menu);

	// 		app.globalData.sort = sorts;
	// 		app.globalData.menu = temp;
	// 		app.globalData.sortItems = sortItem;
	// 		that.setData({
	// 			sort: sorts,
	// 			menu: temp,
	// 			sortItems: sortItem
	// 		})
	// 	})
	// },


	getMenu() {
		let that = this;
		this._getData('FlowInfoNew/LoadFlowSort?userId=' + app.userInfo.userid, function(data) {
			let sorts = data;
			that.setData({ sort: data });
			let sortItem = [];//用于存放sort打开展开收起的数据
			let tempdata = [];//用于存放流程数据
			for (let s of sorts) {
				for (let f of s.flows) {
					f.flowId = f.FlowId;
					f.sortName = s.SORT_NAME;
					f.flowName = f.FlowName;

					tempdata.push(f);
				}

			}
			let temp = that.mergeObjectArr(tempdata, that.data.menu, 'flowId');
			for (let s of sorts) {
				let item = {
					text: "收起",
					class: "dropdown-content-show"
				}
				sortItem.push(item);
				s['show'] = false;
				for (let t of temp) {
					if (t.url && t.sortId == s.Sort_ID) {
						s['show'] = true;
						break;
					}
				}
			}
			// console.log(sorts);
			// console.log(temp);
			// console.log(sortItem);
			// console.log(that.data.menu);

			app.globalData.sort = sorts;
			app.globalData.menu = temp;
			app.globalData.sortItems = sortItem;
			that.setData({
				sort: sorts,
				menu: temp,
				sortItems: sortItem
			})
		})
	},


	//点击展示
	showOrClose(event) {
		let index = event.target.dataset.index;
		if (this.data.sortItems[index].text == "展开") {
			let item = this.data.sortItems;
			item[index] = {
				text: "收起",
				class: "dropdown-content-show"
			}
			this.setData({
				sortItems: item
			})
		}
		else if (this.data.sortItems[index].text === "收起") {
			let item = this.data.sortItems;
			item[index] = {
				text: "展开",
				class: "dropdown-content"
			}
			this.setData({
				sortItems: item
			})
		}

	}


});
