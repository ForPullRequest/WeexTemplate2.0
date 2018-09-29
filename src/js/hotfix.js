import { cache, net, modal, patch, navigator } from "tesla-native-js";
const utility               = weex.requireModule("tsl-utility");
const environment           = utility.getTSLConfigPlistWithKey("Environment");           //当前请求地址的环境
const environments          = utility.getTSLConfigPlistWithKey("EnvironmentSettings");   //当前所有的环境
const currentEnvironment    = environments[environment];                                    //当前使用的环境
const configVersion         = currentEnvironment.JSVersion;                                 //版本
const jsAppId               = configVersion.TeslaAppId;                                     //当前应用index的热更新id
const storeUrl              = configVersion.downloadurl;                                    //跳转应用市场链接
const localMain             = weex.config.env.appVersion;                                   //当前应用版本号

//成功通过升级更新了js包
const NUM_SUCCESS_UPDATE = 10000;
//无需升级
const NUM_SUCCESS_NO_NEED = 10001;
//跳转商店
const NUM_SUCCESS_GOTO_STORE = 10002;
//检查时钟
const NUM_SUCCESS_CLOCK = 10003;
//成功标志号
const sucCode = {
    NUM_SUCCESS_UPDATE,
    NUM_SUCCESS_NO_NEED,
    NUM_SUCCESS_GOTO_STORE,
    NUM_SUCCESS_CLOCK,
}

//前端人员忘了写success或者fail
const NUM_FAIL_NO_CALLBACK = 20000;
//获取模块信息失败
const NUM_FAIL_GET_PACKAGE_STATE = 20001;
//网络请求失败
const NUM_FAIL_REQUEST = 20002;
//网络请求返回了不可解析的model
const NUM_FAIL_JSON_PARSE = 20003;
//下载文件出错
const NUM_FAIL_DOWNLOAD_FILE = 20004;
//跳转商店地址为空
const NUM_FAIL_STORE_NULL = 20005;
//更新模块失败
const NUM_FAIL_UPDATE_PACKAGE = 20006;
//失败标志号
const failCode = {
    NUM_FAIL_NO_CALLBACK,
    NUM_FAIL_GET_PACKAGE_STATE,
    NUM_FAIL_REQUEST,
    NUM_FAIL_JSON_PARSE,
    NUM_FAIL_DOWNLOAD_FILE,
    NUM_FAIL_STORE_NULL,
    NUM_FAIL_UPDATE_PACKAGE
}

//cache的key
const cacheKey = {
    //用于比对计时
    clock:'ZSYY-hotFix-clock',
}

//可配置项
var config = {
    //是否使用testtsl
    isTestUrl: false,
    //是否自定义进入商店逻辑
    isCustomStore: false,
    //可配置的检查时钟 （每隔clockHour检查一次）
    clockHour: 24,
}

var period = function(){
    console.log('检查时钟' + config.clockHour + 'h')
    return config.clockHour * 60 * 60 * 1000;
}

var requestUrl = function(){
    return config.isTestUrl
        ? 'http://testtsl.zwjk.com/Home/GetNewestAppView?appid='
        : 'http://tsl.zwjk.com/Home/GetNewestAppView?appid=';
}

const comSuc = function(moduleName, success, sucCode, model){
    let timestamp = new Date().getTime();
    if(sucCode != NUM_SUCCESS_CLOCK){
        setCache(moduleName + cacheKey.clock, timestamp);
    }
    console.log('成功回调' + sucCode + '/' + JSON.stringify(model))
    hideLoading();
    success({
        sucCode:sucCode,
        model:model,
    })
};

const gotoStoreSuc = function(moduleName, success){
    console.log('成功回调' + NUM_SUCCESS_GOTO_STORE + '/' + storeUrl);
    hideLoading();
    if(!config.isCustomStore){
        gotoStore(moduleName, storeUrl)
    }
    success({
        sucCode:NUM_SUCCESS_GOTO_STORE,
        storeUrl:storeUrl,
    })
};

const comFail = function(fail, failCode, model){
    console.log('失败回调' + failCode + '/' + JSON.stringify(model))
    hideLoading();
    if(fail){
        fail({
            failCode:failCode,
            model:model,
        })
    }
};

