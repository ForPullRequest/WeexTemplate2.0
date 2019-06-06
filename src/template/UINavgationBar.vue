<!-- 
    废弃 直接用base替代功能
 -->
<template>
    <div  @viewappear="viewWillAppear" @viewdisappear="viewWillDisAppear">
        <div class="container" :style="{height:height+'px','background-color':barBackGroundColor,'padding-top':top+'px'}" v-if="isShow">
            <div class="left_item" @click="touchBack" >
                <image class="back_image" v-if="backItemImage!=''" :src="backItemImage"></image>
            </div>
            <div class="center_item" @click="touchTitle">
                <text class="center_title" :style="{color:barTitleColor}">{{title}}</text>
            </div>
            <div class="right_item" @click="touchRightItem" >
                <text class="right_text" v-if="rightItemText">{{rightItemText}}</text>
                <image class="right_image" v-if="rightItemImage" :src="rightItemImage"></image>
            </div>
        </div>
        <div class="content"
             :style="{'background-color':contentBackGroundColor,
                      'padding-bottom':bottom+'px'}">
            <slot></slot>
        </div>
    </div>

</template>

<style scoped>
    .container {
        flex-direction: row;
        border-bottom-color: #e2e2e2;
        border-bottom-width: 2px;
    }
    .left_item {
        flex: 0.2;
        justify-content: center;
    }
    .center_item {
        flex: 0.6;
        justify-content: center;
    }
    .right_item {
        flex-direction: row;
        flex: 0.2;
        justify-content: flex-end;
        align-items: center;
    }
    .center_title {
        font-size: 36px;
        color: #333333;
        text-align: center;
    }
    .back_image {
        margin-left: 30px;
        height: 44px;
        width: 44px
    }
    .right_text {
        font-size: 28px;
        color: #666666;
        margin-right: 30px;
        text-align: right;
    }
    .right_image {
        margin-right: 30px;
        height: 44px;
        width: 44px;
    }
    .content {
        flex: 1;
    }
</style>

<script>
import {imageLoad} from './imageUtil.js';
import config from './config.js';
export default {
    components: {

    },
    props: {
        BRPageId                : {default: ''},                    //博睿监控PageId
        BRPageName              : {default: ''},                    //博睿监控PageName
        backItemImage           : {default: imageLoad('back',true)},
        rightItemText           : {default: ''},
        rightItemImage          : {default: ''},//ico_menu.png
        contentBackGroundColor  : {default: '#f6f6f6'},
        barBackGroundColor      : {default: 'white'},
        title                   : {default: ''},
        barTitleColor           : {default: '#333333'},
        rightItemColor          : {default: '#666666'},
        isIndex                 : {default: false},
        isShow                  : {default: true},
    },
    data:()=>({
        imageLoad,
        height                  : 112,
        top                     : 40,
        bottom                  : 0
    }),
    methods: {
        touchBack() {
            this.$emit("backItemAction",{});
        },
        touchTitle() {
            this.$emit("titleAction",{});
        },
        touchRightItem() {
            this.$emit("rightItemAction",{});
        },
        viewWillAppear() {
            this.$emit("viewWillAppear",{});
        },
        viewWillDisAppear() {
            this.$emit("viewWillDisAppear",{});
        },
        isWeb () {
            const { platform } = weex.config.env;
            return typeof (window) === 'object' && platform.toLowerCase() === 'web';
        },
        isIOS () {
            const { platform } = weex.config.env;
            return platform.toLowerCase() === 'ios';
        },
        /**
         * 是否为 iPhone X
         * @returns {boolean}
         */
        isIPhoneX () {
            const { deviceHeight } = weex.config.env;
            if (this.isWeb()) {
                return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
            }
            return this.isIOS() && deviceHeight === 2436;
        }
    },
    mounted(){
        if(this.isIndex && weex.config.env.platform==='iOS'){
            this.viewWillAppear();
        }
    },
    created() {
        /**
         * 对导航栏进行设备适配   iOS 40px+88px;  android 112px
         */
        switch (weex.config.env.platform) {
            case "android": {
                this.height     = 112;
                this.top        = 0;
            }
                break;
            default: {
                if (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' || this.isIPhoneX()) {
                    //iphoneX
                    this.top    = 88;
                    this.height = 176;
                    this.bottom = 64;
                } else {
                    this.top    = 40;
                    this.height = 128;
                }
            }
                break;
        }
    }
}
</script>
