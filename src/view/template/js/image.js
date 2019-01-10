import { image, tslenv } from "tesla-native-js"
import { chooseImage, getServerImage} from "./chooseImageUtils.js";
import { imageLoad } from "../imageUtil.js"
var isBrowser = tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser

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
function imagePicker(num, option, success, fail, complete){

    //微信
    if (weex.config.env.platform.toLowerCase() === 'web' && window.navigator.userAgent.indexOf("MicroMessenger") != -1) {
        chooseImage(num).then((res) => {
            // [{localId: imageId, imageSrc:  localData}]
            var temp = {
                tempFilePaths: [],
                wxLocalIds: []
            }
            for (var i = 0; i < res.length; i++) {
                temp.tempFilePaths.push(res[i].imageSrc);
                temp.wxLocalIds.push(res[i].localId);
            }

            if(success){
                success(temp);
            }
        }).catch((err) => {
            if(fail){
                fail(error);
            }
        });
    }else {
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
    }
}
function imageInfo(src, success, fail, complete){
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
}
function previewImage(current, urls, success, fail, complete){
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

}

var normalImage = {
    imagePicker: imagePicker,

    imageInfo: imageInfo,

    previewImage: previewImage,

    imageLoad: imageLoad,
}

/* image */
export { normalImage };
exports.image = normalImage