var start = function(moduleId, moduleName, success, fail) {
    let now = new Date().getTime();
    if(now - getCache(moduleName + cacheKey.clock) <= period()){
        comSuc(moduleName, success, NUM_SUCCESS_CLOCK, {});
        return;
    }
    if(!success || !fail){
        alert('前端人员忘了写hotfix的回调')
        comFail(fail, NUM_FAIL_NO_CALLBACK, {});
        return;
    }
    if(!storeUrl){
        alert('前端人员忘了给商店的地址')
        comFail(fail, NUM_FAIL_STORE_NULL, {});
        return;
    }
    //获取mainVersion和moduleVersion
    console.log('进行模块' + moduleName + '(' + moduleId + ')的热更新检查');
    console.log('当前的原生config信息' + JSON.stringify(currentEnvironment));

    getPackageState(moduleName, function(ret){
        console.log('当前加载的JS模块信息为: ' + JSON.stringify(ret));
        console.log('当前加载的JS模块对应的版本号为: ' + ret.version); //version String 当前的版本号(js代码的版本号)
        console.log('当前使用应用的大版本号为: ' + localMain);
        request(moduleId, moduleName, ret.version, success, fail);
    }.bind(this),function(err){
        console.log("获取加载的JS模块信息失败");
        request(moduleId, moduleName, '0', success, fail);
        //获取包信息失败
        // comFail(fail, NUM_FAIL_GET_PACKAGE_STATE, err);
    }.bind(this));
}

var request = function(moduleId, moduleName, localJS, success, fail){
    // let model = {
    //     "ret_code": 0,
    //     "ret_info": "返回成功",
    //     "ret_data": {
    //         "id": 688,
    //         "app_id": 32,
    //         "Version": "20180629123443",
    //         "createtime": "2018-06-29 12:34:43",
    //         "creater": "2",
    //         "downloadurl": "https://tsl.zwjk.com/AppView/7f78f1a830ea4c8bb35a24d7a138c916.zip",
    //         "mainversion": "1.1.6",
    //         "mandatoryupdate": true,
    //         "remark": "123",
    //         "packagetype": null,
    //         "isdel": 0
    //     }
    // }

    showLoading('数据准备中');
    let requestModel = {
        url:requestUrl() + moduleId,
        method:'get',
        dataType:'application/json',
        header:{},
        data:{},
        timeout:20,
        success:function(res){
            let model = {};
            let modelStr = res.data;
            if(isJsonString(modelStr)){
                model = JSON.parse(modelStr);
            }else{
                comFail(fail, NUM_FAIL_JSON_PARSE, modelStr);
            }
            if(model.ret_code == 0){
                //比对热更新信息
                contrastInfo(model, modelStr, moduleName, localJS, success, fail);
            }else if(model.ret_code == 4){
                //{"ret_code":4,"ret_info":"未找到数据包","ret_data":null}
                comSuc(moduleName, success, NUM_SUCCESS_NO_NEED, model);
            }else{
                console.log('热更新信息获取失败1' + modelStr);
                comFail(fail, NUM_FAIL_REQUEST, res);
            }
        }.bind(this),
        fail:function(err){
            console.log('热更新信息获取失败2' + err);
            comFail(fail, NUM_FAIL_REQUEST, err);
        }.bind(this),
        complete:function(res){
        }.bind(this)
    };
    console.log("http请求->请求的信息为: ", requestModel);
    net.request(requestModel); //发起请求
}

