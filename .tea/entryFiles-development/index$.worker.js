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
require('../../util/table/table?hash=c3b912afc17b2886b09b8ac248356b9854ce403e');
require('../../util/table/column/column?hash=c3b912afc17b2886b09b8ac248356b9854ce403e');
require('../../node_modules/mini-ddui/es/list/index?hash=c3b912afc17b2886b09b8ac248356b9854ce403e');
require('../../node_modules/mini-ddui/es/list/list-item/index?hash=c3b912afc17b2886b09b8ac248356b9854ce403e');
require('../../page/start/index?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approve/approve?hash=9c9fef53b772afeb4e1ab171a0d4ed52ce0ee86a');
require('../../page/start/purchase/purchase?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/purchase/purchase?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/usePublicCar/usePublicCar?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/usePublicCar/usePublicCar?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/paper/paper?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/start/useCar/useCar?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/useCar/useCar?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/picking/picking?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/start/intoStorage/intoStorage?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/intoStorage/intoStorage?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../util/errorPage/errorPage?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/picking/picking?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/start/goOut/goOut?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/goOut/goOut?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/createProject/createProject?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/createProject/createProject?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/officeSupplies/officeSupplies?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/officeSupplies/officeSupplies?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/meterieCode/meterieCode?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/start/meterieCode/meterieCode?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/officePurchase/officePurchase?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/crossHelp/crossHelp?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/crossHelp/crossHelp?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/changePaper/changePaper?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/techonologySupply/techonologySupply?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/letGoodsGo/letGoodsGo?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/letGoodsGo/letGoodsGo?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/intellectualProperty/intellectualProperty?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/intellectualProperty/intellectualProperty?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/sendRead/sendRead?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/borrowThing/borrowThing?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/borrowThing/borrowThing?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/maintain/maintain?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/maintain/maintain?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/pickingManage/pickingManage?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/approveDetail/maintain/maintain?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/techonologySupply/techonologySupply?hash=ba285134db795e42fd9db8ba392be23df3cc4eae');
require('../../page/start/overTime/overTime?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/projectClosure/projectClosure?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/gift/gift?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/gift/gift?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/processOn/processOn?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/start/productionMonitoring/productionMonitoring?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/managementConsole/managementConsole?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/managementConsole/addShortcut/addShortcut?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/managementConsole/sort/sort?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/managementConsole/sortTest/sortTest?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/managementConsole/sortTest_1/sortTest_1?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
require('../../page/approveDetail/projectDetail/projectDetail?hash=679649f1e60318cc9f98cf43063c9cbcabb93f44');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}