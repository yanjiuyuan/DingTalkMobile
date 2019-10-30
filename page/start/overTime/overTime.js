import pub from '/util/public';
import promptConf from "/util/promptConf.js";
let good = {}
Page({
	...pub.func,
	...pub.func.start,
	data: {
		...pub.data,
		arrayOfTime: [
			"08:30",
			"09:00",
			"09:30",
			"10:00",
			"10:30",
			"11:00",
			"11:30",
			"12:00",
			"12:30",
			"13:00",
			"13:30",
			"14:00",
			"14:30",
			"15:00",
			"15:30",
			"16:00",
			"16:30",
			"17:00",
			"17:30",
			"18:00",
			"18:30",
			"19:00",
			"19:30",
			"20:00",
			"20:30",
			"21:00",
			"21:30",
			"22:00",
			"22:30",
			"23:00",
			"23:30",
		],

	},

	//选择加班日期
	selectStartDateTime() {
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
			startDate: this.data.DateStr + ' ' + this.data.TimeStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
			success: (res) => {
				this.setData({
					'table.StartTime': res.date
				})
			},
		});
	},

	bindPickerChangeOne(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		if (this.data.index2) {
			if (e.detail.value > this.data.index2) {
				dd.alert({
					content: promptConf.promptConf.TimeComparison,
					buttonText: promptConf.promptConf.Confirm,
				})
				return;
			}
			this.setData({
				index1: e.detail.value,
				hour: (this.data.index2 - e.detail.value) * 30 / 60,
			})
			return;
		}
		this.setData({
			index1: e.detail.value,
		});

	},

	bindPickerChangeTwo(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.data.index2 = e.detail.value;
		if (this.data.index1) {
			if (e.detail.value < this.data.index1) {
				dd.alert({
					content: promptConf.promptConf.TimeComparison,
					buttonText: promptConf.promptConf.Confirm,
				})
				return;
			}
			this.setData({
				index2: e.detail.value,
				hour: (this.data.index2 - this.data.index1) * 30 / 60,
			});
			return;
		}
		this.setData({
			index2: e.detail.value,
		});

	},

	submit(e) {
		let value = e.detail.value;
		let that = this;
		let param = {
			Title: value.title,
			Remark: value.remark,
		}
		if (value.title.trim() == "") {
			dd.alert({
				content: `标题不能为空，请输入!`,
				buttonText: promptConf.promptConf.Confirm,
			})
		}
		let body = {
			"DateTime": value.DateTime,
			"EndTimeTime": that.data.arrayOfTime[that.data.index2],
			"OverTimeContent": value.OverTimeContent,
			"StartTime": that.data.arrayOfTime[that.data.index1],
			"TaskId": "",
			"Title": value.title,
			"UseTime": this.conversionTimeFormat(that.data.hour),
			"name": value.name,
		}


		if (!body.DateTime || !body.EndTimeTime || !body.StartTime || !body.OverTimeContent || !body.UseTime) {
			dd.alert({
				content: "请完整填写表单",
				buttonText: promptConf.promptConf.Confirm,
			})
		}
		else {

			let callBack = function(taskId) {
				body.TaskId = taskId;
				that._postData("OverTimeTable/OverTimeTableSave",
					(res) => {
						that.doneSubmit();
					}, body
				)
			}
			console.log(param)
			this.approvalSubmit(param, callBack);
		}
	},
	//转换小时格式
	conversionTimeFormat(hour) {

		let arr = hour.toString().split(".");
		if (arr.length == 1) {
			return arr[0] + ":00";
		}
		else if (arr.length == 2) {
			return arr[0] + ":30";
		}
	},
})


