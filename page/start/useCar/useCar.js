import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    hidden: true,
     checked:false,
    items:[{name:'本人同意《私车公用协议书》'}]
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    value['CarId'] = ''
    value['IsChooseOccupyCar'] = true
    value['IsPublicCar'] = true
    value['OccupyCarId'] = ''
    console.log(value)
    if(!value.DrivingMan || !value.MainContent || !value.PlantTravelWay || !value.StartTime || !value.EndTime) 
    {
      dd.alert({content:'表单未填写完整'})
      return
    }
    let callBack = function (taskId) {
        console.log("提交审批ok!")
        value.TaskId = taskId
    
        that.requestData('POST', "CarTable/TableSave", function(res) {
            var alertStr = '保存成功'
            if (res.errorCode != 0) alertStr = res.errorMessage
            that.doneSubmit(alertStr)
        },value)
    }
    
    this.approvalSubmit(value, 
    callBack, {
            Title: value.Title
        })
  },
  //选人控件方法
  choosePeoples(e){
    console.log('start choose people')
    var nodeId = e.target.targetDataset.NodeId
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: true,
      success: function(res) {
        console.log(res)
        // res = 
        // {
        //     selectedCount:1,                              //选择人数
        //     users:[{"name":"詹姆斯","avatar":"","userId":"manager325"}],//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
        //     departments:[{"id":"","name":"","number":""}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        // }
        let names = []
        for (let d of res.users) names.push(d.name)
        that.setData({
          'tableInfo.PeerNumber':names.join(',')
        })
      },
      fail: function(err) {

      }
    })
  },
  //同意协议选项
  onChecked(e){
    this.setData({
      checked:!this.data.checked,
      disablePage:this.data.checked
    })
  },
  downLoad(){
    var param = {
        UserId: this.data.DingData.userid,
        Media_Id: '@lArPDeC2tzsRLpzOWVoCUs4-J34O'
    }
    console.log(param)
    this.requestData('POST', "DingTalkServers/sendFileMessage", function(res) {
      console.log(res)
      dd.alert({content:JSON.parse(res.data.errmsg)})
    },param)
  },
  //选择时间
  selectStartDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr,
      startDate: this.data.DateStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
      success: (res) => {
        this.setData({
          startDateStr: res.date
        })
      },
    });
  },
  selectEndDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr,
      startDate: this.data.DateStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
      success: (res) => {
        this.setData({
          endDateStr: res.date
        })
      },
    });
  },
  
});
