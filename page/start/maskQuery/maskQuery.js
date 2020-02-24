import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    data: {
        ...pub.data,
        disablePages: true,
        index: -1,

        tableItems: [
            {
                prop: "Dept",
                label: "部门",
                width: 300
            },
            {
                prop: "BeginTime",
                label: "开始时间",
                width: 300
            },
            {
                prop: "EndTime",
                label: "结束时间",
                width: 300
            },
            {
                prop: "PickCount",
                label: "领用数量",
                width: 300
            },
            {
                prop: "PickPeopleCount",
                label: "领用数量",
                width: 300
            },
            {
                prop: "Remark",
                label: "备注",
                width: 300
            }
        ],
        tableParam: {
            total: 0,
            now: 1,
            size: 5
        }
    },
    onLoad() {
        this.setData({
            DeptNames: app.globalData.DeptNames
        });
    },
    submit(e) {
        let that = this;
        let value = e.detail.value;
        console.log(e);

        if (value.BeginTime == "") {
            dd.alert({
                content: "开始时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirmm
            });
            return;
        }

        if (value.EndTime == "") {
            dd.alert({
                content: "结束时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirmm
            });
            return;
        }
        let obj = {
            applyManId: app.userInfo.userid,
            beginTime: value.BeginTime + " 00:00:00",
            endTime: value.EndTime + " 23:59:59",
            IsPrint: e.buttonTarget.dataset.IsPrint
        };
        if (this.data.index != -1) {
            obj.dept = this.data.DeptNames[this.data.index];
        }
        if (e.buttonTarget.dataset.IsPrint == false) {
            console.log("搜索");
            this._getData("pickMask/Query" + this.formatQueryStr(obj), res => {
                console.log(res);
                if (res.length == 0) {
                    dd.alert({
                        content: promptConf.promptConf.SearchNoReturn,
                        buttonText: promptConf.promptConf.Confirm
                    });
                    return;
                }
                that.setData({
                    tableData: res,
                    disablePages: false,
                    "tableParam.total": res.length
                });
                that.data.data = res;
                that.getData();
            });
        }
        if (e.buttonTarget.dataset.IsPrint == true) {
            console.log("打印");
            this.getDataReturnData("pickMask/Query" + this.formatQueryStr(obj), res => {
                console.log(res);
                if (res.data.error.errorCode == 0) {
                    that.setData({
                        disablePages: true
                    });
                    dd.alert({
                        content: promptConf.promptConf.PrintFrom,
                        buttonText: promptConf.promptConf.Confirm
                    });
                }
            });
        }
    },
    selectStartDate() {
        let that = this;
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr,
            startDate: this.data.Year - 1 + "-" + this.data.Month + "-" + this.data.Day,
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
            startDate: this.data.Year - 1 + "-" + this.data.Month + "-" + this.data.Day,
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
                }
                this.setData({
                    "table.EndTime": res.date
                });
            }
        });
    },
    bindObjPickerChange(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index: e.detail.value
        });
    }
});
