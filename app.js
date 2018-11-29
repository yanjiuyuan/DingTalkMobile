
import lib from '/lib.js'
App({
  onLaunch(options) {
    return
    console.log('app onlaunch~~~~~~~~')
    console.log(options)
    console.log(JSON.stringify(options))
    //dd.alert({ content: JSON.stringify(options) });
    //免登
    var that = this
    dd.getAuthCode({
      success: (res) => {
        console.log(res.authCode)
        lib.requestData('GET','LoginMobile/Bintang',function(res){
          that.userInfo = res.data
        },{authCode:res.authCode})
      },
      fail: (err) => {
        dd.alert({ content: JSON.stringify(err) })
      }
    })
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  userInfo:{},
  globalData: {
    hasLogin: false,
    appId: 189694580
  },
});
