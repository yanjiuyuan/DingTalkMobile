Page({
  data: {},
  onLoad() {},
});
import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    hidden: true,
 
    imageList:[],
    fileList:[],
    pdfList:[],
    //data:[]
  },
  submit(e) {
    var value = e.detail.value
    var param = {
        Remark: value.remark
    }
    this.data.table['Suggestion'] = value['Suggestion']
    this.data.table['Leadership'] = value['Leadership']
    this._postData('Receiving/Modify', (res) => {
      this.aggreSubmit(param)
    }, this.data.table)
  },

 onReady(){
     this._getData("Receiving/Read" + this.formatQueryStr({TaskId:this.data.taskid}),
      (res) => {
        
        for(let r in res[0]){
            if(res[0][r] === null) res[0][r] = ''
          }
        console.log('2333333333333')
        console.log(res[0])
        this.setData({
          table: res[0]
        })
      }
    )
  },

});