var contrastInfo = function(model, modelStr, moduleName, localJS, success, fail){
    console.log('服务端获取的热更新信息为: ' + modelStr);
    let downloadurl = model.ret_data.downloadurl;
    console.log('服务端获取的热更新下载地址: ' + downloadurl);
    let mainversion = model.ret_data.mainversion;
    console.log('服务端获取的热更新对应的应用的版本号: ' + mainversion);
    let jsVersion = model.ret_data.Version;
    console.log('服务端获取的热更新对应的JS模块版本号: ' + jsVersion);
    let createtime = model.ret_data.createtime;
    console.log('服务端获取的热更新的创建日期' + createtime);

    let localMainNum = parseInt(localMain.replace(/\./g, ''));
    let netMainNum = parseInt(mainversion.replace(/\./g, ''));
    console.log('比较大版本' + localMainNum + '/' + netMainNum);
    console.log("转型后 当前应用的大版本号: ", localMainNum);
    console.log("转型后 服务端发布的JS版本对应的的大版本号: ", netMainNum);
    console.log("本地大版本和服务端大版本比较(是否相等): ", (netMainNum == localMainNum));

    //将本地信息与网络进行比较
    if(netMainNum == localMainNum || netMainNum == 0){
        let localJSNum =localJS ? parseInt(localJS.replace(/\./g, '')) : 0;
        let netJSNum = parseInt(jsVersion.replace(/\./g, ''));
        console.log("转型后 当前加载的JS模块对应的JS版本号: ", localJSNum);
        console.log("转型后 服务端发布的JS版本对应的的JS版本号: ", netJSNum);
        console.log("当前使用的JS版本号 是否 大于服务端发布的JS版本号: ", (localJSNum < netJSNum));

        //如果原生版本相同则进行js版本比较
        if(localJSNum < netJSNum){
            console.log("开始下载服务端JS包");
            //如果本地js版本小于线上版本则下载
            downloadFile(downloadurl, function(res1){
                console.log("下载JS文件成功 开始解压文件");
                // alert(res1.data)
                //data String 临时文件路径，下载后的文件会存储到一个临时文件
                updatePackage(res1.data, false, moduleName, function(res2){
                    console.log("解压下载的JS文件成功");
                    // alert(res2)
                    console.log('更新模块成功，' + moduleName + '从' + localJS + '升级到了' + jsVersion);
                    getPackageState(moduleName, function(ret){
                        showLoading('更新到' + ret.version);
                        console.log('当前的模块版本号' + ret.version);
                        setTimeout(function () {
                            comSuc(moduleName, success, NUM_SUCCESS_UPDATE, model);
                        }.bind(this), 1000);
                        //version String 当前的版本号(js代码的版本号)
                    }.bind(this),function(err){
                        //获取包信息失败
                        comFail(fail, NUM_FAIL_GET_PACKAGE_STATE, err);
                    }.bind(this));
                }.bind(this), function(err){
                    console.log('更新模块失败' + err);
                    comFail(fail, NUM_FAIL_UPDATE_PACKAGE, err);
                }.bind(this))
            }.bind(this), function(err){
                console.log('下载文件失败' + err);
                comFail(fail, NUM_FAIL_DOWNLOAD_FILE, err);
            });
        }else{
            //如果本地js版本大于等于线上版本 则直接成功
            comSuc(moduleName, success, NUM_SUCCESS_NO_NEED, model);
        }
    }else if(netMainNum > localMainNum){
        //如果原生版本低于网络原生版本 则跳转商店
        console.log('跳转商店' + storeUrl);
        gotoStoreSuc(moduleName, success);
    }else{
        //如果原生版本大于网络原生版本 则直接成功
        comSuc(moduleName, success, NUM_SUCCESS_NO_NEED, model);
    }
}

var setCache = function(key, res){
    cache.setStorageSync(key, res);
}

var getCache = function(key){
    return cache.getStorageSync(key);
}

var gotoStore = function(moduleName, storeUrl){
    weex.requireModule('modal').confirm({message:'请尽快前往商店升级应用',okTitle:"前往商店", cancelTitle:"取消"}, function(e){
        if(e == '取消'){
            comSuc(moduleName, success, NUM_SUCCESS_NO_NEED, {});
        }else{
            console.log('跳转商店' + storeUrl);
            utility.openUrl(storeUrl);
            navigator.exit();
        }
    });
}

var downloadFile = function(url, success, fail){
    var downloadTask = net.downloadFile({
        url:url,
        success:function(res){
            success(res);
        },
        fail:function(error){
            fail(error)
        },
        complete:function(res){}
    })
    downloadTask.onProgressUpdate((res)=>{
        console.log('下载进度'+res.progress)
        showLoading('下载中' + res.progress + '%');
    });
}

var getPackageState = function(moduleName, success, fail){
    patch.getPackageState({
        subPackage: moduleName,
        success:function(res){
            success(res);
        },
        fail:function(error){
            fail(error)
        },
        complete:function(res){}
    });
}

var updatePackage = function(zipPath, isPatch, moduleName, success, fail){
    patch.updatePackage({
        zipPath:zipPath,
        isPatch:isPatch,
        packageName: moduleName,
        success:function(res){
            success(res);
        },
        fail:function(error){
            fail(error);
        },
        complete:function(res){}
    });
}

var showLoading = function(str){
    modal.showLoading({
        title:str,
        mask:true,
    });
}
var hideLoading = function(){
    modal.hideLoading();
}

var alert = function(msg, func){
    weex.requireModule('modal').alert({message:msg,okTitle:"确定"}, function(e){
        if(func){
            func(e);
        }
    });
}

var isJsonString = function(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch(e) {
    }
    return false;
}


const hotfix = {
    'sucCode':sucCode,
    'failCode':failCode,
    'start':start,
    'config':config,
}


 export default hotfix;