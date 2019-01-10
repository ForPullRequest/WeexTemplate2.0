import { net, navigator, modal } from "tesla-native-js";
import getModuleConfig 	  from "./config/moduleEnv_web.js";
import {DEFAULT_APPCODE}  from "./config/ApplicationConfig_web.js";
import myaxios       	  from 'axios';
// var    wx        		  =    require('weixin-js-sdk');

const GET_USER_INFO = "http://test.userplat.zwjk.com/api/DjUser/GetUserInfo";
const GET_WX_CONFIG = "http://test.userplat.zwjk.com/api/DjWorkWx/GetJsConfigInfo";

var tempWxConfig = {};


/**
 * Private
 * 获取微信配置信息
 */
function getWxConfig() {
	return new Promise((resolve, reject) => {
		const { platform } = weex.config.env;
		if (platform.toLowerCase() === 'web') {
			let moduleConfig = getModuleConfig();
			myaxios.defaults.headers["appid"] = moduleConfig.query.appcode ? moduleConfig.query.appcode : DEFAULT_APPCODE;
			myaxios.defaults.headers["token"] = moduleConfig.query.token;
			myaxios.get(GET_USER_INFO, {}).then((res_info) => {
				let tempInfo = res_info.data;
	            if (!tempInfo || tempInfo.ret_code != 0) {
	        		reject();
	        		return;
	        	}

	        	let pagUrl = encodeURIComponent(window.location.href.split('#')[0]);
	        	let configUrl = GET_WX_CONFIG + "?modelid=" + moduleConfig.moduleId + "&appid=" + (moduleConfig.query.appcode ? moduleConfig.query.appcode : DEFAULT_APPCODE) + "&hospitalid=" + tempInfo.ret_data.UnitId + "&url=" + pagUrl;
	            myaxios.get(configUrl, {}).then((res_config) => {
		           resolve(res_config.data);
		        }).catch((error_config) => {
		　　        reject(error_config);
		        });
	        }).catch((error_info) => {
	　　        reject(error_info);
	        });
		}else {
			reject();
		}
	});  
};


/**
 * 配置微信 成功后可调用WX API(代码有重复 日后再调)
 */
