import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	...pub.func.dowith,
	data: {
		...pub.data,
		table: {},
	},
	submit(e) {
		let value = e.detail.value
		let param = {
			Remark: value.remark
		}
		this.aggreSubmit(param)
	},
	print() {
		let that = this
		this._postData('MaterialRelease/PrintAndSend',
			function(res) {
				dd.alert({
					content: promptConf.promptConf.PrintFrom,
					butttonText:promptConf.promptConf.Confirm
				})
			},
			{
				UserId: that.data.DingData.userid,
				TaskId: that.data.taskid
			}
		)
	},
	onReady() {
		let that = this
		this._getData("MaterialRelease/Read" + this.formatQueryStr({ TaskId: this.data.taskid }),
			(res) => {
				for (let r in res) {
					if (res[r] === null) res[r] = ''
				}
				this.setData({
					table: res
				})
			}
		)
	},
});
