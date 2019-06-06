import { cache, modal } from "./normal.js"
// import { imageLoad } from "./imageUtil.js";//???
var salt = 'salt-teslax-field-'
var moduleNameKey = salt + 'module-name';
var themeKey = salt + '-theme';

/**
 * @deprecated
 * 最好使用setModuleName+setTheme代替，为了解决编辑getThemeObj过程中引入了imageLoad导致的问题
 * 如果不要求自定义theme可以使用
 * 
 * 使用带了theme的版本必须写，不然可能被其他带了theme的版本替换了自己的theme
 * theme的原则是<template>中声明的优先
 * 否则以theme为准
 * 建议调用getThemeObj生成theme对象
 * @param {string} name 
 * @param {object} theme 
 */
export function initConfig(name, theme){
    modal.log('initConfig/////'+name+'/////'+modal.json(theme))
    setModuleName(name)
    if(theme){
        //deprecated
        setTheme(theme)
    }else{
        setTheme(getThemeObj())
    }
}

export function setModuleName(name) {
    modal.log('setModuleName///'+name)
    cache.saveStorageSync(moduleNameKey, name);
}

export function getModuleName() {
    // console.log('getModuleName/////'+cache.getStorageSync(moduleNameKey))
    return cache.getStorageSync(moduleNameKey);
}

var defaultTheme = {
    //页面的标题是否有底线
    barHasBaseline: true,//目前只能用theme及对base设置
    //页面的标题颜色
    barTitleColor: 'white',
    //页面的标题背景颜色
    barBackGroundColor: '#314D87',
    // 可选值: normal, bold, 100, 200, 300, 400, 500, 600, 700, 800, 900
    // normal 等同于 400, bold 等同于 700；
    // 默认值: normal；
    // iOS 支持 9 种 font-weight值；Android 仅支持 400 和 700, 其他值会设为 400 或 700
    // 类似 lighter, bolder 这样的值暂时不支持
    barTitleWeight: 'normal',//目前只能用theme及对base设置
    //页面的标题是否有底线
    barBorderColor: '#e2e2e2',
    //主体背景色
    contentBackGroundColor: '#f6f6f6',
    //标题栏的返回图片
    backItemImage: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/back.png',
    //无数据文字
    noContentTxt: '暂无数据',
    //无数据图片
    noContentImg: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_no_content.png',
}

export function getThemeObj(){
    // modal.log('getThemeObj///'+modal.json(defaultTheme))
    return Object.assign(defaultTheme);
}

export function setTheme(theme) {
    modal.log('setTheme///'+modal.json(theme))
    cache.saveStorageSync(themeKey, theme);
}

export function getTheme() {
    let res = cache.getStorageSync(themeKey);
    return res
    ? res
    : Object.assign(defaultTheme);
}


