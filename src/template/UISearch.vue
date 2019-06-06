<template>
    <div style="height:100px;">
        <!-- show -->
        <div class="searchWrapper" :style="{'background-color':searchOutBackground,}" v-if="!isSearch">
            <div class="searchContent" :style="{'background-color':searchInnerBackground,}" @click="showSearch">
                <image :src="imageLoad('search',true)" style="height: 36px;width: 36px" ></image>
                <text class="searchText">{{searchDisplayTxt}}</text>
            </div>
        </div>
        <!-- input -->
        <div class="searchWrapper" :style="{'background-color':searchOutBackground,}" v-if="isSearch">
            <div class="inputContent" :style="{'background-color':searchInnerBackground,}">
                <div style="margin-left: 16px;margin-right: 8px;">
                    <image :src="imageLoad('search',true)" style="height: 36px;width: 36px;" ></image>
                </div>
                <input ref="searchInput" class="input" :type="inputType" v-model="keyword" @input="input" :placeholder="placeholder" @return="returnClick"/>
                <div style="margin-right: 16px;margin-left: 16px;" @click="eraser">
                    <image :src="imageLoad('erase',true)" style="width:28px;height: 28px;"></image>
                </div>
            </div>
            <div class="cancelDiv" @click="hideSearch">
                <text class="cancelText">取消</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input {
    padding-top: 10px;
    padding-bottom: 10px;
    flex: 1;
    font-size: 28px;
    color: black;
}
.searchWrapper {
    flex-direction: row;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    padding-right: 24px;
    width: 750px;
}
.inputContent {
    align-items: center;
    flex-direction: row;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    flex: 1;
}
.searchContent {
    flex: 1;
    flex-direction: row;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
}
.cancelDiv{
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 12px;
    justify-content: center;
}
.cancelText{
    color: #4185F3;
    font-size: 34px;
}
.searchText {
    color: #9B9B9B;
    font-size: 28px;
    margin-left: 16px;
}
</style>

<script>
import {imageLoad} from './imageUtil.js';
export default {
    props:{
        //input的缺省文字
        placeholder:    {default: '请输入关键字'},
        //搜索处展示文字
        searchDisplayTxt:      {default: '搜索'},
        //搜索栏外背景色
        searchOutBackground:   {default: '#f6f6f6'},
        //搜索栏内背景色
        searchInnerBackground:   {default: 'white'},

    },
    data:()=>({
        imageLoad,
        isSearch:false,
        keyword:'',
    }),
    methods: {
        //search
        showSearch(){
            setTimeout(function() {
                this.$refs.searchInput.focus();
            }.bind(this), 200);
            this.isSearch = true;
            this.$emit("searchShow",{
                isSearch: this.isSearch
            });
        },
        eraser(){
            this.keyword = '';
            this.$emit("eraser");
        },
        hideSearch(){
            // this.$refs.searchInput.blur();
            this.isSearch = false;
            this.$emit("hideSearch",{
                isSearch:this.isSearch,
            });
        },
        input(e){
            this.$emit("searchInput",{
                value:e.value,
            });
        },
        returnClick(){
            this.$emit("returnClick", {
                value:this.keyword
            })
        }
    }
}
</script>
