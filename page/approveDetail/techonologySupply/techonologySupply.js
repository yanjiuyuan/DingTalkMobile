import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    addPeopleNodes: [], //额外添加审批人节点数组
    table:{},
    show:true,
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Remark: value.remark
    }
    if((!value.TeamMembers || !value.StartTime || !value.EndTime || !value.TechnicalProposal || !value.ProjectName) && (this.data.nodeid ==1)){
      dd.alert({content:'表单未填写完整'})
      return;
    }
    if(this.data.nodeid == 1){
      this.data.table['TeamMembers'] = value.TeamMembers
      this.data.table['StartTime'] = value.StartTime
      this.data.table['EndTime'] = value.EndTime
      this.data.table['TechnicalProposal'] = value.TechnicalProposal
      this.data.table['ProjectName'] = value.ProjectName
    }
    if(this.data.nodeid == 4){
      let reg = /^\d{4}\w{3}\d{3}$|^\d{4}\w{2}\d{3}$/;
      if(!reg.test(value.ProjectNo)){
          dd.alert({
            content:"请规范填写测试项目编号"
          })
          return;
      }
      if(!value.ProjectNo){
        dd.alert({content:'表单未填写完整'})
        return
      }
      this.data.table['ProjectNo'] = value.ProjectNo
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
          "ProjectId": value.ProjectNo,
          "CompanyName": this.data.table.CompanyName,
          "CooperativeUnit": this.data.table.Customer,
          "DeptName": this.data.table.DeptName,
          "ProjectType": this.data.table.ProjectType,
          "ProjectSmallType": '测试',
          "ResponsibleMan": this.data.table.ResponsibleMan,
          "ResponsibleManId": this.data.table.ResponsibleManId,
          "ProjectFileUrl": ''
      }
      console.log(param2)
      this.setData({disablePage:true})
      this._postData("TechnicalSupport/Modify",(res) => {
          this._postData("ProjectNew/AddProject",(res) => {
            that.aggreSubmit(param)
          },[param2])
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


  getNodeList_done(nodeList){
    console.log(nodeList);
    for (let node of nodeList){
      if( node.NodeName == "抄送" && node.NodePeople.indexOf(this.data.DingData.nickName) !== -1){
          this.setData({
            show:false
          })

      } 
    }
  },



  
});
