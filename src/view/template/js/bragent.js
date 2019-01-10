import { bragent, tslenv } from "tesla-native-js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

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
function start(option, success, fail, complete){
    bragent.start({
        token: option.token,
        ConfigUrl: option.ConfigUrl,//https://apmupload.zwjk.com/config
        NougatEnable: option.NougatEnable,
        CrashReportingEnabled: option.CrashReportingEnabled,
        AsynchronismEnabled: option.AsynchronismEnabled,
        RateOfLaunch: option.RateOfLaunch,
        channelId: option.channelId,
        success: function(res){
            if(success){
                success(res);
            }
        },
        fail: function(error){
            if(fail){
                fail(error);
            }
        },
        complete: function(res){
            if(complete){
                complete(res);
            }
        }
    });
}
/*
 * 设置统计中的用户id,区分不同用户
*/
function onMemberId(memberId){
    bragent.onMemberId(memberId);
}
/*
 * 页面统计,进入，与onPageEnd成对出现
*/
function onPageStart(pageId, pageName){
    bragent.onPageStart({
        pageId:pageId,
        pageName:pageName
    });
}
/*
 * 页面统计,离开,与onPageStart成对出现
*/
function onPageEnd(pageId, pageName){
    bragent.onPageEnd({
        pageId:pageId,
        pageName:pageName
    });
}
/*
 * 事件统计
*/
function onEvent(pageId, pageName){
    bragent.onEvent({
        eventId:pageId,
        eventName:pageName
    });
}

var normalBragent = {
    start: start,
    onMemberId: onMemberId,
    onPageStart: onPageStart,
    onPageEnd: onPageEnd,
    onEvent: onEvent,
}

export { normalBragent };
exports.bragent = normalBragent