import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
    totalPrice: '0',
    tableItems: [
      {
        prop: 'fNumber',
        label: '物料编码',
        width: 200
      },
      {
        prop: 'fName',
        label: '物料名称',
        width: 300
      },
      {
        prop: 'fModel',
        label: '规格型号',
        width: 300
      },
       {
        prop: 'unitName',
        label: '单位',
        width: 100
      },
      {
        prop: 'fPrice',
        label: '单价',
        width: 200
      },
      {
        prop: 'fQty',
        label: '实收数量',
        width: 200
      },
       {
        prop: 'fAmount',
        label: '金额',
        width: 200
      },
      {
        prop: 'fFullName',
        label: '供应商',
        width: 300
      }
    ],
    //data:[]
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark
    }
    console.log(e)
    this.aggreSubmit(param)
  },
  print(){
    var that = this
    this._postData('Godown/PrintPDF',
      function(res){
        console.log(res)
        dd.alert({content:'获取成功'})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },
  output(){
    var that = this
    this._postData('Godown/PrintExcel',
      function(res){
        console.log(res)
        dd.alert({content:'获取成功'})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },
});