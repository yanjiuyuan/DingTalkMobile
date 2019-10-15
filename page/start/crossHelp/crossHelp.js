import pub from '/util/public';
let good = {}
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		addPeopleNodes: [4, 6], //额外添加审批人节点数组
	},
	submit(e) {
		let that = this;
		let value = e.detail.value;
		value['CooperateDept'] = this.data.DeptNames[this.data.departIndex];
		value['CooperateManId'] = this.data.tableInfo.CooperateManId;
		value['CooperateMan'] = this.data.tableInfo.CooperateMan;

		console.log(value);


		if (value.CooperateDept == "" || value.CooperateMan == undefined || value.PlanBeginTime == "" || value.PlanEndTime == "" || value.CooperateContent == "" || value.PlanDays == "") {
			dd.alert({ content: '表单未填写完整' })
			return
		}
		let callBack = function(taskId) {
			value.TaskId = taskId
			that._postData("Cooperate/Save",
				(res) => {
					that.doneSubmit()
				}, value
			)
		}
		this.data.nodeList[4].AddPeople = this.data.nodeList[2].AddPeople
		this.data.nodeList[6].AddPeople = [...this.data.nodeList[1].AddPeople, ...this.data.nodeList[2].AddPeople]
		this.approvalSubmit({
			Title: value.Title,
			Remark: value.remark
		}, callBack)
	},
	//选人控件方法
	choosePeopleOne(e) {
		var that = this
		dd.complexChoose({
			...that.data.chooseParam,
			multiple: true,
			title: "协作人",
			success: function(res) {
				let names = []//userId
				let ids = []
				for (let d of res.users) {
					names.push(d.name)
					ids.push(d.userId)
				}
				console.log(names);
				console.log(ids);
				// for(let i = 0; i<names.length;i++){
				//   that.data.nodeList[6].AddPeople.push({name:names[i],userId:ids[i]});
				// }
				// console.log(that.data.nodeList);
				that.setData({
					'tableInfo.CooperateMan': names.join(','),
					'tableInfo.CooperateManId': ids.join(','),
					// nodeList:that.data.nodeList
				})
			},
			fail: function(err) {

			}
		})
	},
	selectStartDate() {
		let that = this;
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: this.data.DateStr,
			startDate: this.data.DateStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day,
			success: (res) => {
				if (that.data.endDateStr) {
					let iDay = that.DateDiff(res.date, that.data.endDateStr);//計算天數
					if (iDay > 0) {
						dd.alert({
							content: "结束时间要大于开始时间。"
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

	selectEndDate() {
		let that = this;
		let iDay = 0;
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: this.data.DateStr,
			startDate: this.data.DateStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day,
			success: (res) => {
				if (that.data.startDateStr) {
					iDay = that.DateDiff(res.date, that.data.startDateStr);//計算天數
					if (iDay < 0) {
						dd.alert({
							content: "结束时间要大于开始时间。"
						})
						return;
					}
				}



				this.setData({
					'table.PlanDays': iDay,
					endDateStr: res.date,
					'table.EndTime': res.date
				})
			},
		});
	},
	//选择协作部门
	bindDeptChange(e) {
		this.setData({
			departIndex: e.detail.value,
		});
	},

});
