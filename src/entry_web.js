/**
 * Created by zwwill on 2017/8/28.
 */

import App from './App.vue'
import router from './router'
import {navigator,weixinutils} from 'tesla-native-js'

new Vue(Vue.util.extend({
    el: '#root',
    router
}, App));

router.beforeEach((to, from, next) => {
    console.warn("from:--->",from)
    console.warn("to:--->",to)
    var toPath=to.path;

    //点击返回按钮返回首页, 支付 
    if(from.path=='/view/commonPay/paySuccess'){
        if(toPath=='/view/detail/mzDetail/index'||toPath=='/view/detail/caseDetail/index'||toPath=='/view/commonMain/index'){
            to.meta['backAction']='backToMain'
        }       
    }

    //首页不能再进行后退操作, 防止从其他页面直接跳转首页后再点击后退按钮时的页面问题
    if(from.path=="/index"&&(from.meta.action!='push'&&from.meta.action!='redirectTo')){
        next('/')
        return
    }
       
    if(from.meta.backAction&&from.meta.backAction=='backToMain'){
        from.meta.action=undefined
        from.meta.backAction=undefined
        next('/')
        return
    }
    next()
})
// router.beforeResolve((to, from, next) => {
//     /* must call `next` */
//     console.log("beforeResolve:", to)
//     console.log("beforeResolve:", from)
//     console.log("beforeResolve:", next)
//     next()
// })
router.afterEach((to, from) => {
    // ...
    console.log("afterEach:", to)
    console.log("afterEach:", from)
    from.meta.action=undefined
     //点击返回按钮返回首页, 支付 
     if(from.path=='/view/commonPay/paySuccess'){
        from.meta['backAction']='backToMain'      
    }
})
