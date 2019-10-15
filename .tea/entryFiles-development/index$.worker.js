if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
<<<<<<< HEAD
require('../../util/table/table');
require('../../util/table/column/column');
require('../../node_modules/mini-ddui/es/list/index');
require('../../node_modules/mini-ddui/es/list/list-item/index');
require('../../page/start/index');
require('../../page/approve/approve');
require('../../page/start/purchase/purchase');
require('../../page/approveDetail/purchase/purchase');
require('../../page/approveDetail/usePublicCar/usePublicCar');
require('../../page/start/usePublicCar/usePublicCar');
require('../../page/approveDetail/paper/paper');
require('../../page/start/useCar/useCar');
require('../../page/approveDetail/useCar/useCar');
require('../../page/start/picking/picking');
require('../../page/start/intoStorage/intoStorage');
require('../../page/approveDetail/intoStorage/intoStorage');
require('../../util/errorPage/errorPage');
require('../../page/approveDetail/picking/picking');
require('../../page/start/goOut/goOut');
require('../../page/approveDetail/goOut/goOut');
require('../../page/start/createProject/createProject');
require('../../page/approveDetail/createProject/createProject');
require('../../page/start/officeSupplies/officeSupplies');
require('../../page/approveDetail/officeSupplies/officeSupplies');
require('../../page/approveDetail/meterieCode/meterieCode');
require('../../page/start/meterieCode/meterieCode');
require('../../page/approveDetail/officePurchase/officePurchase');
require('../../page/approveDetail/crossHelp/crossHelp');
require('../../page/start/crossHelp/crossHelp');
require('../../page/approveDetail/changePaper/changePaper');
require('../../page/approveDetail/techonologySupply/techonologySupply');
require('../../page/start/letGoodsGo/letGoodsGo');
require('../../page/approveDetail/letGoodsGo/letGoodsGo');
require('../../page/start/intellectualProperty/intellectualProperty');
require('../../page/approveDetail/intellectualProperty/intellectualProperty');
require('../../page/approveDetail/sendRead/sendRead');
require('../../page/start/borrowThing/borrowThing');
require('../../page/approveDetail/borrowThing/borrowThing');
require('../../page/start/maintain/maintain');
require('../../page/approveDetail/maintain/maintain');
require('../../page/start/pickingManage/pickingManage');
require('../../page/approveDetail/maintain/maintain');
require('../../page/start/techonologySupply/techonologySupply');
require('../../page/start/overTime/overTime');
require('../../page/approveDetail/projectClosure/projectClosure');
require('../../page/approveDetail/gift/gift');
require('../../page/start/gift/gift');
require('../../page/processOn/processOn');
require('../../page/start/productionMonitoring/productionMonitoring');
require('../../page/managementConsole/managementConsole');
require('../../page/managementConsole/addShortcut/addShortcut');
require('../../page/managementConsole/sort/sort');
require('../../page/managementConsole/sortTest/sortTest');
require('../../page/managementConsole/sortTest_1/sortTest_1');
require('../../page/approveDetail/projectDetail/projectDetail');
=======
require('../../util/table/table?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../util/table/column/column?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ddui/es/list/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ddui/es/list/list-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../page/start/index?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approve/approve?hash=253a9edbf9b44d07ab67b2e03c6673c5f9d58b63');
require('../../page/start/purchase/purchase?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/purchase/purchase?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/usePublicCar/usePublicCar?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/usePublicCar/usePublicCar?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/paper/paper?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/start/useCar/useCar?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/useCar/useCar?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/picking/picking?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/start/intoStorage/intoStorage?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/intoStorage/intoStorage?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../util/errorPage/errorPage?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/picking/picking?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/start/goOut/goOut?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/goOut/goOut?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/createProject/createProject?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/createProject/createProject?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/officeSupplies/officeSupplies?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/officeSupplies/officeSupplies?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/meterieCode/meterieCode?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/start/meterieCode/meterieCode?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/officePurchase/officePurchase?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/crossHelp/crossHelp?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/crossHelp/crossHelp?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/changePaper/changePaper?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/techonologySupply/techonologySupply?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/letGoodsGo/letGoodsGo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/letGoodsGo/letGoodsGo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/intellectualProperty/intellectualProperty?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/intellectualProperty/intellectualProperty?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/sendRead/sendRead?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/borrowThing/borrowThing?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/borrowThing/borrowThing?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/maintain/maintain?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/maintain/maintain?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/pickingManage/pickingManage?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/approveDetail/maintain/maintain?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/techonologySupply/techonologySupply?hash=0586a24eef8e7e701db2de7bdb9c468150d04c51');
require('../../page/start/overTime/overTime?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/projectClosure/projectClosure?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/gift/gift?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/gift/gift?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/processOn/processOn?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/productionMonitoring/productionMonitoring?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/managementConsole/managementConsole?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/managementConsole/addShortcut/addShortcut?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/managementConsole/sort/sort?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/managementConsole/sortTest/sortTest?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/managementConsole/sortTest_1/sortTest_1?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/approveDetail/projectDetail/projectDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../page/start/processManagement/processManagement?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
>>>>>>> fb7b87f62a5b127822d16c627b51e8f13349ec01
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}