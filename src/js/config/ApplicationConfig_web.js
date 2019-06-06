import { cache } from "tesla-native-js"

const  MAIN_PAGE_URL_CACHE_KEY = "MAIN_PAGE_URL_CACHE_KEY";


export const DEFAULT_APPCODE = "ydycqd049ad31b5c8732d9492b4358325a3d8e";


/**
 * 获取当前所有配置信息
 * @return :
 * 		hosts: 当前环境所使用的网络请求host地址
 * 		query: 第一次进入时所携带的参数 如: token appid等
 */
export function getEnvConfig() {
	let env 		= getEnv();
	if (!env || env == "") {
		return null;
	}
	let tempConfig 	= {
		hosts: getHosts(env)
	}
	let pageUrl 	= location.href;
	if (pageUrl.indexOf("modulename") != -1 && pageUrl.indexOf("env") != -1) {
		saveMainPageUrl(); //保存主页页面路径
		tempConfig.query = getQueryVariable(pageUrl);
	}else {
		tempConfig.query = getQueryVariable(getMainPageUrl());
	}
	return tempConfig;
}

/**
 * 获取当前网络请求host地址
 * @param exv: 当前使用环境
 */
export function getHosts(env) {
	switch (env) {
		case "common_cs": {
			return {
				url: "http://test.userplat.zwjk.com", 				 //新用户中心
      			imurl: "http://test.qav.cloud.zwjk.com",
      			visiturl: "http://csydyc.zwjk.com",
      			recordurl: "http://192.168.0.14:18888", 			 //病历
      			diagnoseurl: "http://cph3.emr.zwjk.com/Gateway.aspx" //处方 浙大一院项目部提供
			}
		}
			break;
		case "common_sc":
		default: {
			return {
				url: "https://userplat.zwjk.com", 				 //新用户中心
      			imurl: "https://qavcloud.zwjk.com",
      			visiturl: "https://ymzydyc.zwjk.com",
      			recordurl: "https://emrapi.zwjk.com", 			 //病历
      			diagnoseurl: "https://cph3emr.zwjk.com/GateApi.aspx" //处方 浙大一院项目部提供
			}
		}
	}
}

/**
 * 获取当前模块名称
 */
export function getModuleName() {
	let pageUrl 	= location.href;
	if (pageUrl.indexOf("modulename") != -1 && pageUrl.indexOf("env") != -1) {
		saveMainPageUrl(); //保存主页页面路径
		if (getQueryVariable(getMainPageUrl()).modulename) {
			return getQueryVariable(pageUrl).modulename; 
		}
	}else {
		if (getQueryVariable(getMainPageUrl()).modulename) {
			return getQueryVariable(getMainPageUrl()).modulename;
		}
	}
	return "";
}

/**
 * 获取当前环境
 */
export function getEnv() {
	let pageUrl 	= location.href;
	if (pageUrl.indexOf("modulename") != -1 && pageUrl.indexOf("env") != -1) {
		saveMainPageUrl(); //保存主页页面路径
		if (getQueryVariable(getMainPageUrl()).env) {
			return getQueryVariable(pageUrl).env;
		}
	} else {
		if (getQueryVariable(getMainPageUrl()).env) {
			return getQueryVariable(getMainPageUrl()).env;
		}
	}
	return "";
}

/**
 * 获取当前链接参数
 */
export function getQueryVariable(url) {
	if (!url || url == "" || url.indexOf("?") == -1) {
		return {};
	}
	let query = url.split("?")[1];
   	let vars  = query.split("&");
   	let temp  = {};
   	for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        temp[pair[0]] = pair[1];
   	}

   	return temp;
}

/**
 * 保存主页路径
 */
function saveMainPageUrl() {
	let pageUrl 	= location.href;
	if (pageUrl.indexOf("modulename") != -1 && pageUrl.indexOf("env") != -1) {
		cache.setStorageSync(MAIN_PAGE_URL_CACHE_KEY, pageUrl);
	}
}

/**
 * 获取主页页面路径
 */
function getMainPageUrl() {
	return cache.getStorageSync(MAIN_PAGE_URL_CACHE_KEY);
}

