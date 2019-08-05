import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    disablePage:false,
    addPeopleNodes: [2,5], //额外添加审批人节点数组
    // managers: [{
    //     name: '詹姆斯',
    //     emplId: 'manager325'
    // }, {
    //     name: '蔡兴桐',
    //     emplId: '083452125733424957'
    // }],
    managers: [{
       name: '徐丽华',
       emplId: '15543527578095619'
    }, {
       name: '陈思杨',
       emplId: '15545554432996107'
    }],
  },
  submit(e) {
    var value = e.detail.value
    value['Type'] = this.data.IntellectualPropertyTypes[this.data.iptIndex]
    value['Project'] = this.data.projectList[this.data.projectIndex].ProjectName
    value['ProjectId'] = this.data.projectList[this.data.projectIndex].ProjectId
    value['InventorId'] = this.data.tableInfo.InventorId
    value['ActualInventor'] = this.data.tableInfo.ActualInventor
    value['ActualInventorId'] = this.data.tableInfo.ActualInventorId
    if(!value.Type || !value.ProjectId || !value.InventorId|| !value.Name) 
    {
      console.log(value)
      dd.alert({content:'表单未填写完整'})
      return
    }
    value['Type'] == '软件著作权' ? this.data.nodeList[5].AddPeople = [this.data.managers[1]] : this.data.nodeList[5].AddPeople = [this.data.managers[0]]
    let callBack = (taskId) => {
        console.log("提交审批ok!")
        value.TaskId = taskId
        this._postData("IntellectualProperty/Save",
          (res) => {
            this.doneSubmit()
          },value
        )
    }
    this.approvalSubmit(value, callBack,value['ProjectId']);
  },
  //选人控件方法
  chooseMans(e){
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: true,
      success: function(res) {
        console.log(res)
        let names = []//userId
        let userids = []
        for (let d of res.users){
          names.push(d.name)
          userids.push(d.userId)
        } 
        that.setData({
          'tableInfo.Inventor':names.join(','),
          'tableInfo.InventorId':userids.join(','),
          'tableInfo.ActualInventor':names.join(','),
          'tableInfo.ActualInventorId':userids.join(',')
        })
      }
    })
  },
  changeState(e){
      this.setData({
      stateIndex: e.detail.value,
    })
  },
  changeCompany(e){
      this.setData({
      companyIndex: e.detail.value,
    })
  },
  changeDept(e){
      this.setData({
      deptIndex: e.detail.value,
    })
  },
  changeType(e){
      this.setData({
      typeIndex: e.detail.value,
    })
  }
});
