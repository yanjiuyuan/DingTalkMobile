import pub from '/util/public';
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		hidden: true,
		tableOperate: "添加",
		purchaseList: [],//已选列表
		tableItems: [
			{
				prop: 'Type',
				label: '大类',
				width: 200
			},
			{
				prop: 'ProjectName',
				label: '小类',
				width: 300
			},
			{
				prop: 'GiftName',
				label: '名称',
				width: 300
			},
			{
				prop: 'Stock',
				label: '库存',
				width: 100
			},
			{
				prop: 'Unit',
				label: '单位',
				width: 100
			},
			{
				prop: 'Price',
				label: '单价',
				width: 100
			}
		],
		tableItems2: [
			{
				prop: 'GiftName',
				label: '礼品名称',
				width: 500
			},
			{
				prop: 'GiftCount',
				label: '礼品数量',
				width: 300
			},
		]
	},

	search(e) {
		let value = e.detail.value;
		console.log(value);
		if (value.keyWord == "") {
			dd.alert({
				content: "请输入关键字"
			})
			return;
		}
		let param = {
			key: value.keyWord
		}
		this._getData("Gift/GetStock" + this.formatQueryStr(param), (res) => {
			console.log(res);
			if (res.length == 0) {
				dd.alert({
					content: "暂无数据"
				})
			}
			else if (res.length > 0) {
				this.setData({
					tableData: res
				})
			}

		})
	},

	//添加
	chooseItem(e) {
		if (!e) return
		this.data.good = e.target.targetDataset.row
		if (!this.data.good) return

		this.setData({
			hidden: !this.data.hidden
		})
		this.createMaskShowAnim();
		this.createContentShowAnim();

	},

	//提交弹窗表单
	addGood(e) {
		let value = e.detail.value
		console.log(value)
		if (!value || !value.GiftCount) {
			dd.alert({
				content: `表单填写不完整`,
			});
			return
		}
		let param = {
			GiftName: this.data.good.GiftName,
			GiftNo: this.data.good.Id,
			GiftCount: value.GiftCount,
		}
	

		let length = this.data.purchaseList.length
		this.setData({
			[`purchaseList[${length}]`]: param,
		})
		this.onModalCloseTap();

	},

	submit(e) {
		let that = this;
		let value = e.detail.value;
		let param = {
			Title: value.title,
			Remark: value.remark
		}
		if (!that.data.purchaseList.length) {
			dd.alert({ content: `请选择礼品` })
			return
		}
		let callBack = function(taskId) {
			that.bindAll(taskId)
		}
		console.log(param)
		//return
		this.approvalSubmit(param, callBack)
	},


	bindAll(taskId) {
		let that = this
		let paramArr = []
		for (let p of that.data.purchaseList) {
			p.TaskId = taskId
			paramArr.push(p)
		}
		that.requestJsonData('POST', "Gift/TableSave", function(res) {
			that.doneSubmit()
		}, JSON.stringify(paramArr))
	},
}) 
