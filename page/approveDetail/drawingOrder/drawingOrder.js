import pub from "/util/public";
import promptConf from "/util/promptConf.js";
Page({
    ...pub.func,
    ...pub.func.dowith,
    data: {
        ...pub.data,
        reg: /^-?\d+$/, //只能是整数数字
        tableItems2: [
            {
                prop: "DrawingNo",
                label: "代号",
                width: 300
            },
            {
                prop: "Name",
                label: "名称",
                width: 300
            },
            {
                prop: "Count",
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
            },
            {
                prop: "Sorts",
                label: "类别",
                width: 100
            },
            {
                prop: "SingleWeight",
                label: "单重",
                width: 100
            },
            {
                prop: "AllWeight",
                label: "总重",
                width: 100
            },
            {
                prop: "NeedTime",
                label: "需用日期",
                width: 100
            },
            {
                prop: "Mark",
                label: "备注",
                width: 100
            }
        ]
    },
    submit(e) {
        let value = e.detail.value;
        let param = {
            Title: value.title,
            Remark: value.remark
        };

        this.aggreSubmit(param);
    }
});
