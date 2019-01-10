import { navigator, container, tslenv } from "tesla-native-js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

/* navigator */

function routeInit(vm){
    navigator.getParamInRoute(vm);
}
function push(vm, option, model, func){
    // newPush(option, {}, function(){},vm);
    var src = option.src ? option.src : option;
    navigator.push({
        url: src,
        option: model,
        success:func
    }, vm);
}
/**
 * 返回到上一页
 */
function back(vm){
    navigator.pop({
        delta:1
    }, vm);
}
/**
 * 返回到index模块的首页
 */
function backToRoot(vm) {
    navigator.pop({
        delta:999
    }, vm);
}
/**
 * 返回到当前模块的首页
 */ 
function backToMain(vm, mainPage) {
    if(isBrowser){
        navigator.exit();
        return;
    }
    let pages = navigator.getCurrentPagesSync();
    let mainPageIndex = null;
    for (let index in pages) {
        let temp = pages[index];
        if (temp.route.slice(-mainPage.length) == mainPage) {
            mainPageIndex = index;
            break;
        }
    }
    navigator.pop({ delta: parseInt((pages.length-(mainPageIndex+1))) }, vm);
}
/**
 * 关闭中间界面
 * @param mainPage 模块的首页
 * @param exceptPage 不关闭的界面
 */
function killTransitionPage(vm, mainPage, exceptPage) {
    if(isBrowser)
        return
    let pages = navigator.getCurrentPagesSync();
    let mainPages = [];
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
    }, vm)
}
/**
 * 返回多少页
 * @param pages 返回的页数
 */
function backPages(vm, pages) {
    navigator.pop({
        delta:pages
    }, vm);
}
/*
 * 关闭所有页面，关闭App
*/
function exit(vm){
    navigator.exit(vm);
}
/*
 * 重定向到新的页面。 关闭当前页面，跳转到应用内的某个页面。
 * @param url      新页面的地址, 相对地址,可以url中通过?拼接简单参数
 * @param option   Object 跳转到新页面需要携带的参数
 * @param success  成功回调
 * @param fail     失败回调
 * @param complete 完成回调
*/
function redirectTo(vm, url, option, success, fail, complete){
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
    }, vm);
}
/*
 * 退至后台（Android）
*/
function moveToback(vm){
    if(weex.config.env.platform == 'android'){
        navigator.moveToback(vm);
    }
}
/*
 * 安卓中注册返回事件
*/
function registerBack(backFunc){
    container.registerBack(backFunc)
}
/*
 * 获取当前的页面栈,同步方法;获取页面栈的信息，包括每一页的具体信息返回值为一个页面信息的数组
 * @param pagetype weex/native
 * @param route    weex:页面的路径/native:页面的名称
*/
function getCurrentPagesSync(vm, pagetype, route){
    return navigator.getCurrentPagesSync(vm);
}

/*
 * 关闭除申明的页面之外的所有页面
 * @param pages 需要保留的页面的地址,相对地址
*/
function killAllPageExcept(vm, pages){
    navigator.killAllPageExcept({
        pages:pages
    }, vm);
}

var normalNavigator = {
    routeInit: routeInit,
    
    push: push,
    
    back: back,
    
    backToRoot: backToRoot,
    
    backToMain: backToMain,

    killTransitionPage: killTransitionPage,
    
    backPages: backPages,
    
    exit: exit,

    redirectTo: redirectTo,
    
    moveToback: moveToback,
    
    registerBack: registerBack,
    
    getCurrentPagesSync: getCurrentPagesSync,

    killAllPageExcept: killAllPageExcept,
}

/* navigator */
export { normalNavigator };
exports.navigator = normalNavigator