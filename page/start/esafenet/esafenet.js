import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    data: {
        ...pub.data,
        tableOperate: "文件",
        tableData: [],
        pageIndex: 1,
        tableItems: [
            {
                prop: "TaskId",
                label: "流水号",
                width: 500,
            },
            {
                prop: "StartTime",
                label: "开始时间",
                width: 300,
            },
            {
                prop: "EndTime",
                label: "结束时间",
                width: 300,
            },
            {
                prop: "SurName",
                label: "操作人",
                width: 200,
            },
            {
                prop: "ApplyMan",
                label: "抄送人",
                width: 200,
            },
            {
                prop: "OrganiseName",
                label: "部门",
                width: 200,
            },
            {
                prop: "Reason",
                label: "目的",
                width: 300,
            },
            {
                prop: "State",
                label: "流程状态",
                width: 200,
            },
        ],
        tableItems2: [
            {
                prop: "name",
                label: "文件名",
                width: 750,
            },
        ],
        tableParam: {
            total: 0,
            now: 1,
            size: 5,
        },

        tableParam2: {
            total: 0,
        },
    },
    onReady() {
        let that = this;
        this.getDataReturnData(
            "Role/GetRoleInfo" + that.formatQueryStr({ RoleName: "超级管理员" }),
            res => {
                for (let i of res.data) {
                    if (i.emplId == app.userInfo.userid) {
                        this.setData({ Administrator: true });
                    }
                }
            }
        );
    },

    switchChangeOne(e) {
        console.log(e.detail.value);
    },
    switchChangeTwo(e) {
        console.log(e.detail.value);
    },
    switchChangeThree(e) {
        console.log(e.detail.value);
    },

    chooseItem(e) {
        console.log(e);
        if (!e.target.targetDataset.row) return;
        this.setData({
            tableData2: e.target.targetDataset.row.Filepath,
            "tableParam2.total": e.target.targetDataset.row.Filepath.length,
        });
    },
    onInput(e) {
        this.data.key = e.detail.value;
    },
    pre() {
        this.data.pageIndex -= 1;
        let param = {
            applyManId: app.userInfo.userid,
            pageIndex: this.data.pageIndex,
            pageSize: 5,
            key: this.data.key,
        };
        this.getDataReturnData("YST/Query" + this.formatQueryStr(param), res => {
            console.log(res);
            if (res.data.data.length == 0) {
                dd.alert({
                    content: promptConf.promptConf.SearchNoReturn,
                    buttonText: promptConf.promptConf.Confirm,
                });
                return;
            }
            for (let i of res.data.data) {
                i.StartTime = this.timestampToTime(i.StartTime);
                i.Filepath = this.stringToArray(i.Filepath);
                if (i.State == "1") {
                    i.State = "已完成";
                }
                if (i.State == null) {
                    i.State = "审批中";
                }
                if (i.State == 2) {
                    i.State = "退回";
                }
            }

            this.setData({
                tableData: res.data.data,
                "tableParam.total": res.data.count,
                "tableParam.now": this.data.pageIndex,
            });
            // this.data.data = res;
            // this.getData();
        });
    },
    next() {
        this.data.pageIndex += 1;
        let param = {
            applyManId: app.userInfo.userid,
            pageIndex: this.data.pageIndex,
            pageSize: 5,
            key: this.data.key,
        };
        this.getDataReturnData("YST/Query" + this.formatQueryStr(param), res => {
            console.log(res);
            if (res.data.data.length == 0) {
                dd.alert({
                    content: promptConf.promptConf.SearchNoReturn,
                    buttonText: promptConf.promptConf.Confirm,
                });
                return;
            }
            for (let i of res.data.data) {
                i.StartTime = this.timestampToTime(i.StartTime);
                i.Filepath = this.stringToArray(i.Filepath);

                if (i.State == "1") {
                    i.State = "已完成";
                }
                if (i.State == null) {
                    i.State = "审批中";
                }
                if (i.State == 2) {
                    i.State = "退回";
                }
            }

            this.setData({
                tableData: res.data.data,
                "tableParam.total": res.data.count,
                "tableParam.now": this.data.pageIndex,
            });
        });
    },
    search(e) {
        let value = e.detail.value;
        this.data.pageIndex = 1;
        if (value.keyWord == "") {
            dd.alert({
                content: promptConf.promptConf.SearchNoInput,
                buttonText: promptConf.promptConf.Confirm,
            });
            return;
        }
        let param = {
            applyManId: app.userInfo.userid,
            pageIndex: this.data.pageIndex,
            pageSize: 5,
            key: value.keyWord,
        };
        this.getDataReturnData("YST/Query" + this.formatQueryStr(param), res => {
            console.log(res);
            if (res.data.data.length == 0) {
                dd.alert({
                    content: promptConf.promptConf.SearchNoReturn,
                    buttonText: promptConf.promptConf.Confirm,
                });
                return;
            }
            for (let i of res.data.data) {
                i.StartTime = this.timestampToTime(i.StartTime);
                i.Filepath = this.stringToArray(i.Filepath);

                if (i.State == "1") {
                    i.State = "已完成";
                }
                if (i.State == null) {
                    i.State = "审批中";
                }
                if (i.State == 2) {
                    i.State = "退回";
                }
            }

            this.setData({
                tableData: res.data.data,
                "tableParam.total": res.data.count,
                "tableParam.now": this.data.pageIndex,
            });
        });
    },
    // 时间戳
    timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + "-";
        let M =
            (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        let D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
        let h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
        let m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":" : date.getMinutes() + ":";
        let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    stringToArray(str) {
        let tpaths = str.split("|");
        let paths = [];
        for (let tp of tpaths) {
            if (!tp) break;
            let tpath = tp.split("\\")[tp.split("\\").length - 1];
            let path = tpath.split(`*/`)[0];
            paths.push({ name: path });
        }
        return paths;
    },
});
