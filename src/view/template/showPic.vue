<template>
    <base :title="title" :isShow="isShow" :customBack="customBack" @baseAppear="appear" @baseBack="back">
        <zoom-img class="img" :style="{width:myWidth,height:myHeight,}" :src='imgUrl'></zoom-img>
    </base>
</template>

<style scoped>
.img{
    resize: contain;
}
.closeImg{
    width: 66;
    height: 66;
}
.closeDiv{
    position: absolute;
    right: 20;
    top: 20;
}
</style>

<script>
const normal = require('./normal.js').normal;
import config from './config.js';
export default{
    components: {
        base: require('./base.vue'),
    },
    props:{
        //是否自定义返回事件
        customBack:     {default: false},
    },
    data:()=>({
        config,
        isShow:true,
        title:"查看图片",
        myWidth:750,
        myHeight:0,
        imgUrl:'',//http://img0.bdstatic.com/static/searchresult/img/logo-2X_b99594a.png
    }),
    created(){
        let top = weex.config.env.platform=="android"?48:0;
        top += this.getNavHeight();
        this.myHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - top;
        // normal.alert(weex.config.env.deviceHeight);
    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('showPicBack',{});
            }else{
                normal.back();
            }
        },
        appear(){

        },
        close(){
            normal.back();
        },
        getNavHeight(){
            let height = 0;
            switch (weex.config.env.platform) {
                case "android": {
                    height     = 112;
                }
                    break;
                default: {
                    if (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6') {
                        //iphoneX
                        height = 176;
                    } else {
                        height = 128;
                    }
                }
                    break;
            }
            return height;
        }
    }
}
</script>