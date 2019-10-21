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
require('../../util/table/table');
require('../../util/table/column/column');
require('../../node_modules/mini-ddui/es/list/index');
require('../../node_modules/mini-ddui/es/list/list-item/index');
require('../../components/my-picker/my-picker');
require('../../components/my-checkbox-group/my-checkbox-group');
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
require('../../page/start/processManagement/processManagement');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}