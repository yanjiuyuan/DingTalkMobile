import lib from "/lib.js"
import template from "/util/template/index.js"

let logs = [];

export default {
  data:{
    ...template.data,
    hideMask: false,
    param: {},

    nodeList:[],
    isback: false
  },

  func:{
    ...lib,
    ...template.func,
    onLoad(param) {
      this.param = param
      this.getNodeList()
    },
    onReady() {
      this.checkLogin()
    },
    start: {
      onLoad(a) {
        
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
      var url = "FlowInfo/GetSign?FlowId=" + this.param.flowid
      if (this.param.taskid) url = url + "&TaskId=" + this.param.taskid

      this.requestData('GET', url, function(res) {
        
       
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

