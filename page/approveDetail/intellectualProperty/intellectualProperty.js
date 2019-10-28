import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    addPeopleNodes: [], //额外添加审批人节点数组
  
    table:{},
  },
  submit(e) {
    let that = this
    let value = e.detail.value
    let param = {
        Remark: value.remark
    }
    if((!value.ActualInventor || !value.ActualName) && (this.data.nodeid ==5)){
      console.log(value)
      dd.alert({
		  content:'表单未填写完整',
		  buttonText:promptConf.promptConf.Confirm,
	  })
      return
    }
    if(this.data.nodeid == 5){
      this.data.table['ActualName'] = value.ActualName
      this.data.table['Company'] = this.data.CompanyNames[this.data.companyIndex]
      this.data.table['ActualType'] = this.data.IntellectualPropertyTypes[this.data.stateIndexs]
    }
    this.setData({disablePage:true})
    this._postData("IntellectualProperty/Modify",
      (res) => {
        that.aggreSubmit(param)
      },this.data.table
    )
  },
  print(){
    let that = this
    this._postData('IntellectualProperty/Print',
      function(res){
        dd.alert({
			content:promptConf.promptConf.PrintFrom,
			buttonText: promptConf.promptConf.Confirm,
			})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },
  //下拉框选择处理
  changeIptIndex(e){
      this.setData({
      stateIndexs: e.detail.value,
    })
  },
  changeCompany(e){
      this.setData({
      companyIndex: e.detail.value,
    })
  },
  //选人控件方法
  choosePeoples(e){
    this.data.addPeopleNodes = [5]
    let that = this
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
        that.setData({//[${i}]
          'table.ActualInventor':names.join(','),
          'table.ActualInventorId':ids.join(',')
        })
      },
      fail: function(err) {

      }
    })
  },
  onReady(){
    let that = this

     this._getData("IntellectualProperty/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        for(let r in res){
            if(res[r] === null) res[r] = ''
          }
          let index =0;
          for(let i = 0, len = this.data.IntellectualPropertyTypes.length; i < len;i++){
            if(res.Type == this.data.IntellectualPropertyTypes[i]){
              index = i;
            }
          }
        this.setData({
          stateIndex:index,
          table: res
        })
      }
    )
  },
});
