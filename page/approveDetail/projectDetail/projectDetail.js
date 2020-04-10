import pub from "/util/public";
Page({
    ...pub.func,

    data: {
        ...pub.data,
    },
    onLoad(options) {
        let that = this;
        this.checkLogin(() => {
            this.setData({
                projectId: options.projectId,
            });
        });
    },
    onShow() {
        setTimeout(() => {
            let that = this;
            let obj = {
                projectId: that.data.projectId,
            };

            this._getData("ProjectNew/GetSingleProjectInfo" + this.formatQueryStr(obj), res => {
                this.data.tableInfo = res;
                console.log(res);
                this.data.tableInfo.ProjectType =
                    this.data.tableInfo.ProjectType + "-" + this.data.tableInfo.ProjectSmallType;
                this.setData({
                    tableInfo: this.data.tableInfo,
                });
            });
        }, 2000);
    },
});
