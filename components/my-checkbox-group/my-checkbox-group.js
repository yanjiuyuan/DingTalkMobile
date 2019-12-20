Component({
    mixins: [],
    data: {
        cache: []
    },
    props: {
        onChange() {},
        itemList: {
            type: Array,
            default: []
        },
        name: {
            type: String
        },
        selectedItem: {
            type: String,
            default: ""
        }
    },
    didMount() {
        this.StringToArray();
        console.log("我初始了");
    },
    didUpdate() {
        console.log(JSON.stringify(this.props.itemList));
        if (this.data.cache.length == 0) {
            console.log("第一次更新");
            this.data.cache = this.props.itemList;
        } else {
            console.log("不是第一次更新");
            this.props.itemList = this.data.cache;
            this.setData({
                itemList: this.data.cache
            });
        }
    },
    didUnmount() {
        console.log("我消失了");
    },
    methods: {
        //改变项的checked值
        onChanges(e) {
            let value = e.detail.value;
            this.props.onChange({
                detail: {
                    value: e.detail.value
                }
            }); //传递参数出去);
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
                });
            }
        }
    }
});
