import pub from '/util/public';let good = {}
Page({
  ...pub.func,
  ...pub.func.start,
  data: {
    ...pub.data,

      tableItems: [
      {
        prop: 'fName',
        label: '物料名称',
        width: 200
      },
      {
        prop: 'fNumber',
        label: '物料编码',
        width: 300
      },
      {
        prop: 'unitName',
        label: '单位',
        width: 100
      },
      {
        prop: 'fPrice',
        label: '单价',
        width: 100
      },
      {
        prop: 'fQty',
        label: '数量',
        width: 100
      },
      {
        prop: 'fModel',
        label: '规格型号',
        width: 300
      },
      {
        prop: 'fFullName',
        label: '供应商',
        width: 300
      },
      {
        prop: 'ProjectName',
        label: '项目名称',
        width: 300
      },
      {
        prop: 'TaskId',
        label: '流水号',
        width: 300
      },
      {
        prop: 'Remark',
        label: '备注',
        width: 300
      }
    ],

    purchaseList: [],
    tableParams: {
      size: 100,
      now: 1,
      total: 0
    },

  },

    //选择时间
  selectStartDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
      startDate: '2014-11-1',
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
      success: (res) => {
        this.setData({
          'table.StartTime': res.date
        })
      },
    });
  },
  selectEndDateTime(){
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: this.data.DateStr + ' ' + this.data.TimeStr,
      startDate: '2014-11-1',
      endDate: this.data.Year+1 + '-' + this.data.Month + '-' + this.data.Day + ' ' + this.data.TimeStr,
      success: (res) => {
        this.setData({
          'table.EndTime': res.date
        })
      },
    });
  },

  //表单相关
  search(e){
    let that = this;
    let value = e.detail.value;
    console.log(value);
    if(value.keyWord == "" || value.StartTime == "" || value.EndTime == ""){
        dd.alert({content: '表单填写不完整'});
      
    }
   else if(e.buttonTarget.dataset.isSend == undefined) {
      this._getData("Pick/Query" + that.formatQueryStr({ applyManId:this.data.DingData.userid,startTime:value.StartTime,endTime:value.EndTime,Key:value.keyWord}),(res)=>{
      console.log(res);
      if(res.length == 0){
        dd.showToast({content: '暂无数据'});
      }
      that.setData({
        purchaseList:res
      })
    });
    }
    else if(e.buttonTarget.dataset.isSend == true){
      this._getData("Pick/Query" + that.formatQueryStr({ applyManId:this.data.DingData.userid,startTime:value.StartTime,endTime:value.EndTime,Key:value.keyWord,isSend:true
        }),(res)=>{
        dd.alert({content: '已推送至钉钉'});
    });
    }

  },



});
