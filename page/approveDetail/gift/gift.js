import pub from '/util/public';
Page({
	...pub.func,
	...pub.func.dowith,
	data: {
		...pub.data,
		tableItems2: [
			{
				prop: 'GiftName',
				label: '礼品名称',
				width: 400
			},

			{
				prop: 'GiftCount',
				label: '数量',
				width: 400
			},
		]
	},
	onReady() {
		this._getData("Gift/GetTable" + this.formatQueryStr({ TaskId: this.data.taskid }), (res) => {
			console.log(res);
			this.setData({
				tableData: res
			})
		})
	},
	submit(e) {
		let that = this;
		let value = e.detail.value;
		let param = {
			Title: value.title,
			Remark: value.remark
		}
		this.aggreSubmit(param);

	},
	print() {
		let that = this
		this._getData('Gift/GetPrintPDF' + this.formatQueryStr({
			UserId: that.data.DingData.userid,
			TaskId: that.data.taskid
		}),
			function(res) {
				dd.alert({ content: '获取成功，请在钉钉工作通知中查收' })
			},
			{
				UserId: that.data.DingData.userid,
				TaskId: that.data.taskid
			}
		)
	},
})