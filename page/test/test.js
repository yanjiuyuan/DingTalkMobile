import draggable from 'vuedraggable';
Page({

	data: {
		items: [
			{ name: '工业软件研发部', value: '工业软件研发部' },
			{ name: '数控一代事业部', value: '数控一代事业部' },
			{ name: '机器人事业部', value: '机器人事业部' },
			{ name: '行政部', value: '行政部' },
			{ name: '财务部', value: '财务部' },
			{ name: '制造试验部', value: '制造试验部' },
			{ name: '项目推进部', value: '项目推进部' },
			{ name: '自动化事业部', value: '自动化事业部' },
		],
	},
	onLoad() {
		console.log("onLoad");
	},
	onShow() {
		console.log("onShow");
	},
	onReady() {
		console.log("onReady");
	},
	submit(e) {
		console.log(e)
	},
	test(e) {
		console.log(e.detail.value);
	}
});
