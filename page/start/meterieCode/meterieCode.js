import pub from "/util/public";
import promptConf from "/util/promptConf.js";
const app = getApp();
let good = {};
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data,
        hidden: true,
        tableOperate: "删除",
        purchaseList: [],
        tableParam: {
            total: 0
        },
        good: {},
        bigIndex: -1,
        smallIndex: -1,
        bigCodes: [
            {
                materialCodeNumber: 1,
                materialName: ""
            }
        ],

        bigCodes2: [
            {
                materialCodeNumber: "60",
                materialName: "办公用品",
                smallMaterialCodes: [
                    {
                        materialCodeNumber: "000",
                        materialName: "文件档案管理类"
                    },
                    {
                        materialCodeNumber: "001",
                        materialName: "桌面用品"
                    },
                    {
                        materialCodeNumber: "002",
                        materialName: "办公本薄"
                    },
                    {
                        materialCodeNumber: "003",
                        materialName: "书写修正用品"
                    },
                    {
                        materialCodeNumber: "004",
                        materialName: "财务用品"
                    },
                    {
                        materialCodeNumber: "005",
                        materialName: "辅助用品"
                    },
                    {
                        materialCodeNumber: "006",
                        materialName: "电脑周边用品"
                    },
                    {
                        materialCodeNumber: "040",
                        materialName: "打印耗材"
                    },
                    {
                        materialCodeNumber: "041",
                        materialName: "装订耗材"
                    },
                    {
                        materialCodeNumber: "042",
                        materialName: "办公用纸"
                    },
                    {
                        materialCodeNumber: "043",
                        materialName: "IT耗材"
                    },
                    {
                        materialCodeNumber: "080",
                        materialName: "日用品"
                    },
                    {
                        materialCodeNumber: "081",
                        materialName: "清洁用品"
                    },
                    {
                        materialCodeNumber: "120",
                        materialName: "事务设备"
                    },
                    {
                        materialCodeNumber: "121",
                        materialName: "IT设备"
                    },
                    {
                        materialCodeNumber: "122",
                        materialName: "办公电器"
                    },
                    {
                        materialCodeNumber: "160",
                        materialName: "办公家具"
                    }
                ]
            }
        ],

        smallMaterialCodes: [],
        codeType: "1",
        tableItems: [
            {
                prop: "Name",
                label: "物料名称",
                width: 300
            },
            {
                prop: "BigCodeName",
                label: "大类名称",
                width: 200
            },
            {
                prop: "BigCode",
                label: "大类编码",
                width: 200
            },
            {
                prop: "SmallCodeName",
                label: "小类名称",
                width: 200
            },
            {
                prop: "SmallCode",
                label: "小类编码",
                width: 200
            },
            {
                prop: "Standard",
                label: "规格型号",
                width: 300
            },
            {
                prop: "Unit",
                label: "单位",
                width: 200
            },
            {
                prop: "SurfaceTreatment",
                label: "表面处理",
                width: 200
            },
            {
                prop: "PerformanceLevel",
                label: "性能等级",
                width: 200
            },
            {
                prop: "StandardNumber",
                label: "标准号",
                width: 200
            },
            {
                prop: "Features",
                label: "典型特征",
                width: 200
            },
            {
                prop: "purpose",
                label: "用途",
                width: 200
            },
            {
                prop: "Remark",
                label: "备注",
                width: 100
            }
        ]
    },
    submit(e) {
        let that = this;
        let value = e.detail.value;
        console.log(e.detail.value);
        let param = {
            Title: value.title,
            Remark: value.remark
        };
        if (value.title.trim() == "") {
            dd.alert({
                content: `标题不能为空，请输入!`,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (this.data.purchaseList.length == 0) {
            dd.alert({
                content: "表单数据不全或有误，请重新输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        let callBack = function(taskId) {
            that.bindAll(taskId);
        };
        console.log(param);
        this.approvalSubmit(param, callBack);
    },
    bindAll(taskId) {
        let that = this;
        let paramArr = [];
        for (let p of that.data.purchaseList) {
            p.TaskId = taskId;
            paramArr.push(p);
        }
        that.requestJsonData(
            "POST",
            "ItemCodeAdd/TableSave",
            function(res) {
                that.doneSubmit();
            },
            JSON.stringify(paramArr)
        );
    },
    radioChange(e) {
        console.log("radioChange");
        let that = this;
        that.setData({
            bigCodes: [
                {
                    materialCodeNumber: "",
                    materialName: ""
                }
            ],
            smallMaterialCodes: [],
            table: {},
            purchaseList: []
        });
        that.data.codeType = e.detail.value;
        that.getMaterielCode();
    },

    setInputData(e) {
        console.log(e);
        let Name = e.currentTarget.dataset.Name;
        this.setData({
            [`table.${Name}`]: e.detail.value
        });
    },

    //获取编码
    getMaterielCode() {
        let url = "";
        if (this.data.codeType == "2") {
            this.setData({
                bigCodes: this.data.bigCodes2,
                smallMaterialCodes: this.data.bigCodes2[0].smallMaterialCodes,
                bigIndex: 0,
                smallIndex: 0
            });
        } else if (this.data.codeType == "1") {
            url = "/ItemCodeAdd/GetAllMaterialCode";
            this._getData(url, res => {
                console.log(res);
                this.setData({
                    bigCodes: res,
                    smallMaterialCodes: res[0].smallMaterialCodes,
                    bigIndex: 0,
                    smallIndex: 0
                });
            });
        }
    },
    changeBigCode(e) {
        let index = e.detail.value;
        console.log("changeBigCode");
        if (index == this.data.bigIndex) return;
        this.setData({
            bigIndex: index,
            smallIndex: 0,
            smallMaterialCodes: this.data.bigCodes[index].smallMaterialCodes
        });
    },
    changeSmallCode(e) {
        console.log("changeSmallCode");
        let index = e.detail.value;
        this.setData({
            smallIndex: index
        });
    },
    //弹窗表单相关
    //显示弹窗表单
    chooseItem(e) {
        this.setData({
            hidden: !this.data.hidden
        });
        this.createMaskShowAnim();
        this.createContentShowAnim();
    },
    deleteItem(e) {
        if (!e) return;
        let index = e.target.targetDataset.index;
        if (!index && index != 0) return;
        let length = this.data.purchaseList.length;
        this.data.purchaseList.splice(index, 1);
        this.setData({
            ["tableParam.total"]: length - 1,
            purchaseList: this.data.purchaseList
        });
        console.log(this.data.purchaseList);
    },
    //提交弹窗表单
    addGood(e) {
        let value = e.detail.value;
        console.log(value);
        //判断是否重复
        if (this.data.purchaseList.length > 0) {
            for (let i = 0, len = this.data.purchaseList.length; i < len; i++) {
                if (
                    value.Name == this.data.purchaseList[i].Name &&
                    value.Standard == this.data.purchaseList[i].Standard
                ) {
                    dd.alert({
                        content: "物料名称、规格型号不可重复",
                        buttonText: promptConf.promptConf.Confirm
                    });
                    return;
                }
            }
        }

        if (!value || this.data.bigIndex < 0 || this.data.smallIndex < 0) {
            dd.alert({
                content: `表单填写不完整`,
                button: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.Name.trim() == "") {
            dd.alert({
                content: `物料名称不允许为空，请输入！`,
                button: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.Standard.trim() == "") {
            dd.alert({
                content: `规格型号不允许为空，请输入！`,
                button: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.Unit.trim() == "") {
            dd.alert({
                content: `单位不允许为空，请输入！`,
                button: promptConf.promptConf.Confirm
            });
            return;
        }
        value["BigCodeName"] = this.data.bigCodes[this.data.bigIndex].materialName;
        value["BigCode"] = this.data.bigCodes[this.data.bigIndex].materialCodeNumber;
        value["SmallCodeName"] = this.data.smallMaterialCodes[this.data.smallIndex].materialName;
        value["SmallCode"] = this.data.smallMaterialCodes[this.data.smallIndex].materialCodeNumber;
        let length = this.data.purchaseList.length;
        this.setData({
            table: value,
            ["tableParam.total"]: length + 1,
            [`purchaseList[${length}]`]: value
        });
    },
    onShow() {
        console.log(this.data.bigCodes);
        console.log(this.data.smallMaterialCodes);

        this.getMaterielCode();
    },

    onReady() {}
});
