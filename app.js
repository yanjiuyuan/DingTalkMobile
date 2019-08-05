
import lib from '/lib.js'
App({
  onLaunch(options) {
    return
    //免登
    var that = this
    dd.showLoading({
      content: '登录中...'
    });
    dd.getAuthCode({
      success: (res) => {
        console.log(res.authCode)
        lib.func.requestData('GET','LoginMobile/Bintang',function(res){
          console.log(res.data.data)
          that.userInfo = res.data.data
          dd.hideLoading()
        },{authCode:res.authCode})
      },
      fail: (err) => {
        console.log('免登失败');
        dd.alert({ content: "免登失败" });
        dd.alert({ content: JSON.stringify(err) });
      }
    })
  },
  onShow() {
  },
  onHide() {
  },
  userInfo:null,
  globalData: {
    hasLogin: false,
    appId: 189694580,
    table:{},
    valid: false,//表示全局table变量是否可用
  },
});
