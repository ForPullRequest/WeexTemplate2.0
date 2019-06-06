<!--
    此dialog为带title、带content及按钮的类型
    如果需要自定义则使用alert
-->
<template>
    <div class="container" v-if="show" @click="overlayClick">
        <div class="dialog-box" :style="{borderRadius:borderRadius}" @click="emptyClick">
            <div class="dialog-content">
                <div>
                    <text class="content-title" v-if="!isEmpty(title)">{{title}}</text>
                </div>
                <div>
                    <text class="content-subtext" v-if="!isEmpty(content)">{{content}}</text>
                </div>
            </div>
            <div class="dialog-footer">
                <div class="footer-btn cancel"
                    v-if="!single"
                    @click="secondaryClicked">
                    <text class="btn-text" :style="{ color: cancelColor }">{{cancelText}}</text>
                </div>
                <div class="footer-btn confirm" @click="primaryClicked">
                    <text class="btn-text" :style="{ color: confirmColor }">{{confirmText}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        width: 750px;
        background-color: RGBA(0, 0, 0, 0.5);
        /*兼容H5异常*/
        z-index: 99999;
        align-items: center;
        justify-content: center;
    }
    .dialog-box {
        width: 580px;
        background-color: #FFFFFF;
    }
    .dialog-content {
        padding-top: 56px;
        padding-bottom: 56px;
        padding-left: 40px;
        padding-right: 40px;
    }
    .content-title {
        color: #111111;
        font-size: 32px;
        font-weight: bold;
        line-height: 44px;
        text-align: center;
    }
    .content-subtext {
        margin-top: 24px;
        color: #666666;
        font-size: 32px;
        line-height: 36px;
        text-align: center;
    }
    .dialog-footer {
        flex-direction: row;
        align-items: center;
        border-top-color: #F3F3F3;
        border-top-width: 1px;
    }
    .footer-btn {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 96px;
    }
    .cancel {
        border-right-color: #F3F3F3;
        border-right-width: 1px;
    }
    .btn-text {
        font-size: 34px;
        color: #666666;
    }
</style>

<script>
import { WxcOverlay } from "weex-ui";
export default {
    components: { WxcOverlay },
    props: {
        //显示弹窗
        show: {
            type: Boolean,
            default: false
        },
        //是否单个按钮，单个按钮为confirm
        single: {
            type: Boolean,
            default: false
        },
        //标题文字
        title: {
            type: String,
            default: ''
        },
        //正文文字
        content: {
            type: String,
            default: ''
        },
        //取消（左侧）按钮文字
        cancelText: {
            type: String,
            default: '取消'
        },
        //确认（右侧）按钮文字
        confirmText: {
            type: String,
            default: '确定'
        },
        //确认（右侧）按钮文字颜色
        confirmColor: {
            type: String,
            default: '#EE9900'
        },
        //取消（左侧）按钮文字颜色
        cancelBtnColor: {
            type: String,
            default: '#666666'
        },
        //弹框外围圆角
        borderRadius:{
            type: Number,
            default: 16 
        },
        //是否支持点击蒙层关闭弹窗即取消点击
        outClickHide: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        pageHeight: 1334
    }),
    created () {
        const { env: { deviceHeight, deviceWidth } } = weex.config;
        this.pageHeight = deviceHeight / deviceWidth * 750;
    },
    methods: {
        hide(){
            this.show = false;
        },
        isEmpty(obj){
            if(obj== null || obj == undefined || obj ==''){
                return true
            }
            return false
        },
        secondaryClicked () {
            this.$emit('dialogCancel', {
                type: 'confirm',
                // hide: ()=>{
                //     this.hide()
                // }
            });
        },
        primaryClicked (e) {
            this.$emit('dialogConfirm', {
                type: 'confirm',
                // hide: ()=>{
                //     this.hide()
                // }
            });
        },
        overlayClick () {
            if(this.outClickHide){
                // this.hide();
                this.$emit('touchBG', {})
            }
        },
        emptyClick (){

        }
    }
};
</script>