function configWx() {
	return new Promise((resolve, reject) => {
		if (Object.keys(tempWxConfig).length == 0) {
			getWxConfig().then((res) => {
				console.log("success", res);
				wx.config({
				    beta: true,							// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
				    debug: false, 						// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: res.ret_data.appId, 			// 必填，企业微信的corpID
				    timestamp: res.ret_data.timestamp, 	// 必填，生成签名的时间戳
				    nonceStr: res.ret_data.noncestr, 	// 必填，生成签名的随机串
				    signature: res.ret_data.signature,	// 必填，签名，见附录1
				    jsApiList: ["scanQRCode", "getNetworkType", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getLocalImgData"], 			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(() => {
					resolve();
				});
				wx.error((error) => {
					console.log("出错了", error);
					reject(error);
				});
			}).catch((error) => {
				console.log("error", error);
				reject(error);
			});
		}else {
			wx.config({
			    beta: true,							// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
			    debug: true, 						// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: tempWxConfig.ret_data.appId, 			// 必填，企业微信的corpID
			    timestamp: tempWxConfig.ret_data.timestamp, 	// 必填，生成签名的时间戳
			    nonceStr: tempWxConfig.ret_data.noncestr, 	// 必填，生成签名的随机串
			    signature: tempWxConfig.ret_data.signature,	// 必填，签名，见附录1
			    jsApiList: ["scanQRCode", "getNetworkType", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getLocalImgData"], 			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(() => {
				resolve();
			});
			wx.error((error) => {
				console.log("出错了", error);
				reject(error);
			});
		}
	}); 
}

/**
 * Public
 * 从企业微信相册中选择图片
 * @param count: 需要选择的图片的数量
 */
export function chooseImage(count) {
	return new Promise((resolve, reject) => {
		if (weex.config.env.platform.toLowerCase() === 'web') {
			configWx().then(() => {
				wx.chooseImage({
				    count: count ? count : 9, // 默认9
				    sizeType: ['compressed'], 		 // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], 			 // 可以指定来源是相册还是相机，默认二者都有
				    defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
				    success: (res) => {
				    	let localIds = res.localIds;

						let tempObj = [];				   		
				   		for (let index = 0; index < localIds.length; index++) {
							tempObj.push(getBase64Image4iOS(localIds[index]));
							// tempObj.push(getServerImage(localIds[index]));
						}
						Promise.all(tempObj).then((result) => {
							resolve(result);
						}).catch((error) => {
							reject(error);
						});				    	
				    }
				});
			}).catch((error) => {
				reject(error);
			});
		}else {
			reject();
		}
	});


	// return new Promise((resolve, reject) => {
	// 	getWxConfig().then((res) => {
	// 		console.log("success", res);
	// 		wx.config({
	// 		    beta: true,							// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
	// 		    debug: true, 						// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 		    appId: res.ret_data.appId, 			// 必填，企业微信的corpID
	// 		    timestamp: res.ret_data.timestamp, 	// 必填，生成签名的时间戳
	// 		    nonceStr: res.ret_data.noncestr, 	// 必填，生成签名的随机串
	// 		    signature: res.ret_data.signature,	// 必填，签名，见附录1
	// 		    jsApiList: ["scanQRCode", "getNetworkType", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getLocalImgData"], 			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	// 		});
	// 		wx.ready(() => {
	// 			wx.chooseImage({
	// 			    count: count ? count : 9, // 默认9
	// 			    sizeType: ['compressed'], 		 // 可以指定是原图还是压缩图，默认二者都有
	// 			    sourceType: ['album'], 			 // 可以指定来源是相册还是相机，默认二者都有
	// 			    defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
	// 			    success: (res) => {
	// 			    	let localIds = res.localIds;

	// 					let tempObj = [];				   		
	// 			   		for (let index = 0; index < localIds.length; index++) {
	// 						// tempObj.push(getBase64Image4iOS(localIds[index]));
	// 						tempObj.push(getServerImage(localIds[index]));
	// 					}
	// 					Promise.all(tempObj).then((result) => {
	// 						resolve(result);
	// 					}).catch((error) => {
 //  							reject(error);
	// 					});				    	
	// 			    }
	// 			});
	// 		});
	// 		wx.error((error) => {
	// 			console.log("出错了", error);
	// 			reject(error);
	// 		});
	// 	}).catch((error) => {
	// 		console.log("error", error);
	// 		reject(error);
	// 	});
	// });
}

/**
 * Private
 * 格式化数据, ios转化为base64图片 用于显示
 * @param imageId: 当前需要转化为base64的图片
 * @return localId: 企业微信相册图片id
 * @return imageSrc: 用于显示的图片的id
 */
function getBase64Image4iOS(imageId) {
	return new Promise((resolve, reject) => {
		console.log("当前转化的图片的id为: ", imageId);
		if (WXEnvironment.deviceModel.toLowerCase() == "android") {
			resolve({
	        	localId: imageId,
	        	imageSrc:  imageId	
	        });
		}else {
			wx.getLocalImgData({
			    localId: imageId, // 图片的localID
			    success: function (res) {
			        let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
			        resolve({
			        	localId: imageId,
			        	imageSrc:  localData	
			        });
				},
				fail: function (error) {
					reject(error);
				}
			});
		}		
	})
}

/**
 * Public
 * 把微信本地图片上传至微信服务器 3天的保存期
 * @param imageId: 本地图片id
 * @return localId: 本地图片id
 * @return mediaId: 微信服务器的图片id
 */
export function getServerImage(imageId) {
	return new Promise((resolve, reject) => {
		console.log("当前转化的图片的id为: ", imageId);
		configWx().then(() => {
			wx.uploadImage({
			    localId: imageId, // 图片的localID
			    isShowProgressTips: 1, // 默认为1，显示进度提示
			    success: function (res) {
			        let serverId = res.serverId; // 返回图片的服务器端ID
			        resolve({
			        	localId: imageId,
			        	mediaId: serverId	
			        });
				},
				fail: function (error) {
					reject(error);
				}
			});
		}).catch((error) => {
			reject(error);
		});
	})
}



