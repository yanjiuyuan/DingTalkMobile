import pub from '/util/public';
Page({
	...pub.func,
	...pub.func.dowith,
	data: {
		...pub.data,
		addPeopleNodes: [], //额外添加审批人节点数组
		table: {},
		show: true,
	},
	submit(e) {
		var that = this
		var value = e.detail.value
		var param = {
			Remark: value.remark
		}
		if ((!value.TeamMembers || !value.StartTime || !value.EndTime || !value.TechnicalProposal || !value.ProjectName) && (this.data.nodeid == 1)) {
			dd.alert({ content: '表单未填写完整' })
			return;
		}
		if (this.data.nodeid == 1) {
			this.data.table['TeamMembers'] = value.TeamMembers
			this.data.table['StartTime'] = value.StartTime
			this.data.table['EndTime'] = value.EndTime
			this.data.table['TechnicalProposal'] = value.TechnicalProposal
			this.data.table['ProjectName'] = value.ProjectName
		}
		if (this.data.nodeid == 4) {
			let reg = /^\d{4}\w{3}\d{3}$|^\d{4}\w{2}\d{3}$/;
			if (!reg.test(value.ProjectNo)) {
				dd.alert({
					content: "请规范填写测试项目编号。",
					buttonText: "确认"
				})
				return;
			}
			if (!value.ProjectNo) {
				dd.alert({ content: '表单未填写完整' })
				return
			}
			this.data.table['ProjectNo'] = value.ProjectNo
			this.data.table['IsCreateProject'] = true
			var param2 = {
				"CreateTime": this._getTime(),
				"IsEnable": true,
				"ProjectState": '在研',
				"IsFinish": false,
				"ApplyMan": this.data.nodeInfo.NodePeople,
				"ApplyManId": this.data.nodeInfo.PeopleId,
				"StartTime": this.data.table.StartTime,
				"EndTime": this.data.table.EndTime,
				"TeamMembers": this.data.table.TeamMembers,
				"TeamMembersId": this.data.table.TeamMembersId,
				"ProjectName": this.data.table.ProjectName,
				"ProjectId": value.ProjectNo,
				"CompanyName": this.data.table.CompanyName,
				"CooperativeUnit": this.data.table.Customer,
				"DeptName": this.data.table.DeptName,
				"ProjectType": this.data.table.ProjectType,
				"ProjectSmallType": '测试',
				"ResponsibleMan": this.data.table.ResponsibleMan,
				"ResponsibleManId": this.data.table.ResponsibleManId,
				"ProjectFileUrl": ''
			}

			this._postData("ProjectNew/AddProject", (res) => {
				that.aggreSubmit(param);
			}, [param2])
			this._postData("TechnicalSupport/Modify", (res) => {
			}, this.data.table
			)
			return;
		}
	},
	print() {
		let that = this;
		this._postData('TechnicalSupport/PrintAndSend',
			function(res) {
				dd.alert({
					content: '获取成功，请在钉钉工作通知中查收。',
					buttonText: '确认'
				})
			},
			{
				UserId: that.data.DingData.userid,
				TaskId: that.data.taskid
			}
		)
	},
	//选人控件方法

	choosePeoples(e) {
		console.log('start choose people');
		this.data.addPeopleNodes = [5];
		let nodeId = e.target.targetDataset.NodeId;
		let that = this;
		console.log(that.data.pickedUsers);
		console.log(that.data.pickedDepartments);
		dd.complexChoose({
			...that.data.chooseParam,
			pickedUsers: that.data.pickedUsers || [],            //已选用户
			pickedDepartments: that.data.pickedDepartments || [], //已选部门

			multiple: true,
			title: "项目组成员",
			success: function(res) {
				console.log(res);
				let names = []//userId
				let ids = [];
				let addPeoples = [];
				if (res.departments.length == 0) {
					for (let d of res.users) {
						names.push(d.name)
						ids.push(d.userId)
						addPeoples.push({
							name: d.name,
							userId: d.userId
						})
					}
					that.setData({
						'nodeList[5].AddPeople': addPeoples,
						'table.TeamMembers': names.join(','),
						'table.TeamMembersId': ids.join(','),
					})

				}
				else {
					let deptId = [];
					for (let i of res.departments) {
						deptId.push(i.id);
					}
					that.getDataReturnData("DingTalkServers/GetDeptUserListByDeptId?deptIdList=" + deptId.join(","), (res) => {
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
								addPeoples.push({
									name: d.name,
									userId: d.userId
								})
								d.userId = d.userid;
							}
						}
						names = [...new Set(names)];//数组去重
						ids = [...new Set(ids)];//数组去重

						that.setData({
							'nodeList[5].AddPeople': addPeoples,
							'table.TeamMembers': names.join(','),
							'table.TeamMembersId': ids.join(','),

						})
					})

				}

			},
			fail: function(err) {

			}
		})
	},

	onReady() {

		var that = this

		this._getData("TechnicalSupport/Read" + this.formatQueryStr({ TaskId: this.data.taskid }),
			(res) => {
				for (let r in res) {
					if (res[r] === null) res[r] = ''
				}
				this.setData({
					table: res
				})
			}
		)
	},

	selectStartDate() {
		let that = this;
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: this.data.DateStr,
			startDate: this.data.DateStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day,
			success: (res) => {
				if (that.data.endDateStr) {
					let iDay = that.DateDiff(res.date, that.data.endDateStr);//計算天數
					if (iDay > 0) {
						dd.alert({
							content: "结束时间要大于开始时间。"
						})
						return;
					}
				}

				this.setData({
					startDateStr: res.date,
					'table.StartTime': res.date
				})
			},
		});

	},

	selectEndDate() {
		let that = this;
		let iDay = 0;
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: this.data.DateStr,
			startDate: this.data.DateStr,
			endDate: this.data.Year + 1 + '-' + this.data.Month + '-' + this.data.Day,
			success: (res) => {
				if (that.data.startDateStr) {
					iDay = that.DateDiff(res.date, that.data.startDateStr);//計算天數
					if (iDay < 0) {
						dd.alert({
							content: "结束时间要大于开始时间。"
						})
						return;
					}
				}

				this.setData({
					endDateStr: res.date,
					'table.EndTime': res.date
				})
			},
		});
	},

	getNodeList_done(nodeList) {
		console.log(nodeList);
		for (let node of nodeList) {
			if (node.NodeName == "抄送" && node.NodePeople.indexOf(this.data.DingData.nickName) !== -1) {
				this.setData({
					show: false
				})

			}
		}
	},

	//测试上传文件
	test2() {
		dd.uploadAttachmentToDingTalk({
			image: { multiple: true, compress: false, max: 9, spaceId: "12345" },
			space: { spaceId: "12345", isCopy: 1, max: 9 },
			file: { spaceId: "12345", max: 1 },
			types: ["photo", "camera", "file", "space"],//PC端仅支持["photo","file","space"]
			success: (res) => {
				/*
				{
				   type:'', // 用户选择了哪种文件类型 ，image（图片）、file（手机文件）、space（钉盘文件）
				   data: [
					  {
						spaceId: "232323",
						fileId: "DzzzzzzNqZY",
						fileName: "审批流程.docx",
						fileSize: 1024,
						fileType: "docx"
					 },
					 {
						spaceId: "232323",
						fileId: "DzzzzzzNqZY",
						fileName: "审批流程1.pdf",
						fileSize: 1024,
						fileType: "pdf"
					 },
					 {
						spaceId: "232323",
						fileId: "DzzzzzzNqZY",
						fileName: "审批流程3.pptx",
						fileSize: 1024,
						fileType: "pptx"
					  }
				   ]
		  
				}
				 */
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	},
	test() {
		dd.saveFileToDingTalk({
			url: "https://ringnerippca.files.wordpress.com/20.pdf",  // 文件在第三方服务器地址
			name: "文件名",
			success: (res) => {
				/* data结构
				 {"data":
					[
					{
					"spaceId": "" //空间id
					"fileId": "", //文件id
					"fileName": "", //文件名
					"fileSize": 111111, //文件大小
					"fileType": "", //文件类型
					}
					]
				 }
				 */
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	},
	test3() {
		dd.previewFileInDingTalk({
			corpId: "dingf8b3508f3073b265",
			spaceId: "13557022",
			fileId: "11452819",
			fileName: "钉盘快速入门.pdf",
			fileSize: 1024,
			fileType: "pdf",
		})
	},
	test4() {
		dd.chooseDingTalkDir({
			success: (res) => {
				/* data结构
				 {"data":
					[
						{
							"spaceId": "" //被选中的空间id
							"path": "", // 被选中的文件夹路径
							"dirId": "", //被选中的文件夹id
						}
					]
				 }
			   */
			},
			fail: (err) => {
				dd.alert({
					content: JSON.stringify(err)
				})
			}
		})
	}
});
