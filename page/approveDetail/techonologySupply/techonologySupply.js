import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    addPeopleNodes: [], //额外添加审批人节点数组
    table:{},
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Remark: value.remark
    }
    if((!value.TeamMembers || !value.StartTime || !value.EndTime || !value.TechnicalProposal || !value.ProjectName) && (this.data.nodeid ==1)){
      dd.alert({content:'表单未填写完整'})
      return
    }
    if(this.data.nodeid == 1){
      this.data.table['TeamMembers'] = value.TeamMembers
      this.data.table['StartTime'] = value.StartTime
      this.data.table['EndTime'] = value.EndTime
      this.data.table['TechnicalProposal'] = value.TechnicalProposal
      this.data.table['ProjectName'] = value.ProjectName
    }
    if(this.data.nodeid == 4){
      this.data.table['ProjectNo'] = value.ProjectNo
    }
    this.setData({disablePage:true})
    this._postData("TechnicalSupport/Modify",
      (res) => {
        that.aggreSubmit(param)
      },this.data.table
    )
  },
  print(){
    var that = this
    this._postData('TechnicalSupport/PrintAndSend',
      function(res){
        dd.alert({content:'获取成功，请在钉钉工作通知中查收'})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },
  //选人控件方法
  choosePeoples(e){
    this.data.addPeopleNodes = [5]
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: true,
      success: function(res) {
        let names = []//userId
        let ids = []
        let addPeoples = []
        for (let d of res.users){
          names.push(d.name)
          ids.push(d.userId)
          addPeoples.push({
              name: d.name,
              userId: d.userId
          })
        } 
        that.setData({//[${i}]
          'nodeList[5].AddPeople':addPeoples,
          'table.TeamMembers':names.join(','),
          'table.TeamMembersId':ids.join(',')
        })
        console.log(that.data.nodeList[5])
      },
      fail: function(err) {

      }
    })
  },
  //选择时间
  selectStartDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.DateStr,
      startDate: this.data.DateStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day,
      success: (res) => {
        this.setData({
          'table.StartTime': res.date
        })
      },
    });
  },
  selectEndDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.DateStr,
      startDate: this.data.DateStr,
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day ,
      success: (res) => {
        this.setData({
          'table.EndTime': res.date
        })
      },
    });
  },
  onReady(){
    var that = this

     this._getData("TechnicalSupport/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        for(let r in res){
            if(res[r] === null) res[r] = ''
          }
        this.setData({
          table: res
        })
      }
    )
  },
});
