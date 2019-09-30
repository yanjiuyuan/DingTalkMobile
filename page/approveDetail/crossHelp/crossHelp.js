import pub from "/util/public";
Page({
    ...pub.func,
    ...pub.func.dowith,
    data: {
        ...pub.data,
        table: {}
    },
    submit(e) {
        var that = this;
        var value = e.detail.value;
        var param = {
            Remark: value.remark
        };
        console.log(value);
        if (
            (value.FactBeginTime == "" ||
                value.FactEndTime == "" ||
                value.FactDays == "" ||
                value.FactCooperateContent == "" ||
                value.FactCooperateMan == "") &&
            this.data.nodeid == 4
        ) {
            dd.alert({ content: "表单未填写完整" });
            return;
        }
        if (this.data.nodeid == 4) {
            this.data.table["FactBeginTime"] = value.FactBeginTime;
            this.data.table["FactEndTime"] = value.FactEndTime;
            this.data.table["FactDays"] = value.FactDays;
            this.data.table["FactCooperateContent"] =
                value.FactCooperateContent;
            this.data.addPeopleNodes = [6];
            //this.data.table['FactCooperateMan'] = value.FactCooperateMan
        }

        this.setData({ disablePage: true });
        this._postData(
            "Cooperate/Modify",
            res => {
                that.aggreSubmit(param);
            },
            this.data.table
        );
    },
    //选人控件方法
    choosePeoples(e) {
        var that = this;
        dd.complexChoose({
            ...that.data.chooseParam,
            multiple: true,
            title: "实际协作人",
            success: function(res) {
                let names = []; //userId
                let ids = [];
                for (let d of res.users) {
                    names.push(d.name);
                    ids.push(d.userId);
                }
                let a = [];
                for (let i = 0; i < names.length; i++) {
                    a.push({ name: names[i], userId: ids[i] });
                }
                that.data.nodeList[6].AddPeople = a;
                console.log(that.data.nodeList);
                that.setData({
                    "table.FactCooperateMan": names.join(","),
                    "table.FactCooperateManId": ids.join(","),
                    nodeList: that.data.nodeList
                });
            },
            fail: function(err) {}
        });
    },
    onReady() {
        let that = this;
        console.log;
        this._getData(
            "Cooperate/Read" +
                this.formatQueryStr({ TaskId: this.data.taskid }),
            res => {
                console.log(res);
                if (this.data.nodeid == 1) {
                    // res['FactBeginTime'] = res.PlanBeginTime
                    // res['FactEndTime'] = res.PlanEndTime
                    // res['FactDays'] = res.PlanDays
                    // res['FactCooperateContent'] = res.CooperateContent
                    // res['FactCooperateMan'] = res.CooperateMan
                }
                res["FactCooperateMan"] = res.FactCooperateMan || "";
                res["FactCooperateContent"] = res.FactCooperateContent || "";

                if (this.data.nodeid == 4) {
                    let CooperateMan = res.CooperateMan.split(",");
                    let CooperateManId = res.CooperateManId.split(",");
                    for (let i = 0; i < CooperateMan.length; i++) {
                        that.data.nodeList[6].AddPeople.push({
                            name: CooperateMan[i],
                            userId: CooperateManId[i]
                        });
                    }
                }

                this.setData({
                    table: res,
                    nodeList: that.data.nodeList
                });
            }
        );
    },

    selectStartDate() {
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr,
            startDate: this.data.DateStr,
            endDate:
                this.data.Year +
                1 +
                "-" +
                this.data.Month +
                "-" +
                this.data.Day,
            success: res => {
                this.setData({
                    "table.FactBeginTime": res.date
                });
            }
        });
    },
    selectEndDate() {
        let that = this;
        dd.datePicker({
            format: "yyyy-MM-dd",
            currentDate: this.data.DateStr,
            startDate: this.data.DateStr,
            endDate:
                this.data.Year +
                1 +
                "-" +
                this.data.Month +
                "-" +
                this.data.Day,
            success: res => {
                let iDay = that.DateDiff(
                    res.date,
                    that.data.table.FactBeginTime
                ); //計算天數
                if (iDay < 0) {
                    dd.alert({
                        content: "结束时间要大于开始时间。"
                    });
                    return;
                }
                this.setData({
                    "table.FactDays": iDay,
                    "table.FactEndTime": res.date
                });
            }
        });
    }
});
