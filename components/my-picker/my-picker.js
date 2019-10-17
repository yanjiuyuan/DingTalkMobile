Component({
	mixins: [],
	data: {
		index: -1,
	},//存放组件内部数据
	props: {
		onChange() { },//传递index参数出去
		range: {
			type: Array,
			value: [],
		},//范围数组
		index: {
			type: Number,
		},//索引
		value: {
			type: String,
			value: ""
		},//值
		name: {
			type: String,
		}//在表单中的名字
	},
	//组件初始化
	didMount() {
		console.log(this);
		this.valueToIndex();
	},

	didUpdate() {
	},
	didUnmount() {
	},
	methods: {

		bindPickerChange(e) {
			this.setData({
				index: e.detail.value,
			});
			this.props.onChange(
				{
					detail: {
						value: e.detail.value
					}

				});//传递参数出去
		},
		//把value值转换成index
		valueToIndex() {
			if (this.props.value != "") {
				for (let i = 0, len = this.props.range.length; i < len; i++) {
					if (this.props.value == this.props.range[i]) {

						this.setData({
							index: i
						});
						this.props.onChange(
							{
								detail: {
									value: e.detail.value
								}

							});//传递参数出去
					}
				}
			}
		}
	},
});
