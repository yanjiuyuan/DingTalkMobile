import pub from "/util/public";
import lib from "/lib.js";
import promptConf from "/util/promptConf.js";
let app = getApp();
Page({
    ...pub.func,
    ...pub.func.start,
    data: {
        ...pub.data
    },
    submit(e) {
        let value = e.detail.value;
        console.log(value);
    }
});
