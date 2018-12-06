
import lib from '/lib.js'
App({
  onLaunch(options) {
    console.log('app onlaunch~~~~~~~~')
    console.log(options)
    //免登
    var that = this
    dd.getAuthCode({
      success: (res) => {
        console.log(res.authCode)
        lib.func.requestData('GET','LoginMobile/Bintang',function(res){
          console.log(res.data.data)
          that.userInfo = res.data.data
        },{authCode:res.authCode})
      },
      fail: (err) => {
        console.log('免登失败')
        dd.alert({ content: "免登失败" });
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
