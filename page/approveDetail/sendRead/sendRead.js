Page({
	data: {},
	onLoad() { },
});
import pub from '/util/public';
Page({
	...pub.func,
	...pub.func.dowith,
	data: {
		...pub.data,
		hidden: true,

		imageList: [],
		fileList: [],
		pdfList: [],
		//data:[]
	},
	submit(e) {
		let value = e.detail.value
		let param = {
			Remark: value.remark
		}
		if(value.Suggestion.trim() == ""){
			dd.alert({
				content:"拟办意见不能为空，请输入！",
				buttonText:"确认"
			})
			return;
		}
		this.data.table['Suggestion'] = value['Suggestion']
		this.data.table['Leadership'] = value['Leadership']
		this._postData('Receiving/Modify', (res) => {
			this.aggreSubmit(param)
		}, this.data.table)
	},

	onReady() {
		this._getData("Receiving/Read" + this.formatQueryStr({ TaskId: this.data.taskid }),
			(res) => {

				for (let r in res[0]) {
					if (res[0][r] === null) res[0][r] = ''
				}
				console.log(res[0])
				this.setData({
					table: res[0]
				})
			}
		)
	},
	print() {
		this._getData('Receiving/GetReport' + this.formatQueryStr({UserId: this.data.DingData.userid,TaskId: this.data.taskid
		}),
			function(res) {
				dd.alert({
					content: "获取成功",
					buttonText: "确认"
				})
			},
			{
				UserId: this.data.DingData.userid,
				TaskId: this.data.taskid
			}
		)
	}
});
