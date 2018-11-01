import pub from '/util/public';


var menuConfig = [
  {
    flowId: 8,
    sortId: 4,
    url: 'purchase/purchase',
    position: '-414px -137px'
  }
]
var globalData = getApp().globalData
Page({
  ...pub.func,
  onShow(a) {
    this.getMenu()
  },
  data: {
    ...pub.data,
    tableOperate:'选择',
    tableTotal: 0,
    tableNow: 1,
    tableParam:[
      {
        prop:'name',
        label:'姓名',
        width:100
      },
      {
        prop: 'job',
        label: '职位',
        width: 200
      },
      {
        prop:'intret',
        label:'爱好',
        width:300
      },
      {
        prop:'word',
        label:'名人名言',
        width:300
      }
    ],
    tableData:[{
      name:'sam',
      job:'前端开发',
      intret:'flash小游戏',
      word:'哎呀！~真香~'
    },
   
    {
      name:'james',
      job: '.net工程师',
      intret: 'dota 塔防游戏',
      word: '牛肉不稳定，沙县不咋地'
      },
      {
        name: '渣渣辉',
        job: '仿真工程师',
        intret: '神武，王者荣耀',
        word: '石渣渣，狗日石，碎石子'
      },
      {
        name: '石渣渣',
        job: '.net工程师',
        intret: '吃鸡',
        word: '在座各位都是渣渣'
      },
      {
        name: '阿俊',
        job: '高级工程师',
        intret: '灌篮',
        word: '这个很简单'
      },
      {
        name: '熊哥',
        job: '老板，信息化',
        intret: '吃鸡',
        word: '我们不一样~'
      }],

    
    
    
    pageName: 'component/index',
    
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    sort: [{
      SORT_ID: 4,
      SORT_NAME: '采购管理',
      IsEnable: 1,
      State: 1
    }],
    menu: menuConfig,
    sort: []
  },
  getMenu(){
    var that = this
    this.requestData('GET', 'FlowInfo/LoadFlowSort?id=123', function(res) {
      that.sort = res
      that.requestData('GET', 'FlowInfo/LoadFlowInfo?id=123',function(res){
        var temp = that.mergeObjectArr(res.data,menuConfig,'flowId')
        that.setData({
          menu: temp
        })
        console.log(temp)
      })
    })
  }
  
});
