import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    hidden: true,
    tableOperate: '删除',
    tableData: [],
    good: {},
    bigIndex: -1,
    smallIndex: -1,
    bigCodes: [{
        materialCodeNumber: 1,
        materialName:''
    }],
    smallMaterialCodes: [],
    codeType: '1',
    tableItems: [
     
      {
        prop: 'Name',
        label: '物料名称',
        width: 300
      },
      {
        prop: 'BigCodeName',
        label: '大类名称',
        width: 200
      },
      {
        prop: 'BigCode',
        label: '大类编码',
        width: 200
      },
      {
        prop: 'SmallCodeName',
        label: '小类名称',
        width: 200
      },
      {
        prop: 'SmallCode',
        label: '小类编码',
        width: 200
      },
      {
        prop: 'Standard',
        label: '规格型号',
        width: 300
      },
      {
        prop: 'Unit',
        label: '单位',
        width: 200
      },
      {
        prop: 'SurfaceTreatment',
        label: '表面处理',
        width: 200
      },
      {
        prop: 'PerformanceLevel',
        label: '性能等级',
        width: 200
      },
      {
        prop: 'StandardNumber',
        label: '标准号',
        width: 200
      },
      {
        prop: 'Features',
        label: '典型特征',
        width: 200
      },
      {
        prop: 'purpose',
        label: '用途',
        width: 200
      },
      {
        prop: 'Remark',
        label: '备注',
        width: 100
      }
    ]
    //data:[]
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark
    }
    let callBack = function (taskId) {
        that.bindAll(taskId)
    }
    console.log(param)
    //return
    this.approvalSubmit(param, callBack)
  },
  bindAll(taskId) {
      var that = this
      var paramArr = []
      for (let p of that.data.tableData) {
          p.TaskId = taskId
          paramArr.push(p)
      }
      that.requestJsonData('POST', "ItemCodeAdd/TableSave", function(res) {
          that.doneSubmit()
      },JSON.stringify(paramArr))
  },
  radioChange: function(e) {
    this.setData({
      tableData: []
    })
    console.log(e)
    this.data.codeType = e.detail.value

    this.getMaterielCode()
  },
  //获取编码
  getMaterielCode() {
      let url = ''
      this.data.codeType == '2' ? url = this.data.jinDomarn + 'OfficeSupply/ReadType' : url = '/ItemCodeAdd/GetAllMaterialCode'
      this._getData(url, (res) => {
        this.setData({bigCodes: res})
      })
  },
  changeBigCode(e){
    let index = e.detail.value
    if(index == this.data.bigIndex) return
    this.setData({
      bigIndex: index,
      smallIndex: 0,
      smallMaterialCodes: this.data.bigCodes[index].smallMaterialCodes
    })
  },
  changeSmallCode(e){
    let index = e.detail.value
    this.setData({
      smallIndex: index
    })
  },
  //弹窗表单相关
  //显示弹窗表单
  chooseItem(e){
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
    console.log(this.data.tableData)
    this.data.tableData.splice(index, 1)
    this.setData({
      tableData:this.data.tableData
    })
    console.log(this.data.tableData)
  },
  //提交弹窗表单
  addGood(e){
    var value = e.detail.value
    console.log(value) 
    if (!value || !value.Name || !value.Standard || this.data.bigIndex<0 || this.data.smallIndex<0) {
      dd.alert({
        content: `表单填写不完整`,
      });
      return
    }
    value['BigCodeName'] = this.data.bigCodes[this.data.bigIndex].materialName
    value['BigCode'] = this.data.bigCodes[this.data.bigIndex].materialCodeNumber
    value['SmallCodeName'] = this.data.smallMaterialCodes[this.data.smallIndex].materialName
    value['SmallCode'] = this.data.smallMaterialCodes[this.data.smallIndex].materialCodeNumber
    console.log(value)
    let length = this.data.tableData.length
    this.setData({
      [`tableData[${length}]`]: value
    })
    this.onModalCloseTap()
  },
  onShow() {
    this.getMaterielCode()
    //this.loadTempData()
  },

  
});
