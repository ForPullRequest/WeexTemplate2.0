<template>
    <baseT :title="title">
        <div class="flex mydiv aiCenter jcCenter" style="width:750px;">
            <UIRichText :richtext="mRichtext" :richWidth="550">
            </UIRichText>
        </div>
    </baseT>
</template>
<style src="../template/css/common.css"></style>
<style scoped>
.mydiv{
    background-color: red;
}
</style>
<script>
import { richtext } from './richtext.js';
// import { modal }  from "../template/normal.js";
export default{
    components: {
        baseT: require('../template/base.vue'),
        UIRichText: require('../template/UIRichText.vue'),
    },
    data:()=>({
        title:'富文本',
        mRichtext:'',
    }),
    created(){
        this.mRichtext = richtext;
    },
    methods:{
        
    }
}
</script>