import pub from "/util/public";
import promptConf from "/util/promptConf.js";

Page({
    ...pub.func,
    ...pub.func.dowith,
    data: {
        ...pub.data
    },
    onReady() {
        let that = this;
        this._getData("PickMask/Read" + this.formatQueryStr({ TaskId: this.data.taskid }), res => {
            console.log(res);
            that.setData({
                table: res[0]
            });
        });
    },

    submit(e) {
        let that = this;
        let value = e.detail.value;
        let param = {
            Title: value.title,
            Remark: value.remark
        };
        this.aggreSubmit(param);
    }
});
