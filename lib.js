// let dormainName = 'http://47.96.172.122:8093/'  //线上研究院
let dormainName = 'http://17e245o364.imwork.net:49415/' //线下测试


// let dormainName = 'http://1858o1s713.51mypc.cn:48971/' //测试人员测试新/
// let dormainName ="http://192.168.1.65:8888/"//swagger 
// let dormainName = 'http://caixingtong.qicp.vip:48392/'; //测试人员测试
// let dormainName = 'http://caixingtong.qicp.vip:28032/'; //测试人员测试() 
   

function doWithErrcode(result) {  
	if (!result) {    
		return 1    
	} 
	if (result.error && result.error.errorCode != 0) { 
		dd.alert({ 
			content: result.error.errorMessage, 
			buttonText:"确认"
			 })
		return 1
	}
	return; 
} 
let d = new Date()
let year = d.getFullYear()
let month = d.getMonth() + 1
let day = d.getDate()
let hour = d.getHours()
 
let minutes = d.getMinutes() 
export default {
	data: {
		// jinDomarn:'http://1858o1s713.51mypc.cn:16579/api/', 
		jinDomarn: 'http://wuliao5222.55555.io:35705/api/',
		dormainName: dormainName,
		currentPage: 1,
		totalRows: 0,
		pageSize: 5,
		Year: year,
		Month: month,
		Day: day,
		DateStr: _dateToString(d),
		TimeStr: hour + ':' + minutes
	},
	func: {
		checkLogin() {

		},
		goHome() {

		},
		goError() {

		},
		//http 请求
		_getData(url, succe, userInfo = {}) {
			dd.httpRequest({
				url: dormainName + url,
				method: 'GET',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
				success: function(res) {
					let app = getApp()
					//检查登录
					if (app.userInfo) {
						userInfo = app.userInfo
					}

					if (doWithErrcode(res.data)) {
						postErrorMsg('GET', url, res.data.error, userInfo)
						return
					}
					succe(res.data.data)
				},
				fail: function(res) {
					if (JSON.stringify(res) == '{}') return
					postErrorMsg('GET', url, res, userInfo)
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				}
			});
		},

		getDataReturnData(url, succe, userInfo = {}) {
			dd.httpRequest({
				url: dormainName + url,
				method: 'GET',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
				success: function(res) {
					let app = getApp()
					//检查登录
					if (app.userInfo) {
						userInfo = app.userInfo
					}

					if (doWithErrcode(res.data)) {
						postErrorMsg('GET', url, res.data.error, userInfo)
						return
					}
					succe(res)
				},
				fail: function(res) {
					if (JSON.stringify(res) == '{}') return
					postErrorMsg('GET', url, res, userInfo)
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				}
			});
		},

		postDataReturnData(url, succe, param, userInfo = {}) {
			dd.httpRequest({
				url: dormainName + url,
				method: 'POST',
				data: JSON.stringify(param),
				headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
				success: function(res) {
					let app = getApp()
					//检查登录
					if (app.userInfo) {
						userInfo = app.userInfo
					}

					if (doWithErrcode(res.data)) {
						postErrorMsg('POST', url, res.data.error, userInfo)
						return
					}
					succe(res)
				},
				fail: function(res) {
					console.log('在错误里面~~~~~~~~~~~')
					if (JSON.stringify(res) == '{}') return
					postErrorMsg('GET', url, res, userInfo)
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				}
			});
		},
		_postData(url, succe, param, userInfo = {}) {
			dd.httpRequest({
				url: dormainName + url,
				method: 'POST',
				data: JSON.stringify(param),
				headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
				success: function(res) {
					let app = getApp()
					//检查登录
					if (app.userInfo) {
						userInfo = app.userInfo
					}
					console.log(url)
					console.log(param)
					console.log(res)

					if (doWithErrcode(res.data)) {
						postErrorMsg('POST', url, res.data.error, userInfo)
						return
					}
					succe(res.data.data)
				},
				fail: function(res) {
					console.log('在错误里面~~~~~~~~~~~')
					if (JSON.stringify(res) == '{}') return
					postErrorMsg('GET', url, res, userInfo)
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				}
			});
		},
		requestData(type, url, succe, param = {}, userInfo) {
			//dd.showLoading()
			dd.httpRequest({
				url: dormainName + url,
				method: type,
				data: param,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
				success: function(res) {
					console.log(url)
					if (type == 'POST' || type == 'post') console.log(param)
					console.log(res)
					succe(res)
				},
				fail: function(res) {
					if (JSON.stringify(res) == '{}') return
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				},
				complete: function(res) {
				}
			});
		},
		requestJsonData(type, url, succe, param = {}, userInfo) {
			dd.httpRequest({
				url: dormainName + url,
				method: type,
				data: param,
				headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
				success: function(res) {
					console.log(url)
					if (type == 'POST' || type == 'post') console.log(param)
					console.log(res)
					succe(res)
				},
				fail: function(res) {
					dd.alert({ content: '获取数据失败-' + url + '报错:' + JSON.stringify(res) });
				},
				complete: function(res) {
					//dd.hideLoading();
				}
			});
		},
		requestNofailData(type, url, succe, param = {}, userInfo) {
			dd.httpRequest({
				url: dormainName + url,
				method: type,
				data: param,
				headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
				success: function(res) {
					console.log(url)
					if (type == 'POST' || type == 'post') console.log(param)
					console.log(res)
					if (res.data.error.errorCode != 0) { postErrorMsg(type, url, param, { Message: res.data.Message, error: res.error }, userInfo) }
					succe(res)
				},
				complete: function(res) {
					if (res && res.error) {
						dd.alert({ content: '系统正在维护，请联系管理员~~~~~~~~~~~~~' })
						console.log('complete处理错误~~~~~~~~~~~~~~~~~~~~~~')
						console.log(userInfo)
						console.log(res.data)
						postErrorMsg(type, url, param, { Message: res.data.Message, error: res.error }, userInfo)
					}
					return
					let message = res.data.Message
				}
			});
		},
		//通过prop合并两个数组
		mergeObjectArr(arr1, arr2, prop) {
			for (let a = 0; a < arr1.length; a++) {
				for (let b = 0; b < arr2.length; b++) {
					if (arr1[a][prop] == arr2[b][prop]) {
						for (let p in arr2[b]) {
							arr1[a][p] = arr2[b][p]
						}
					}
				}
			}
			return arr1
		},

		formatQueryStr(obj) {
			let queryStr = '?'
			for (let o in obj) {
				queryStr = queryStr + o + '=' + encodeURI(obj[o]) + '&'
			}
			return queryStr.substring(0, queryStr.length - 1)
		},
		_formatQueryStr(obj) {
			let queryStr = '?'
			for (let o in obj) {
				queryStr = queryStr + o + '=' + obj[o] + '&'
			}
			return queryStr.substring(0, queryStr.length - 1)
		},
		_getTime() {
			return _getTime()
		},
		_computeDurTime(startTime, endTime, type) {
			let durDate = endTime.getTime() - startTime.getTime();
			let days = Math.floor(durDate / (24 * 3600 * 1000));
			let hours = Math.floor(durDate / (3600 * 1000));
			let minutes = Math.floor(durDate / (60 * 1000));
			let seconds = Math.floor(durDate / (1000));
			switch (type) {
				case 'd': return days; break;
				case 'h': return hours; break;
				case 'm': return minutes; break;
				default: return seconds;
			}
		}
	},
}

