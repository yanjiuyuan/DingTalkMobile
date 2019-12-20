import pub from "/util/public";
import promptConf from "/util/promptConf.js";
let good = {};
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data,
        arrayOfTime: [
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30"
        ]
    },

    //选择加班日期
    selectStartDateTime() {
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr + " " + this.data.TimeStr,
            startDate: this.data.DateStr + " " + this.data.TimeStr,
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day + " " + this.data.TimeStr,
            success: res => {
                this.setData({
                    "table.StartTime": res.date
                });
            }
        });
    },

    bindPickerChangeOne(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        if (this.data.index2 != undefined) {
            if (this.data.arrayOfTime[e.detail.value] > this.data.arrayOfTime[this.data.index2]) {
                dd.alert({
                    content: promptConf.promptConf.TimeComparison,
                    buttonText: promptConf.promptConf.Confirm
                });
                return;
            }
            let hour = this.removeBreakTime(this.data.index2, e.detail.value);
            this.setData({
                index1: e.detail.value,
                hour: hour
            });
            return;
        }
        this.setData({
            index1: e.detail.value
        });
    },

    bindPickerChangeTwo(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        if (this.data.index1 != undefined) {
            if (this.data.arrayOfTime[e.detail.value] < this.data.arrayOfTime[this.data.index1]) {
                dd.alert({
                    content: promptConf.promptConf.TimeComparison,
                    buttonText: promptConf.promptConf.Confirm
                });
                return;
            }
            let hour = this.removeBreakTime(e.detail.value, this.data.index1);
            this.setData({
                index2: e.detail.value,
                hour: hour
            });
            return;
        }
        this.setData({
            index2: e.detail.value
        });
    },

    submit(e) {
        let value = e.detail.value;
        let that = this;
        let param = {
            Title: value.title,
            Remark: value.remark
        };
        if (value.title.trim() == "") {
            dd.alert({
                content: `标题不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        let body = {
            DateTime: value.DateTime,
            EndTimeTime: that.data.arrayOfTime[that.data.index2],
            OverTimeContent: value.OverTimeContent,
            StartTime: that.data.arrayOfTime[that.data.index1],
            Title: value.title,
            UseTime: that.data.hour,
            name: value.name
        };
        console.log(body);
        if (body.OverTimeContent == "") {
            dd.alert({
                content: "加班事由不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (body.DateTime == "") {
            dd.alert({
                content: "加班日期不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (body.StartTime == undefined) {
            dd.alert({
                content: "起始时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (body.EndTimeTime == undefined) {
            dd.alert({
                content: "结束时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (body.UseTime == "0") {
            dd.alert({
                content: "加班时长不允许为0，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        let callBack = function(taskId) {
            body.TaskId = taskId;
            that._postData(
                "OverTimeTable/OverTimeTableSave",
                res => {
                    that.doneSubmit();
                },
                body
            );
        };
        console.log(param);
        this.approvalSubmit(param, callBack);
    },
    //转换小时格式
    conversionTimeFormat(hour) {
        let arr = hour.toString().split(".");
        if (arr.length == 1) {
            return arr[0] + ":00";
        } else if (arr.length == 2) {
            return arr[0] + ":30";
        }
    },
    // 去除休息时间7表示12:00,10表示13:30
    removeBreakTime(endIndex, startIndex) {
        if (endIndex <= 7 || startIndex >= 10) {
            return ((endIndex - startIndex) * 30) / 60;
        }
        if (7 <= endIndex && endIndex <= 10 && startIndex < 7) {
            return ((7 - startIndex) * 30) / 60;
        }
        if (7 <= startIndex && startIndex <= 10 && 7 <= endIndex && endIndex <= 10) {
            return 0;
        }
        if (7 <= startIndex && startIndex <= 10 && endIndex > 10) {
            return ((endIndex - 10) * 30) / 60;
        }
        if (startIndex < 7 && endIndex > 10) {
            return ((endIndex - startIndex - 3) * 30) / 60;
        }
    }
});
