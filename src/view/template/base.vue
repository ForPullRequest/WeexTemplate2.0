<!--
    base为大部分界面的父类
    也可以参照base进行修改建立另外的base样式
 -->
<template>
    <nav :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :contentBackGroundColor="contentBackGroundColor" :barBackGroundColor="barBackGroundColor" :isIndex="isIndex" :isShow="isShow" @viewWillAppear="appear" @backItemAction="back" @titleAction="titleClick" @rightItemAction="right" @viewWillDisAppear="disappear">
        <slot></slot>
    </nav>
</template>
<style scoped>
.row{
    flex-direction: row;
}
.column{
    flex-direction: column;
}
.jcCenter{
    justify-content: center;
}
.aiCenter{
    align-items: center;
}
.flex{
    flex: 1;
}
.red{
    background-color:red;
}
.yellow{
    background-color:yellow;
}
.white{
    background-color: white;
}
.line{
    background-color: #e5e5e5;
    height: 1;
    width: 750;
}
</style>

<script>
import {imageLoad} from './imageUtil.js';
const normal = require('./normal.js').normal;
import config from './config.js';
export default {
    props: {
        //页面的标题
        title:          {default: 'base'},
        //页面的标题颜色
        barTitleColor:  {default: 'white'},
        //页面的标题背景颜色
        barBackGroundColor:  {default: '#314D87'},
        //标题栏的返回图片
        backItemImage:  {default: imageLoad('back.png',true)},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //主体背景色
        contentBackGroundColor: {default: '#f6f6f6'},
        //是否自定义返回事件 配合事件baseBack
        customBack:     {default: false},
        //用于在iOS中进行appear问题的修复
        isIndex:        {default: false},
        //是否显示nav
        isShow:         {default: true},
    },
    components: {
        nav: require('./UINavgationBar.vue'),
    },
    data:()=> ({
        imageLoad,
    }),
    created(){

    },
    methods: {
        appear(){
            //页面显示事件
            this.$emit("baseAppear",{});
        },
        back() {
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('baseBack',{});
            }else{
                normal.back();
            }
        },
        titleClick() {
            //页面标题点击事件
            this.$emit('baseTitle',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('baseRight',{});
        },
        disappear() {
            //页面隐藏事件
            this.$emit('baseDisappear',{});
        }
    }
}
</script>
