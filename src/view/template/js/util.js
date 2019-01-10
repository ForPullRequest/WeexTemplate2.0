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

/* utility */
var util = {
    md5StringSync: md5StringSync,
    call: call,
}

export { util };