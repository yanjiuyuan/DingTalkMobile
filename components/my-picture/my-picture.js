Component({
  mixins: [],
  data: {},
  props: {
    sourceType:{
      type:Array,//图片输入路径
    }
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {

    uploadPictures() {
      let that = this
      dd.chooseImage({
        count: 2,
        success: (res) => {
          for (let p of res.apFilePaths) {
            that.setData({ disablePage: true })
            dd.showLoading({
              content: promptConf.promptConf.PictureProcessing
            });
            dd.uploadFile({
              url: that.data.dormainName + 'drawingupload/Upload',
              fileType: 'image',
              fileName: p.substring(7),
              IsWaterMark: true,
              filePath: p,
              success: (res) => {
                console.log(res)
                if (that.data.tableInfo['ImageUrl']) that.data.tableInfo['ImageUrl'] += ','
                else that.data.tableInfo['ImageUrl'] = ''
                that.data.tableInfo['ImageUrl'] += JSON.parse(res.data).Content
                that._postData("FlowInfoNew/TaskModify",
                  (res) => {
                    that.getFormData()
                    that.setData({ disablePage: false })
                    dd.hideLoading()
                  }, that.data.tableInfo
                )
              },
              fail: (err) => {
                dd.alert({ content: 'sorry' + JSON.stringify(err) })
              }
            });
          }
        },
      });
    }
  },
});
 