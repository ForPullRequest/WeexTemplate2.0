<!--
    本页以base为父类
    是单scroller页面的模板
 -->
<template>
<!-- <div> -->
    <baseT :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :barTitleWeight="barTitleWeight" 
    :rightItemText="rightItemText" :rightItemColor="rightItemColor" :rightItemImage="rightItemImage" 
    :rightItemText2nd="rightItemText2nd" :rightItemColor2nd="rightItemColor2nd" :rightItemImage2nd="rightItemImage2nd" 
    :barBorderColor="barBorderColor" :barHasBaseline="barHasBaseline" 
    :contentBackGroundColor="contentBackGroundColor" :barBackGroundColor="barBackGroundColor" 
    :isIndex="isIndex" :isShow="isShow" :customBack="customBack" 
    @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseRight2nd="right2nd" @baseDisappear="disappear">
        <scroller class="scroller" ref="mscroller">
            <!-- 通过slot将item布局外放 -->
            <slot></slot>
        </scroller>
        <slot name="float"></slot>
        <slot name="action"></slot>
    </baseT>
<!-- </div> -->

</template>

<style scoped>
.item {
    height: 88px;
    align-items: center;
}
.scroller{
    flex: 1;
}
.itemDiv{
    padding: 20px;
}
</style>
<script>
import {imageLoad} from './imageUtil.js';
import { getTheme } from "./config.js";
import { navigator, modal } from "./normal.js";

export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'scroller'},
        //页面的标题颜色
        barTitleColor:  {default: ''},
        //页面的标题粗细程度
        barTitleWeight: { default: "" },
        //页面的标题背景颜色
        barBackGroundColor:  {default: ''},
        //页面的标题是否有底线
        barHasBaseline: { default: false },
        //页面的标题底线颜色
        barBorderColor: { default:  ""},
        //标题栏的返回图片
        backItemImage:  {default: ''},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧文字颜色
        rightItemColor: {default: '#666666'},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //标题栏的右侧第二个按钮文字
        rightItemText2nd        : {default: ''},
        //标题栏的右侧第二个按钮文字颜色
        rightItemColor2nd       : {default: '#666666'},
        //标题栏的右侧第二个按钮图片
        rightItemImage2nd       : {default: ''},
        //主体背景色
        contentBackGroundColor: {default: ''},
        //是否自定义返回事件 配合事件scrollerBack
        customBack:     {default: false},
        //用于在iOS中进行appear问题的修复
        isIndex:        {default: false},
        //是否显示nav
        isShow:         {default: true},
    },
    components: {
        baseT: require('./base.vue'),
    },
    data:()=>({
        imageLoad,
    }),
    created(){
        let theme = getTheme();
        this.barTitleColor = this.barTitleColor?this.barTitleColor:theme.barTitleColor
        this.barBackGroundColor = this.barBackGroundColor?this.barBackGroundColor:theme.barBackGroundColor
        this.backItemImage = this.backItemImage?this.backItemImage:theme.backItemImage
        this.contentBackGroundColor = this.contentBackGroundColor?this.contentBackGroundColor:theme.contentBackGroundColor
        this.barTitleWeight = this.barTitleWeight?this.barTitleWeight:theme.barTitleWeight
        this.barHasBaseline = this.barHasBaseline?this.barHasBaseline:theme.barHasBaseline
        this.barBorderColor = this.barBorderColor?this.barBorderColor:theme.barBorderColor
    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('scrollerBack',{});
            }else{
                navigator.back(this);
            }
        },
        appear() {
            //此处不处理refresh和scrollerAppear的关系
            //而交由下级页面的scrollerGet自行解决
            //页面显示事件
            this.$emit("scrollerAppear",{});
            //显示刷新事件 谁用谁管 不逾矩
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('scrollerDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('scrollerRight',{});
        },
        right2nd() {
            this.$emit("scrollerRight2nd", {});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('scrollerTitle',{});
        },
    },
}
</script>
