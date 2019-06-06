<!--
    base为大部分界面的父类
    也可以参照base进行修改建立另外的base样式
 -->
<template>
    <div @viewappear="viewWillAppear" @viewdisappear="viewWillDisAppear" style="flex: 1">
        <div class="container" :style="{height:height+'px','background-color':barBackGroundColor,'padding-top':top+'px',
            'border-bottom-color': barBorderColor,'border-bottom-width': barHasBaseline?'2px':'0'}"
         v-if="isShow&& tslenv.getCurrentPlatform() !=tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser">
            <div class="left_item" @click="touchBack" >
                <image class="back_image" v-if="backItemImage!=''" :src="backItemImage"/>
            </div>
            <div class="center_item" @click="touchTitle">
                <text class="center_title" :style="{color:barTitleColor,'font-weight':barTitleWeight}">{{title}}</text>
            </div>
            <div style="flex-direction: row;flex: 0.2;">
              <div class="right_item" @click="touchRightItem2nd" v-if="rightItemText2nd||rightItemImage2nd">
                <text class="right_text" v-if="rightItemText2nd" :style="{color:rightItemColor2nd}">{{rightItemText2nd}}</text>
                <image class="right_image" v-if="rightItemImage2nd" :src="rightItemImage2nd"></image>
              </div>
              <div class="right_item" @click="touchRightItem" v-if="rightItemText||rightItemImage">
                <text class="right_text" v-if="rightItemText" :style="{color:rightItemColor}">{{rightItemText}}</text>
                <image class="right_image" v-if="rightItemImage" :src="rightItemImage"></image>
              </div>
            </div>
        </div>
        <div class="content"
             :style="{'background-color':contentBackGroundColor,
                      'padding-bottom':bottom}">
            <slot></slot>
        </div>
    </div>

</template>

<style scoped>
.container {
  flex-direction: row;
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
  flex: 0.1;
  justify-content: flex-end;
  align-items: center;
}
.center_title {
  font-size: 36px;
  /* color: #333333; */
  text-align: center;
}
.back_image {
  margin-left: 30px;
  height: 44px;
  width: 44px;
}
.right_text {
  font-size: 28px;
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
import { imageLoad } from "./imageUtil.js";
import { getTheme } from "./config.js";
import { navigator, modal } from "./normal.js";
import { tslenv } from "tesla-native-js";
export default {
  components: {},
  props: {
    // BRPageId                : {default: ''},                    //博睿监控PageId
    // BRPageName              : {default: ''},                    //博睿监控PageName
    //页面的标题
    title: { default: "base" },
    //页面的标题颜色
    barTitleColor: { default: "" },
    //页面的标题粗细程度
    barTitleWeight: { default: "" },
    //页面的标题背景颜色
    barBackGroundColor: { default: "" },
    //页面的标题是否有底线
    barHasBaseline: { default: false },
    //页面的标题底线颜色
    barBorderColor: { default:  ""},
    //标题栏的返回图片
    backItemImage: { default: '' },
    //标题栏的右侧文字
    rightItemText: { default: "" },
    //标题栏的右侧文字颜色
    rightItemColor: {default: '#666666'},
    //标题栏的右侧图片
    rightItemImage: { default: "" },
    //标题栏的右侧第二个按钮文字
    rightItemText2nd        : {default: ''},
    //标题栏的右侧第二个按钮文字颜色
    rightItemColor2nd       : {default: '#666666'},
    //标题栏的右侧第二个按钮图片
    rightItemImage2nd       : {default: ''},
    //主体背景色
    contentBackGroundColor: { default: "" },
    //是否自定义返回事件 配合事件baseBack
    customBack: { default: false },
    //用于在iOS中进行appear问题的修复
    isIndex: { default: false },
    //是否显示nav
    isShow: { default: true }
  },
  data: () => ({
    imageLoad,
    height: 112,
    top: 40,
    bottom: 0,
    tslenv
  }),
  methods: {
    touchBack() {
      if (this.customBack) {
        //页面自定义退出事件
        this.$emit("baseBack", {});
      } else {
        navigator.back(this);
      }
    },
    touchTitle() {
      this.$emit("baseTitle", {});
    },
    touchRightItem() {
      this.$emit("baseRight", {});
    },
    touchRightItem2nd() {
      this.$emit("baseRight2nd",{});
    },
    viewWillAppear() {
      this.$emit("baseAppear", {});
    },
    viewWillDisAppear() {
      console.warn("viewWillDisAppear");
      this.$emit("baseDisappear", {});
    },
    isWeb() {
      const { platform } = weex.config.env;
      return typeof window === "object" && platform.toLowerCase() === "web";
    },
    isIOS() {
      const { platform } = weex.config.env;
      return platform.toLowerCase() === "ios";
    },
    /**
     * 是否为 iPhone X
     * @returns {boolean}
     */
    isIPhoneX() {
      const { deviceHeight } = weex.config.env;
      if (this.isWeb()) {
        return (
          typeof window !== undefined &&
          window.screen &&
          window.screen.width &&
          window.screen.height &&
          parseInt(window.screen.width, 10) === 375 &&
          parseInt(window.screen.height, 10) === 812
        );
      }
      return this.isIOS() && deviceHeight === 2436;
    }
  },
  mounted() {
    if (
      tslenv.getCurrentPlatform() ==
        tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser ||
      (this.isIndex && tslenv.getCurrentOS() == tslenv.TSL_ENV_CONSTANTS_OS.iOS)
    ) {
      this.viewWillAppear();
    }
  },
  created() {
    /**
     * 对导航栏进行设备适配   iOS 40px+88px;  android 112px
     */
    if (
      tslenv.getCurrentPlatform() == tslenv.TSL_ENV_CONSTANTS_PLATFORM.browser
    ) {
      document.title = this.title;
    }
    switch (weex.config.env.platform) {
      case "android":
        {
          this.height = 112;
          this.top = 0;
        }
        break;
      default:
        {
          if (
            weex.config.env.deviceModel === "iPhone10,3" ||
            weex.config.env.deviceModel === "iPhone10,6" ||
            this.isIPhoneX()
          ) {
            //iphoneX
            this.top = 88;
            this.height = 176;
            this.bottom = 64;
          } else {
            this.top = 40;
            this.height = 128;
          }
        }
        break;
    }
    let theme = getTheme();
    this.barTitleColor = this.barTitleColor?this.barTitleColor:theme.barTitleColor
    this.barBackGroundColor = this.barBackGroundColor?this.barBackGroundColor:theme.barBackGroundColor
    this.backItemImage = this.backItemImage?this.backItemImage:theme.backItemImage
    this.contentBackGroundColor = this.contentBackGroundColor?this.contentBackGroundColor:theme.contentBackGroundColor
    this.barHasBaseline = this.barHasBaseline?this.barHasBaseline:theme.barHasBaseline
    this.barTitleWeight = this.barTitleWeight?this.barTitleWeight:theme.barTitleWeight
    this.barBorderColor = this.barBorderColor?this.barBorderColor:theme.barBorderColor
  }
};
</script>
