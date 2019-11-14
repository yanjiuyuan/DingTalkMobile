
import pub from '/util/public';
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
	...pub.func,
	data: {
		...pub.data,
	},
	onReady() {
		let that = this;
		this._getData('Role/GetRole' + that.formatQueryStr({ applyManId: app.userInfo.userid }), function(res) {
			console.log(res);
		})
	}
})