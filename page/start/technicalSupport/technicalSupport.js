import pub from '/util/public';let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,

  items: [
      {name: '智慧工厂事业部', value: '智慧工厂事业部',checked: true},
      {name: '数控一代事业部', value: '数控一代事业部', },
      {name: '机器人事业部', value: '机器人事业部'},
      {name: '行政部', value: '行政部'},
      {name: '财务部', value: '财务部'},
      {name: '制造试验部', value: '制造试验部'},
      {name: '项目推进部', value: '项目推进部'},
      {name: '自动化事业部', value: '自动化事业部'},
    ],
  
    array1: ['研发类', '产品类', '教育类'],
    index1: 0,
    array2: ['高', '中', '低'],
    index2: 0,

    OtherEngineers:"",
    ResponsibleMan:"",




  },

    //选人控件方法
  choosePeoples(e){
    console.log('start choose people');
    var nodeId = e.target.targetDataset.NodeId;
    var that = this;
    dd.complexChoose({
      ...that.chooseParam,
      multiple: false,
      success: function(res) {
        console.log(res)
        let names = []//userId
        for (let d of res.users) names.push(d.name)
        that.setData({
          'table.PeerNumber':names.join(','),
          ResponsibleMan:res.users[0]
        })
      },
      fail: function(err) {

      }
    })
  },


  choosePeople(e){
    console.log('start choose people');
    var nodeId = e.target.targetDataset.NodeId;
    var that = this;
    dd.complexChoose({
      ...that.chooseParam,
      multiple: true,
      success: function(res) {
        console.log(res)
        let names = []//userId
        for (let d of res.users) names.push(d.name)
        that.setData({
          'table.Inventor':names.join(','),
           OtherEngineers:res.users,

        })
      },
      fail: function(err) {

      }
    })
  },

  // 项目大类选择
  bindPickerChangeOne(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index1: e.detail.value,
    });
  },
  
  // 紧急情况选择
  bindPickerChangeTwo(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index2: e.detail.value,
    });
  },

  //时间选择
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

  submit(e){
    let value = e.detail.value;
    let that = this;
 
    console.log(that.data.OtherEngineers);
    let OtherEngineers = "";
    let OtherEngineersId = "";
    for( let i = 0,len = that.data.OtherEngineers.length; i<len; i++){
      OtherEngineers = OtherEngineers + that.data.OtherEngineers[i].name + ",";
      OtherEngineersId = OtherEngineersId + that.data.OtherEngineers[i].userId + ",";
    }
   OtherEngineers = OtherEngineers.substr(0, OtherEngineers.length - 1);  
   OtherEngineersId = OtherEngineersId.substr(0, OtherEngineersId.length - 1);  


    console.log(this.data.DingData);

    let CreateTaskInfo = [
      {
        ApplyMan:this.data.DingData.nickName,
        ApplyManId:this.data.DingData.userid,
        ApplyTime:value.TimeRequired,
        Dept:this.data.DingData.departName,
        FlowId:"34",
        IsEnable:"1",
        IsSend:false,
        NodeId:"0",
        Remark:value.remark,
        State:"1",
        Title:value.title,
      },
      {
        ApplyMan:that.data.ResponsibleMan.name,
        ApplyManId:that.data.ResponsibleMan.userId,
        FlowId:"34",
        IsBack:null,
        IsEnable:1,
        IsSend:false,
        NodeId:"1",
        OldFileUrl:null,
        State:0,
      }
    ]

    // console.log(CreateTaskInfo);


    let body = {
      
      "DeptName":value.DeptName.toString(),
      "Customer":value.Customer,
      "EmergencyLevel":that.data.array2[that.data.index2],
      "MainPoints":value.MainPoints,
      "OtherEngineers":OtherEngineers,
      "OtherEngineersId":OtherEngineersId,
      "ResponsibleMan":that.data.ResponsibleMan.name,
      "ResponsibleManId":that.data.ResponsibleMan.userId,
      "ProjectOverview":value.ProjectOverview,
      "ProjectType":that.data.array1[that.data.index1],
      "Title":value.title,
      "TaskId":"",
      "TimeRequired":value.TimeRequired,
      "remark":value.remark,

    }
 
    this._postData("FlowInfoNew/CreateTaskInfo",(data) => {
        body.TaskId = data;
        this._postData("TechnicalSupport/Save",(data) => {
          
          dd.alert({
            content:"保存成功",
            success:() => {
             dd.navigateBack({
                  delta: 2
                })
            }
            });
        
        },body);
    },CreateTaskInfo);
  },

  showOrClose(){
    
  }
})



