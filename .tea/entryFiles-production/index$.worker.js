
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../util/table/table');
require('../../util/table/column/column');
require('../../page/start/index');
require('../../page/start/purchase/purchase');
require('../../page/waitMe/index');
require('../../page/iDone/index');
require('../../page/myStart/index');
require('../../page/copyMe/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
