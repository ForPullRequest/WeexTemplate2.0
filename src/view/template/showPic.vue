<template>
    <!-- <base :title="title" :isShow="isShow" @baseAppear="appear"> -->
        <div>
            <zoom-img class="img" :style="{width:myWidth,height:myHeight,}" :src='imgUrl'></zoom-img>
            <div class="closeDiv" @click="close">
                <image class="closeImg" src="../../images/tmp/ic_close.png"></image>
            </div>
        </div>
    <!-- </base> -->
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
export default{
    components: {
        // base: require('./base.vue'),
    },
    data:()=>({
        isShow:true,
        title:"查看图片",
        myWidth:750,
        myHeight:0,
        imgUrl:'',//http://img0.bdstatic.com/static/searchresult/img/logo-2X_b99594a.png
    }),
    created(){
        let top = weex.config.env.platform=="android"?48:0;
        this.myHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - top;
        // normal.alert(weex.config.env.deviceHeight);
    },
    methods:{
        appear(){

        },
        close(){
            normal.back();
        }
    }
}
</script>