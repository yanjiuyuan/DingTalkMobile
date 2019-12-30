import pub from "/util/public";
import promptConf from "/util/promptConf.js";
let good = {};
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data,
        disablePage: false,
        chosePeople: [],
        addPeopleNodes: [2, 5], //额外添加审批人节点数组
        //研究院id
        managers: [
            {
                name: "徐丽华",
                userId: "15543527578095619"
            },
            {
                name: "陈思杨",
                userId: "15545554432996107"
            }
        ]
    },
    submit(e) {
        let value = e.detail.value;
        value["Type"] = this.data.IntellectualPropertyTypes[this.data.stateIndex];
        value["Project"] = this.data.projectList[this.data.projectIndex].ProjectName;
        value["ProjectNo"] = this.data.projectList[this.data.projectIndex].ProjectId;
        value["ProjectId"] = this.data.projectList[this.data.projectIndex].ProjectId;
        value["ProjectName"] = this.data.projectList[this.data.projectIndex].ProjectName;
        value["InventorId"] = this.data.table.InventorId;
        value["Inventor"] = this.data.table.Inventor;
        value["ActualInventor"] = this.data.table.ActualInventor;
        value["ActualInventorId"] = this.data.table.ActualInventorId;
        console.log(value);
        if (value.Type == "" || value.ProjectNo == "" || value.InventorId == "" || value.Name == "") {
            console.log(value);
            dd.alert({
                content: "表单未填写完整",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.title.trim() == "") {
            dd.alert({
                content: `标题不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        value["Type"] == "软件著作权"
            ? (this.data.nodeList[5].AddPeople = [this.data.managers[1]])
            : (this.data.nodeList[5].AddPeople = [this.data.managers[0]]);
        console.log(value);
        console.log(this.data.nodeList);
        let callBack = taskId => {
            console.log("提交审批ok!");
            value.TaskId = taskId;
            this._postData(
                "IntellectualProperty/Save",
                res => {
                    this.doneSubmit();
                },
                value
            );
        };
        this.setData({
            disablePage: true
        });
        this.approvalSubmit(value, callBack, value["ProjectId"]);
    },
    //选人 可以实现
    chooseMans(e) {
        console.log("start choose people");
        let nodeId = e.target.targetDataset.NodeId;
        let that = this;
        dd.complexChoose({
            ...that.data.chooseParam,
            pickedUsers: that.data.pickedUsers || [], //已选用户
            multiple: true,
            title: "申请发明人",
            disabledDepartments: [],
            success: function(res) {
                console.log(res);
                let names = [];
                let userids = [];
                if (res.departments.length == 0 && res.users.length > 0) {
                    that.data.pickedUsers = [];
                    for (let d of res.users) {
                        that.data.pickedUsers.push(d.userId);
                        names.push(d.name);
                        userids.push(d.userId);
                        if (that.data.chosePeople.indexOf(d.name) == -1) {
                            that.data.chosePeople.push(d.name);
                        }
                    }
                    that.setData({
                        "table.Inventor": names.join(","),
                        "table.InventorId": userids.join(","),
                        "table.ActualInventor": names.join(","),
                        "table.ActualInventorId": userids.join(",")
                    });
                } else if (res.departments.length > 0 && res.users.length == 0) {
                    let deptId = [];
                    for (let i of res.departments) {
                        deptId.push(i.id);
                    }

                    that.postDataReturnData(
                        "DingTalkServers/GetDeptAndChildUserListByDeptId",
                        result => {
                            console.log(result.data);
                            that.data.pickedUsers = [];
                            that.data.pickedDepartments = [];
                            let userlist = [];
                            for (let i in result.data) {
                                let data = JSON.parse(result.data[i]);
                                that.data.pickedDepartments.push(i);
                                userlist.push(...data.userlist);
                                for (let d of data.userlist) {
                                    that.data.pickedUsers.push(d.userid);
                                    names.push(d.name);
                                    userids.push(d.userid);
                                    d.userId = d.userid;
                                }
                            }
                            that.data.pickedUsers = [...new Set(that.data.pickedUsers)];
                            names = [...new Set(names)]; //数组去重
                            userids = [...new Set(userids)];
                            that.setData({
                                "table.Inventor": names.join(","),
                                "table.InventorId": userids.join(","),
                                "table.ActualInventor": names.join(","),
                                "table.ActualInventorId": userids.join(",")
                            });
                        },
                        deptId
                    );
                } else if (res.departments.length > 0 && res.users.length > 0) {
                    let deptId = [];
                    for (let i of res.departments) {
                        deptId.push(i.id);
                    }

                    that.postDataReturnData(
                        "DingTalkServers/GetDeptAndChildUserListByDeptId",
                        result => {
                            console.log(result.data);
                            that.data.pickedUsers = [];
                            that.data.pickedDepartments = [];
                            let userlist = [];
                            for (let i in result.data) {
                                let data = JSON.parse(result.data[i]);
                                that.data.pickedDepartments.push(i);
                                userlist.push(...data.userlist);
                                for (let d of data.userlist) {
                                    that.data.pickedUsers.push(d.userid);
                                    names.push(d.name);
                                    userids.push(d.userid);
                                    d.userId = d.userid;
                                }
                            }

                            //组织外的人
                            for (let i of res.users) {
                                that.data.pickedUsers.push(i.userId);
                                names.push(i.name);
                                userids.push(i.userId);
                            }
                            that.data.pickedUsers = [...new Set(that.data.pickedUsers)];
                            names = [...new Set(names)]; //数组去重
                            userids = [...new Set(userids)];
                            that.setData({
                                "table.Inventor": names.join(","),
                                "table.InventorId": userids.join(","),
                                "table.ActualInventor": names.join(","),
                                "table.ActualInventorId": userids.join(",")
                            });
                        },
                        deptId
                    );
                }
            },
            fail: function(err) {}
        });
    },
    changeState(e) {
        console.log(e.detail.value);
        let Type = this.data.IntellectualPropertyTypes[e.detail.value];
        Type == "软件著作权"
            ? (this.data.nodeList[5].AddPeople = [this.data.managers[1]])
            : (this.data.nodeList[5].AddPeople = [this.data.managers[0]]);

        this.setData({
            stateIndex: e.detail.value,
            nodeList: this.data.nodeList
        });
    },
    changeCompany(e) {
        this.setData({
            companyIndex: e.detail.value
        });
    },
    changeDept(e) {
        this.setData({
            deptIndex: e.detail.value
        });
    },
    changeType(e) {
        this.setData({
            typeIndex: e.detail.value
        });
    }
});
