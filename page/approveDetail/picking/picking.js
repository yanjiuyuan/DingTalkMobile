import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
    totalPrice: '0',
    imgUrlList:[],
    tableItems2: [
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
        prop: 'fQty',
        label: '实收数量',
        width: 200
      },
      {
        prop: 'fFullName',
        label: '供应商',
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
    if(this.data.imgUrlList.length>0){
      param['ImageUrl'] = this.data.imgUrlList.join(',')
    }
    else if(this.data.nodeid == 3 && this.data.imgUrlList.length == 0){
      dd.alert({
        content:"请上传图片"
      })
      return;
    }
    //return
    this.aggreSubmit(param)
  },
  print(){
    var that = this
    this._postData('Pick/PrintPDF',
      function(res){
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
    this._postData('Pick/PrintExcel',
      function(res){
        dd.alert({content:'获取成功'})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },

  deletePhoto(e){
    my.confirm({
      title: '温馨提示',
      content: '是否需要删除？',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      success: (result) => {
          if(result.confirm == true){

              let index = e.currentTarget.dataset.index;
              this.data.imageList.splice(index,1);
              this.setData({
                imageList:this.data.imageList
              })           
          }
      },
    });
  },
});
