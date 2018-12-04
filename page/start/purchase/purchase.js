import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    hidden: true,
    tableOperate: '选择',
    purchaseList: [],
    tableParam2: {
      size: 100,
      now: 1,
      total: 0
    },
    tableOperate2: '删除',
    good: {},
    totalPrice: 0,
    tableItems: [
      {
        prop: 'FNumber',
        label: '物料编码',
        width: 200
      },
      {
        prop: 'FName',
        label: '物料名称',
        width: 300
      },
      {
        prop: 'FModel',
        label: '规格型号',
        width: 300
      },
      {
        prop: 'FNote',
        label: '预计单价',
        width: 100
      }
    ],
    tableItems2: [
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
        label: '单价',
        width: 100
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
  bindAll(taskId) {
      var that = this
      console.log('bindAll~~~~~')
      console.log(that.data)
      console.log('bindAll~~~~~23333')
      var paramArr = []
      for (let p of that.data.purchaseList) {
          p.TaskId = taskId
          paramArr.push(p)
      }
      console.log("采购表单批量保存 paramArr ")
      console.log(JSON.stringify(paramArr))
      that.requestData('POST', "Purchase/SavePurchaseTable", function(res) {
          var alertStr = '采购表单批量保存成功'
          if (res.errorCode != 0) alertStr = res.errorMessage
          that.doneSubmit(alertStr)
      },paramArr)
  },


  //弹窗表单相关
  //显示弹窗表单
  chooseItem(e){
    if(!e) return
    console.log(e)
    good = e.target.targetDataset.row
    if(!good) return
    
    this.setData({
      hidden: !this.data.hidden
    })
    this.createMaskShowAnim();
    this.createContentShowAnim();
  },
  deleteItem(e){
    if(!e) return
    console.log(e)
    let index = e.target.targetDataset.index
    if((!index) && index != 0)  return
    console.log(this.data.purchaseList)
    this.data.purchaseList.splice(index, 1)
    this.setData({
      purchaseList:this.data.purchaseList
    })
    console.log(this.data.purchaseList)
  },
  selectDate(){
    dd.datePicker({
      currentDate: this.data.DateStr,
      startDate: this.data.DateStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
      success: (res) => {
        this.setData({
          dateStr: res.date
        })
      },
    });
  },
  //提交弹窗表单
  addGood(e){
    var value = e.detail.value
    console.log(value) 
    for (let p of this.data.purchaseList) {
        if (p.CodeNo == good.FNumber) return
    }
    if (!value || !value.Unit || !value.Count|| !value.UrgentDate) {
      dd.alert({
        content: `表单填写不完整`,
      });
      return
    }
    let param = {
        CodeNo: good.FNumber,
        Name: good.FName,
        Standard: good.FModel,
        Unit: value.Unit,
        Price: value.Price ? value.Price + '' : '0',
        Count: value.Count,
        Purpose: value.Purpose,
        UrgentDate: value.UrgentDate,
        Mark: value.Mark
    }
    let length = this.data.purchaseList.length
    let setStr = 'purchaseList[' + length + ']'
    this.setData({
      [`purchaseList[${length}]`]: param,
      totalPrice: (this.data.totalPrice + param.Price * param.Count) + ''
    })
    console.log(param.Purpose)
    this.onModalCloseTap()
  },
  //隐藏弹窗表单
  onModalCloseTap() {
    this.createMaskHideAnim();
    this.createContentHideAnim();
    setTimeout(() => {
      this.setData({
        hidden: true,
      });
    }, 210);
  },
  onReset() {

  },

  
});
