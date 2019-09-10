var app = getApp();
var x, y, x1, y1, x2, y2;
Page({
  data: {
    current: -1,
    //父级元素间的信息
    fatherTopDistance: 12.5,//上边的距离
    fatherLeftDistance: 0,//左边的距离
    fatherWidth: 343,//项的宽
    fatherHeight: 50,//项的高

    //子级元素间的信息
    sonTopDistance:0,//和上边的距离
    sonLeftDistance: 0,//和左边的距离
    sonWidth: 343,//项的宽
    sonHeight: 50,//项的高

    all_width: '',//总的宽度
    moveable: false,//是否开启移动功能
    showOrClose:[],
  },
  onLoad: function () {
    var that = this;
    let processedSort = [];//存储父级元素  
    for(let i = 0; i < app.globalData.sort.length; i++){
     this.data.showOrClose.push(
       {show:true,
       index:i,
       str:"-",
       class:"dropdown-content-show",
       });
    }

    console.log(app.globalData.sort);

    //过滤数据
    for(let i = 0 ,len = app.globalData.sort.length;i < len; i++){
      let father = app.globalData.sort[i];
      let son = [];
      for(let flow of app.globalData.sort[i].flows){
        if(flow.url){
            son.push(flow);
        }
      }
      if(app.globalData.sort[i].show){
          father.flows = son;
          processedSort.push(father);////////////可能还需要处理
          
      }
    } 
    console.log("sssssssssssss");
    console.log(processedSort);
    this.setData({
      all_list:processedSort
    })

    //计算父级节点的位置
    dd.getSystemInfo({
      success: function (res) {
        var width = that.data.all_width = res.windowWidth, _w = 0, row = 0, column = 0;
        var arr = [].concat(that.data.all_list);

        arr.forEach(function (n, i) {
          n.left = (that.data.fatherWidth + that.data.fatherLeftDistance) * row + that.data.fatherLeftDistance;
          n.top = (that.data.fatherHeight + that.data.fatherTopDistance) * column + that.data.fatherTopDistance;
          n._left = n.left;
          n._top = n.top;
          _w += that.data.fatherWidth + that.data.fatherLeftDistance;
          if (_w + that.data.fatherWidth + that.data.fatherLeftDistance > width) {
            _w = 0;
            row = 0;
            column++;
          } else {
            row++;
          }
        });

        that.setData({
          all_list: arr
        })
      }
    });
  },
  //onTouchStart
  moveStart: function (e) {
    console.log('start');
    console.log(e);
    console.log(e.target.dataset.index);
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;


    x1 = this.data.all_list[e.target.dataset.index].left;//和左的距离
    y1 = this.data.all_list[e.target.dataset.index].top;//和上的距离
    

    this.setData({
      current: e.target.dataset.index
    })
  },
  //onTouchMove
  move: function (e) {
    console.log("move");
    var that = this;
    x2 = e.changedTouches[0].clientX - x + x1;
    y2 = e.changedTouches[0].clientY - y + y1;
    var underIndex = this.getCurrnetUnderIndex();
    var arr = [].concat(this.data.all_list);
    if (underIndex != null && underIndex != this.data.current) {
      this.changeArrayData(arr, underIndex, this.data.current);
      this.setData({
        current: underIndex
      })
    }

    arr.forEach(function (n, i) {
      if (i == that.data.current) {
        n.left = x2;
        n.top = y2;
      } else {
        n.left = n._left;
        n.top = n._top;
      }
    });
    this.setData({
      all_list: arr
    })
  },
  
  //onTouchEnd
  moveEnd: function (e) {
    console.log("moveEnd");
    var underIndex = this.getCurrnetUnderIndex();
    var arr = [].concat(this.data.all_list);
    if (underIndex != null && underIndex != this.data.current) {
      this.changeArrayData(arr, underIndex, this.data.current);
    }
    arr.forEach(function (n, i) {//重置
      n.left = n._left;
      n.top = n._top;
    })
  
    this.setData({
      all_list: arr
    })
  },
  changeArrayData: function (arr, i1, i2) {
    var temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    //换位置
    var _left = arr[i1]._left, _top = arr[i1]._top;
    arr[i1]._left = arr[i2]._left;
    arr[i1]._top = arr[i2]._top;
    arr[i2]._left = _left;
    arr[i2]._top = _top;
    /////////////////////////////////////////////////////////////////////////////////换id
    let id = arr[i1].id;
    arr[i1].id = arr[i2].id;
    arr[i2].id = id;

  },
  getCurrnetUnderIndex: function (endx, endy) {//获取当前移动下方index
    var endx = x2 + this.data.fatherWidth / 2,
      endy = y2 + this.data.fatherHeight / 2;
    var v_judge = false, h_judge = false, column_num = (this.data.all_width - this.data.fatherLeftDistance) / (this.data.fatherLeftDistance + this.data.fatherWidth) >> 0;
    var _column = (endy - this.data.fatherTopDistance) / (this.data.fatherHeight + this.data.fatherTopDistance) >> 0;
    var min_top = this.data.fatherTopDistance + (_column) * (this.data.fatherHeight + this.data.fatherTopDistance),
      max_top = min_top + this.data.fatherHeight;
    if (endy > min_top && endy < max_top) {
      v_judge = true;
    }
    var _row = (endx - this.data.fatherLeftDistance) / (this.data.fatherWidth + this.data.fatherLeftDistance) >> 0;
    var min_left = this.data.fatherLeftDistance + (_row) * (this.data.fatherWidth + this.data.fatherLeftDistance),
      max_left = min_left + this.data.fatherWidth;
    if (endx > min_left && endx < max_left) {
      h_judge = true;
    }
    if (v_judge && h_judge) {
      var index = _column * column_num + _row;
      if (index > this.data.all_list.length - 1) {//超过了
        return null;
      } else {
        return index;
      }
    } else {
      return null;
    }
  },

  a(e){
    console.log("sss");
    console.log(e);
  }
})