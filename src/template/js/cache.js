import { cache, tslenv } from "tesla-native-js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

/* cache Sync慎用 容易出bug*/

/*
    * 使用cache的一次性存储来替代以上两个方法
    *
*/
function onceSave(tag, tar, success){
    this.saveStorage('normalOnce-' + tag, tar, function(){
        if(success){
            success();
        }
    });
}
function onceGet(tag){
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
}

function save(name, tar){
    this.saveStorageSync(name, tar);
}
/**
 * 异步保存数据
 * @param name      存储的key
 * @param tar       存储的对象
 * @param success   成功回调
 * @param fail      失败回调
 * @param complete  完成回调
 */
function saveStorage(name, tar, success, fail, complete){
     console.log('normal-saveStorage=====' + name)
    cache.setStorage({
        key: name,
        data: tar,
        success: function(res){
            console.log("saveStorage", res)
            if(success){
                success(res);
            }
        },
        fail: function(error){
            console.log("saveStorage", error)
            if(fail){
                fail(error);
            }
        },
        complete: function(res){
            console.log("saveStorage", res)
            if(complete){
                complete(res);
            }
        }
    });

}
/*
 * 保存数据
 * @param name      存储的key
 * @param tar       存储的对象
*/
function saveStorageSync(name, tar){
    // console.log('normal-saveStorageSync=====' + name)
    return cache.setStorageSync(name, tar);
}
function get(name, success){
    if(success){
        this.getStorage(name, success);
    }else{
        return this.getStorageSync(name);
    }
}
/*
 * 从本地缓存中异步获取指定 key 对应的内容
 * @param name      存储的key
 * @param success   成功回调
 * @param fail      失败回调
 * @param complete  完成回调
*/
function getStorage(name, success, fail, complete){
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
}
/*
 * 从本地缓存中获取指定 key 对应的内容
 * @param name      存储的key
*/
function getStorageSync(name){
    // console.log('normal-getStorageSync=====' + name)
    return cache.getStorageSync(name)
}
/*
 * 从本地缓存中异步移除指定 key
 * @param name      存储的key
 * @param success   成功回调
 * @param fail      失败回调
 * @param complete  完成回调
*/
function removeStorage(name, success, fail, complete){
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
}
/*
 * 从本地缓存中移除指定 key
 * @param name      存储的key
*/
function removeStorageSync(name){
    // console.log('normal-removeStorageSync=====' + name)
    return cache.removeStorageSync(name);
}
/*
 * 异步清空本地缓存
 * @param success   成功回调
 * @param fail      失败回调
 * @param complete  完成回调
*/
function clearStorage(name, success, fail, complete){
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
}
/*
 * 清空本地缓存
*/
function clearStorageSync(){
    // console.log('normal-clearStorageSync=====')
    return cache.clearStorageSync();
}
/*
 * 异步判断本地缓存中是否存在指定 key 对应的内容
 * @param name      存储的key
 * @param success   成功回调
 * @param fail      失败回调
 * @param complete  完成回调
*/
function containStorage(name, success, fail, complete){
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
}
/*
 * 判断本地缓存中是否存在指定 key 对应的内容
 * @param name      存储的key
*/
function containStorageSync(name){
    // console.log('normal-containStorageSync=====' + name)
    return cache.containsStorageSync(name)
}

/* cache */

var normalCache = {
    /*
     * 使用cache的一次性存储来替代以上两个方法
     *
    */
   onceSave: onceSave,
    
   onceGet: onceGet,

   save: save,
   /**
    * 异步保存数据
    * @param name      存储的key
    * @param tar       存储的对象
    * @param success   成功回调
    * @param fail      失败回调
    * @param complete  完成回调
    */
   saveStorage: saveStorage,
   /*
    * 保存数据
    * @param name      存储的key
    * @param tar       存储的对象
   */
   saveStorageSync: saveStorageSync,

   get: get,
   /*
    * 从本地缓存中异步获取指定 key 对应的内容
    * @param name      存储的key
    * @param success   成功回调
    * @param fail      失败回调
    * @param complete  完成回调
   */
   getStorage: getStorage,
   /*
    * 从本地缓存中获取指定 key 对应的内容
    * @param name      存储的key
   */
   getStorageSync: getStorageSync,
   /*
    * 从本地缓存中异步移除指定 key
    * @param name      存储的key
    * @param success   成功回调
    * @param fail      失败回调
    * @param complete  完成回调
   */
   removeStorage: removeStorage,
   /*
    * 从本地缓存中移除指定 key
    * @param name      存储的key
   */
   removeStorageSync: removeStorageSync,
   /*
    * 异步清空本地缓存
    * @param success   成功回调
    * @param fail      失败回调
    * @param complete  完成回调
   */
   clearStorage: clearStorage,
   /*
    * 清空本地缓存
   */
   clearStorageSync: clearStorageSync,
   /*
    * 异步判断本地缓存中是否存在指定 key 对应的内容
    * @param name      存储的key
    * @param success   成功回调
    * @param fail      失败回调
    * @param complete  完成回调
   */
   containStorage: containStorage,
   /*
    * 判断本地缓存中是否存在指定 key 对应的内容
    * @param name      存储的key
   */
   containStorageSync: containStorageSync,
}

/* image */
export { normalCache };
exports.cache = normalCache