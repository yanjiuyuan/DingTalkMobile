import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    useTimeList: [],
    imgUrlList:[],
    table:{},
  },
  uploadImg(e){
    var that = this
    this.data.imageList = []
    this.data.imgUrlList = []
    dd.chooseImage({
      count: 2,
      success: (res) => {
        that.setData({imageList:res.apFilePaths})
        console.log(that.data.imageList)
        for(let p of res.apFilePaths){
          that.setData({disablePage:true})
          dd.uploadFile({
            url: that.data.dormainName + 'drawingupload/Upload',
            fileType: 'image',
            fileName: '666.jpg',
            filePath: p,
            success: (res) => {
              that.data.imgUrlList.push(JSON.parse(res.data).Content)
              //dd.alert({content: '上传成功2' + JSON.parse(res.data).Content});
              that.setData({disablePage:false})
            },
            fail:(err) => {
              dd.alert({content:'sorry' + JSON.stringify(err)})
            }
          });
        }
      },
    });
  },
  submit(e) {
    var that = this
    that.data.table['ImageUrl'] = that.data.imgUrlList.join(',')
    //dd.alert({content: 'ImageUrl = ~~~~~~ ' + that.data.table['ImageUrl']})
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark,
        ImageUrl: that.data.table['ImageUrl']
    }
    this.data.table['StartKilometres'] = value.StartKilometres
    this.data.table['EndKilometres'] = value.EndKilometres
    this.data.table['UseKilometres'] = parseInt(value.EndKilometres) - parseInt(value.StartKilometres)
    console.log(this.data.table)
    that.requestData('POST', "CarTable/TableModify",
    function(result){
      that.aggreSubmit(param)
    },this.data.table)
  },
  onReady(){
    var that = this
    this.requestData('GET', "CarTable/TableQuary" + this.formatQueryStr({TaskId:this.data.taskid}),
      function(res) {
        let data = res.data[0]
        if(!data.FactTravelWay) data.FactTravelWay = data.PlantTravelWay
        that.setData({
          table: data
        })
      })
  },
});
