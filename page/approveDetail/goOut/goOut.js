import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    placeArr: [],
    planLength: 0,
    imgUrlList:[],
    locationLength: 0,
    table:{},
  },
  submit(e) {
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark,
        ImageUrl: this.data.tableInfo['ImageUrl']
    }
    if(this.data.nodeid == 2 && this.data.tableInfo.ImageUrl.split(',').length < this.data.planLength){
      dd.alert({content:'定位照片数小于计划外出地点数'})
      return
    }
    this.setData({disablePage:true})
    this._postData("Evection/Modify",
      (res) => {
        this.aggreSubmit(param)
      },this.data.table
    )
  },
  reApproval(){
    this.data.localStorage = JSON.stringify({
        valid: true,
        flowid:this.data.flowid,
        title: this.data.tableInfo.Title,
        table: this.data.table
    })
    for (let m of this.data.menu) {
        if (m.flowId == this.data.flowid) {
          dd.redirectTo({
            url: '/page/start/' + m.url + '?flowid=' + m.flowId
          })
        }
    }
  },
  //添加定位
  addPlace(){
    var that = this
    //上传图片
    dd.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        for(let p of res.apFilePaths){
          that.setData({disablePage:true})
          dd.showLoading({
                content: '图片处理中...'
              });
          //dd.alert({content:'ues ' + JSON.stringify(res)})
          dd.uploadFile({
            url: that.data.dormainName + 'drawingupload/Upload?IsWaterMark=true',
            fileType: 'image',
            fileName: p.substring(7),
            IsWaterMark: true,
            filePath: p,
            success: (res) => {
              //dd.alert({content:'你返回的 ' + JSON.stringify(res)})
              
              if(that.data.tableInfo['ImageUrl']) that.data.tableInfo['ImageUrl'] += ','
              else that.data.tableInfo['ImageUrl'] = ''
              that.data.tableInfo['ImageUrl'] += JSON.parse(res.data).Content
              that._postData("FlowInfoNew/TaskModify",
                (res) => {
                  that.getFormData()
                  that.setData({disablePage:false})
                  dd.hideLoading()
                },that.data.tableInfo
              )
            },
            fail:(err) => {
              dd.alert({content:'sorry' + JSON.stringify(err)})
            }
          });
        }
      },
    });
    return
    dd.getLocation({
      success(res) {
        console.log(res)
        res = {address:'研究院'}
        that.data.placeArr.push(res.address)
        that.setData({
          'table.LocationPlace': that.data.placeArr.join('-')
        })
      },
      fail() {
        dd.alert({ title: '定位失败' });
      },
    })
  },
  //删除上一个定位
  removePlace(){
    if(this.data.placeArr.length == this.data.locationLength) return
    this.data.placeArr.pop()
    this.setData({
      'table.LocationPlace': this.data.placeArr.join('-')
    })
  },
  //保存定位
  savePlace(){
    this._postData("Evection/Modify",
      (res) => {
        dd.alert({title:'保存成功'})
      },this.data.table
    )
  },

  onReady(){
     this._getData("Evection/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        // this.data.placeArr = res.LocationPlace.split('-')
        // if(this.data.placeArr[0] == '') this.data.placeArr = []

        // //计划出行长度，提交表单判断用
        // this.data.planLength = res.Place.split('-').length
        // //初始定位长度，不能删除初始值
        // this.data.locationLength = this.data.placeArr.length
        console.error(res)
        this.setData({
          table: res
        })
      })
  },
});
