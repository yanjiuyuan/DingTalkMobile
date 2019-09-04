import pub from '/util/public';let good = {};
let app =getApp();
Page({
  ...pub.func,
  // ...pub.func.start,
  
  data: {
    ...pub.data,
    rotate:"RotateToTheRight",
    show:"hidden",
    rotate1:"RotateToTheRight",
    show1:"hidden",
    rotate2:"RotateToTheRight",
    show2:"hidden",
    a: true,
    tableOperate: '验收',
    good: {},
    hidden:true,
    updateData:[],//用于保存更新后的生产进度表
   tableItems: [
      {
        prop: 'CompanyName',  
        label: '单位',        
        width: 200
      },
      {
        prop: 'ProjectType',
        label: '大类型',
        width: 200
      },
      {
        prop: 'ProjectSmallType',
        label: '小类型',
        width: 200
      },
      {
        prop: 'Remark1',
        label: '备注',
        width: 300
      },      
      {
        prop: 'ProjectId',
        label: '项目编码',
        width: 200
      },
      {
        prop: 'ProjectName',
        label: '项目名称',
        width: 450
      },
      {
        prop: 'TaskId',
        label: '流水号',
        width: 100
      },
      {
        prop: 'Bom',
        label: 'BOM',
        width: 500
      },
      {
        prop: 'AccountKeeping',
        label: '走账',
        width: 300
      },
      {
        prop: 'Designer',
        label: '设计员',
        width: 100
      },         
      {
        prop: 'BomTime',
        label: '资料接收时间BOM',
        width: 350
      },
      {
        prop: 'TwoD',
        label: '资料接收时间2D',
        width: 350
      },
      {
        prop: 'ThreeD',
        label: '资料接收时间3D',
        width: 350
      },
      {
        prop: 'NeedTime',
        label: '需求时间',
        width: 350
      },
      {
        prop: 'NeedCount',
        label: '需求建议',
        width: 300
      },   
      {
        prop: 'ScheduledDate',
        label: '预计开工时间',
        width: 350
      },
            {
        prop: 'CompletionTime',
        label: '预计完成时间',
        width: 350
      },
      {
        prop: 'BeginTime',
        label: '开始时间',
        width: 350
      },
      {
        prop: 'HomemadeNumberZZ',
        label: '自制数(件)',
        width: 200
      },
            {
        prop: 'ProcessingTimeZZ',
        label: '加工时间(天)',
        width: 200
      },
            {
        prop: 'ProgressNumberZZ',
        label: '进度(件)',
        width: 200
      },
            {
        prop: 'ExternalNumberYX',
        label: '外协数(件)',
        width: 200
      },
            {
        prop: 'ProcessingTimeYX',
        label: '加工时间(天)',
        width: 200
      },
            {
        prop: 'SpeedOfProgress',
        label: '进度',
        width: 200
      },
            {
        prop: 'ActualCompletionTime',
        label: '实际加工完成时间',
        width: 350
      },
            {
        prop: 'Assemble',
        label: '组装(%)',
        width: 200
      },      
      {
        prop: 'Debugging',
        label: '调试(%)',
        width: 200
      },     
      {
        prop: 'ProgressStatement',
        label: '进度说明(%)',
        width: 300
      },
      {
        prop: 'Remark2',
        label: '备注',
        width: 300
      },               
      {
        prop: 'HeadOfDepartments',
        label: '部门负责人',
        width: 200
      },    
      {
        prop: 'NoteTaker',
        label: '记录人',
        width: 200
      },       
      {
        prop: 'Remark3',
        label: '备注',
        width: 300
      }, 
      {
        prop: 'Tabulator',
        label: '图纸审核员',
        width: 200
      },              
    ],
  
  },

      // 展示和隐藏
  showOrClose(){
    if(this.data.rotate == "RotateToTheRight"){
      this.setData({
        rotate:"Rotate-downward",
        show:"show"
      })
    }

    else if(this.data.rotate == "Rotate-downward"){
      this.setData({
        rotate:"RotateToTheRight",
        show:"hidden"
      })
    }
  },

  showOrCloseOne(){
    if(this.data.rotate1 == "RotateToTheRight"){
      this.setData({
        rotate1:"Rotate-downward",
        show1:"show"
      })
    }

    else if(this.data.rotate1 == "Rotate-downward"){
      this.setData({
        rotate1:"RotateToTheRight",
        show1:"hidden"
      })
    }
  },

  showOrCloseTwo(){
    if(this.data.rotate2 == "RotateToTheRight"){
      this.setData({
        rotate2:"Rotate-downward",
        show2:"show"
      })
    }

    else if(this.data.rotate2 == "Rotate-downward"){
      this.setData({
        rotate2:"RotateToTheRight",
        show2:"hidden"
      })
    }
  },

  onLoad(options){
    let that = this;
    this.checkLogin(() => {

      // let TaskId = 511;
      let TaskId = options.taskid;
      that.data.CompanyId = options.companyId;

      // dd.alert({
      //   content:options.companyId
      // })
        //判断taskid是否存在，存在的话则只出现一条，表单
        if(TaskId !== undefined){
          this.setData({
              hidden:false,
              TaskId:TaskId
          })
        }
        //否则出现多条，表格
        else{
          this.setData({
            hidden:true
          })
        }



    })

  },



  
  onShow(){

       setTimeout(() => {
          let that = this;


            //判断taskid是否为undefined，否的话说明存在，存在则只显示一条
            if(this.data.TaskId !== undefined){
              
              let obj = {
              applyManId: this.data.DingData.userid,
              pageIndex:1,
              pageSize:99,
              taskid:this.data.TaskId,
              companyId:this.data.CompanyId
              }

              this._getData("ProcessingProgress/Read" + this.formatQueryStr(obj),(res) => {
                console.log(res);
                  let power;
                for(let i of res[0].Power){
                  if( i == 2){
                      power = i;
                  }
                  
                }
              
               
                this.setData({
                    power: power || null,
                    tableInfo:res[0],
                    SpeedOfProgress:res[0].SpeedOfProgress
                })
               })
            }
            else{

            let obj = {
              applyManId:this.data.DingData.userid,
              pageIndex:1,
              pageSize:99,
              companyId:0,
              }
              this._getData("ProcessingProgress/Read" + this.formatQueryStr(obj),(res) => {
                console.log(res);
                if(res.length > 0){
                  that.setData({
                    data:res,
                    ["tableParam.total"]:res.length
                  })
                  this.getData();
                }
                else{
                  dd.navigateTo({
                    url: '../../../page/start/index'
                  })
                }
              })      
            }    

       },2000)
  

  },

  //填写是否已读
  updateItem(e){
    if(!e) return;
    console.log(e);
    this.data.good = e.target.targetDataset.row;
    if(!this.data.good) return;
    
    this.setData({
      Subject:this.data.good.Subject,
      idx:e.target.targetDataset.index,
      a: !this.data.a
    })
    this.createMaskShowAnim();
    this.createContentShowAnim();
  },

  
addRemark(e){
 
    let value = e.detail.value;
    let index = e.buttonTarget.dataset.index;


    let Power = false;
    for(let i of this.data.tableData[index].Power){
      if(i == 2){
        Power = true;
      }
    }

    if(this.data.tableData[index].SpeedOfProgress == "已完成" && Power){
      this.data.tableData[index].Remark3 = value.remark3;
      this.data.updateData.push(this.data.tableData[index]);
      this.setData({
      tableData: this.data.tableData,
      
      })
    }
    else{
      dd.alert({
        content:"项目未完成或您不是设计人员,无法验收"
      })
    }
    this.onModalCloseTap();//隐藏
},
  
  updateTable(){
    let that = this;
    let param = {
      CompanyId:0,//公司id
      applyMan:app.userInfo.name,
      applyManId:app.userInfo.userid,
      IsExcelUpload:false,
      processingProgresses:that.data.updateData
    }

    console.log(param);
    this._postData("ProcessingProgress/Modify", function(res) {
      dd.alert({
        content:"更新完成"
      })
    },param)
  },
  // 设计人员确认收货
  confirm(e){
    if(this.data.SpeedOfProgress)
    if(this.data.SpeedOfProgress == "已完成"){

      this.data.tableInfo.IsAlreadyRead = true;
      this.data.tableInfo.Remark3 = e.detail.value.Remark3;

      let param = {
        CompanyId:0,//公司id
        applyMan:app.userInfo.name,
        applyManId:app.userInfo.userid,
        IsExcelUpload:false,
        processingProgresses:[this.data.tableInfo]
      }
      this._postData("ProcessingProgress/Modify", function(res) {
        dd.alert({
          content:"确认收货成功"
        })
      },param)
    }

    else{
      dd.alert({
        content:"生产进度不是已完成,无法确认收货"
      })
    }
  }

})