import pub from "/util/public";
import promptConf from "/util/promptConf.js";
let good = {};
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data,
        totalPrice: 0.0,
        tableOperate: "删除",
        tableOperate2: "编辑",

        tableItems: [
            {
                prop: "CodeNo",
                label: "物料编码",
                width: 200
            },
            {
                prop: "Name",
                label: "物料名称",
                width: 300
            },
            {
                prop: "Standard",
                label: "规格型号",
                width: 300
            },
            {
                prop: "Unit",
                label: "单位",
                width: 100
            },

            {
                prop: "Count",
                label: "数量",
                width: 100
            },
            {
                prop: "ExpectPrice",
                label: "预计单价",
                width: 100
            },
            {
                prop: "Purpose",
                label: "用途",
                width: 300
            }
        ]
    },

    selectStartDate() {
        let that = this;
        let iDay = 0;
        dd.datePicker({
            format: "yyyy-MM-dd", 
            currentDate: this.data.DateStr,
            startDate: this.data.Year - 1 + "-" + this.data.Month + "-" + this.data.Day,
            endDate: this.data.Year + 1 + "-" + this.data.Month + "-" + this.data.Day,
            success: res => {
                if (that.data.table.PlanEndTime) {
                    let iDay = that.DateDiff(that.data.table.PlanEndTime, res.date); //計算天數
                    if (iDay < 0) {
                        dd.alert({
                            content: promptConf.promptConf.TimeComparison,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                }
                this.setData({
                    "table.PlanBeginTime": res.date
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
                if (that.data.table.PlanBeginTime) {
                    iDay = that.DateDiff(res.date, that.data.table.PlanBeginTime); //計算天數
                    if (iDay < 0) {
                        dd.alert({
                            content: promptConf.promptConf.TimeComparison,
                            buttonText: promptConf.promptConf.Confirm
                        });
                        return;
                    }
                }
                this.setData({
                    "table.PlanEndTime": res.date
                });
            }
        });
    },

    search(e) {
        let that = this;
        let value = e.detail.value;
        if (value.startTime == "") {
            dd.alert({
                content: "开始时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.endTime == "") {
            dd.alert({
                content: "结束时间不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }

        this.getDataReturnData(
            "OfficeSuppliesPurchase/GetTable" +
                this.formatQueryStr({ startTime: value.startTime, endTime: value.endTime + " 23:59:59" }),
            res => {
                if (res.data.length == 0) {
                    dd.alert({
                        content: promptConf.promptConf.SearchNoReturn,
                        buttonText: promptConf.promptConf.Confirm
                    });

                    return;
                }
                this.data.dataList = [];
                this.data.totalPrice = 0.0;
                let deptList = []; //以部门为单位
                for (let d of res.data) {
                    if (deptList.indexOf(d.dept) == -1) {
                        deptList.push(d.dept);
                    }
                }

                for (let d of deptList) {
                    this.data.dataList.push({
                        name: d,
                        value: [],
                        tmpTotalPrice: 0,
                        tableParam: {
                            total: 0
                        }
                    });
                }

                for (let d of res.data) {
                    for (let l of this.data.dataList) {
                        if (d.dept == l.name) {
                            this.data.totalPrice = (
                                parseFloat(this.data.totalPrice) +
                                parseFloat(d.ExpectPrice != "" ? d.ExpectPrice : 0) * parseFloat(d.Count)
                            ).toFixed(2);
                            d["totalPrice"] = (
                                parseFloat(d.ExpectPrice != "" ? d.ExpectPrice : 0) * parseFloat(d.Count)
                            ).toFixed(2);
                            l.value.push(d);
                            l.tableParam.total++;
                            l.tmpTotalPrice += parseFloat(d["totalPrice"]);
                            break;
                        }
                    }
                }

                this.setData({
                    dataList: this.data.dataList,
                    totalPrice: this.data.totalPrice,
                    "tableParam.total": this.data.dataList[0].value.length
                });
            }
        );
    },
    deleteItem(e) {
        if (!e) return;
        let index = e.target.targetDataset.index;
        let row = e.target.targetDataset.row;
        if (!index && index != 0) return;
        //默认方法，删除选项
        if (!e.target.targetDataset.opt2) {
            for (let i of this.data.dataList) {
                for (let j of i.value) {
                    if (row.Id == j.Id) {
                        console.log(typeof i.tmpTotalPrice);
                        i.tmpTotalPrice = Number(
                            (
                                parseFloat(i.tmpTotalPrice) -
                                parseFloat(row.ExpectPrice != "" ? row.ExpectPrice : 0) * parseFloat(row.Count)
                            ).toFixed(2)
                        );

                        this.data.totalPrice = (
                            parseFloat(this.data.totalPrice) -
                            parseFloat(row.ExpectPrice != "" ? row.ExpectPrice : 0) * parseFloat(row.Count)
                        ).toFixed(2);
                        i.value.splice(index, 1);
                        i.tableParam.total = i.tableParam.total - 1;
                    }
                }
            }
            this.setData({
                totalPrice: this.data.totalPrice,
                dataList: this.data.dataList
            });
        }
        //第二方法，编辑选项
        else {
            good = e.target.targetDataset.row;
            if (!good) return;
            this.setData({
                hidden: !this.data.hidden
            });
            this.createMaskShowAnim();
            this.createContentShowAnim();
        }
    },

    addGood(e) {
        let value = e.detail.value;
        if(value.ExpectPrice == ""){
            dd.alert({
                content:"预计单价不允许为空，请输入！",
                buttonText:promptConf.promptConf.Confirm
            }) 
            return;
        }
        for (let i of this.data.dataList) {
            for (let j of i.value) {
                if (good.CodeNo == j.CodeNo) {
                    let a = j.ExpectPrice;
                    j.ExpectPrice = value.ExpectPrice;
                    j.Purpose = value.Purpose == "" ? j.Purpose : value.Purpose;

                    this.data.totalPrice = (
                        parseFloat(this.data.totalPrice) -
                        parseFloat(a != "" ? a : 0) * parseFloat(j.Count) +
                        parseFloat(j.ExpectPrice != "" ? j.ExpectPrice : 0) * parseFloat(j.Count)
                    ).toFixed(2);

                    i.tmpTotalPrice =
                        parseFloat(i.tmpTotalPrice) -
                        parseFloat(a != "" ? a : 0) * parseFloat(j.Count) +
                        parseFloat(
                            (parseFloat(j.ExpectPrice != "" ? j.ExpectPrice : 0) * parseFloat(j.Count)).toFixed(2)
                        );

                    break;
                }
            }
        }
        console.log(this.data.dataList);
        this.setData({
            totalPrice: this.data.totalPrice,
            dataList: this.data.dataList,
            hidden: !this.data.hidden
        });
    },
    submit(e) {
        let that = this;
        let value = e.detail.value;
        console.log(value);
        let param = {
            Title: value.title,
            Remark: value.remark
        };
        let callBack = function(taskId) {
            console.log("提交审批ok!");
            that.bindAll(taskId);
        };
        console.log(param);
        this.approvalSubmit(param, callBack);
    },
    bindAll(taskId) {
        console.log(taskId);
        let that = this;
        let paramArr = [];
        for (let p of that.data.dataList) {
            for (let j of p.value) {
                j.TaskId = taskId;
                j.Price = j.ExpectPrice;
                paramArr.push(j);
            }
        }
        that._postData(
            "OfficeSuppliesPurchase/SaveTable",
            function(res) {
                that.doneSubmit();
            },
            paramArr
        );
    }
});
