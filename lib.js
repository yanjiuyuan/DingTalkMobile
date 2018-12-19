let dormainName = 'http://17e245o364.imwork.net:49415/'

function doWithErrcode(result){
  if(!result) return 1
  if(result.error && result.error.errorCode !=0){
    dd.alert({content:result.error.errorMessage})
    return 1
  }
  return 0
}
var d = new Date()
var year = d.getFullYear()
var month = d.getMonth() + 1
var day = d.getDate()
export default {
  data:{
    dormainName:dormainName,
    currentPage: 1,
    totalRows: 0,
    pageSize: 5,
    Year:year,
    Month:month,
    Day:day,
    DateStr: _dateToString(d),
    menu:[
      {
        flowId: 8,
        sortId: 4,
        title:'零部件采购申请',
        url: 'purchase/purchase',
        position: '-414px -137px'
      },
      {
          flowId: 13,
          sortId: 6,
          title:'公车申请',
          url: 'usePublicCar/usePublicCar',
          position: '-775px -317px'
      },
      {
          flowId: 14,
          sortId: 6,
          title:'私车申请',
          url: 'useCar/useCar',
          position: '-504px -405px'
      }
    ]
  },
  func:{
    checkLogin(){
    
    },

    goHome() {
      console.log('welCome ~')
      
    },
    goError(){
      
    },
    //http 请求
    requestData(type,url,succe,param={},comple){
      //dd.showLoading()
      dd.httpRequest({
        url: dormainName + url,
        method: type,
        data: param,
        headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
        success: function(res) {
          console.log(url)
          console.log(param)
          console.log(res)
          if(doWithErrcode(res)) return
          succe(res)
        },
        fail: function(res) {
          dd.alert({ content: '获取数据失败-' + url+ '报错:'  +  JSON.stringify(res) });
        },
        complete: function(res) {
          //dd.hideLoading();
        }
      });
    },
    requestJsonData(type,url,succe,param={},comple){
      //dd.showLoading()
      dd.httpRequest({
        url: dormainName + url,
        method: type,
        data: param,
        headers:{'Content-Type':'application/json; charset=utf-8'},
        success: function(res) {
          console.log(url)
          console.log(param)
          console.log(res)
          if(doWithErrcode(res)) return
          succe(res)
        },
        fail: function(res) {
          dd.alert({ content: '获取数据失败-' + url + '报错:'  +  JSON.stringify(res)});
        },
        complete: function(res) {
          //dd.hideLoading();
        }
      });
    },
    //
    mergeObjectArr(arr1, arr2, prop) {
      for (var a = 0; a < arr1.length; a++) {
        for (var b = 0; b < arr2.length; b++) {
          if (arr1[a][prop] == arr2[b][prop]) {
            for (var p in arr2[b]) {
              arr1[a][p] = arr2[b][p]
            }
          }
        }
      }
      return arr1
    },

    formatQueryStr(obj) {
      var queryStr = '?'
      for (var o in obj) {
        queryStr = queryStr + o + '=' + encodeURI(obj[o]) + '&'
      }
      return queryStr.substring(0, queryStr.length - 1)
    },
    _formatQueryStr(obj) {
      var queryStr = '?'
      for (var o in obj) {
        queryStr = queryStr + o + '=' + obj[o] + '&'
      }
      return queryStr.substring(0, queryStr.length - 1)
    },
    _getTime() {
        var split = "-"
        var d = new Date()
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        var day = d.getDate()
        var hour = d.getHours()
        var minute = d.getMinutes()
        var second = d.getSeconds()
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        if (hour < 10) hour = '0' + hour
        if (minute < 10) minute = '0' + minute
        if (second < 10) second = '0' + second
        return year + split + month + split + day + ' ' + hour + ':' + minute + ':' + second
    }
  }, 
}

function _dateToString(date, split) {
    if(!split) split = "-"
    var d = new Date(date)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return year + split + month + split + day
}