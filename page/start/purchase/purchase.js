import pub from '/util/public';
Page({
  ...pub.func,
  data: {
    ...pub.data,
    tableOperate: '选择',
    tableTotal: 0,
    tableNow: 1,
    tableParam: [
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
    tableData:[]
  },
  search(e){
    var value = e.detail.value
    console.log(value) 
    if (!value || !value.keyWord) return
    var that = this
    that.requestData('GET', 'Purchase/GetICItem?Key=' +encodeURI(value.keyWord), function(res) {
      console.log(JSON.parse(res.data))
      that.setData({
        tableData: JSON.parse(res.data),
        tableTotal: JSON.parse(res.data).length
      })
      that.tableData = JSON.parse(res.data)
      that.tableTotal = JSON.parse(res.data).length
    })
  },
  onSubmit(e) {
    dd.alert({
      content: `数据：${JSON.stringify(e.detail.value)}`,
    });
  },
  onReset() {

  },

});
