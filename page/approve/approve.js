Page({
   data: {
  
  },
  onLoad() {},
  LoadUrl(data)
  {
      var urls=data.target.dataset.alphaBeta
      var index=data.target.dataset.alphaBetaIndex
      dd.navigateTo({url:urls+'?index='+index})
      console.log(urls+'?index='+index)
  },
    bindViewTap:function(event){
      event.target.dataset.alphaBeta === 1 
  }
});
