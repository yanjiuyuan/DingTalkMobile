import pub from '/util/public';
import promptConf from "/util/promptConf.js";
let good = {}
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		hidden: true,
		tableOperate: '选择',
		purchaseList: [],
		addPeopleNodes: [1],
		tableParam2: {
			size: 100,
			now: 1,
			total: 0
		},
		tableOperate2: '删除',
		good: {},
		totalPrice: 0.00,
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
				prop: 'Purpose',
				label: '用途',
				width: 300
			},
			{
				prop: 'UrgentDate',
				label: '需用日期',
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
	//表单操作相关
	search(e) {
		let value = e.detail.value;
		console.log(value)
		if (!value || !value.keyWord.trim()) {
			dd.alert({
				content: promptConf.promptConf.SearchNoInput,
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}
		let that = this;
		that.requestData('GET', 'Purchase/GetICItem' + that.formatQueryStr({ Key: value.keyWord }), function(res) {
			console.log(JSON.parse(res.data))
			if (JSON.parse(res.data).length == 0) {
				dd.alert({
					content: promptConf.promptConf.SearchNoReturn,
					buttonText: promptConf.promptConf.Confirm,
				})
				return;
			}
			that.setData({
				'tableParam.total': JSON.parse(res.data).length
			})
			that.data.data = JSON.parse(res.data)
			that.getData()
		})
	},
	submit(e) {
		let that = this;
		if (that.data.projectList[that.data.projectIndex] == undefined) {
			dd.alert({
				content: "项目名称不能为空，请输入！",
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}
		let value = e.detail.value
		let param = {
			Title: value.title,
			Remark: value.remark,
			ProjectName: that.data.projectList[that.data.projectIndex].ProjectName,
			ProjectId: that.data.projectList[that.data.projectIndex].ProjectId
		}
		if (value.title.trim() == "") {
			dd.alert({
				content: `标题不能为空，请输入!`,
				buttonText: promptConf.promptConf.Confirm,
			})
		}
		if (!param.ProjectId || !this.data.purchaseList.length) {
			dd.alert({
				content: `请选择零部件！`,
				buttonText: promptConf.promptConf.Confirm,

			});
			return
		}
		let callBack = function(taskId) {
			that.bindAll(taskId)
		}
		console.log(param)
		this.approvalSubmit(param, callBack)
	},
	bindAll(taskId) {
		let that = this
		let paramArr = []
		for (let p of that.data.purchaseList) {
			p.TaskId = taskId
			paramArr.push(p)
		}
		that.requestJsonData('POST', "Purchase/SavePurchaseTable", function(res) {
			that.doneSubmit()
		}, JSON.stringify(paramArr))
	},


	//弹窗表单相关
	//显示弹窗表单
	chooseItem(e) {
		if (!e) return
		console.log(e)
		good = e.target.targetDataset.row
		if (!good) return

		this.setData({
			hidden: !this.data.hidden
		})
		this.createMaskShowAnim();
		this.createContentShowAnim();
	},
	deleteItem(e) {
		if (!e) return;
		console.log(e)
		let index = e.target.targetDataset.index;
		let row = e.target.targetDataset.row;

		if ((!index) && index != 0) return;
		let length = this.data.purchaseList.length;
		this.data.purchaseList.splice(index, 1);

		this.setData({
			'tableParam2.total': length - 1,
			purchaseList: this.data.purchaseList,
			totalPrice: (parseFloat(this.data.totalPrice) - parseFloat(row.Price) * parseFloat(row.Count)).toFixed(2)

		})

	},
	selectDate() {
		dd.datePicker({
			currentDate: this.data.DateStr,
			startDate: this.data.DateStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day,
			success: (res) => {
				this.setData({
					dateStr: res.date
				})
			},
		});
	},
	//提交弹窗表单
	addGood(e) {
		let value = e.detail.value
		console.log(value);
		this.setData({
			dateStr: "",
		})
		for (let p of this.data.purchaseList) {

			if (p.CodeNo == good.FNumber) {
				dd.alert({
					content: promptConf.promptConf.NOSameMaterialCoding,
					buttonText: promptConf.promptConf.Confirm,
				})
				this.onModalCloseTap();
				return;
			}
		}
		let reg = /^-?\d+$/; //只能是整数数字

		let reg2 = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ /; //正浮点数

		let reg3 = /^[\.\d]*$/;//纯数字包括小数

		if (!value || !value.Unit.trim() || !value.Count.trim() || !value.UrgentDate.trim() || !value.Purpose.trim()) {
			dd.alert({
				content: `请填写已选零部件信息！`,
				buttonText: promptConf.promptConf.Confirm,
			});
			return;
		}
		if (value.Count == 0) {
			dd.alert({
				content: "数量必须大于0！",
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}

		if (!reg.test(value.Count)) {
			dd.alert({
				content: "数量必须为整数！",
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}

		if (value.Price == 0) {
			dd.alert({
				content: "单价必须大于0！",
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}



		if (!reg3.test(value.Price)) {
			dd.alert({
				content: "单价必须为纯数字！",
				buttonText: promptConf.promptConf.Confirm,
			})
			return;
		}
		let param = {
			CodeNo: good.FNumber,
			Name: good.FName,
			Standard: good.FModel,
			Unit: value.Unit.trim(),
			Price: value.Price ? value.Price + '' : '0',
			Count: value.Count.trim(),
			Purpose: value.Purpose.trim(),
			UrgentDate: value.UrgentDate,
			Mark: value.Mark.trim()
		}
		let length = this.data.purchaseList.length
		let setStr = 'purchaseList[' + length + ']'
		this.setData({

			'tableParam2.total': length + 1,
			[`purchaseList[${length}]`]: param,
			totalPrice: (parseFloat(this.data.totalPrice) + parseFloat(param.Price) * parseFloat(param.Count)).toFixed(2)
		})
		this.onModalCloseTap();
	},
	//隐藏弹窗表单
	onModalCloseTap() {
		this.createMaskHideAnim();
		this.createContentHideAnim();
		setTimeout(() => {
			this.setData({
				hidden: true,
			});
		}, 210);
	},

});
