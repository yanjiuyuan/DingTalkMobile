import lib from "/lib.js"
import template from "/util/template/template.js"

let logs = [];

export default {
  data:{
    ...lib.data,
    ...template.data,
    hideMask: false,
    param: {},
    flowid:0,
    taskid:0,
    nodeList:[],
    isback: false
  },

  func:{
    ...lib.func,
    ...template.func,
    onReady() {
      this.checkLogin()
    },
    start: {
      onLoad(a) {
        console.log('on load~~~~~~~~~~')
        console.log(a)
        this.data.flowid == a.flowid
        this.data.flowid == '8'
        getNodeList()
      },

      onUnload() {
      },

      onHide() {
      },
    },
    dowith: {
      onLoad(a) {

      },

      onUnload() {
      },

      onHide() {
      },
    },
    getNodeList() {
      var that = this
      this.requestData('GET', "FlowInfo/GetSign" + this.formatQueryStr({TaskId:this.data.taskid}), function(res) {

      })
    },
    checkLogin(){
      var that = this
      //检查登录
      this.createMaskShowAnim()
      var app = getApp()
      var interval = setInterval(function() {
        app = getApp()
        if (app.userInfo && app.userInfo.data) {
          that.createMaskHideAnim()
          that.setData({ hideMask: true })
          clearInterval(interval)
          return
        }
      }, 200)
    }
  },
  

  
};

