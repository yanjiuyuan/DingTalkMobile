import pub from '/util/public';
let good = {}
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		placeArr: [],
		disablePage: false,
	},
	submit(e) {
		let that = this
		let value = e.detail.value
		console.log(value)
		console.log(this.data.nodeList);
		if (!value.BeginTime || !value.EndTime || !value.Content || !value.Duration) {
			dd.alert({ content: '表单未填写完整' })
			return;
		}
		if (value.title.trim() == "") {
			dd.alert({
				content: `标题不能为空，请输入!`,
				buttonText: "确认"
			})
		}
		value['LocationPlace'] = ''
		value['Place'] = this.data.table.Place;
		value["EvectionMan"] = this.data.table.EvectionMan;
		value["EvectionManId"] = this.data.table.EvectionManId;
		value["Content"] = value.Content.replace(/\s+/g, "");


		console.log(value)
		if (!value.Place || !value.BeginTime || !value.EndTime || !value.Content || !value.Duration) {
			dd.alert({ content: '表单未填写完整' })
			return
		}
		if (this.data.nodeList[1].AddPeople.length > 0 && this.data.nodeList[1].AddPeople[0].userId == this.data.nodeList[0].AddPeople[0].userId) {
			dd.alert({
				content: "主管审核无法选择自己，请重选。",
				buttonText: "确认"
			})
			return;
		}

		let callBack = function(taskId) {
			console.log("提交审批ok!")
			value.TaskId = taskId
			that._postData("Evection/Save",
				(res) => {
					that.doneSubmit()
				}, value
			)
		}
		this.approvalSubmit(value,
			callBack, {
			Title: value.Title
		})
	},

	//显示外出地点输入框
	showInput() {
		this.setData({
			hidden: !this.data.hidden
		})
		this.createMaskShowAnim();
		this.createContentShowAnim();
	},

	//添加，输入外出地点
	addPlace(e) {
		let value = e.detail.value;
		console.log(value);
		if (!value || !value.place.trim()) {
			dd.alert({
				content: `请输入外出地点!`,
				buttonText: "确认"
			});
			return;
		}
		this.data.placeArr.push(value.place.trim());
		console.log(this.data.placeArr);
		this.setData({
			'table.Place': this.data.placeArr.join(',')
		})
		this.onModalCloseTap()
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
	//上传文件方法
	upLoadFile(e) {
		console.log(e)
		dd.uploadFile({
			url: '/drawingupload/UploadAndGetInfo',
			fileType: 'image',
			fileName: 'file',
			filePath: '...',
			success: (res) => {
				dd.alert({
					content: '上传成功'
				});
			},
		});
	},
	//删除一个外出地点
	removePlace() {
		this.data.placeArr.pop()
		this.setData({
			'table.Place': this.data.placeArr.join('-')
		})
	},

	//选人控件方法
	choosePeoples(e) {
		let nodeId = e.target.targetDataset.NodeId
		let that = this
		dd.complexChoose({
			...that.data.chooseParam,
			title: "同行人",
			multiple: true,//是否多选
			success: function(res) {
				console.log(res)
				let names = []//userId
				let userids = []
				for (let d of res.users) {
					names.push(d.name)
					userids.push(d.userId)
				}
				that.setData({
					'table.EvectionMan': names.join(','),
					'table.EvectionManId': userids.join(',')
				})
			},
			fail: function(err) {

			}
		})
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
					this.setData({
						'table.Duration': this._computeDurTime(new Date(res.date.replace(/-/g, '/')), new Date(this.data.endDateStr.replace(/-/g, '/')), 'h')
					})
				}
				this.setData({
					startDateStr: res.date,
					'table.BeginTime': res.date
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
					let end = new Date(res.date.replace(/-/g, '/')).getTime();
					let start = new Date(this.data.startDateStr.replace(/-/g, '/')).getTime();
					if (end < start) {
						dd.alert({
							content: "结束时间必须大于开始时间，请重选。",
							buttonText: "确认"
						})
						return;
					}



					this.setData({
						'table.Duration': this._computeDurTime(new Date(this.data.startDateStr.replace(/-/g, '/')), new Date(res.date.replace(/-/g, '/')), 'h')
					})
				}
				this.setData({
					endDateStr: res.date,
					'table.EndTime': res.date,
				})
			},
		});
	},

	onReady() {

		this.data.placeArr = [];
	}
});
