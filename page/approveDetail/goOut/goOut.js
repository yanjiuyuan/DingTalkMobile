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
    rotate:"RotateToTheRight",
    show:"hidden",
    fileLists:[],// 相关文件数组
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
              if(JSON.parse(res.data).Content == 'null' || !JSON.parse(res.data).Content){
                dd.alert({ title: '图片处理发生异常，请联系管理员' });
                return
              }
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
    let that = this;
    console.log(this.data.tableInfo);
     this._getData("Evection/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        // this.data.placeArr = res.LocationPlace.split('-')
        // if(this.data.placeArr[0] == '') this.data.placeArr = []

        // //计划出行长度，提交表单判断用
        // this.data.planLength = res.Place.split('-').length
        // //初始定位长度，不能删除初始值
        // this.data.locationLength = this.data.placeArr.length
        this.setData({
          table: res
        })
      })

      let param = {
          ApplyManId:this.data.DingData.userid,
          nodeId:this.data.nodeid,
          TaskId:this.data.taskid
        }
        this._getData("FlowInfoNew/GetApproveInfo" + this.formatQueryStr(param),
        function(res) {
          if( typeof res.MediaId === 'string'){
            let MediaId = res.MediaId.split(",");
            let OldFileUrl = res.OldFileUrl.split(",");
            for(let i = 0,len = OldFileUrl.length;i<len;i++ ){
              that.data.fileLists.push({
                OldFileUrl:OldFileUrl[i],
                MediaId:MediaId[i],
              })
            }
          }

          that.setData({
            fileLists:that.data.fileLists,
            tableInfo: res
          })
          that.handleUrlData(res)
        },this.data.DingData)
  },
  //删除照片
  deleteImg(){
    
    this.data.imgUrlList = this.data.tableInfo.ImageUrl.split(',')
    this.setData({
      imageList:this.data.imageList.splice(0,this.data.imageList.length-1)
    })
    //
    this.data.tableInfo['ImageUrl'] = this.data.imgUrlList.slice(0,this.data.imgUrlList.length-1).join(',')
    this._postData("FlowInfoNew/TaskModify",
        (res) => {
        },this.data.tableInfo
      )
  },

  //删除图片
  deletePhoto(e){
    my.confirm({
      title: '温馨提示',
      content: '是否需要删除？',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      success: (result) => {
          if(result.confirm == true){

              let index = e.currentTarget.dataset.index;
              this.data.imageList.splice(index,1);
              this.setData({
                imageList:this.data.imageList
              })
              this.data.imgUrlList = this.data.tableInfo.ImageUrl.split(',');
              this.data.imgUrlList.splice(index,1);
              this.data.tableInfo['ImageUrl'] = this.data.imgUrlList.join(',');
              this._postData("FlowInfoNew/TaskModify",
                (res) => {
                },this.data.tableInfo
              )
              
          }
      },
    });
            

    
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


});
