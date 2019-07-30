import pub from '/util/public';
let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,
    stateIndex:0,
    companyIndex:0,
    deptIndex:0,
    typeIndex:0,
    disablePage:true,

  },
  submit(e) {
    var that = this
    var value = e.detail.value
    value['CreateTime'] = ''
    value['CompanyName'] = '泉州华中科技大学智能制造研究院'
    value['ApplyManId'] = this.data.DingData.userid
    value['ResponsibleManId'] = this.data.tableInfo.ResponsibleManId
    value['TeamMembersId'] = this.data.tableInfo.TeamMembersId
    if(!value.ResponsibleMan || !value.groupPeople || !value.StartTime || !value.EndTime) 
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
    this.approvalSubmit(value, callBack)
  },
  //选人控件方法
  chooseMan(e){
    var that = this
    dd.complexChoose({
      ...that.chooseParam,
      multiple: false,
      success: function(res) {
        console.log(res)
        let names = []//userId
        let userids = []
        for (let d of res.users){
          names.push(d.name)
          userids.push(d.userId)
        } 
        that.setData({
          'tableInfo.ResponsibleMan':names.join(','),
          'tableInfo.ResponsibleManId':userids.join(',')
        })
      }
    })
  },
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
          'tableInfo.TeamMembers':names.join(','),
          'tableInfo.TeamMembersId':userids.join(',')
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
  },
  upLoadFile(e){
    console.log(e)


    // dd.chooseImage({
    //   sourceType: ['camera','album'],
    //   count: 1,
    //   success: (res) => {
    //     console.log(res);
    //     console.log("chooseImage success");
    //     dd.uploadFile({
    //             url: this.data.dormainName + '/drawingupload/Upload',
    //             fileType: 'image',
    //             fileName: 'file',
    //             filePath: res.filePaths[0],
    //             success: (res) => {
    //             console.log(res);
    //             console.log("uploadFile success");

    //               dd.alert({
    //               content: '上传成功'
    //             });
    //           },

    //           fail:(res) => {

    //             console.log("uploadFile fail");

    //             console.log(res);
    //           }
    //     });
    //   },
    //   fail:()=>{
    //     console.log("chooseImage fail");
    //     my.showToast({
    //       content: '选择失败',
    //     });
    //   }
    // })



  },
});
