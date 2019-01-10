/*
* 引导用户使用壳中的原生函数 做到整个项目中的集中处理
*
* 图片选择 TSLImagePicker
* 导航 navigator
* 全局提醒 TSLContainer
* 提示 TSLModal/modal
* 简单数据存储 TSLCache
*/

// import { utility, tslenv } from "tesla-native-js"
import { modal } from "./js/modal.js"
import { navigator } from "./js/navigator.js"
import { image } from "./js/image.js"
import { cache } from "./js/cache.js"
import { util } from "./js/util.js"
import { bragent } from "./js/bragent.js"
// var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser
/* im, toast, bragent, contact, container, file, patch 还没 */


export { 
    modal,
    navigator,
    image,
    cache,
    util,
    bragent,
};

exports.normal = {

/* modal */

    log: modal.log,
    
    json: modal.json,

    stringify: modal.stringify,
    
    parse: modal.parse,
    
    toast: modal.toast,
    
    alert: modal.alert,
    
    showLoading: modal.showLoading,
    
    hideLoading: modal.hideLoading,
    
    registerAlert: modal.registerAlert,
    
    notify: modal.notify,

/* modal */
/* navigator */

    routeInit: navigator.routeInit,

    push: navigator.push,
    
    back: navigator.back,
    
    backToRoot: navigator.backToRoot,
    
    backToMain: navigator.backToMain,

    killTransitionPage: navigator.killTransitionPage,
    
    backPages: navigator.backPages,
    
    exit: navigator.exit,

    redirectTo: navigator.redirectTo,
    
    moveToback: navigator.moveToback,
    
    registerBack: navigator.registerBack,
    
    getCurrentPagesSync: navigator.getCurrentPagesSync,

    killAllPageExcept: navigator.killAllPageExcept,

/* navigator */
/* image 还有很多没有加*/
    /*
     * 从本地相册选择图片或使用相机拍照。
     * @param count       最多可以选择的图片张数，默认9
     * @param sizeType    original 原图，compressed 压缩图，默认二者都有
     * @param sourceType  album 从相册选图，camera 使用相机，默认二者都有
     * @param filePaths   已经选择的图片,防止重复选择
     * @param success     成功回调
     * @param fail        失败回调
     * @param complete    完成回调
    */
    imagePicker: image.imagePicker,

    imageInfo: image.imageInfo,

    previewImage: image.previewImage,

    imageLoad: image.imageLoad,

/* image */
/* cache Sync慎用 容易出bug*/
    /*
     * 使用cache的一次性存储来替代以上两个方法
     *
    */
    onceSave: cache.onceSave,
    
    onceGet: cache.onceGet,

    save: cache.save,
    /**
     * 异步保存数据
     * @param name      存储的key
     * @param tar       存储的对象
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
     */
    saveStorage: cache.saveStorage,
    /*
     * 保存数据
     * @param name      存储的key
     * @param tar       存储的对象
    */
    saveStorageSync: cache.saveStorageSync,

    get: cache.get,
    /*
     * 从本地缓存中异步获取指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    getStorage: cache.getStorage,
    /*
     * 从本地缓存中获取指定 key 对应的内容
     * @param name      存储的key
    */
    getStorageSync: cache.getStorageSync,
    /*
     * 从本地缓存中异步移除指定 key
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    removeStorage: cache.removeStorage,
    /*
     * 从本地缓存中移除指定 key
     * @param name      存储的key
    */
    removeStorageSync: cache.removeStorageSync,
    /*
     * 异步清空本地缓存
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    clearStorage: cache.clearStorage,
    /*
     * 清空本地缓存
    */
    clearStorageSync: cache.clearStorageSync,
    /*
     * 异步判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    containStorage: cache.containStorage,
    /*
     * 判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
    */
    containStorageSync: cache.containStorageSync,

/* cache */

/* utility */

    md5StringSync: util.md5StringSync,

    call: util.call,

/* utility */

    debounce: function(fn, delay) {
        // 维护一个 timer

        return function() {
            // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
            let context = this;
            let args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    },
}
var timer = null;

exports.br = {
    /*
     * 启动统计
     * @param option
     * @      token                 必填
     * @      ConfigUrl             必填
     * @      NougatEnable          非必填 默认true
     * @      CrashReportingEnabled 非必填 默认true
     * @      AsynchronismEnabled   非必填 默认false
     * @      RateOfLaunch          非必填 默认1.0
     * @      channelId             非必填 
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    start: bragent.start,
    /*
     * 设置统计中的用户id,区分不同用户
    */
    onMemberId: bragent.onMemberId,
    /*
     * 页面统计,进入，与onPageEnd成对出现
    */
    onPageStart: bragent.onPageStart,
    /*
     * 页面统计,离开,与onPageStart成对出现
    */
    onPageEnd: bragent.onPageEnd,
    /*
     * 事件统计
    */
    onEvent: bragent.onEvent,
}