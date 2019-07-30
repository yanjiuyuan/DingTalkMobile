import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
    tableItems: [
      {
        prop: 'Supplier',
        label: '供应商',
        width: 300
      },
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
        prop: 'StartTime',
        label: '开始日期',
        width: 200
      },
      {
        prop: 'EndTime',
        label: '结束日期',
        width: 200
      },
      {
        prop: 'Mark',
        label: '备注',
        width: 300
      }
    ],
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark
    }
    this.aggreSubmit(param)
  },
  print(){
    this._postData('Borrow/PrintPDF',
      function(res){
        dd.alert({content:'获取成功'})
      },
      {
        UserId: this.data.DingData.userid,
        TaskId: this.data.taskid
      }
    )
  },
  output(){
    this._postData('Borrow/PrintExcel',
      function(res){
        dd.alert({content:'获取成功'})
      },
      {
        UserId: this.data.DingData.userid,
        TaskId: this.data.taskid
      }
    )
  },
});