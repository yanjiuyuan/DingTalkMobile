import pub from '/util/public';
var app = getApp();
let good = {}
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		hidden: true,
		checked: false,
		checked2: false,
		table: {},
		items: [{ name: '本人同意《私车公用协议书》' }],
		items2: [{ name: '本人已经提交外出申请' }]
	},
	submit(e) {
		let that = this;
		let value = e.detail.value;
		console.log(value);
		if (this.data.nodeList[1].AddPeople[0] == undefined) {
			dd.alert({
				content: "请选择审批人",
				buttonText: "确认"
			})
			return;
		}
		if (this.data.checked == false) {
			dd.alert({
				content: "请先同意《私车公用协议书》。",
				buttonText: "确认"
			})
			return;
		}
		if (this.data.checked2 == false) {
			dd.alert({
				content: "请确认是否已提交外出申请。",
				buttonText: "确认"
			})
			return;
		}
		if (this.data.nodeList[1].AddPeople[0].userId == "0907095238746571") {
			dd.alert({ content: '用车无需季老师审批,如是部长级请选本人' })
			return
		}
		value['CarId'] = ''
		value['IsChooseOccupyCar'] = true
		value['IsPublicCar'] = false
		value['OccupyCarId'] = ''
		value["PeerNumber"] = this.data.table.PeerNumber;
		console.log(value);
		if (!value.DrivingMan || !value.MainContent || !value.PlantTravelWay || !value.StartTime || !value.EndTime || !value.CarNumber) {
			dd.alert({ content: '表单未填写完整' })
			return
		}
		if (!this.data.checked || !this.data.checked2) {
			console.log(this.data.checked)
			console.log(this.data.checked2)
			dd.alert({ content: '未全勾选‘同意’选项' })
			return
		}
		let callBack = function(taskId) {
			console.log("提交审批ok!")
			value['TaskId'] = taskId
			that._postData("CarTableNew/TableSave",
				(res) => {
					that.doneSubmit()
				}, value
			)
		}

		this.approvalSubmit({ Title: value.title,remark:value.remark }, callBack)
	},
	//选人控件方法
	choosePeoples(e) {
		console.log('start choose people')
		var nodeId = e.target.targetDataset.NodeId
		var that = this;
		console.log(that.chooseParam);
		dd.complexChoose({
			...that.data.chooseParam,
			multiple: true,
			title: "同行人",
			success: function(res) {
				console.log(res)
				let names = []
				for (let d of res.users) names.push(d.name)
				that.setData({
					'table.PeerNumber': names.join(',')
				})
			},
			fail: function(err) {

			}
		})
	},
	//同意协议选项
	onChecked(e) {
		this.setData({
			checked: !this.data.checked,
			disablePage: this.data.checked
		})
	},
	onChecked2(e) {
		this.setData({
			checked2: !this.data.checked2,
			disablePage: this.data.checked2
		})
	},
	//加载重新发起数据
	loadReApproval() {
		let localStorage = this.data.localStorage
		if (!localStorage || !localStorage.valid) return
		localStorage.valid = false
		this.setData({
			table: localStorage.table,
			'tableInfo.Title': localStorage.title,
			flowid: localStorage.flowid,
			localStorage: localStorage
		})
	},
	downLoad() {
		var param = {
			UserId: this.data.DingData.userid,
			// 阿法迪 Media_Id: '@lArPDeC2tzsRLpzOWVoCUs4-J34O'
			Media_Id: '@lArPDeC2t0PoLXvOAzqTa84ublTK'
		}
		this._postData("DingTalkServers/sendFileMessageNew",
			(res) => { dd.alert({ content: '获取成功，请在PC端查收' }) }, param
		)
	},
	//选择时间
	selectStartDateTime() {
		dd.datePicker({
			format: 'yyyy-MM-dd HH:mm',
			currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
			startDate: this.data.DateStr + ' ' + this.data.TimeStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
			success: (res) => {
				if (this.data.endDateStr) {
					//判断时间
					let start = new Date(res.date.replace(/-/g, '/')).getTime();
					let end = new Date(this.data.endDateStr.replace(/-/g, '/')).getTime();
					if (end < start) {
						dd.alert({
							content: "结束时间必须大于开始时间，请重选。",
							buttonText: "确认"
						})
						return;
					}
				}
				this.setData({
					startDateStr: res.date,
					'table.StartTime': res.date
				})
			},
		});
	},
	selectEndDateTime() {
		dd.datePicker({
			format: 'yyyy-MM-dd HH:mm',
			currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
			startDate: this.data.DateStr + ' ' + this.data.TimeStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
			success: (res) => {

				if (this.data.startDateStr) {
					//判断时间
					let start = new Date(this.data.startDateStr.replace(/-/g, '/')).getTime();
					let end = new Date(res.date.replace(/-/g, '/')).getTime();
					if (end < start) {
						dd.alert({
							content: "结束时间必须大于开始时间，请重选。",
							buttonText: "确认"
						})
						return;
					}
				}
				this.setData({
					endDateStr: res.date,
					'table.EndTime': res.date
				})
			},
		});
	},

	onReady() {
		this.setData({
			checked: false,
			checked2: false,
		})
	}
});
