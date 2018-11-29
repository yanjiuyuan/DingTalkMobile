import pub from '/util/public';
Page({
  ...pub.func,
  data: {
    ...pub.data,
    tableOperate: '选择',
    purchaseList: [],
    tableParam2: {
      size: 100,
      now: 1,
      total: 0
    },
    tableOperate2: '删除',
    good: {
            Price: '',
            Unit: '',
            Count: ''
        },
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
    //data:[]
  },
  search(e){
    var value = e.detail.value
    console.log(value) 
    if (!value || !value.keyWord) return
    var that = this
    that.requestData('GET', 'Purchase/GetICItem?Key=' +encodeURI(value.keyWord), function(res) {
      console.log(JSON.parse(res.data))
      that.setData({
        'tableParam.total': JSON.parse(res.data).length
      })
      that.data.data =  JSON.parse(res.data)
      that.getData()
    })
  },
  onSubmit(e) {
    dd.alert({
      content: `数据：${JSON.stringify(e.detail.value)}`,
    });
  },
  chooseItem(e){
    if(!e) return
    let good = e.target.targetDataset.row
    if(!good) return
    for (let p of this.data.purchaseList) {
        if (p.CodeNo == good.FNumber) return
    }
    let param = {
        CodeNo: good.FNumber,
        Name: good.FName,
        Standard: good.FModel,
        Unit: '',
        Price: good.FNote == '0' ? '' : good.FNote,
        Count: '',
        Purpose: '',
        UrgentDate: '',
        Mark: ''
    }
    let length = this.data.purchaseList.length
    let setStr = 'purchaseList[' + length + ']'
    console.log(setStr)
    this.setData({
      [`purchaseList[${length}]`]: param
    })
    console.log(this.data.purchaseList)
  },
  onReset() {

  },

});
