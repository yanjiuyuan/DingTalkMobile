import pub from "/util/public";
import promptConf from "/util/promptConf.js";
Page({
    ...pub.func,
    data: {
        ...pub.data,
        hidden: true
    },
    test2() {
        dd.chooseDingTalkDir({
            success: res => {
                console.log(res);
                console.log(JSON.stringify(res));

                dd.alert({
                    content: JSON.stringify(res)
                });
            },
            fail: err => {
                dd.alert({
                    content: JSON.stringify(err)
                });
            }
        });
    },
    test() {
        dd.uploadAttachmentToDingTalk({
            image: { multiple: true, compress: false, max: 9, spaceId: "1699083579" },
            space: { spaceId: "1699083579", isCopy: 1, max: 9 },
            file: { spaceId: "1699083579", max: 1 },
            types: ["photo", "camera", "file", "space"],
            success: res => {
                console.log(res);
                console.log(JSON.stringify(res));
                dd.alert({
                    content: JSON.stringify(res)
                });
            },
            fail: err => {
                dd.alert({
                    content: JSON.stringify(err)
                });
            }
        });
    },
    add() {
        console.log(this.data.hidden);
        this.setData({
            hidden: !this.data.hidden
        });
        this.createMaskShowAnim();
        this.createContentShowAnim();
    },
    a(e) {
        console.log(e.detail.value);
    },
    getLocation() {
        let that = this;

        dd.getLocation({
            success(res) {
                console.log(JSON.stringify(res));
                that.setData({
                    address: res.address
                });
            },
            fail() {
                dd.alert({ title: "定位失败" });
            }
        });
    }
});
