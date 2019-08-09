import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
    good: {},
    result:{},
    tableItems1: [
      {
        prop: 'Type',
        label: '类型',
        width: 200
      },
      {
        prop: 'ApplyMan',
        label: '申请人',
        width: 200
      },
      {
        prop: 'ApplyTime',
        label: '申请时间',
        width: 250
      },
      {
        prop: 'OldTaskId',
        label: '流水号',
        width: 200
      },
    ],



    tableItems2: [
      {
        prop: 'ApplicationUnitName',
        label: '转化/应用单位',
        width: 200
      },
      {
        prop: 'Customer',
        label: '客户/联系人',
        width: 200
      },
      {
        prop: 'Post',
        label: '职务',
        width: 200
      },
      {
        prop: 'Tel',
        label: '联系方式',
        width: 200
      },
    ],


    tableItems3: [
      {
        prop: 'Name',
        label: '申报政策名称',
        width: 200
      },
      {
        prop: 'No',
        label: '专项专题编号',
        width: 200
      },
      {
        prop: 'Money',
        label: '国拨经费/万',
        width: 200
      },
      {
        prop: 'ActualMoney',
        label: '实际到账/万',
        width: 200
      },
    ],

    tableItems4:[  
      {
        prop: 'Subject',
        label: '科目/备注',
        width: 200
      },
      {
        prop: 'Money',
        label: '支出数(资料科目合计)',
        width: 300
      },
      {
        prop: 'NameAndMoney',
        label: '支出数计算依据(名称+金额)',
        width: 300
      },
    ],
    tableData4: [
        {
            Money: '',
            NameAndMoney: '',
            Subject: '1、设备费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '其中：购置',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '试制',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '2、材料费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '3、测试化验加工费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '4、燃料动力费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '5、差旅费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '6、会议费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '7、合作与交流费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '8、出版/文献/信息传播/知识产权事务费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '9、劳务费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '10、专家咨询费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '11、管理费',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '12、其他(如用车成本等)',
            TaskId: "",
            
        },
        {
            Money: '',
            NameAndMoney: '',
            Subject: '合计',
            TaskId: "",
            
        }
    ],



    
  },
  submit(e) {
    var that = this;
    var value = e.detail.value;
    var param = {
        Title: value.title,
        Remark: value.remark
    }

    this.data.result.projectFundingList = this.data.tableData4;
    this.data.result.NodeId = this.data.nodeid;
    console.log(this.data.result.projectFundingList);
    let flag = true;
    if(this.data.nodeid == 2){
      for(let i of this.data.result.projectFundingList){
        if(i.Money == "" || i.NameAndMoney == ""){
          dd.alert({
          content:"请完整填写项目经费表"
          });
          flag = false;
          break;
        }
        flag = true;
      }
    }
    if(flag == true ){
      if(this.data.nodeid == 2){
        this._postData("ProjectClosure/Modify",
      (res) => {
      },this.data.result);
      }


     this.aggreSubmit(param);
    }



  },

  onReady(){
    console.log(this.data.nodeid);
    if(this.data.nodeid == 2 && this.data.index == 0){
      this.setData({
        tableOperate:"填写"
      })
    }

    for(let i of this.data.tableData4){
      i.TaskId = this.data.taskid;
    }

     this._getData("ProjectClosure/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
    
        console.log(res);
        for(let i of this.data.nodeList){
          if(i.ApplyMan == this.data.DingData.nickName){
              this.setData({
               nodeid : i.NodeId,
              })
              break;
          }
        }
        let arr1 = [];
        let arr2 = [];
        for(let i of res.detailedLists){
          if(i.Type == "知识产权申请"){
            arr1.push(i);
          }
          else{
             arr2.push(i);
          }
        }
        this.setData({
          result:res,
          table: res.projectClosure,
          tableData1:arr2,
          intellectualProperty:arr1,
          tableData2:res.applicationUnitList,
          tableData3:res.longitudinalProject,
          tableData4:res.projectFundingList.length !== 0 ? res.projectFundingList:this.data.tableData4,
          SuggestBook1:JSON.parse(res.projectClosure.SuggestBook1)[0],
          PPT2:JSON.parse(res.projectClosure.PPT2)[0],
          DemandBook3:res.projectClosure.DemandBook3 != null ? JSON.parse(res.projectClosure.DemandBook3)[0] : null,
          Drawing4:res.projectClosure.Drawing4 != null ? JSON.parse(res.projectClosure.Drawing4)[0] : null,
          Electrical5:res.projectClosure.Electrical5 != null ? JSON.parse(res.projectClosure.Electrical5)[0] : null,
          Bom6:res.projectClosure.Bom6 != null ? JSON.parse(res.projectClosure.Bom6)[0] : null,
          SourceCode7:res.projectClosure.SourceCode7 != null ? JSON.parse(res.projectClosure.SourceCode7)[0] : null,
          UseBook8:res.projectClosure.UseBook8 != null ? JSON.parse(res.projectClosure.UseBook8)[0] : null,
          CooperationAgreement9:res.projectClosure.CooperationAgreement9 != null ?JSON. parse(res.projectClosure.CooperationAgreement9)[0] : null,
          Product10:res.projectClosure.Product10 != null ? JSON.parse(res.projectClosure.Product10)[0] : null,
          Solution11:res.projectClosure.Solution11 != null ? JSON.parse(res.projectClosure.Solution11)[0] : null,
          AcceptanceData14:res.projectClosure.AcceptanceData14 != null ? JSON.parse(res.projectClosure.AcceptanceData14)[0] : null,
          ProcessDocumentation15:res.projectClosure.ProcessDocumentation15 != null ?JSON. parse(res.projectClosure.ProcessDocumentation15)[0] : null,
          TerminationReport16:res.projectClosure.TerminationReport16 != null ? JSON.parse(res.projectClosure.TerminationReport16)[0] : null,
          PackingList17:res.projectClosure.PackingList17 != null ? JSON.parse(res.projectClosure.PackingList17)[0] : null,
          AcceptanceSlip18:res.projectClosure.AcceptanceSlip18 != null ? JSON.parse(res.projectClosure.AcceptanceSlip18)[0] : null,

        })
      })
  },


  //显示弹窗表单
  chooseItem(e){
    if(!e) return;
    console.log("asdasd");
    console.log(e);
    this.data.good = e.target.targetDataset.row;
    if(!this.data.good) return;
    
    this.setData({
      Subject:this.data.good.Subject,
      idx:e.target.targetDataset.index,
      hidden: !this.data.hidden
    })
    this.createMaskShowAnim();
    this.createContentShowAnim();
  },

  //提交弹窗表单
  addGood(e){
    let value = e.detail.value;

    console.log(e);
  if (!value || !value.NameAndMoney || !value.Money) {
      dd.alert({
        content: `表单填写不完整`,
      });
      return;
    }
    let param = {
        Id:this.data.good.Id,
        Money: value.Money,
        NameAndMoney: value.NameAndMoney,
        Subject: this.data.good.Subject,
        TaskId:this.data.taskid,

    }
    let index = e.buttonTarget.dataset.index;
    console.log(param);
    this.setData({
      [`tableData4[${index}]`]: param,
    })
    this.onModalCloseTap();//隐藏

  
  },

PrintOne(){
  let param = {
    UserId: this.data.DingData.userid, 
    TaskId: this.data.taskid, 
    Type: 1};
  this._postData("ProjectClosure/PrintExcel",(res) => {},param);

},
PrintTwo(){
   let param = {
    UserId: this.data.DingData.userid, 
    TaskId: this.data.taskid, 
    Type: 2};
  this._postData("ProjectClosure/PrintExcel",(res) => {},param);
},
PrintThree(){
  let param = {
    UserId: this.data.DingData.userid, 
    TaskId: this.data.taskid, 
    Type: 3};
  this._postData("ProjectClosure/PrintExcel",(res) => {},param);
}

});
