<!-- 
    本页可以算作是listT的demo
 -->
<template>
    <listT ref="list" title="index" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" :isIndex="true" @listAdapter="getList" @listAppear="appear">
        <cell v-for="itemData, index in list">
            <list-item class="itemDiv" :hasTouchStyle="false" @onclick="itemClick(index)">
                <text class="item" :value="itemData.text"></text>
                <div class="btnRowDiv">
                    <div class="btnDiv" v-if="itemData.src" @click="bodyClick(index)" @longpress="longpress(true, index)">
                        <text class="demoTxt">本体</text>
                    </div>
                    <div class="btnDiv" style="margin-left: 20;" v-if="itemData.demoSrc" @click="demoClick(index)" @longpress="longpress(false, index)">
                        <text class="demoTxt">demo</text>
                    </div>
                </div>
            </list-item>
        </cell>
    </listT>
</template>
<style>
.btnDiv{
    border-color: #999999;
    border-width: 2;
    border-radius: 16;
    padding: 12;
}
.btnRowDiv{
    margin-top: 10;
    flex-direction: row;
    justify-content: flex-end;
}
.bodyTxt{
    font-size: 28;
    color: #66ccff;
}
.demoTxt{
    font-size: 28;
    color: #ff7b35;
}
.itemDiv{
    flex-direction: column;
    padding: 20;
}
.item {
    align-items: center;
    font-size: 32
}
</style>
<script>
// const normal = require('./old/normal.js').normal;
const newNormal = require('./normal.js').normal;
// import { modal, navigator, image, cache } from "tesla-native-js"
export default {
    components: {
        // listT: require('./old/listT.vue'),
        // 'list-item': require('./old/UIListItem.vue'),
        listT: require('./listT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=> ({
        pageNo:1,
        totalPage:1,
        list:[],
        isNew:true,
        nowDir:'template',
    }),
    created(){

    },
    methods: {
        getList(listT){
            //模拟数据获取
            setTimeout(function() {
                if(listT.isRefresh){//刷新
                    this.pageNo = 1;
                    this.totalPage = 3;
                    this.list = [{
                        text:'empty(只用于复制粘贴)',
                        src:'empty'
                    },{
                        text:'base【推荐使用】',
                        src:'base',
                        demoSrc:'baseEmpty'
                    },{
                        text:'list【推荐使用】',
                        src:'listT',
                        demoSrc:'listEmpty'
                    },{
                        text:'scroller【推荐使用】',
                        src:'scrollerT',
                        demoSrc:'scrollerEmpty'
                    },{
                        text:'tabList【推荐使用】',
                        src:'tabListT',
                        demoSrc:'tabListEmpty'
                    },{
                        text:'form【推荐使用】',
                        src:'formT',
                        demoSrc:'formEmpty'
                    },{
                        text:'sheet【推荐使用】',
                        src:'sheetT',
                        demoSrc:'sheetEmpty'
                    },{
                        text:'column【推荐使用】',
                        src:'columnT',
                        demoSrc:'columnEmpty'
                    },{
                        text:'search【推荐使用】',
                        src:'searchT',
                        demoSrc:'searchEmpty'
                    },{
                        text:'tabbar【作废】',//为了适配h5 需要纯js控件
                        // src:'tabbarT'
                    },{
                        text:'发送验证码倒计时【组件】',//新的已有
                        src:''
                    },{
                        text:'搜索框【组件】',//新的已有
                        src:''
                    },];
                }else{//加载更多
                    this.pageNo ++;
                    this.list.push({
                        text:'empty',
                    })
                }
                //结束
                listT.end();
            }.bind(this), 500);
        },
        appear(){
            this.$refs.list.refresh();
        },
        itemClick(index) {
            // normal.toast(this.list[index]);
            // normal.push({src:this.list[index].src})
        },
        longpress(isBody, index) {
            let oldSrc = this.nowDir + '/' + this.list[index].src;
            let newSrc = './' + this.list[index].src;
            let oldDemoSrc = this.nowDir + '/' + this.list[index].demoSrc;
            let newDemoSrc = './' + this.list[index].demoSrc;
            if(!this.isNew){
                // normal.toast(isBody 
                //     ? (this.isNew ? newSrc : oldSrc) 
                //     : (this.isNew ? newDemoSrc : oldDemoSrc));
            }else{
                newNormal.toast(isBody 
                    ? (this.isNew ? newSrc : oldSrc) 
                    : (this.isNew ? newDemoSrc : oldDemoSrc));
            }
        },
        bodyClick(index) {
            let oldSrc = this.nowDir + '/' + this.list[index].src;
            let newSrc = './' + this.list[index].src;
            if(!this.isNew){
                // normal.push({src: this.isNew ? newSrc : oldSrc});
            }else{
                newNormal.push({src: this.isNew ? newSrc : oldSrc});
                // navigator.push({
                //     url: this.isNew ? newSrc : oldSrc,
                //     option: {},
                // }, function () {
                // });
            }
        },
        demoClick(index) {
            let oldDemoSrc = this.nowDir + '/' + this.list[index].demoSrc;
            let newDemoSrc = './' + this.list[index].demoSrc;
            if(!this.isNew){
                // normal.push({src: this.isNew ? newDemoSrc : oldDemoSrc});
            }else{
                newNormal.push({src: this.isNew ? newDemoSrc : oldDemoSrc});
                // navigator.push({
                //     url: this.isNew ? newDemoSrc : oldDemoSrc,
                //     option: {},
                // }, function () {
                // });
            }
        }
    }
}
</script>
