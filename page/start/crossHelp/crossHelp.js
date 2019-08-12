import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    addPeopleNodes: [4, 6], //额外添加审批人节点数组
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    value['CooperateDept'] = this.data.DeptNames[this.data.departIndex]
    console.log(value);


    if(value.CooperateDept == "" || value.CooperateMan == "" || value.PlanBeginTime == "" || value.PlanEndTime == "" || value.CooperateContent == "" || value.PlanDays == "") 
    {
      dd.alert({content:'表单未填写完整'})
      return
    }
    let callBack = function (taskId) {
        value.TaskId = taskId
        that._postData("Cooperate/Save",
          (res) => {
            that.doneSubmit()
          },value
        )
    }
    this.data.nodeList[4].AddPeople = this.data.nodeList[2].AddPeople
    this.data.nodeList[6].AddPeople = [...this.data.nodeList[0].AddPeople, ...this.data.nodeList[1].AddPeople, ...this.data.nodeList[2].AddPeople]
    this.approvalSubmit({
        Title: value.Title,
        Remark: value.remark
    }, callBack )
  },
  //选人控件方法
  choosePeoples(e){
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: true,
      success: function(res) {
        let names = []//userId
        let ids = []
        for (let d of res.users){
          names.push(d.name)
          ids.push(d.userId)
        } 
        that.setData({
          'tableInfo.CooperateMan':names.join(','),
          'tableInfo.CooperateManId':ids.join(',')
        })
      },
      fail: function(err) {

      }
    })
  },

});
