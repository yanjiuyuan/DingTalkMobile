const app = getApp();
var x, y, x1, y1, x2, y2;
Page({
  data: {
    str1:"+",
  state:false,
  first_click:false,
  showOrClose:[],
    all_list: [{ id: 1, text: '采购管理' }, { id: 2, text: '项目管理' }, { id: 3, text: '车辆管理' }, { id: 4, text: '行政管理' }, { id: 5, text: '生产管理' }],
    current: -1,
    s_v: 10,//上边的距离
    s_h: 0,//左边的距离
    u_w: 373,//项的宽
    u_h: 50,//项的高
    all_width: '',//总的宽度
    moveable: false,//是否开启移动功能
    offset:[],//用来存储offsetLeft和offsetTop
  },
  onLoad() {
    
    let that = this;
    let processedSort = [];//存储
    //生成每个项的隐藏参数
    for(let i = 0; i < app.globalData.sort.length; i++){
     this.data.showOrClose.push(
       {show:true,
       index:i,
       str:"-",
       class:"dropdown-content-show",
       });
    }
    //过滤数据,
    for(let i = 0 ,len = app.globalData.sort.length;i < len; i++){
        if(app.globalData.sort[i].show){
           processedSort.push(app.globalData.sort[i]);////////////可能还需要处理
        }
    } 
    
    console.log(app.globalData.sort);

    this.setData({
      menu:app.globalData.menu,
      sort:app.globalData.sort,
      all_list:processedSort
    })

    //给每个项分配位置
    dd.getSystemInfo({
        success: function (res) {
        var width = that.data.all_width = res.windowWidth, _w = 0, row = 0, column = 0;
        var arr = [].concat(that.data.all_list);
        arr.forEach(function (n, i) {//需要在这里为每个子项加位置
          n.left = (that.data.u_w + that.data.s_h) * row + that.data.s_h;
          n.top = (that.data.u_h + that.data.s_v) * column + that.data.s_v;
          n._left = n.left;
          n._top = n.top;

          that.data.offset.push({
            index:i,
            offsetLeft:n.left,
            offsetTop:n.top
          })

          _w += that.data.u_w + that.data.s_h;
          if (_w + that.data.u_w + that.data.s_h > width) {
            _w = 0;
            row = 0;
            column++;
          } else {
            row++;
          }
        });

        console.log(arr);
        that.setData({
            all_list: arr
        })
      }
    });
  },

  //打开显示隐藏
  toggle(e){
      console.log(e);
        let item = e.target.dataset.item;
        console.log(this.data.showOrClose[item-1].str);
      if(this.data.showOrClose[item-1].str == "+"){
        	let sortItem = this.data.showOrClose;
          sortItem[item-1] = {
            index : item - 1,
            str : "-",
            class : "dropdown-content-show",
          }
          this.setData({
            showOrClose:sortItem
            })
      }
  
      else if(this.data.showOrClose[item-1].str == "-"){
        	let sortItem = this.data.showOrClose;
          sortItem[item-1] = {
            index:item-1,
            str:"+",
            class:"dropdown-content",
          }
          this.setData({
            showOrClose:sortItem
            })
      }
  },



  //onTouchStart
  moveStart: function (e) {
    console.log('start');

    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
    // x1 = e.currentTarget.offsetLeft;//和某个地方的距离
    // y1 = e.currentTarget.offsetTop;//和某个地方的距离
    x1 = this.data.offset[e.target.dataset.index].offsetLeft;//和某个地方的距离
    y1 = this.data.offset[e.target.dataset.index].offsetTop;//和某个地方的距离
    console.log(e.target.dataset.index);
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
    
    console.log(underIndex, this.data.current);
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

    var _left = arr[i1]._left, _top = arr[i1]._top;
    arr[i1]._left = arr[i2]._left;
    arr[i1]._top = arr[i2]._top;
    arr[i2]._left = _left;
    arr[i2]._top = _top;

  },
  getCurrnetUnderIndex: function (endx, endy) {//获取当前移动下方index
    var endx = x2 + this.data.u_w / 2,
      endy = y2 + this.data.u_h / 2;
    var v_judge = false, h_judge = false, column_num = (this.data.all_width - this.data.s_h) / (this.data.s_h + this.data.u_w) >> 0;
    var _column = (endy - this.data.s_v) / (this.data.u_h + this.data.s_v) >> 0;
    var min_top = this.data.s_v + (_column) * (this.data.u_h + this.data.s_v),
      max_top = min_top + this.data.u_h;
    if (endy > min_top && endy < max_top) {
      v_judge = true;
    }
    var _row = (endx - this.data.s_h) / (this.data.u_w + this.data.s_h) >> 0;
    var min_left = this.data.s_h + (_row) * (this.data.u_w + this.data.s_h),
      max_left = min_left + this.data.u_w;
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

});