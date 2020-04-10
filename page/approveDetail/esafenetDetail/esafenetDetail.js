import pub from "/util/public";
Page({
    ...pub.func,
    data: {
        ...pub.data,

        tableItems2: [
            {
                prop: "name",
                label: "文件名",
                width: 750,
            },
        ],

        tableParam2: {
            // now: 1,
        },
    },
    onLoad(options) {
        console.log(getCurrentPages());
        let that = this;
        this.checkLogin2(() => {
            this.setData({
                TaskId: options.taskid,
                // TaskId: "FSN-2020040817157979ab8gel8m75t",
            });
        });
    },
    onShow() {
        setTimeout(() => {
            let that = this;
            let obj = {
                TaskId: that.data.TaskId,
            };

            this._getData("YST/Read" + this.formatQueryStr(obj), res => {
                console.log(res);

                res.StartTime = this.timestampToTime(res.StartTime);
                res.Filepath = this.stringToArray(res.Filepath);
                if (res.State == 1) {
                    res.State = "已完成";
                }
                if (res.State == 2) {
                    res.State = "退回";
                }
                this.setData({
                    tableInfo: res,
                    "tableParam2.total": res.Filepath.length,
                });
            });
        }, 2000);
    },

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
            console.log(tpath);
            let path = tpath.split(`*/`)[0];
            console.log(path);
            paths.push({ name: path });
        }
        return paths;
    },
});
