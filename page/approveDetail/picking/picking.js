import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	...pub.func.dowith,
	data: {
		...pub.data,
		hidden: true,
		totalPrice: '0',
		imgUrlList: [],
		tableItems2: [
			{
				prop: 'fNumber',
				label: '物料编码',
				width: 200
			},
			{
				prop: 'fName',
				label: '物料名称',
				width: 300
			},
			{
				prop: 'fModel',
				label: '规格型号',
				width: 300
			},
			{
				prop: 'unitName',
				label: '单位',
				width: 100
			},
			{
				prop: 'fQty',
				label: '实收数量',
				width: 200
			},
			{
				prop: 'fFullName',
				label: '供应商',
				width: 300
			}
		],
	},
	submit(e) {
		let that = this
		let value = e.detail.value
		let param = { 
			Title: value.title,
			Remark: value.remark
		}
		if (this.data.imgUrlList.length > 0) {
			param['ImageUrl'] = this.data.imgUrlList.join(',')
		}
		else if (this.data.nodeid == 3 && this.data.imgUrlList.length == 0) {
			dd.alert({
				content: promptConf.promptConf.NoPicture, 
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}
		//return
		this.aggreSubmit(param)
	},


	deletePhoto(e) {
		dd.confirm({
			title: '温馨提示',
			content: promptConf.promptConf.DeletePicture,
			confirmButtonText: promptConf.promptConf.Confirm,
			cancelButtonText: promptConf.promptConf.Cancel,
			success: (result) => {
				if (result.confirm == true) {

					let index = e.currentTarget.dataset.index;
					this.data.imageList.splice(index, 1); 
					this.data.imgUrlList.splice(index, 1);

					this.setData({
						imageList: this.data.imageList,
						imgUrlList:this.data.imgUrlList
					})
				}
			},
		});
	},
});
