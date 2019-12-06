
import pub from '/util/public';
import promptConf from "/util/promptConf.js";
Page({

	...pub.func,
	data: {
		...pub.data,
	},
	test2() {
		dd.chooseDingTalkDir({
			success: (res) => {
				console.log(res);
				dd.alert({
					content: JSON.stringify(res)
				})
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	},
	test() {
		dd.uploadAttachmentToDingTalk({
			image: { multiple: true, compress: false, max: 9, spaceId: "1699083579" },
			space: { spaceId: "1699083579", isCopy: 1, max: 9 },
			file: { spaceId: "1699083579", max: 1 },
			types: ["photo", "camera", "file", "space"],
			success: (res) => {
				console.log(res);
				dd.alert({
					content: JSON.stringify(res)
				})
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	}
});
