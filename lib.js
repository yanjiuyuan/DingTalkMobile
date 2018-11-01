let dormainName = 'http://wuliao5222.55555.io:57513/'

function doWithErrcode(result){
  if(!result) return 1
  if(result.error && result.error.errorCode !=0){
    dd.alert({content:result.error.errorMessage})
    return 1
  }
  return 0
}
export default {
  dormainName: dormainName,

  checkLogin(){
   
  },

  goHome() {
    console.log('welCome ~')
    
  },
  goError(){
    
  },
  //http 请求
  requestData(type,url,succe,param={},comple){
    dd.showLoading()
    dd.httpRequest({
      url: dormainName + url,
      method: type,
      data: param,
      success: function(res) {
        console.log(url)
        console.log(res)
        if(doWithErrcode(res)) return
        succe(res)
      },
      fail: function(res) {
        dd.alert({ content: '获取数据失败-' + url });
      },
      complete: function(res) {
        dd.hideLoading();
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
      queryStr = queryStr + o + '=' + obj[o] + '&'
    }
    return queryStr.substring(0, queryStr.length - 1)
  },

  
}