import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
    ...pub.func,
    data: {
        ...pub.data,
        IsEnableArray: [
            { name: "是", label: 1 },
            { name: "否", label: 0 }
        ],
        IsSupportMobileArray: [
            { name: "是", label: true },
            { name: "否", label: false }
        ],
        IsFlowArray: [
            { name: "是", label: true },
            { name: "否", label: false }
        ]
    },
    onLoad(options) {
        let item = JSON.parse(options.item);

        this.setData({
            item: item,
            CreateMan: app.userInfo.nickName,
            CreateManId: app.userInfo.userid
        });
    },
    //配置节点信息
    setNodeInfo() {
        dd.navigateTo({
            url: "../addFlow/setNodeInfo/setNodeInfo"
        });
    },
    choosePeople(e) {
        console.log("start choose people");
        let that = this;
        dd.complexChoose({
            ...that.data.chooseParam,
            pickedUsers: that.data.pickedUsers || [], //已选用户
            multiple: true,
            title: "权限成员",
            success: function(res) {
                console.log(res);
                let names = []; //userId
                let ids = [];
                if (res.departments.length == 0) {
                    that.data.pickedUsers = [];
                    for (let d of res.users) {
                        that.data.pickedUsers.push(d.userId);
                        names.push(d.name);
                        ids.push(d.userId);
                    }
                    that.setData({
                        "tableInfo.ApplyMan": names.join(","),
                        "tableInfo.ApplyManId": ids.join(",")
                    });
                } else {
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
                                    ids.push(d.userid);
                                    d.userId = d.userid;
                                }
                            }
                            that.data.pickedUsers = [...new Set(that.data.pickedUsers)];
                            names = [...new Set(names)]; //数组去重
                            ids = [...new Set(ids)]; //数组去重

                            that.setData({
                                "tableInfo.ApplyMan": names.join(","),
                                "tableInfo.ApplyManId": ids.join(",")
                            });
                        },
                        deptId
                    );
                }
            },
            fail: function(err) {}
        });
    },
    submit(e) {
        let value = e.detail.value;
        if (value.flowId == "") {
            dd.alert({
                content: "流程Id不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.FlowName == "") {
            dd.alert({
                content: "流程名称不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        value.ApplyTime = this.data.DateStr + " " + this.data.TimeStr;
        value.CreateManId = app.userInfo.userid;
        value.OrderBY = 998;
        value.State = 1;
        value.Sort_ID = this.data.item.Sort_ID;
        value.Title = "";
        value.position = "-0px -0px";
        let obj = {
            applyManId: app.userInfo.userid,
            flowsList: [value]
        };
        console.log(obj);
        this._postData(
            "FlowInfoNew/FlowAdd",
            res => {
                dd.alert({
                    content: promptConf.promptConf.AddSuccess,
                    buttonText: promptConf.promptConf.Confirm
                });
                setTimeout(() => {
                    dd.navigateBack({
                        delta: 1
                    });
                }, 500);
            },
            obj
        );
    }
});
