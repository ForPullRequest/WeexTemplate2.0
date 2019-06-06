import { utility, tslenv, contact } from "tesla-native-js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

/* utility */

function md5StringSync(str){
    return utility.md5StringSync(str);
}

/* contact */
function call ( phoneNumber , success , fail , complete ){
    contact.makePhoneCall({
        phoneNumber: phoneNumber,
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

var timer = null;
function debounce(fn, delay) {
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
}

/* utility */
var util = {
    md5StringSync: md5StringSync,
    call: call,
    debounce: debounce,
}

export { util };