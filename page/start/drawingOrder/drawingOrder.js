import pub from "/util/public";
import promptConf from "/util/promptConf.js";

Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data,
        tableOperate: "选择",
        tableParam: {
            total: 0
        },
        tableParam2: {
            total: 0
        },

        tableItems: [
            {
                prop: "TaskId",
                label: "流水号",
                width: 100
            },
            {
                prop: "ApplyMan",
                label: "申请人",
                width: 100
            },
            {
                prop: "ProjectName",
                label: "项目名称",
                width: 500
            },
            {
                prop: "Title",
                label: "标题",
                width: 600
            },
            {
                prop: "ApplyTime",
                label: "申请时间",
                width: 300
            }
        ],
        tableItems2: [
            {
                prop: "BomId",
                label: "组件名称",
                width: 450
            },
            {
                prop: "Sorts",
                label: "类型",
                width: 100
            },
            {
                prop: "DrawingNo",
                label: "代号",
                width: 300
            },
            {
                prop: "Name",
                label: "名称",
                width: 200
            },
            {
                prop: "SingleWeight",
                label: "数量",
                width: 100
            },
            {
                prop: "MaterialScience",
                label: "材料",
                width: 200
            },
            {
                prop: "Unit",
                label: "单位",
                width: 100
            }
        ]
    },
    search(e) {
        let that = this;
        let value = e.detail.value;

        console.log(value);
        if (!value || !value.keyWord.trim()) {
            dd.alert({
                content: promptConf.promptConf.SearchNoInput,
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        that._getData("PurchaseOrder/Quary" + that.formatQueryStr({ Key: value.keyWord }), function(res) {
            console.log(res);
            if (res.length == 0) {
                dd.alert({
                    content: promptConf.promptConf.SearchNoReturn,
                    buttonText: promptConf.promptConf.Confirm
                });
            }
            that.setData({
                tableData: res,
                "tableParam.total": res.length
            });
        });
    },
    chooseItem(e) {
        let row = e.target.targetDataset.row;
        console.log(row);
        let OldFilePDFUrl = row.OldFilePDFUrl ? row.OldFilePDFUrl.split(",") : [];
        let MediaIdPDF = row.MediaIdPDF ? row.MediaIdPDF.split(",") : [];
        let OldFileUrl = row.OldFileUrl ? row.OldFileUrl.split(",") : [];
        let MediaId = row.MediaId ? row.MediaId.split(",") : [];

        let pdfList = [];
        let fileList = [];
        //pdf
        for (let i = 0, len = OldFilePDFUrl.length; i < len; i++) {
            pdfList.push({
                name: OldFilePDFUrl[i],
                mediaId: MediaIdPDF[i]
            });
        }
        //相关文件
        for (let i = 0, len = OldFileUrl.length; i < len; i++) {
            fileList.push({
                name: OldFileUrl[i],
                mediaId: MediaId[i]
            });
        }
        console.log(row.ProjectName);
        console.log("sssssssssssss");

        this.setData({
            fileList: fileList,
            pdfList: pdfList,
            "tableInfo.ProjectName": row.ProjectName,
            tableData2: row.PurchaseList,
            "tableParam2.total": row.PurchaseList.length,
            tableData3: row
        });
    },
    submit(e) {
        console.log("我会执行");
        let that = this;
        let value = e.detail.value;
        let tableData = this.data.tableData2;
        let reg = /^-?\d+$/; //只能是整数数字

        if (tableData == undefined) {
            dd.alert({
                content: "物料表单不能为空，请选择！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        if (value.counts == "0") {
            dd.alert({
                content: "套数不允许为0，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }

        if (value.counts == "") {
            dd.alert({
                content: "套数不允许为空，请输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }

        if (!reg.test(value.counts)) {
            dd.alert({
                content: "套数必须为整数，请重新输入！",
                buttonText: promptConf.promptConf.Confirm
            });
            return;
        }
        let callBack = function(taskId) {
            for (let i of tableData) {
                i.TaskId = taskId;
            }
            that._postData(
                "PurchaseOrder/Save",
                res => {
                    that.doneSubmit();
                },
                tableData
            );
        };
        let obj = {
            Title: value.title,
            Remark: value.remark,
            counts: value.counts,
            FilePDFUrl: that.data.tableData3.FilePDFUrl,
            FileUrl: that.data.tableData3.FileUrl,
            ImageUrl: that.data.tableData3.ImageUrl,
            MediaId: that.data.tableData3.MediaId,
            MediaIdPDF: that.data.tableData3.MediaIdPDF,
            OldFilePDFUrl: that.data.tableData3.OldFilePDFUrl,
            OldFileUrl: that.data.tableData3.OldFileUrl,
            OldImageUrl: that.data.tableData3.OldImageUrl,
            ProjectId: that.data.tableData3.ProjectId,
            ProjectName: that.data.tableData3.ProjectName
        };
        this.approvalSubmit(obj, callBack);
    }
});
