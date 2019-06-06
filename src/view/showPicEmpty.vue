<template>
    <baseT :title="title" :isShow="isShow" :customBack="customBack" @baseAppear="appear" @baseBack="back">
        <zoom-img class="img" :style="{width:myWidth+'px',height:myHeight+'px',}" :src='imgUrl'></zoom-img>
    </baseT>
</template>

<style scoped>
.img{
    resize: contain;
}
.closeImg{
    width: 66px;
    height: 66px;
}
.closeDiv{
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>

<script>
import { navigator } from '../template/normal.js'
export default{
    components: {
        baseT: require('../template/base.vue'),
    },
    props:{
        //是否自定义返回事件
        customBack:     {default: false},
    },
    data:()=>({
        isShow:true,
        title:"查看图片",
        myWidth:750,
        myHeight:0,
        imgUrl:'',
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
                navigator.back(this);
            }
        },
        appear(){

        },
        close(){
            navigator.back(this);
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