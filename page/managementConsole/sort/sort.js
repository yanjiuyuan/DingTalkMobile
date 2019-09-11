const app = getApp();
Page({
  data: {
  str1:"+",
  state:false,
  first_click:false,
  showOrClose:[],
  },
  onLoad() {
    
    //生成每个项的隐藏参数
    for(let i = 0; i < app.globalData.sort.length; i++){
     this.data.showOrClose.push(
       {show:true,
       index:i,
       str:"-",
       class:"dropdown-content-show",
       });
    }
    console.log(app.globalData);
    console.log(this.data.showOrClose);

    this.setData({
      menu:app.globalData.menu,
      sort:app.globalData.sort
    })
  },
  onShow() {},

  //打开显示隐藏
  toggle(e){
        console.log(e);
        let item = e.target.dataset.item;
        console.log(item);
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

    //   let list_state = this.data.state,
    //   first_state = this.data.first_click;
    //    if (!first_state){
    //      this.setData({
    //       first_click: true
    //      });
    //    }
    //    if (list_state){
    //      this.setData({
    //       state: false
    //      });
    //    }else{
    //      this.setData({
    //       state: true
    //      });
    //    }


    }
});
