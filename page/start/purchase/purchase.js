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
    addPeopleNodes: [1],
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
    if (!value || !value.keyWord.trim()){
      dd.alert({
        content:"请输入关键字",
        buttonText:"确认"
      })
       return;
    }
    var that = this
    that.requestData('GET', 'Purchase/GetICItem' + that.formatQueryStr({Key:value.keyWord}) , function(res) { 
      console.log(JSON.parse(res.data))
      if(JSON.parse(res.data).length == 0){
        dd.alert({
          content:"暂无数据",
          buttonText:"确认"
        })
        return;
      }
      that.setData({
        'tableParam.total': JSON.parse(res.data).length
      })
      that.data.data =  JSON.parse(res.data)
      that.getData()
    })
  },
  submit(e) {
    var that = this
    if(that.data.projectList[that.data.projectIndex] == undefined){
      dd.alert({
        content:"项目名称不能为空，请输入！",
        buttonText:"确认"
      })
      return;
      }
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark,
        ProjectName: that.data.projectList[that.data.projectIndex].ProjectName,
        ProjectId: that.data.projectList[that.data.projectIndex].ProjectId
    }
    if(!param.ProjectId || !this.data.purchaseList.length){
      dd.alert({
        content: `请选择零部件！`,
        buttonText:"确认"

      });
      return
    }
    let callBack = function (taskId) {
        that.bindAll(taskId)
    }
    console.log(param)
    this.approvalSubmit(param, callBack)
  },
  bindAll(taskId) {
      var that = this
      var paramArr = []
      for (let p of that.data.purchaseList) {
          p.TaskId = taskId
          paramArr.push(p)
      }
      that.requestJsonData('POST', "Purchase/SavePurchaseTable", function(res) {
          that.doneSubmit()
      },JSON.stringify(paramArr))
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
    if(!e) return;
    console.log(e)
    let index = e.target.targetDataset.index
    if((!index) && index != 0)  return; 
    let length = this.data.purchaseList.length;
    this.data.purchaseList.splice(index, 1);
  
    this.setData({
      'tableParam2.total': length - 1,
      purchaseList:this.data.purchaseList
    })

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
    console.log(value);
    for (let p of this.data.purchaseList) {

        if (p.CodeNo == good.FNumber) {
          dd.alert({
            content:"禁止选择相同的物料编码！",
            buttonText:"确认"
          })
          this.onModalCloseTap();
          return;
          }
    }
      let reg  = /^-?\d+$/; //只能是整数数字
     
      let reg2 = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ /; //正浮点数
    if (!value || !value.Unit.trim() || !value.Count.trim() || !value.UrgentDate.trim() || !value.Purpose.trim() ) {
      dd.alert({
        content: `请填写已选零部件信息！`,
        buttonText:'确认'
      });
      return;
    }
    if(value.Count == 0){
      dd.alert({
        content:"数量必须大于0！",
        buttonText:"确认"
      })
      return;
    }

    if(!reg.test(value.Count)){
      dd.alert({
        content:"数量必须为整数！",
        buttonText:"确认"
      })
      return;
    }
    console.log(reg2.test(value.Price));
    if( !reg2.test(value.Price) == false && value.Price){
      dd.alert({
        content:"单价必须为纯数字！",
        buttonText:"确认"
      })
      return;
    }
    let param = {
        CodeNo: good.FNumber,
        Name: good.FName,
        Standard: good.FModel,
        Unit: value.Unit.trim(),
        Price: value.Price ? value.Price  + '' : '0',
        Count: value.Count.trim(),
        Purpose: value.Purpose.trim(),
        UrgentDate: value.UrgentDate,
        Mark: value.Mark.trim()
    }
    let length = this.data.purchaseList.length
    let setStr = 'purchaseList[' + length + ']'
    this.setData({
      dateStr:"",
      'tableParam2.total': length + 1,
      [`purchaseList[${length}]`]: param,
      totalPrice: (this.data.totalPrice - 0 + param.Price * param.Count) + ''
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
  //显示临时保存数据
  saveTempData() {
      localStorage.setItem('purchase', JSON.stringify(this.data.purchaseList))
      dd.alert({content:'保存成功'})
  },
  loadTempData() {
      var data = JSON.parse(localStorage.getItem('purchase'))
      if (data && data.length && data.length > 0) {
        this.setData({purchaseList: data})
        localStorage.removeItem('purchase')
      }
  },
  onShow() {
    //this.loadTempData()
  },

  
});
