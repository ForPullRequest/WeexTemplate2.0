<template>
    <div class="aiCenter column" style="width:608px;height:528px;">
        <div class="row">
            <text class="fontBlack33 text32" style="margin-left:176px;margin-top:48px;">请输入图形验证码</text>
            <div class="imgDiv" style="margin-left:98px;" @click="closeClick">
                <image style="width:44px;height:44px;margin-top:14px;" :src="imageLoad('logo.png')"></image>
            </div>
        </div>
        <text class="text28" style="color:#F6424B;margin-top:24px;" :style="{visibility:showVerifyErr?'visible':'hidden'}">验证码错误，请重新输入</text>
        <div class="row" style="margin-top:16px;">
            <div>
                <image style="width:380px;height:116px;" :src="verifySrc"></image>
            </div>
            <div class="aiCenter jcCenter" style="width:116px;height:116px;background-color:#f6f6f6">
                <image style="width:52px;height:52px;" :src="imageLoad('logo.png')"></image>
            </div>
        </div>
        <div class="row" style="margin-top:48px;" @click="myClick">
            <text class="fontBlack33 alertTxt">{{inputArr[0]}}</text>
            <text class="fontBlack33 alertTxt" 
                style="margin-left:16px;">{{inputArr[1]}}</text>
            <text class="fontBlack33 alertTxt" 
                style="margin-left:16px;">{{inputArr[2]}}</text>
            <text class="fontBlack33 alertTxt" 
                style="margin-left:16px;">{{inputArr[3]}}</text>
        </div>
        <input ref="hidenInput" style="color:white;font-size:0px;" type="number" v-model="inputStr" maxlength="4" @input="myInput" />
    </div>
</template>
<style src="../template/css/common.css"></style>
<style scoped>
.alertTxt{
    background-color:#f6f6f6;
    border-color:#e2e2e2;
    border-width:1px;
    text-align:center;
    font-size:56px;
    border-radius:8px;
    padding-top:22px;
    height:112px;
    width:112px;
}
</style>

<script>
import { imageLoad }   from  '../template/imageUtil.js';
export default{
    components: {
        
    },
    data:()=>({
        imageLoad,
        inputArr:[],
        inputStr:'',
        showVerifyErr:false,
        verifySrc:imageLoad('logo.png'),
    }),
    created(){
        
    },
    methods:{
        closeClick(){
            this.$emit('closeClick', {

            })
        },
        myClick(){
            this.$refs.hidenInput.focus();
        },
        myInput(e){
            this.showVerifyErr = e.value.length == 4
            this.inputArr = e.value.split('')
            if(e.value.length == 4){
                //判断正误
                // this.isShow = false
                this.inputArr = []
                this.inputStr = ''
                // this.getVerify()
            }
        }
    }
}
</script>
