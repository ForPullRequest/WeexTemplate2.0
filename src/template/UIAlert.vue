<!-- 
    component: 可定制的弹出视图，如只需要简单的title、content、button可使用dialog
    devaloper: zhengweibin
 -->
<template>
    <div v-if="isShow" class="content" @click="touchView">
        <div ref="viewAlertRef"
            class="alert"
            :style="{backgroundColor:backgroundColor, width:width+'px', height:height+'px'}"
            v-if="isShowAlert"
            @click="emptyClick">
                <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .content {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background-color: RGBA(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
    }
    .alert {
        border-radius: 16px;
    }
</style>

<script>
// const animation = require('./Animation').animation;

export default {
    components: {
        
    },
    props: {
        isShow:                 {defalt: false},                 //提示框是否显示
        width:                  {default: 285},                  //提示框宽度
        height:                 {default: 150},                  //提示框高度
        backgroundColor:        {default: 'white'},              //提示框背景
        outClickHide:           {default: true},                 //点击蒙版是否隐藏
    },
    computed: {
        isShowAlert() {
            setTimeout(() => {
                this.animationToShowAlert();
            },50);
            return this.isShow;
        },
    },
    data: function(){
        return {
        }
    },
    methods: {
        emptyClick() {

        },
        touchView() {
            if(this.outClickHide){
                // this.hide();
                this.$emit('touchBG', {})
            }
        },
        animationToShowAlert() {
            // animation.alert(this.$refs.viewAlertRef,() => {});
        }
    },
    created() {

    }
}
</script>