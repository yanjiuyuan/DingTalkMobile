
import pub from '/util/public';
import promptConf from "/util/promptConf.js";
const app = getApp();
Page({
	...pub.func,
	data: {
		...pub.data,
		tableOperate: '编辑',
		IsEnableArray: [{ name: '是', label: true }, { name: '否', label: false }],
		SecondArray: [{ name: '是', label: true }, { name: '否', label: false }],
		tableItems: [
			{
				prop: 'RoleName',
				label: '角色名称',
				width: 300
			},
			{
				prop: 'CreateTime',
				label: '创建时间',
				width: 300
			},
			{
				prop: 'IsEnable',
				label: '是否启用',
				width: 300
			},
		],
	},
	onReady() {
		let that = this;
		this._getData('Role/GetRole' + that.formatQueryStr({ applyManId: app.userInfo.userid }), function(res) {
			that.setData({
				tableData: res,
				"tableParam.total": res.length
			})
		})
	},
	choosePeoples(e) {
		let that = this;
		console.log('start choose people');
		dd.complexChoose({
			...that.data.chooseParam,
			title: "权限成员",
			multiple: true,
			success: function(res) {
				console.log(res);
				let names = [];
				let ids = [];
				let thirdNeedArray = [];
				if (res.departments.length == 0) {
					for (let d of res.users) {
						names.push(d.name);
						ids.push(d.userId);
						thirdNeedArray.push({
							name: d.name,
							value: d.name,
							id: d.userId
						})
					}
					that.setData({
						permissionMember: names.join(','),
						PeopleId: ids.join(","),
						thirdNeedArray: thirdNeedArray
					})

				}
				else {
					let deptId = [];
					for (let i of res.departments) {
						deptId.push(i.id);
					}
					that.postDataReturnData("DingTalkServers/GetDeptAndChildUserListByDeptId", (res) => {
						console.log(res.data);
						that.data.pickedUsers = [];
						that.data.pickedDepartments = [];
						let userlist = [];
						for (let i in res.data) {
							let data = JSON.parse(res.data[i]);
							that.data.pickedDepartments.push(i);
							userlist.push(...data.userlist);
							for (let d of data.userlist) {
								that.data.pickedUsers.push(d.userid);
								names.push(d.name);
								ids.push(d.userid);
								thirdNeedArray.push({
									name: d.name,
									value: d.name,
									id: d.userid
								})
								d.userId = d.userid;
							}
						}
						names = [...new Set(names)];//数组去重
						ids = [...new Set(ids)];//数组去重
						that.setData({
							permissionMember: names.join(','),
							PeopleId: ids.join(","),
							thirdNeedArray: thirdNeedArray
						})
					}, deptId)

				}
			},
			fail: function(err) {

			}
		})
	},
	chooseItem(e) {
		// console.log(e);
		console.log(e.target.targetDataset.row);
		let that = this;
		let index = e.target.targetDataset.index;
		let row = e.target.targetDataset.row;

		for (let i of this.data.SecondArray) {
			if (row.IsEnable == i.label) {
				i.checked = true;
			}
			else {
				i.checked = false;
			}
		}
		let str = "";
		let arr = [];
		for (let i of row.roles) {
			if (i.IsEnable == true) {
				arr.push({ name: i.UserName, value: i.UserName, id: i.UserId, checked: true });
			}
			else {
				arr.push({ name: i.UserName, value: i.UserName, id: i.UserId, checked: false });
			}
			str += i.UserName + ",";
		}

		that.setData({
			row: row,
			tableInfo: row,
			permissionMember: str,
			thirdNeedArray: arr,
			SecondArray: this.data.SecondArray
		})
		this.setData({
			hidden: !this.data.hidden
		})
		this.createMaskShowAnim();
		this.createContentShowAnim();
	},
	cancel(e) {
		this.setData({
			hidden: !this.data.hidden
		})
	},
	onChangeThird(e) {
		let value = e.detail.value;
		for (let i of this.data.thirdNeedArray) {

			for (let j of value) {
				if (i.name == j) {
					i.checked = true;
					break;
				}
				else {
					i.checked = false;
				}
			}
			if (value.length == 0) {
				i.checked = false;

			}
		}
		console.log(this.data.thirdNeedArray);

	},
	confirm(e) {
		console.log(e);
		let value = e.detail.value;
		console.log(value);
		console.log(this.data.row);
		this.data.row.IsEnable = value.IsEnable;
		this.data.row.RoleName = value.RoleName;
		for (let i of this.data.row.roles) {
			for (let j of value.roles) {
				if (i.UserId == j) {
					i.IsEnable = true;
				}
				else {
					i.IsEnable = false;
				}

			}
			if (value.roles.length == 0) {
				i.IsEnable = false;

			}
		}
		console.log(this.data.row);
		let obj = {
			applyManId: app.userInfo.userid,
			roles: this.data.row
		}
	}
})
