<!--
    本页以base为父类
    是单scroller页面的模板
 -->
<template>
<!-- <div> -->
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :isIndex="isIndex" :customBack="customBack" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <scroller class="scroller" ref="mscroller">
            <!-- 通过slot将item布局外放 -->
            <slot></slot>
        </scroller>
        <slot name="action"></slot>
    </base>
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
    padding: 20;
}
</style>
<script>
const normal = require('./normal.js').normal;
import config from './config.js';

export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'scroller'},
        //页面的标题颜色
        barTitleColor:  {default: 'white'},
        //标题栏的返回图片
        backItemImage:  {default: config.dir+'/images/tmp/back.png'},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //是否自定义返回事件 配合事件scrollerBack
        customBack:     {default: false},
        //用于在iOS中进行appear问题的修复
        isIndex:        {default: false},
    },
    components: {
        base: require('./base.vue'),
    },
    data:()=>({

    }),
    created(){

    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('scrollerBack',{});
            }else{
                normal.back();
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
        titleClick(){
            //页面标题点击事件
            this.$emit('scrollerTitle',{});
        },
    },
}
</script>
