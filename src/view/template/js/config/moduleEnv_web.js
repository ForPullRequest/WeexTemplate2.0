
import * as config from "./ApplicationConfig_web.js";
import {tslenv} from "tesla-native-js";

/**
 * 获取当前模块配置信息
 * @return 			 :
 * 		hosts 		 : Object 当前环境下对应的请求host信息; 			 (ApplicationConfig中获得)
 * 		query 		 : Object 用户进入时的登录信息 (token appcode等);   (ApplicationConfig中获得)
 * 		title 		 : 当前模块标题
 * 		module 		 : 当前模块名称
 *
 * 注:ApplicationConfig中配置环境信息，即有新的环境进来， 需要在ApplicationConfig配置新的环境
 */
export default function getModuleConfig () {
	if(tslenv.getCurrentPlatform() == "weex") return undefined
	let modulename 	= config.getModuleName();
	let tempConfig  = config.getEnvConfig();
	switch (modulename) {
		case "bl": {
			tempConfig.title  = "远程病理";
			tempConfig.module = "bl";
			tempConfig.moduleId = 83;
		}
			break;
		case "hz": {
			tempConfig.title  = "远程会诊";
			tempConfig.module = "hz";
			tempConfig.moduleId = 84;
		}
			break;
		case "mz": {
			tempConfig.title  = "远程门诊";
			tempConfig.module = "mz";
			tempConfig.moduleId = 8;
		}
			break;
		case "yx": 
		default: {
			tempConfig.title  = "远程影像";
			tempConfig.module = "yx";
			tempConfig.moduleId = 4;
		}
	}
	return tempConfig;
}