import { image, tslenv } from "tesla-native-js"
// import { imageLoad } from "../imageUtil.js"
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
    image.chooseImage({
        count: num,
        sizeType: option.sizeType,
        sourceType: option.sourceType?option.sourceType:['album'],
        filePaths: option.filePaths,
        success: function(res){
            let localIds = res.tempFilePaths; 
            let tempObj = [];                       
            for (let index = 0; index < localIds.length; index++) {
                tempObj.push(getBase64Image4iOS(localIds[index]));
            }
            Promise.all(tempObj).then((result) => {
                var temp = {
                    tempFilePaths: [],
                    wxLocalIds: []
                }
                for (var i = 0; i < result.length; i++) {
                    temp.tempFilePaths.push(result[i].imageSrc);
                    temp.wxLocalIds.push(result[i].localId);
                }
                if(success){
                    success(temp);
                }
            }).catch((error) => {
                if(fail){
                    fail(error);
                }
            }); 
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

/**
 * Private
 * 格式化数据, ios转化为base64图片 用于显示
 * @param imageId: 当前需要转化为base64的图片
 * @return localId: 企业微信相册图片id
 * @return imageSrc: 用于显示的图片的id
 */
function getBase64Image4iOS(imageId) {
    return new Promise((resolve, reject) => {
        console.log("当前转化的图片的id为: ", imageId);

        if (isBrowser && tslenv.getCurrentBrowserType() == "wx") { 
            if (WXEnvironment.deviceModel.toLowerCase() == "android") {
                resolve({
                    localId: imageId,
                    imageSrc:  imageId  
                });
            }else {
                image.getLocalImgData({
                    localId: imageId, // 图片的localID
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (localRes) {
                        let localData = localRes.localData; // localData是图片的base64数据，可以用img标签显示
                        resolve({
                            localId: imageId,
                            imageSrc:  localData    
                        });
                    },
                    fail: function (error) {
                        reject(error);
                    }
                })
            }
        }else {
            resolve({
                localId: imageId,
                imageSrc:  imageId  
            });
        }      
    })
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

function uploadImage(obj){
    image.uploadImage(obj)
}

var normalImage = {
    imagePicker: imagePicker,

    imageInfo: imageInfo,

    previewImage: previewImage,

    uploadImage: uploadImage,

    // imageLoad: imageLoad,
}

/* image */
export { normalImage };
exports.image = normalImage