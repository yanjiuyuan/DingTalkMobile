import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    table:{},
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Remark: value.remark
    }
    if((!value.FactBeginTime || !value.FactEndTime || !value.FactDays || !value.FactCooperateContent || !value.FactCooperateMan) && (this.data.nodeid ==4)){
      dd.alert({content:'表单未填写完整'})
      return
    }
    if(this.data.nodeid == 4){
      this.data.table['FactBeginTime'] = value.FactBeginTime
      this.data.table['FactEndTime'] = value.FactEndTime
      this.data.table['FactDays'] = value.FactDays
      this.data.table['FactCooperateContent'] = value.FactCooperateContent
      //this.data.table['FactCooperateMan'] = value.FactCooperateMan
    }
    
    this.setData({disablePage:true})
    this._postData("Cooperate/Modify",
      (res) => {
        that.aggreSubmit(param)
      },this.data.table
    )
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
          ids.push(d.emplId)
        } 
        that.setData({
          'table.FactCooperateMan':names.join(','),
          'table.FactCooperateManId':ids.join(',')
        })
      },
      fail: function(err) {

      }
    })
  },
  onReady(){
    var that = this
     this._getData("Cooperate/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        if (this.data.nodeid == 1) {
            res['FactBeginTime'] = res.PlanBeginTime
            res['FactEndTime'] = res.PlanEndTime
            res['FactDays'] = res.PlanDays
            res['FactCooperateContent'] = res.CooperateContent
            res['FactCooperateMan'] = res.CooperateMan
        }
        this.setData({
          table: res
        })
      }
    )
  },
});
