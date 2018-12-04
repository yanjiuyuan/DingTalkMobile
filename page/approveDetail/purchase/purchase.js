import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
    purchaseList: [],

    good: {},
    totalPrice: '0',
    tableItems: [
      {
        prop: 'CodeNo',
        label: '物料编码',
        width: 200
      },
      {
        prop: 'Name',
        label: '物料名称',
        width: 300
      },
      {
        prop: 'Standard',
        label: '规格型号',
        width: 300
      },
      {
        prop: 'Unit',
        label: '单位',
        width: 100
      },
      {
        prop: 'Price',
        label: '单价(预计)',
        width: 200
      },
      {
        prop: 'Count',
        label: '数量',
        width: 100
      },
      {
        prop: 'Purpose',
        label: '用途',
        width: 300
      },
      {
        prop: 'UrgentDate',
        label: '需用日期',
        width: 200
      },
      {
        prop: 'Mark',
        label: '备注',
        width: 300
      }
    ],
    //data:[]
  },
  //表单操作相关
  search(e){
    var value = e.detail.value
    console.log(value) 
    if (!value || !value.keyWord) return
    var that = this
    that.requestData('GET', 'Purchase/GetICItem' + that.formatQueryStr({Key:value.keyWord}) , function(res) { 
      console.log(JSON.parse(res.data))
      that.setData({
        'tableParam.total': JSON.parse(res.data).length
      })
      that.data.data =  JSON.parse(res.data)
      that.getData()
    })
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark,
        ProjectName: that.data.projectList[that.data.projectIndex].ProjectName,
        ProjectId: that.data.projectList[that.data.projectIndex].ProjectId
    }
    let callBack = function (taskId) {
        console.log("提交审批ok!")
        that.bindAll(taskId)
    }
    console.log(param)
    this.approvalSubmit(param, 
    callBack, {
            ProjectId: param.ProjectId
        })
  },



});
