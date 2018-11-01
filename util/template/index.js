
var globalData = getApp().globalData

export default {
  data: {
    animMaskData: [],
    animContentData: [],
    chooseParam: {
      title: "审批选人",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了人数范围", //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
      pickedUsers: [],            //已选用户 
      pickedDepartments: [],          //已选部门
      appId: globalData.appId,              //微应用的Id
      responseUserOnly: false,        //返回人，或者返回人和部门
      startWithDepartmentId: 0,   // 0表示从企业最上层开始},
    },
    tableData: []
  },
  func: {
    choosePeople(){
      console.log('start choose people')
      var that = this
      dd.complexChoose({
        ...that.chooseParam,
        success: function(res) {
          console.log(res)
          /**
          {
              selectedCount:1,                              //选择人数
              users:[{"name":"","avatar":"","userId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
              departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
          }
          */
        },
        fail: function(err) {

        }
      })
    },
    createMaskShowAnim() {
      const animation = dd.createAnimation({
        duration: 200,
        timingFunction: 'cubic-bezier(.55, 0, .55, .2)',
      });
      this.maskAnim = animation;
      animation.opacity(1).step();
      this.setData({
        animMaskData: animation.export(),
      });
    },
    createMaskHideAnim() {
      this.maskAnim.opacity(0).step();
      this.setData({
        animMaskData: this.maskAnim.export(),
      });
    },
    createContentShowAnim() {
      const animation = dd.createAnimation({
        duration: 200,
        timingFunction: 'cubic-bezier(.55, 0, .55, .2)',
      });  
      this.contentAnim = animation;  
      animation.translateY(0).step();
      this.setData({
        animContentData: animation.export(),
      });
    },
    createContentHideAnim() {
      this.contentAnim.translateY('100%').step();
      this.setData({
        animContentData: this.contentAnim.export(),
      });
    },
  },
};
