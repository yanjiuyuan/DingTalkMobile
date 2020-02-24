import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data
    },
    submit(e) {
        let that = this;
        let value = e.detail.value;
        console.log(value);
        if (value.title.trim() == "") {
            dd.alert({
                content: `标题不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.BeginTime == "") {
            dd.alert({
                content: `开始时间不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.EndTime == "") {
            dd.alert({
                content: `结束时间不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.PickCount == "") {
            dd.alert({
                content: `领用数量不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.PickPeopleCount == "") {
            dd.alert({
                content: `领用数量不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.PickPeopleCount * this.data.iDay * 2 < value.PickCount) {
            dd.alert({
                content: "超过可领用数量，工作日每人每天限领两个",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        value.Dept = this.data.DingData.departmentList[this.data.departmentIdnex];
        value.PickCount = parseInt(value.PickCount);
        value.PickPeopleCount = parseInt(value.PickPeopleCount);

        let obj = {
            PickCount: value.PickCount,
            PickPeopleCount: value.PickPeopleCount,
            BeginTime: value.BeginTime,
            EndTime: value.EndTime,
            Dept: value.Dept,
            Remark: value.remark
        };
        let callBack = function(taskId) {
            console.log("提交审批ok!");
            value.TaskId = taskId;
            that._postData(
                "PickMask/Save",
                res => {
                    that.doneSubmit();
                },
                [value]
            );
        };
        this.approvalSubmit(value, callBack, {
            Title: value.title,
            Remark: value.remark
        });
    },

    selectStartDate() {
        let that = this;
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr,
            startDate: this.data.DateStr,
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
            success: res => {
                if (that.data.table.EndTime) {
                    let iDay = that.DateDiff(that.data.table.EndTime, res.date); //計算天數
                    if (iDay < 0) {
                        dd.alert({
                            content: promptConf.promptConf.TimeComparison,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                    this.setData({
                        iDay: iDay
                    });
                }

                this.setData({
                    "table.BeginTime": res.date
                });
            }
        });
    },

    selectEndDate() {
        let that = this;
        let iDay = 0;
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr,
            startDate: this.data.DateStr,
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
            success: res => {
                if (that.data.table.BeginTime) {
                    iDay = that.DateDiff(res.date, that.data.table.BeginTime); //計算天數
                    if (iDay < 0) {
                        dd.alert({
                            content: promptConf.promptConf.TimeComparison,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                    this.setData({
                        iDay: iDay
                    });
                }
                this.setData({
                    "table.EndTime": res.date
                });
            }
        });
    }
});
