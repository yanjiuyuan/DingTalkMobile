import pub from "/util/public";
Page({
    ...pub.func,
    ...pub.func.dowith,
    data: {
        ...pub.data,
        IsReview: true,
        copyMans: [],
        table: {},
        
    },
    submit(e) {
        var value = e.detail.value;
        var param = {
            Remark: value.remark
        };
        this.data.table.IsReview = this.data.IsReview;
        this.data.table.ProjectId = value.ProjectId;
        if (this.data.nodeid == 3 || this.data.nodeid == 2) {
            if (this.data.nodeid == 3 && !this.data.table.ProjectId) {
                console.log(this.data.table);
                dd.alert({ content: "项目编号不能为空" });
                return;
            }
            //if(this.data.nodeid == 1) this.data.nodeList[5].AddPeople = this.data.copyMans
            console.log(this.data.nodeList);
            this.setData({ disablePage: true });
            this._postData(
                "CreateProject/Modify",
                res => {
                    if (this.data.nodeid != 3) {
                        this.aggreSubmit(param);
                        return;
                    }
                    this.requestData(
                        "POST",
                        "Project/AddProject?IsPower=true",
                        res => {
                            this.aggreSubmit(param);
                        },
                        this.data.table
                    );
                },
                this.data.table
            );
        } else {
            this.aggreSubmit(param);
        }
    },
    //下载文件
    downloadServerFile(e) {
        dd.downloadFile({
            url: e.target.dataset.url,
            success({ filePath }) {
                dd.previewImage({
                    urls: [filePath]
                });
            },
            fail(res) {
                dd.alert({
                    content: res.errorMessage || res.error
                });
            }
        });
    },
    print() {
        var that = this;
        this._postData(
            "CreateProject/PrintPDF",
            res => {
                dd.alert({ content: "获取成功，请在钉钉PC端查收" });
            },
            {
                UserId: that.data.DingData.userid,
                TaskId: that.data.taskid,
                IsPublic: true
            }
        );
    },
    radioChange: function(e) {
        this.data.IsReview = e.detail.value;
    },
    onReady() {
      let that = this;
        this._getData(
            "CreateProject/Read" +
                this.formatQueryStr({ TaskId: this.data.taskid }),
            res => {
                if(that.data.nodeid > 2){
                  that.data.IsReview = res.IsReview == true ? "是":"否";
                }
                this.setData({
                    table: res,
                    IsReview:that.data.IsReview
                });
            }
        );
    }
});
