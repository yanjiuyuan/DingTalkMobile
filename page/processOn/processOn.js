
import pub from '/util/public';
Page({
   ...pub.func,
  data: {text:"",},

  onLoad(options) {
    this.setData({
      flowid:options.flowid
    })
  },
  onReady(){

    let that = this;
    let obj = {
      flowid:this.data.flowid,
    }
    this._getData("FlowInfoNew/ReadFlows" + this.formatQueryStr(obj),(res) =>{
      console.log(res);
      for(let node of res){
        if(node.ChoseNodeId){
          node.ChoseNodeId = node.ChoseNodeId.split(","); 

          for(let i of node.ChoseNodeId){
            that.data.text = that.data.text +"\t" + "选择" + res[i].NodeName;
            console.log(node.NodeId + "选择" + i);
          }
        }
      }
      let reg1 = new RegExp("发起","g");
      let reg2 = new RegExp("审核","g");

      that.data.text = that.data.text.replace(reg1,"").replace(reg2,"");
      this.draw(res);
      that.setData({
        tableInfo:res,
        text:this.data.text
      })
    },)
  },
  

    //绘画
    draw(data) {
    console.log(data);
    let ctx = dd.createCanvasContext('canvas');
    console.log(ctx);
    // this.drawCurveArrow(ctx, 187.5,10,187.5,300,187.5/2,195,30,30,3);
    // this.drawArrow(ctx, 187.5,10,187.5,300,30,30,3);
    // this.drawRectangle(ctx,10,10,50,30,2);

      //画文字
      this.fillText(ctx,data[0].NodeName,187.5,20);
      this.fillText(ctx,data[1].NodeName,187.5,80);
      this.fillText(ctx,data[2].NodeName,187.5,140);
      this.fillText(ctx,data[3].NodeName,187.5,200);
      this.fillText(ctx,data[4].NodeName,187.5,260);
      this.fillText(ctx,data[5].NodeName,187.5,320);

      // 圆角矩形
      this.drawRectangle(ctx,187.5-50,1,15*5+25,15*2,2);
      this.drawRectangle(ctx,187.5-70,80-30,15*7+25,15*2,2);


      ctx.draw();
    },


  /**画箭头曲线
   * @param ctx:Canvas绘图环境
     @param fromX, 起点x坐标 
     @param fromY,起点y坐标
     @param toX, 终点x坐标 
     @param toY,终点y坐标 
     @param X,曲线控制点
     @param Y,曲线控制点
     @param theta,三角斜边一直线夹角
     @param headlen,三角斜边长度
     @param width,箭头线宽度
     @param color,箭头颜色
   */
 drawCurveArrow(ctx, fromX, fromY, toX, toY,X,Y,theta,headlen,width,color) {

  var theta = theta || 30,
      headlen = headlen || 10,
      width = width || 1,
      color = color || '#000',

      // angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
      angle = Math.atan2(Y - toY, X - toX) * 180 / Math.PI,//计算箭头一边的夹角

      angle1 = (angle + theta) * Math.PI / 180,
      angle2 = (angle - theta) * Math.PI / 180,

      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
      
      console.log("起始点" + fromX + "," + fromY);
      console.log("终点" + toX + "," + toY);
      console.log("箭头点1的变量" + topX + "," + topY);
      console.log("箭头点2的变量" + botY + "," + botY);

      
    
      ctx.save();
      ctx.beginPath();
      let arrowX, arrowY;

      ctx.moveTo(fromX, fromY);//起点
      ctx.quadraticCurveTo(toX/2,toY/2,toX,toY); //正牌曲线

      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);// 箭头其中一个起点
      ctx.lineTo(toX, toY);

      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);// 箭头其中一个起点

      ctx.setStrokeStyle(color);//设置线的颜色
      ctx.setLineWidth(width);//设置线宽
      ctx.stroke();
      ctx.restore();
      // ctx.draw();
},

/**画箭头直线
 *@param ctx:Canvas绘图环境
  @param fromX, 起点x坐标 
  @param fromY,起点y坐标
  @param toX, 终点x坐标 
  @param toY,终点y坐标 
  @param theta,三角斜边一直线夹角
  @param headlen,三角斜边长度
  @param width,箭头线宽度
  @param color,箭头颜色
*/
drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color){
  var theta = theta || 30,
      headlen = headlen || 10,
      width = width || 1,
      color = color || '#000',

      angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
      angle1 = (angle + theta) * Math.PI / 180,
      angle2 = (angle - theta) * Math.PI / 180,

      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
      
      ctx.save();
      ctx.beginPath();
      let arrowX, arrowY;

      ctx.moveTo(fromX, fromY);//起点
      ctx.lineTo(toX, toY);//终点

      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);// 箭头其中一个起点
      ctx.lineTo(toX, toY);

      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);// 箭头其中一个起点

      ctx.setStrokeStyle(color);//设置线的颜色
      ctx.setLineWidth(width);//设置线宽
      ctx.stroke();
      ctx.restore();
      // ctx.draw();
},


/**
 * 
 * 画圆角矩形
 *
 * @param {CanvasContext} ctx canvas上下文
 * @param {number} x 圆角矩形选区的左上角 x坐标
 * @param {number} y 圆角矩形选区的左上角 y坐标
 * @param {number} w 圆角矩形选区的宽度
 * @param {number} h 圆角矩形选区的高度
 * @param {number} r 圆角的半径
 */
  drawRectangle(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath();
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle('transparent');
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    
    // border-top
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    
    // border-right
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    
    // border-bottom
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    
    // border-left
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    
    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
      ctx.stroke();
      ctx.restore();
  },


  /**
   * 生成文本
   * @param {CanvasContext} ctx canvas上下文
   * @param {string} str 需要生成的文本
   * @param {number} x 文本左上角 x坐标
   * @param {number} y 文本左上角 y坐标
   * @param {number} size 字体的大小 不填默认20
   */
  fillText(ctx,str,x,y,size){
  ctx.setFontSize(size || 20);
  ctx.setTextAlign("center");
  ctx.fillText(str, x, y);
  }

});




