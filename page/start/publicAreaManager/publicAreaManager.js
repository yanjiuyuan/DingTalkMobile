import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    data: {
        ...pub.data,
        disablePages: true,

        index: -1,
        arrayOfTime: [
            "08:30",
            "08:45",
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
            "17:00",
            "17:15",
            "17:30",
            "17:45",
            "18:00",
            "18:15",
            "18:30"
        ],
        tableItems: [
            {
                prop: "Date",
                label: "日期",
                width: 300
            },
            {
                prop: "ControlPeople",
                label: "监督员",
                width: 300
            },
            {
                prop: "ClearPeople",
                label: "保洁员",
                width: 300
            },
            // {
            //     prop: "Time",
            //     label: "完成时间",
            //     width: 300
            // },

            {
                prop: "State",
                label: "是否合格",
                width: 300
            }
        ],
        roleNameList: [
            {
                name: "十楼保洁监督员",
                power: 0
            },
            {
                name: "十一楼保洁监督员",
                power: 1
            },
            {
                name: "十二楼保洁监督员",
                power: 2
            },
            {
                name: "十三楼保洁监督员",
                power: 3
            },
            {
                name: "基地办公楼保洁监督员",
                power: 4
            },
            {
                name: "基地四楼宿舍保洁监督员",
                power: 5
            },
            {
                name: "消毒管理员",
                power: 6
            },
            {
                name: "北峰宿舍保洁监督员",
                power: 7
            },
            {
                name: "基地小楼宿舍保洁监督员",
                power: 8
            }
        ]
    },
    onLoad() {
        this.setData({
            DingData: app.userInfo
        });
    },
    onReady() {
        let that = this;
        this._postData("Role/GetRoleInfoList", res => {
            console.log(res);
            for (let i of that.data.roleNameList) {
                for (let j of res[i.name]) {
                    if (j.UserId == app.userInfo.userid) {
                        console.log(i.power);
                        that.setData({
                            power: i.power
                        });
                    }
                }
            }
            that.readData();
        });
    },
    readData() {
        let that = this;
        this._getData("PublicArea/Read", res => {
            console.log(res);

            let tableData = that.processingData(res);
            that.setData({
                tableData: tableData,
                "tableParam.total": tableData.length
            });
        });
    },
    //判断今天是否填写过
    isFill() {
        let dateStr = this.data.DateStr.replace(/-/g, "/");
        let a = dateStr.substring(0, 5);
        let b = dateStr.substring(6, 10);
        dateStr = a + b;
        console.log(dateStr);
        for (let i of this.data.tableData[this.data.power]) {
            if (i.Date == dateStr) {
                return true;
            }
        }
        return false;
    },
    //处理数据
    processingData(res) {
        let tableData = [[], [], [], [], [], [], [], [], []];
        let tableParam = [
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 },
            { total: 0 }
        ];

        for (let r of res) {
            let power = "";
            for (let a of r.publicAreas) {
                let obj = {};
                power = a.Power;
                obj["Date"] = r.Date.split(" ")[0];
                obj["ControlPeople"] = a.ControlPeople;
                obj["ClearPeople"] = a.ClearPeople;
                obj["Time"] = a.Date.split("T")[1];
                obj["State"] = a.State ? "合格" : "不合格";
                obj["Power"] = a.Power;
                tableParam[power].total += 1;
                tableData[power].push(obj);
            }
        }
        console.log(tableData);
        console.log(tableParam);

        this.setData({
            tableParam: tableParam
        });
        return tableData;
    },
    submit(e) {
        let that = this;
        let value = e.detail.value;
        if (value.startTime == "") {
            dd.alert({
                content: "开始时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirmm
            });
            return;
        }

        if (value.endTime == "") {
            dd.alert({
                content: "结束时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirmm
            });
            return;
        }

        let obj = {
            applyManId: app.userInfo.userid,
            startTime: value.startTime + " 00:00:00",
            endTime: value.endTime + " 23:59:59",
            IsPrint: e.buttonTarget.dataset.IsPrint
        };

        if (e.buttonTarget.dataset.IsPrint == false) {
            console.log("搜索");
            this._getData("PublicArea/Query" + this.formatQueryStr(obj), res => {
                console.log(res);
                if (res.length == 0) {
                    dd.alert({
                        content: promptConf.promptConf.SearchNoReturn,
                        buttonText: promptConf.promptConf.Confirm
                    });
                    return;
                }
                let tableData = that.processingData(res);
                that.setData({
                    tableData: tableData,
                    disablePages: false,
                    "tableParam.total": tableData.length
                });
            });
        }
        if (e.buttonTarget.dataset.IsPrint == true) {
            console.log("打印");
            this.getDataReturnData("PublicArea/Query" + this.formatQueryStr(obj), res => {
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
    //消毒记录保存
    save(e) {
        let that = this;
        let value = e.detail.value;
        console.log(value);

        if (value.ClearPeople.trim() == "") {
            dd.alert({
                content: "保洁员不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        // if (this.data.index == -1) {
        //     dd.alert({
        //         content: "完成时间不允许为空，请输入！",
        //         buttonText: promptConf.promptConf.Confirm
        //     });
        //     return;
        // }
        if (value.State == undefined) {
            dd.alert({
                content: "合格情况不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }

        if (this.isFill() == true) {
            dd.alert({
                content: "当天已有监督人进行过操作！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        let obj = {
            ClearPeople: value.ClearPeople,
            ControlPeople: value.ControlPeople,
            ControlPeopleId: app.userInfo.userid,
            Date: this.data.DateStr,
            Power: this.data.power,
            State: value.State
        };
        this._postData(
            "PublicArea/Save",
            res => {
                that.readData();
                dd.alert({
                    content: promptConf.promptConf.SaveSuccess,
                    buttonT: promptConf.promptConf.Confirm
                });
            },
            obj
        );
    },
    radioChange(e) {
        console.log(e);
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
    //选择时间
    bindPickerChange(e) {
        console.log(e.detail.value);
        this.setData({
            index: e.detail.value
        });
    }
});
