import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    data: {
        ...pub.data,

        tableItems: [
            {
                prop: "ApplyMan",
                label: "申请人",
                width: 200
            },
            {
                prop: "fName",
                label: "物料名称",
                width: 200
            },
            {
                prop: "fNumber",
                label: "物料编码",
                width: 300
            },
            {
                prop: "unitName",
                label: "单位",
                width: 100
            },
            {
                prop: "fPrice",
                label: "单价",
                width: 100
            },
            {
                prop: "fQty",
                label: "数量",
                width: 100
            },
            {
                prop: "fModel",
                label: "规格型号",
                width: 300
            },
            {
                prop: "fFullName",
                label: "供应商",
                width: 300
            },
            {
                prop: "ProjectName",
                label: "项目名称",
                width: 300
            },
            {
                prop: "TaskId",
                label: "流水号",
                width: 300
            },
            {
                prop: "Remark",
                label: "备注",
                width: 300
            }
        ],

        tableData: [],
        tableParam: {
            size: 5,
            now: 1,
            total: 0
        }
    },

    //选择时间
    selectStartDateTime() {
        dd.datePicker({
            format: "yyyy-MM-dd HH:mm",
            currentDate: this.data.DateStr + " " + this.data.TimeStr,
            startDate: "2014-11-1",
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day + " " + this.data.TimeStr,
            success: res => {
                this.setData({
                    "table.StartTime": res.date
                });
            }
        });
    },
    selectEndDateTime() {
        dd.datePicker({
            format: "yyyy-MM-dd HH:mm",
            currentDate: this.data.DateStr + " " + this.data.TimeStr,
            startDate: "2014-11-1",
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day + " " + this.data.TimeStr,
            success: res => {
                this.setData({
                    "table.EndTime": res.date
                });
            }
        });
    },

    //表单相关
    search(e) {
        let that = this;
        let value = e.detail.value;
        if (value.StartTime == "") {
            dd.alert({
                content: "开始时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.EndTime == "") {
            dd.alert({
                content: "结束时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        } else if (e.buttonTarget.dataset.isSend == undefined) {
            this._getData(
                "Pick/Query" +
                    that.formatQueryStr({
                        applyManId: app.userInfo.userid,
                        startTime: value.StartTime,
                        endTime: value.EndTime,
                        key: value.keyWord,
                        isSend: false
                    }),
                res => {
                    if (res == undefined) {
                        dd.alert({
                            content: promptConf.promptConf.NoAuthority,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                    if (res.length == 0) {
                        that.setData({
                            tableData: res,
                            tableParam: {
                                size: 5,
                                now: 1,
                                total: 0
                            }
                        });
                        dd.alert({
                            content: promptConf.promptConf.SearchNoReturn,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                    that.setData({
                        [`tableParam.total`]: res.length,
                        "tableParam.now": 1
                    });

                    that.data.data = res;
                    that.getData();
                }
            );
        } else if (this.data.tableData.length == 0) {
            dd.alert({
                content: "请选择物料",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        } else if (e.buttonTarget.dataset.isSend == true && this.data.tableData.length != 0) {
            this._getData(
                "Pick/Query" +
                    that.formatQueryStr({
                        applyManId: app.userInfo.userid,
                        startTime: value.StartTime,
                        endTime: value.EndTime,
                        Key: value.keyWord,
                        isSend: true
                    }),
                res => {
                    dd.alert({
                        content: promptConf.promptConf.PrintFrom,
                        buttonText: promptConf.promptConf.Confirm
                    });
                }
            );
        }
    }
});
