import pub from '/util/public';

Page({
  ...pub.func,

  data: {
    items: [
      {
        title: '双行列表',
        brief: '描述信息',
        arrow: true,
      },
      {
        title: '双行列表',
        brief: '描述信息',
        arrow: true,
      },
      {
        title: '双行列表',
        brief: '描述信息',
        arrow: true,
      },
    ],

  },

  onLoad(query) {
    var that = this
    that.requestData('GET', 'FlowInfo/GetFlowStateDetail' + that.formatQueryStr({ Index: query.index, ApplyManId: 'manager325' }), function(res) {
      console.log(res)
      that.setData({
        //'tableParam.total': JSON.parse(res.data).length
      })
      // that.data.data =  JSON.parse(res.data)
      // that.getData()
    })
  },

});
