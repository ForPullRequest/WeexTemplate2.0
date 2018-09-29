<template>
    <div class="container">
        <image :src="welcome" class="image" @load="animationStart" ></image>
        <div class="mask" :style="{opacity: o}"></div>
        <svAlert :isShow="sShow" @sure="sSure"></svAlert>
        <!-- <dvAlert :isShow="dShow" @sure="dSure" @cancel="dCancel"></dvAlert> -->
    </div>
</template>

<style scoped>
.container {
    width: 750px;
    flex: 1;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: white;
}
.image {
    width: 750px;
    flex: 1;
    background-color: #99a9bf;
    opacity: 0.75;
}
</style>

<script>
    import hotfix from './js/hotfix'
    import { navigator, cache, im }   from "tesla-native-js"//, hotfix
    import netUtil                    from './js/net/base_net.js';
    import {initBR, brKeys, brEvent}  from './js/BR/BRConfig.js';
    import userInfo                   from './js/cache/userInfo.js';
    import alertUtil                  from "./js/utils/alertUtils.js";
    var    modal                         = weex.requireModule('modal')
    // import versionManager             from './js/version/versionManager.js';
    import svAlert                    from './js/version/singleVersionAlert.vue';
    // import dvAlert                    from './js/version/doubleVersionAlert.vue';
    const  configUtil                 =   weex.requireModule("tsl-utility");
    const environment                 = configUtil.getTSLConfigPlistWithKey("Environment");           //当前请求地址的环境
    const environments                = configUtil.getTSLConfigPlistWithKey("EnvironmentSettings");   //当前所有的环境
    const currentEnvironment          = environments[environment];                                    //当前使用的环境
    const configVersion               = currentEnvironment.JSVersion;                                 //版本
    const jsAppId                     = configVersion.TeslaAppId;                                     //当前应用index的热更新id

export default {
    data() {
        return {
            o: 1,
            // welcome: "./images/welcome.png",
            welcome: configUtil.getTSLConfigPlistWithKey("welcomeSrc"),
            info: {},
            neworganization: {},

            sShow: false,   //但按钮控制
            dShow: false,   //双按钮控制
            versionData: "",
            storeUrl:'',
        };
    },
    components: {
        svAlert//, dvAlert
    },
    mounted() {
        console.log("===========");
        // this.animationStart();  //图片显示动画放到图片加载完成之后 @load
    },
    created() {
        initBR(); //初始化博睿监控
    },
    methods: {
        sSure() {
            //跳转到App Store并退出应用
            configUtil.openUrl(this.storeUrl);
            navigator.exit();
        },
        animationStart: function () {
            setTimeout(() => {
                this.o -= 0.05;
                if (this.o < 0) {
                    this.o = 0;
                    //是否自定义进入商店逻辑
                    //test
                    hotfix.config.clockHour = -1;
                    hotfix.config.isCustomStore = true;
                    hotfix.start(jsAppId, 'index', function(suc){
                        switch(suc.sucCode){
                            //检查时钟
                            case hotfix.sucCode.NUM_SUCCESS_CLOCK:
                            //成功更新
                            case hotfix.sucCode.NUM_SUCCESS_UPDATE:
                            //无需更新
                            case hotfix.sucCode.NUM_SUCCESS_NO_NEED:{
                                //正常进入
                                this.checkUserStatus();
                                break;
                            }
                            //到应用市场
                            case hotfix.sucCode.NUM_SUCCESS_GOTO_STORE:{
                                this.sShow = true;
                                this.storeUrl = suc.storeUrl;
                                break;
                            }
                        }
                    }.bind(this), function(fail){
                        switch(fail.failCode){
                            //没有suc或者fail
                            case hotfix.failCode.NUM_FAIL_NO_CALLBACK:
                            //getPackageState出错
                            case hotfix.failCode.NUM_FAIL_GET_PACKAGE_STATE:
                            //请求出错
                            case hotfix.failCode.NUM_FAIL_REQUEST:
                            //JSON.parse出错
                            case hotfix.failCode.NUM_FAIL_JSON_PARSE:
                            //下载文件出错
                            case hotfix.failCode.NUM_FAIL_DOWNLOAD_FILE:
                            //跳转商店地址为空
                            case hotfix.failCode.NUM_FAIL_STORE_NULL:
                            //更新解压缩出错
                            case hotfix.failCode.NUM_FAIL_UPDATE_PACKAGE:{
                                //正常进入
                                this.checkUserStatus();
                                break;
                            }
                        }
                    }.bind(this));
                } else {
                    this.animationStart();
                }
            }, 80);
        },
        checkUserStatus: function () {
            this.info = userInfo.get();
            this.neworganization = userInfo.getNewOrganiz();

            console.log("1登录的信息为: ", this.info);
            console.log("2登录的信息为: ", this.neworganization);
            if (this.info && this.info.Token && this.neworganization != "") {
                //已登录
                if (this.neworganization) {
                    this.changeUnion();
                } else {
                    // navigator.redirectTo({ url: "view/login" });
                }
            } else {
                //未登录
                // navigator.redirectTo({ url: "view/login" });
            }
        },
        changeUnion: function() {
            brEvent(brKeys.login);
            var unionid = this.neworganization.union_id;
            var hosid = this.neworganization.HospitalId;
            var sectionid = this.neworganization.SectionId;
            var docid = this.neworganization.DoctorId;

            netUtil.request({
                method: "post",
                backAll: true,
                url: netUtil.api.CHANGE_UNION + "?unionid=" + unionid + "&hosid=" + hosid + "&sectionid=" + sectionid + "&doctorid=" + docid,
                contentType: "application/json",
                params: {},
                success: res => {
                    // navigator.redirectTo({ url: "view/main" });
                },
                fail: error => {
                    console.log("error: ", error);
                    // navigator.redirectTo({ url: "view/login" });
                }
          });
        }
    }
}
</script>

