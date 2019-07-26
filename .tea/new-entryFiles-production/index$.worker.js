if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app.js?appxworker=1');
require('../../util/table/table.js?appxworker=1');
require('../../util/table/column/column.js?appxworker=1');
require('../../node_modules/mini-ddui/es/list/index.js?appxworker=1');
require('../../node_modules/mini-ddui/es/list/list-item/index.js?appxworker=1');
require('../../node_modules/mini-ddui/es/modal/index.js?appxworker=1');
require('../../page/start/index.js?appxworker=1');
require('../../page/approve/approve.js?appxworker=1');
require('../../page/start/purchase/purchase.js?appxworker=1');
require('../../page/approveDetail/purchase/purchase.js?appxworker=1');
require('../../page/approveDetail/usePublicCar/usePublicCar.js?appxworker=1');
require('../../page/start/usePublicCar/usePublicCar.js?appxworker=1');
require('../../page/approveDetail/paper/paper.js?appxworker=1');
require('../../page/start/useCar/useCar.js?appxworker=1');
require('../../page/approveDetail/useCar/useCar.js?appxworker=1');
require('../../page/start/picking/picking.js?appxworker=1');
require('../../page/start/intoStorage/intoStorage.js?appxworker=1');
require('../../page/approveDetail/intoStorage/intoStorage.js?appxworker=1');
require('../../util/errorPage/errorPage.js?appxworker=1');
require('../../page/approveDetail/picking/picking.js?appxworker=1');
require('../../page/start/goOut/goOut.js?appxworker=1');
require('../../page/approveDetail/goOut/goOut.js?appxworker=1');
require('../../page/start/createProject/createProject.js?appxworker=1');
require('../../page/approveDetail/createProject/createProject.js?appxworker=1');
require('../../page/start/officeSupplies/officeSupplies.js?appxworker=1');
require('../../page/approveDetail/officeSupplies/officeSupplies.js?appxworker=1');
require('../../page/approveDetail/meterieCode/meterieCode.js?appxworker=1');
require('../../page/start/meterieCode/meterieCode.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success: success }) : success();
}