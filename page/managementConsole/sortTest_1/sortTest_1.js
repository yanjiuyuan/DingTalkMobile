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
    this.setData({
      all_list:processedSort,
    })

    //计算父级节点的位置
    dd.getSystemInfo({
      success: function (res) {
        var width = that.data.all_width = res.windowWidth, _w = 0, row = 0, column = 0;
        var arr = [].concat(that.data.all_list);

        //项和下标
        // row是列，colum是列
        let sonHeight = 0;
        arr.forEach(function (n, i) {

          n.left = (that.data.fatherWidth + that.data.fatherLeftDistance) * row + that.data.fatherLeftDistance;
          n.top = (that.data.fatherHeight + that.data.fatherTopDistance) * column + that.data.fatherTopDistance + sonHeight;
          n._left = n.left;
          n._top = n.top;

          // 定义孩子的行和列和宽度
          let son_w = 0, sonRow = 0, sonColumn = 1;
      
          for(let index = 0,len = n.flows.length; index < len; index++){
           
            n.flows[index].left = 0;
            // n.flows[index].top = n.top + (that.data.fatherHeight + that.data.sonTopDistance) * sonColumn + that.data.sonTopDistance;
            n.flows[index].top =  (that.data.fatherHeight + that.data.sonTopDistance) * sonColumn + that.data.sonTopDistance;
            n.flows[index]._left = n.flows[index].left;
            n.flows[index]._top = n.flows[index].top;

             son_w = that.data.sonWidth + that.data.sonLeftDistance;

             if(index == len - 1){
              sonHeight += sonColumn * that.data.sonHeight;
             }
            if(son_w + that.data.sonWidth + that.data.sonLeftDistance > width){
                son_w = 0;
                sonRow = 0;
                sonColumn++;
            }
            else{
              sonRow++;
            }
          }
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
    console.log("moveStart");

    for(let i = 0,len = this.data.showOrClose.length; i<len;i++){
      
      this.data.showOrClose[i] = {
        show:true,
        index:i,
        str:"+",
        class:"dropdown-content",
      };
    }
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
    x1 = this.data.all_list[e.target.dataset.index].left;//和左的距离
    y1 = this.data.all_list[e.target.dataset.index].top;//和上的距离
    
    console.log("ssssssssss");    
    console.log(this.data.showOrClose);
    // console.log("current:" + e.target.dataset.index);

    this.setData({
      current: e.target.dataset.index,
      showOrClose: this.data.showOrClose
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
    // console.log("underIndex:" + underIndex);
    var arr = [].concat(this.data.all_list);
    if (underIndex != null && underIndex != this.data.current) {
      this.changeArrayData(arr, underIndex, this.data.current);
    }
    arr.forEach(function (n, i) {//重置
      n.left = n._left;
      n.top = n._top;
    })
  
    console.log(this.data.showOrClose);
    this.setData({
      all_list: arr
    })
  },

  //更换位置：数组，下标一，下标二
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
    /////////////////////////////////////////////////////////////////////////////////换showOrClose
    


  },

  //获取当前移动下方index
  getCurrnetUnderIndex: function (endx, endy) {
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

  //打开显示隐藏
  toggle(e){
      let item = e.target.dataset.item;
      //这是展开px需要增加
      if(this.data.showOrClose[item].str == "+"){
        	let sortItem = this.data.showOrClose;
          sortItem[item] = {
            index : item,
            str : "-",
            class : "dropdown-content-show",
          }
          this.calculatedAltitudeIncrease(this.data.all_list,item);
          this.setData({
            showOrClose:sortItem
            })
      }

      //隐藏位置需要减少
      else if(this.data.showOrClose[item].str == "-"){
        	let sortItem = this.data.showOrClose;
          sortItem[item] = {
            index:item,
            str:"+",
            class:"dropdown-content",
          }
          this.calculatedAltitudeReduce(this.data.all_list,item);
          this.setData({
            showOrClose:sortItem
            })
      }
  },

  // 重新计算高度减小
  calculatedAltitudeReduce(array,index){
      console.log(array);
      let prevHeight = array[index].flows.length * this.data.sonHeight;
      for(let i = index + 1,len = array.length; i<len; i++){
          array[i].top = array[i].top - prevHeight;
          array[i]._top = array[i]._top - prevHeight;
      }
      this.setData({
        all_list:array
      })
  },
  //重新计算高度增加
  calculatedAltitudeIncrease(array,index){
      let prevHeight = array[index].flows.length * this.data.sonHeight;
      for(let i = index + 1,len = array.length; i<len; i++){
          array[i].top = array[i].top + prevHeight;
          array[i]._top = array[i]._top + prevHeight;
      }
    this.setData({
        all_list:array
    })
  },
  sonStart(){
    console.log("sonStart");
  },
  sonMove(){
    console.log("sonMove");
  },
  sonMoveEnd(){
    console.log("sonMoveEnd");
  }
})