<!-- 
    帮助中心详情
    hkq
-->
<template>
    <div class="flex" :style="{width: richWidth + 'px'}">
        <!-- <tsl-richtext class="" style="width:750px;" :content="richtext" ></tsl-richtext> -->
        <tsl-web class="flex" :style="{width: richWidth + 'px'}" ref="webc" :src="header+richtext+footer" @pagestart="webload" @pagefinish="loadfinish" @event="notice" ></tsl-web>
    </div>
</template>
<style src="./css/common.css"></style>
<style scoped>
</style>
<script>
// import { richtext } from './richtext.js';
// import { modal }  from "../template/normal.js";
export default{
    props: {
        richWidth: { default: 750 },
        richtext: { default:'' },
    },
    components: {
    },
    data:()=>({
        header:'<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width"><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>',
        footer:'</body></html>',
    }),
    created(){
        // this.richtext = this.header + richtext + this.footer;
    },
    methods:{
        
    }
}
</script>