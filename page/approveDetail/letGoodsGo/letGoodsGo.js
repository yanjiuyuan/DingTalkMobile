import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    table:{},
  },
  submit(e) {
    var value = e.detail.value
    var param = {
        Remark: value.remark
    }
    this.aggreSubmit(param)
  },
  print(){
    var that = this
    this._postData('MaterialRelease/PrintAndSend',
      function(res){
        dd.alert({content:'获取成功，请在钉钉工作通知中查收'})
      },
      {
        UserId: that.data.DingData.userid,
        TaskId: that.data.taskid
      }
    )
  },
  onReady(){
    var that = this
     this._getData("MaterialRelease/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
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
