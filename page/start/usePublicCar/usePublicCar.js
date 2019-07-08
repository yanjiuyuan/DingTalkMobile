import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    disablePage:true,
    checked:false,
    checked2:false,
    // modalOpened:false,
    items:[{name:'本人同意《研究院车辆安全使用协议》'}],
    items2:[{name:'本人已经提交外出申请'}]
  },
  submit(e) {
    if (this.data.nodeList[1].AddPeople[0].userId == "0907095238746571") {
        dd.alert({content:'用车无需季老师审批,如是部长级请选本人'})
        return
    }
    var that = this
    var value = e.detail.value
    value['CarId'] = ''
    value['IsChooseOccupyCar'] = true
    value['IsPublicCar'] = true
    value['OccupyCarId'] = ''
    if(!value.DrivingMan || !value.MainContent || !value.PlantTravelWay || !value.StartTime || !value.EndTime) 
    {
      dd.alert({content:'表单未填写完整'})
      return
    }
    let callBack = function (taskId) {
        console.log("提交审批ok!")
        value.TaskId = taskId
        that._postData("CarTableNew/TableSave",
          (res) => {
            that.doneSubmit()
          },value
        )
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
        let names = []//userId
        for (let d of res.users) names.push(d.name)
        that.setData({
          'table.PeerNumber':names.join(',')
        })
      },
      fail: function(err) {

      }
    })
  },
  //加载重新发起数据
  loadReApproval(){
      let localStorage = this.data.localStorage
      if (!localStorage || !localStorage.valid) return
      localStorage.valid = false
      this.setData({
        table: localStorage.table,
        'tableInfo.Title': localStorage.title,
        flowid:localStorage.flowid,
        localStorage: localStorage
      })
    },
  //同意协议选项
  onChecked(e){
    console.log(!this.data.checked)
    this.setData({
      checked:!this.data.checked,
      disablePage:this.data.checked
    })
  },
  onChecked2(e){
    this.setData({
      checked2:!this.data.checked2,
      disablePage:this.data.checked2
    })
  },
  downLoad(){
    var param = {
        UserId: this.data.DingData.userid,
        // 阿法迪 Media_Id: '@lAnPDeC2tzsNwZnObg_EXs5_pwGR'
        Media_Id: '@lAnPBY0V4-rKP9rOTtf42s5H6UHz'
    }
    this._postData("DingTalkServers/sendFileMessageNew",
      (res) => {dd.alert({content:'获取成功，请在PC端查收'})},param
    )
  },
  //选择时间
 selectStartDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
      startDate: this.data.DateStr + ' ' + this.data.TimeStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
      success: (res) => {
        this.setData({
          'table.StartTime': res.date
        })
      },
    });
  },
  selectEndDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
      startDate: this.data.DateStr + ' ' + this.data.TimeStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
      success: (res) => {
        this.setData({
          'table.EndTime': res.date
        })
      },
    });
  },
 
});