function postErrorMsg(type, url, error, userInfo = {}, param = {}) {
	return
	let postParam = {
		"ApplyMan": userInfo.nickName ? userInfo.nickName : '',
		"ApplyManId": userInfo.userid ? userInfo.userid : '',
		"ApplyTime": _getTime(),
		"Url": url,
		"Para": JSON.stringify(param),
		"GetOrPost": type,
		"ErrorCode": error.errorCode ? error.errorCode : '',
		"ErrorMsg": error.errorMessage ? error.errorMessage : JSON.stringify(error)
	}
	let postUrl = dormainName + 'ErrorLog/Save'
	dd.alert({ content: postUrl })
	dd.alert({ content: JSON.stringify(postParam) })
	dd.httpRequest({
		url: dormainName + 'ErrorLog/Save',
		method: 'POST',
		data: JSON.stringify(postParam),
		headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json', },
		success: function(res) {
			console.log('提交错误信息~~~~~~~~~~~~~~~~~~~~~~');
			console.log(postUrl)
			console.log(postParam)
			console.log(res)
		},
	});
}

function _getTime() {
	let split = "-"
	let d = new Date()
	let year = d.getFullYear()
	let month = d.getMonth() + 1
	let day = d.getDate()
	let hour = d.getHours()
	let minute = d.getMinutes()
	let second = d.getSeconds()
	if (month < 10) month = '0' + month
	if (day < 10) day = '0' + day
	if (hour < 10) hour = '0' + hour
	if (minute < 10) minute = '0' + minute
	if (second < 10) second = '0' + second
	return year + split + month + split + day + ' ' + hour + ':' + minute + ':' + second
}

function _dateToString(date, split) {
	if (!split) split = "-"
	let d = new Date(date)
	let year = d.getFullYear()
	let month = d.getMonth() + 1
	let day = d.getDate()
	if (month < 10) month = '0' + month
	if (day < 10) day = '0' + day
	return year + split + month + split + day
}