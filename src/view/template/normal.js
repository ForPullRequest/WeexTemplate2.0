/*
* 引导用户使用壳中的原生函数 做到整个项目中的集中处理
*
* 图片选择 TSLImagePicker
* 导航 navigator
* 全局提醒 TSLContainer
* 提示 TSLModal/modal
* 简单数据存储 TSLCache
*/


import { modal, navigator, image, cache, utility } from "tesla-native-js"
import { imageLoad } from "./imageUtil.js"
/* im, toast, bragent, contact, container, file, patch 还没 */
/*
 * 使用新的navigator.push
 * 以下的原先param放到app.json中配置全局一致
 * @param hardwareAccelerated 硬件加速 默认true
 * @param immergeColor        沉浸色 默认无
 * @param screenOrientation   屏幕方向 默认portrait 可选landscape
 * @param option              给下个界面的参数
*/
function newPush(option, model, func){
    var src = option.src ? option.src : option;
    navigator.push({
            url: src,
            option: model,
        }, function () {
            func();
        });
}
//import navigator from "tesla-native-js"
exports.normal = {

/* modal */

    /**
     * 控制台日志
     */
    log: function(msg){
        console.log(msg);
    },
    /**
     * 把对象变为json
     */
    json: function(model){
        return JSON.stringify(model);
    },
    /**
     * 把json变为对象
     */
    parse: function(json){
        return JSON.parse(json);
    },
    /**
     * 新
     * 普通toast
     */
    toast: function(msg){
        modal.showToast({title:msg});
    },
    /**
     * 新
     * 弹出toast
     */
    toast: function(msg, duration, image, mask){
        modal.showToast({
            title:msg,
            duration:duration,
            image:image,
            mask:mask,
        });
    },
    /**
     * 新
     * 弹出提示框
     */
    alert: function(msg, func){
        weex.requireModule('modal').alert({message:msg,okTitle:"确定"}, function(e){
            if(func){
                func(e);
            }
        });
    },
    /**
     * 新
     * 显示加载框
     */
    showLoading: function(title, mask){
        modal.showLoading({title:title, mask:mask});
    },
    //
    /**
     * 新
     * 隐藏加载框
     */
    hideLoading: function(){
        modal.hideLoading();
    },
    //开启弹窗 弃用
    // alertWindow: function(src, width, height, isGlobal, data){
    //  weex.requireModule('TSLModal').alert({
    //      src: src,
    //      width: width,
    //      height: height,
    //      global: isGlobal,
    //      data: data
    //  })
    // },
    //关闭弹窗 弃用
    // closeAlert: function(func){
    //  weex.requireModule('TSLModal').closeAlert(function () {
    //      if(func){
    //          func();
    //      }
    //  });
    // },
    //弹出操作表 弃用
    // sheet: function(items, cancel, func){
    //  weex.requireModule('TSLModal').sheet({
    //      items: items,
    //      cancel: cancel
    //  }, function (e) {
    //      if(func){
    //          //e.selectedIndex-1对应items中的position，
    //          //e.selectedIndex为0对应取消
    //          if(e.selectedIndex!=0){
    //              func(e.selectedIndex-1);
    //          }
    //      }
    //  });
    // },
    /**
     * 暂无
     * 注册处理全局事件
     */
    registerAlert: function(name, func){
        // weex.requireModule('globalEvent').addEventListener(name, func);
    },
    /**
     * 暂无
     * 请求全局事件
     */
    notify: function(name, map){
        // var evt = new Event(name);
        // evt.data = map;
        // weex.document.dispatchEvent(evt);
    },
    /*
     * 使用cache的一次性存储来替代以上两个方法
     *
    */
    onceSave: function(tag, tar, success){
        this.saveStorage('normalOnce-' + tag, tar, function(){
            if(success){
                success();
            }
        });
    },
    onceGet: function(tag){
        // return new Promise(function(resolve, reject){
            // this.getStorage('normalOnce-' + tag, function(ret){
            //     if(ret.data){
            //         this.alert('====='+typeof(ret.data));
            //         resolve(ret.data);
            //     }
            //     this.removeStorageSync('normalOnce-' + tag);
            // }.bind(this));
        // }.bind(this))
        let tmp = this.getStorageSync('normalOnce-' + tag);
        // this.alert('====='+typeof(tmp));
        this.removeStorageSync('normalOnce-' + tag);
        return tmp;
    },

/* modal */
/* navigator */

    push: function(option){
        newPush(option, {}, function(){});
    },
    push: function(option, model){
        newPush(option, model, function(){});
    },
    push: function(option, model, func){
        if(func){
            newPush(option, model, func);
        }else{
            newPush(option, model, function(){});
        }
    },
    /**
     * 返回到上一页
     */
    back: function(){
        navigator.pop({
            delta:1
        });
    },
    /**
     * 返回到首页
     */
    backToRoot: function () {
        navigator.pop({
            delta:999
        });
    },
    /**
     * 返回到当前模块的首页
     */ 
    backToMain: function() {
        let pages           = navigator.getCurrentPagesSync(); //{"route":"http://192.168.23.156:8081/dist/YC/index.js","pagetype":"weex"}
        let mainPage        = "/YC/index.js";
        let mainPageIndex   = null;
        for (let index in pages) {
            let temp = pages[index];
            if (temp.route.slice(-mainPage.length) == mainPage) {
                mainPageIndex = index;
                break;
            }
        }
        navigator.pop({ delta: parseInt((pages.length-(mainPageIndex+1))) });
    },
    killTransitionPage: function(exceptPage) {
        let pages           = navigator.getCurrentPagesSync(); //{"route":"http://192.168.23.156:8081/dist/YC/index.js","pagetype":"weex"}
        let mainPage        = "/YC/index.js";
        let mainPages       = [];
        for (let index in pages) {
            let temp = pages[index];
            mainPages.push(temp.route);
            if (temp.route.slice(-mainPage.length) == mainPage) {
                break;
            }
        }
        if (exceptPage) {
            mainPages.push(exceptPage);
        }
        navigator.killAllPageExcept({
            pages:mainPages
        })
    },
    /**
     * 返回到哪一页
     * @param page  页码
     */
    // backToPage: function (page) {
    //     navigator.pop({
    //         delta:1
    //     });
    // },
    /**
     * 返回多少页
     * @param pages 返回的页数
     */
    backPages: function (pages) {
        navigator.pop({
            delta:pages
        });
    },
    /*
     * 关闭所有页面，关闭App
    */
    exit: function(){
        navigator.exit();
    },
    /*
     * 重定向到新的页面。 关闭当前页面，跳转到应用内的某个页面。
     * @param url      新页面的地址, 相对地址,可以url中通过?拼接简单参数
     * @param option   Object 跳转到新页面需要携带的参数
     * @param success  成功回调
     * @param fail     失败回调
     * @param complete 完成回调
    */
    redirectTo: function(url, option, success, fail, complete){
        var src = url.src ? url.src : url;
        navigator.redirectTo({
            url:src,
            option:option,
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
    },
    /*
     * 退至后台（Android）
    */
    moveToback: function(){
        if(weex.config.env.platform == 'android'){
            navigator.moveToback();
        }
    },
    /*
     * 目前未知
    */
    canAssistBack: function(canBack){
        // weex.requireModule('TSLNavigation').canAssistBack(canBack);
    },
    /*
     * 获取当前的页面栈,同步方法;获取页面栈的信息，包括每一页的具体信息返回值为一个页面信息的数组
     * @param pagetype weex/native
     * @param route    weex:页面的路径/native:页面的名称
    */
    getPageStack: function(pagetype, route){
        return navigator.getCurrentPagesSync();
    },

    /*
     * 关闭除申明的页面之外的所有页面
     * @param pages 需要保留的页面的地址,相对地址
    */
    killAllPageExcept: function(pages){
        navigator.killAllPageExcept({
            pages:pages
        });
    },

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
    imagePicker: function(num, option, success, fail, complete){
        image.chooseImage({
            count: num,
            sizeType: option.sizeType,
            sourceType: option.sourceType?option.sourceType:['album'],
            filePaths: option.filePaths,
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
    },
    imageInfo: function(src, success, fail, complete){
        image.getImageInfo({
            src: src,
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
    },
    previewImage: function(current, urls, success, fail, complete){
        image.previewImage({
            current:current,
            urls:urls,
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

    },

/* image */
/* cache Sync慎用 容易出bug*/

    save: function(name, tar){
        this.saveStorageSync(name, tar);
    },
    /**
     * 异步保存数据
     * @param name      存储的key
     * @param tar       存储的对象
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
     */
    saveStorage: function(name, tar, success, fail, complete){
        // console.log('normal-saveStorage=====' + name)
        cache.setStorage({
            key: name,
            data: tar,
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

    },
    /*
     * 保存数据
     * @param name      存储的key
     * @param tar       存储的对象
    */
    saveStorageSync: function(name, tar){
        // console.log('normal-saveStorageSync=====' + name)
        return cache.setStorageSync(name, tar);
    },
    get: function(name, success){
        this.getStorage(name, success);
    },
    /*
     * 从本地缓存中异步获取指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    getStorage: function(name, success, fail, complete){
        // console.log('normal-getStorage=====' + name)
        cache.getStorage({
            key:name,
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
    },
    /*
     * 从本地缓存中获取指定 key 对应的内容
     * @param name      存储的key
    */
    getStorageSync: function(name){
        // console.log('normal-getStorageSync=====' + name)
        return cache.getStorageSync(name)
    },
    /*
     * 从本地缓存中异步移除指定 key
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    removeStorage: function(name, success, fail, complete){
        // console.log('normal-removeStorage=====' + name)
        cache.removeStorage({
            key:name,
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
    },
    /*
     * 从本地缓存中移除指定 key
     * @param name      存储的key
    */
    removeStorageSync: function(name){
        // console.log('normal-removeStorageSync=====' + name)
        return cache.removeStorageSync(name);
    },
    /*
     * 异步清空本地缓存
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    clearStorage: function(name, success, fail, complete){
        // console.log('normal-clearStorage=====' + name)
        cache.clearStorage({
            key:name,
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
    },
    /*
     * 清空本地缓存
    */
    clearStorageSync: function(){
        // console.log('normal-clearStorageSync=====')
        return cache.clearStorageSync();
    },
    /*
     * 异步判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    containStorage: function(name, success, fail, complete){
        // console.log('normal-containStorage=====' + name)
        cache.containsStorage({
            key:name,
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
    },
    /*
     * 判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
    */
    containStorageSync: function(name){
        // console.log('normal-containStorageSync=====' + name)
        return cache.containsStorageSync(name)
    },

/* cache */

/* utility */

    md5StringSync: function(str){
        return utility.md5StringSync(str);
    },

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
    imageLoad: function(src){
        return imageLoad(src);
    }
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
    start: function(option, success, fail, complete){
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
    },
    /*
     * 设置统计中的用户id,区分不同用户
    */
    onMemberId: function(memberId){
        bragent.onMemberId(memberId);
    },
    /*
     * 页面统计,进入，与onPageEnd成对出现
    */
    onPageStart: function(pageId, pageName){
        bragent.onPageStart({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 页面统计,离开,与onPageStart成对出现
    */
    onPageEnd: function(pageId, pageName){
        bragent.onPageEnd({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 事件统计
    */
    onEvent: function(pageId, pageName){
        bragent.onEvent({
            eventId:pageId,
            eventName:pageName
        });
    },
}