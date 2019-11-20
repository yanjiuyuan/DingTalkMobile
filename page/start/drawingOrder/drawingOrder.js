import pub from '/util/public';
import promptConf from "/util/promptConf.js";

Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		tableOperate: '选择',
		tableParam1: {
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
				width: 500
			},
			{
				prop: 'Title',
				label: '标题',
				width: 600
			},
			{
				prop: 'ApplyTime',
				label: '申请时间',
				width: 300
			}
		],
		tableItems2: [
			{
				prop: 'BomId',
				label: '组件名称',
				width: 450
			},
			{
				prop: 'Sorts',
				label: '类型',
				width: 100
			},
			{
				prop: 'DrawingNo',
				label: '代号',
				width: 300
			},
			{
				prop: 'Name',
				label: '名称',
				width: 200
			},
			{
				prop: 'SingleWeight',
				label: '数量',
				width: 100
			},
			{
				prop: 'MaterialScience',
				label: '材料',
				width: 200
			},
			{
				prop: 'Unit',
				label: '单位',
				width: 100
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


		let row = e.target.targetDataset.row;
		console.log(row);
		let OldFilePDFUrl = row.OldFilePDFUrl.split(",");
		let MediaIdPDF = row.MediaIdPDF.split(",");
		let OldFileUrl = row.OldFileUrl.split(",");
		let MediaId = row.MediaId.split(",");

		let filePDFList = [];
		let fileList = [];
		//pdf
		for (let i = 0, len = OldFilePDFUrl.length; i < len; i++) {
			filePDFList.push({
				name: OldFilePDFUrl[i],
				mediaId: MediaIdPDF[i],
			})
		}
		//相关文件
		for (let i = 0, len = OldFileUrl.length; i < len; i++) {
			fileList.push({
				name: OldFileUrl[i],
				mediaId: MediaId[i],
			})
		}

		this.setData({
			fileList:fileList,
			filePDFList:filePDFList,
			'tableInfo.ProjectName': row.ProjectName,
			tableData2: row.PurchaseList
		})

	},
	submit(e){
		let value = e.detail.value;
		console.log(value);
	}
})