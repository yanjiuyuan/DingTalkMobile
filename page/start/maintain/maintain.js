import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		hidden: true,
		addPeopleNodes: [1], //额外添加审批人节点数组
		tableOperate: '选择',
		purchaseList: [],
		tableParam2: {
			size: 100,
			now: 1,
			total: 0
		},
		tableOperate2: '删除',
		good: {},
		totalPrice: 0,
		tableItems: [
			{
				prop: 'FNumber',
				label: '物料编码',
				width: 200
			},
			{
				prop: 'FName',
				label: '物料名称',
				width: 300
			},
			{
				prop: 'FModel',
				label: '规格型号',
				width: 300
			},
			{
				prop: 'FNote',
				label: '预计单价',
				width: 100
			}
		],
		tableItems2: [
			{
				prop: 'CodeNo',
				label: '物料编码',
				width: 200
			},
			{
				prop: 'Name',
				label: '物料名称',
				width: 300
			},
			{
				prop: 'Standard',
				label: '规格型号',
				width: 300
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
			},
			{
				prop: 'Count',
				label: '数量',
				width: 100
			},
			{
				prop: 'MaintainContent',
				label: '维修内容',
				width: 300
			},
			{
				prop: 'NeedTime',
				label: '需用时间',
				width: 200
			},
			{
				prop: 'Mark',
				label: '备注',
				width: 300
			}
		],
		//data:[]
	},
	submit(e) {
		let that = this
		let value = e.detail.value
		if (!this.data.projectIndex || this.data.purchaseList.length == 0 || value.title == "") {
			dd.alert({
				content: `表单填写不完整`,
				buttonText:promptConf.promptConf.Confirm
			});
			return
		}
		if (value.title.trim() == "") {
			dd.alert({
				content: `标题不能为空，请输入!`,
				buttonText:promptConf.promptConf.Confirm
			})
		}
		let param = {
			Title: value.title,
			Remark: value.remark,
			ProjectName: that.data.projectList[that.data.projectIndex].ProjectName,
			ProjectId: that.data.projectList[that.data.projectIndex].ProjectId
		}
		let callBack = function(taskId) {
			that.bindAll(taskId)
		}
		console.log(param)
		this.approvalSubmit(param, callBack)
	},
	bindAll(taskId) {
		let paramArr = []
		for (let p of this.data.purchaseList) {
			p.TaskId = taskId
			paramArr.push(p)
		}
		this._postData('Maintain/Save', (res) => {
			this.doneSubmit()
		}, paramArr)
	},

	//提交弹窗表单
	addGood(e) {
		let value = e.detail.value
		console.log(value)
		console.log(this.data.good)
		for (let p of this.data.purchaseList) {
			if (p.CodeNo == this.data.good.FNumber) return
		}
		if (!value || !value.Unit || !value.Count || !value.NeedTime || !value.MaintainContent) {
			dd.alert({
				content: `表单填写不完整`,
				buttonText:promptConf.promptConf.Confirm
			});
			return
		}
		let param = {
			CodeNo: this.data.good.FNumber,
			Name: this.data.good.FName,
			Standard: this.data.good.FModel,
			Unit: value.Unit,
			Price: value.Price ? value.Price + '' : '0',
			Count: value.Count,
			MaintainContent: value.MaintainContent,
			NeedTime: value.NeedTime,
			Mark: value.Mark
		}
		let length = this.data.purchaseList.length
		let setStr = 'purchaseList[' + length + ']'
		this.setData({
			startDateStr:"",
			[`purchaseList[${length}]`]: param
		})
		this.onModalCloseTap()
	},

});
