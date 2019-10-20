Component({
	mixins: [],
	data: {},
	props: {
		onChange() { },
		itemList: {
			type: Array,
			default: [],
		},
		name: {
			type: String,
		},
		selectedItem: {
			type: String,
			default: "",

		}
	},
	didMount() {
		this.StringToArray();
	},
	didUpdate() {
	},
	didUnmount() {
	},
	methods: {
		//改变项的checked值
		onChanges(e) {
			let value = e.detail.value;
			this.props.onChange({
				detail: {
					value: e.detail.value
				}

			});//传递参数出去);
		},
		//把已选择的字符串转成项
		StringToArray() {
			if (this.props.selectedItem.default == undefined) {
				let array = this.props.selectedItem.split(",");
				for (let i of array) {
					for (let j of this.props.itemList) {

						if (i == j.value) {
							j.checked = true;
						}
					}
				}
				this.setData({
					itemList: this.props.itemList
				})

			}
		}
	},
});
