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
      this.data.table['IsCreateProject'] = true
      var param2 = {
          "CreateTime": this._getTime(),
          "IsEnable": true,
          "ProjectState": '在研',
          "IsFinish": false,
          "ApplyMan": this.data.nodeInfo.NodePeople,
          "ApplyManId": this.data.nodeInfo.PeopleId,
          "StartTime": this.data.table.StartTime,
          "EndTime": this.data.table.EndTime,
          "TeamMembers": this.data.table.TeamMembers,
          "TeamMembersId": this.data.table.TeamMembersId,
          "ProjectName": this.data.table.ProjectName,
          "ProjectId": this.data.table.ProjectNo,
          "CompanyName": this.data.table.CompanyName,
          "CooperativeUnit": this.data.table.Customer,
          "DeptName": this.data.table.DeptName,
          "ProjectType": this.data.table.ProjectType,
          "ProjectSmallType": '测试',
          "ResponsibleMan": this.data.table.ResponsibleMan,
          "ResponsibleManId": this.data.table.ResponsibleManId,
          "ProjectFileUrl": this.data.tableInfo.FileUrl
      }
      console.log(param2)
      return
      this.setData({disablePage:true})
      this._postData("TechnicalSupport/Modify",(res) => {
          this._postData("ProjectNew/AddProject",(res) => {
            that.aggreSubmit(param)
          },param2)
        },this.data.table
      )
      return
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
