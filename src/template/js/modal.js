import { modal, tslenv } from "tesla-native-js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

/* modal */

/**
 * 控制台日志
 */
function log(msg, msgMore){
    if(msgMore){
        console.log(msg, msgMore);
    }else{
        console.log(msg);
    }
}
/**
 * 把对象变为json
 */
function json(model){
    if(typeof model=='object'){
        return JSON.stringify(model);
    }
    return {}
}
function stringify(model){
    return this.json(model);
}
/**
 * 把json变为对象
 */
function parse(json){
    var obj
    if( typeof json =='string' ){
        try {
            obj=JSON.parse(json)
        } catch (error) {
            obj=json
        }
    }else{
        obj=json
    }
    return obj
}
/**
 * 新
 * 普通toast
 */
// function toast(msg){
//     console.log('oldddddddddd')
//     modal.showToast({title:msg});
// }
/**
 * 新
 * 弹出toast
 */
function toast(msg, duration, image, mask){
    var param = {}
    if(msg||msg=='0')
    param['title'] = msg
    if(duration)
    param['duration'] = duration
    if(image&&typeof image == "string")
    param['image']=image
    if(mask)
    param['mask']=mask
    modal.showToast(param);
}
/**
 * 新
 * 弹出提示框
 */
function alert(msg, func){
    modal.alert({message:msg,okTitle:"确定",callBack:func});
}
/**
 * 新
 * 显示加载框
 */
function showLoading(title, mask){
    modal.showLoading({title:title, mask:mask});
}
//
/**
 * 新
 * 隐藏加载框
 */
function hideLoading(){
    modal.hideLoading();
}

/**
 * 暂无
 * 注册处理全局事件
 */
function registerAlert(name, func){
    // weex.requireModule('globalEvent').addEventListener(name, func);
}
/**
 * 暂无
 * 请求全局事件
 */
function notify(name, map){
    // var evt = new Event(name);
    // evt.data = map;
    // weex.document.dispatchEvent(evt);
}


/**
 * 加载框
 * @param isShow  : 是否显示
 * @param message : 显示的文字信息
 */
var loading = function(isShow, message) {
	if (isShow) {
		modal.showLoading({
            title: message ? message : "",
	    });
	}else {
		modal.hideLoading();
	}
}

var normalModal = {
    log: log,

    json: json,

    stringify: stringify,

    parse: parse,

    toast: toast,

    alert: alert,

    showLoading: showLoading,

    hideLoading: hideLoading,

    registerAlert: registerAlert,

    notify: notify,

    loading: loading,
}

/* modal */
export { normalModal };
exports.modal = normalModal