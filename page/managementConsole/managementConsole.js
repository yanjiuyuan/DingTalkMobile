const app = getApp();
import pub from "/util/public";
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	data: {
		...pub.data,
		ifName: false, //用来新增分组
		hidden: false, //用来修改分组名
		title: "请输入分组名称",
		title_1: "请输入新分组名称",

		animMaskData: [] //遮罩层
	},
	onLoad() {
		this.setData({
			sort: app.globalData.sort,
			menu: app.globalData.menu,
			sortItems: app.globalData.sortItems
		});
	},

	//添加快捷方式
	addShortcut(e) {
		console.log(e);
		let item = JSON.stringify(e.target.dataset.item);
		dd.navigateTo({
			// url: "/page/managementConsole/addShortcut/addShortcut?item=" + item
			url: "/page/managementConsole/addFlow/addFlow?item=" + item

		});
	},

	//修改名字
	modifyName(e) {
		let item = e.target.dataset.item;
		console.log(item);
		dd.alert({
			content: "修改名字"
		});
	},

	//删除一整个分组
	delete(e) {
		let that = this;
		let item = e.target.dataset.item;
		console.log(item);

		dd.confirm({
			content: "是否删除" + item.SORT_NAME + "整个分组",
			confirmButtonText: promptConf.promptConf.Confirm,
			cancelButtonText: promptConf.promptConf.Cancel,
			success: result => {
				if (result.confirm == true) {
					var obj = {
						FlowSortList: [item],
						applyManId: app.userInfo.userid
					};
					console.log(obj);
					this._postData(
						"FlowInfoNew/FlowSortDelete",
						res => {
							console.log(res);
							for (
								let i = 0, len = app.globalData.sort.length;
								i < len;
								i++
							) {
								if (
									app.globalData.sort[i].Sort_ID ==
									item.Sort_ID
								) {
									app.globalData.sort.splice(i, 1);
								}
							}

							that.setData({
								sort: app.globalData.sort
							});
						},
						obj
					);
				}
			}
		});
	},
	//删除这一项
	deleteItem(e) {
		console.log(e);
		let item = e.target.dataset.item;
		dd.alert({
			content: "是否删除" + item.FlowName,
			buttonText: promptConf.promptConf.Confirm
		});
	},

	// 新增
	increase() {
		this.setData({
			ifName: !this.data.ifName
		});
	},

	//排序
	sort() {
		dd.navigateTo({
			// url: "/page/managementConsole/sort/sort"
			url: "/page/managementConsole/sortTest/sortTest"
			// url: "/page/managementConsole/sortTest_1/sortTest_1"
		});
	},
	Submit(e) {
		let that = this;
		let groupName = e.detail.value.groupName;
		var obj = {
			FlowSortList: [
				{
					CreateTime: this.data.DateStr + " " + this.data.TimeStr,
					IsEnable: 1,
					OrderBY:
						app.globalData.sort[app.globalData.sort.length - 1]
							.OrderBY + 1,
					SORT_NAME: groupName,
					Sort_ID: (
						app.globalData.sort[app.globalData.sort.length - 1]
							.Sort_ID -
						0 +
						1
					).toString(),
					State: 1
				}
			],
			applyManId: app.userInfo.userid
		};
		console.log(obj);
		this._postData(
			"FlowInfoNew/FlowSortAdd",
			res => {
				app.globalData.sort.push(obj.FlowSortList[0]);
				that.setData({
					sort: app.globalData.sort
				});
			},
			obj
		);

		this.setData({
			ifName: !this.data.ifName
		});
	},

	cancel() {
		this.setData({
			ifName: !this.data.ifName
		});
	},
	//跳转到流程详细信息
	toChange(e) {
		console.log(e);
		let item = e.target.dataset.item;
		let sort = e.target.dataset.sort;
		delete sort.flows;
		dd.navigateTo({
			url: "flowDetail/flowDetail?item=" + JSON.stringify(item) + "&sort=" + JSON.stringify(sort)
		})
	}
});
