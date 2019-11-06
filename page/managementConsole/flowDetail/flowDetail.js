import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
	...pub.func,
	data: {
		...pub.data,
	},
	onLoad(option) {
		let that = this;
		let item = JSON.parse(option.item);
		console.log(item);
		
		this.setData({
			tableInfo:item
		})
		
	},
	//配置节点信息
	setNodeInfo() {
		dd.navigateTo({
			url: "setNodeInfo/setNodeInfo?flowId=" + this.data.tableInfo.flowId
		})
	}
});
