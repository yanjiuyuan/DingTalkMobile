import pub from '/util/public';
import promptConf from "/util/promptConf.js";

Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		tableOperate: '选择',
		tableParam2: {
			size: 100,
			now: 1,
			total: 0
		},
		tableItems: [
			{
				prop: 'TaskId',
				label: '流水号',
				width: 100
			},
			{
				prop: 'ApplyMan',
				label: '申请人',
				width: 100
			},
			{
				prop: 'ProjectName',
				label: '项目名称',
				width: 300
			},
			{
				prop: 'Title',
				label: '标题',
				width: 400
			},
			{
				prop: 'ApplyTime',
				label: '申请时间',
				width: 300
			}
		],
	},
	search(e) {
		let that = this;
		let value = e.detail.value;

		console.log(value);
		if (!value || !value.keyWord.trim()) {
			dd.alert({
				content: promptConf.promptConf.SearchNoInput,
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}
		that._getData('PurchaseOrder/Quary' + that.formatQueryStr({ Key: value.keyWord }), function(res) {
			console.log(res);
			if (res.length == 0) {
				dd.alert({
					content: promptConf.promptConf.SearchNoReturn,
					buttonText: promptConf.promptConf.Confirm,
				})
			}
			that.setData({
				tableData: res
			})
		})
	},
	chooseItem(e) {

		console.log(e);
		let row = e.target.targetDataset.row;
		console.log(row);

	}
})