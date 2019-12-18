import pub from "/util/public";
import promptConf from "/util/promptConf.js";
Page({
    ...pub.func,
    ...pub.func.dowith,
    data: {
        ...pub.data,
        indexOfTime: -1,
        Time: [
            "0.5",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "10.5",
            "11",
            "11.5",
            "12",
            "12.5",
            "13",
            "13.5",
            "14",
            "14.5",
            "15"
        ]
    },
    onReady() {
        this.getDataReturnData(
            "OverTimeTable/OverTimeTableQuary" + this.formatQueryStr({ TaskId: this.data.taskid }),
            res => {
                console.log(res);
                this.setData({
                    table: res.data
                });
            }
        );
    },

    submit(e) {
        let that = this;
        let value = e.detail.value;

        let param = {
            Title: value.title,
            Remark: value.remark
        };
        if (this.data.indexOfTime == -1) {
            dd.alert({
                content: "有效加班时长不能为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        this.data.table.EffectiveTime = this.data.Time[this.data.indexOfTime];
        that._postData(
            "OverTimeTable/OverTimeTableModify",
            res => {
                this.aggreSubmit(param);
            },
            this.data.table
        );
    },
    bindPickerChange(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            indexOfTime: e.detail.value
        });
    }
});
