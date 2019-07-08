import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    companyIndex:0,
    imgUrlList:[],
    disablePage:false,
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    value['Company'] = this.data.CompanyNames[this.data.companyIndex]
    if(this.data.imgUrlList.length <1){
      dd.alert({content:'需要上传图片'})
      return
    }
    if(!value.Company || !value.Tel || !value.Name || !value.Count || !value.Unit || !value.Cause || !value.Date) 
    {
      dd.alert({content:'表单未填写完整'})
      return
    }
    let callBack = function (taskId) {
        console.log("提交审批ok!")
        value.TaskId = taskId
        that._postData("MaterialRelease/Save",
          (res) => {
            that.doneSubmit()
          },value
        )
    }
    value['ImageUrl'] = this.data.imgUrlList.join(',')
    this.approvalSubmit(value, callBack)
  },
  changeCompany(e){
      this.setData({
      companyIndex: e.detail.value,
    })
  },
});
