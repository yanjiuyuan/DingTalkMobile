import pub from '/util/public';
Page({
  ...pub.func,
  ...pub.func.dowith,
  data: {
    ...pub.data,
    carName: '',
    carIndex: 0,
    carList: [],
    useTimeList: [],
    table:{},
  },
  submit(e) {
    var that = this
    var value = e.detail.value
    var param = {
        Title: value.title,
        Remark: value.remark
    }
    this.data.table['StartKilometres'] = value.StartKilometres
    this.data.table['EndKilometres'] = value.EndKilometres
    this.data.table['UseKilometres'] = parseInt(value.EndKilometres) - parseInt(value.StartKilometres)
    console.log(this.data.table)
    if(!this.data.table['CarId']) dd.alert({content:'未选择车辆'})
    that.requestData('POST', "CarTable/TableModify",
    function(result){
      that.aggreSubmit(param)
    },this.data.table)
  },
  //选车操作
  selectCar(value) {
      //value = JSON.parse(value)
      let car = this.data.carList[value.detail.value]
      this.setData({useTimeList:[]})
      console.log(car)
      this.data.table['CarId'] = car.Id
      this.data.table['Name'] = car.Name
      this.data.table['OccupyCarId'] = car.OccupyCarId
      this.data.table['IsOccupyCar'] = car.IsOccupyCar
      this.setData({carIndex:value.detail.value})

      if (!car.UseMan) return
      let useTimeList = []
      let nameList = car.UseMan.split(',')
      let timeList = car.UseTimes.split(',')
      for (var i = 0; i < nameList.length; i++) {
          useTimeList.push({
              name: nameList[i],
              time: timeList[i]
          })
      }
      this.setData({useTimeList:useTimeList})
      console.log(this.data.useTimeList)
      
  },
  onReady(){
    var that = this
    this.requestData('GET', "CarTable/TableQuary" + this.formatQueryStr({TaskId:this.data.taskid}),
      function(res) {
        let data = res.data[0]
        if(!data.FactTravelWay) data.FactTravelWay = data.PlantTravelWay
        that.setData({
          table: data
        })
        
        that.requestData('GET', "CarMananger/QuaryByTime" + that.formatQueryStr({startTime:data.StartTime,endTime:data.EndTime}),
        function(result){
          for(let d of result.data){
            if (d.Id == data.CarId) {
              that.setData({
                carName:d.Name,
                'table.Name':d.Name
              })
            }
          }
          
          if(!that.data.table.CarId){
            let car = result.data[0]
            console.log('that.data.table')
            console.log(that.data.table)
            console.log(result.data)
            that.data.table['CarId'] = car.Id
            that.data.table['Name'] = car.Name
            that.data.table['OccupyCarId'] = car.OccupyCarId
            that.data.table['IsOccupyCar'] = car.IsOccupyCar
          }
          
          that.setData({
              carList:result.data
            })
        })

      })
  },
});
