<template>
    <tabListT ref="tabList" title="title" barTitleColor="white" :items="tabs" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="getHasEnd()" :isCenter="true" :itemViewColor="itemViewColor" :itemViewHeight="itemViewHeight" :itemTextFont="itemTextFont" :itemNormolColor="itemNormolColor" :itemSelectColor="itemSelectColor" :noContentImg="noContentImg" :noContentTxt="noContentTxt" :customBack="false" :backItemImage="backItemImage" rightItemText="" rightItemImage="" :isIndex="false" 
        @tabListBack="tabListBack" @tabListAdapter="getList" @tabListAppear="appear" @tabListDisappear="tabListDisappear" @tabListPage="tabListPage" @tabListRight="tabListRight" @tabListTitle="tabListTitle">
        <div slot="top">
            <text class="tips">top</text>
        </div>
        <div slot="middle">
            <text class="tips">middle</text>
        </div>
        <cell v-for="(itemData, index) in list" :key="index">
            <div class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
                <text class="item">{{itemData.text}}</text>
            </div>
        </cell>
        <div slot="bottom">
            <text class="tips">bottom</text>
        </div>
    </tabListT>
</template>

<style scoped>

.itemDiv{
    padding: 20px;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32px;
}
.tips{
    padding-left: 28px;
    padding-right:28px;
    padding-top:18px;
    padding-bottom:18px;
    font-size:32px;
    color: #666666;
    lines: 2;
    text-overflow: ellipsis;
}
</style>

<script>
import {modal} from '../template/normal.js';
export default{
    components: {
        tabListT: require('../template/tabListT.vue'),
    },
    data:()=>({
        itemViewColor:"#FAFAFA",
        itemViewHeight:96,
        itemTextFont:34,
        itemNormolColor:"#000000",
        itemSelectColor:"#1c97fc",
        // noContentImg:'../../images/tmp/components/ic_no_content.png',
        // noContentTxt:'暂无数据',
        // backItemImage:"",
        tabs:[{
            name: "tab1",
            isSelect: true,
        },{
            name: "tab2",
            isSelect: false,
        }],
        items:[{
            name: "tab1",
            isSelect: true,
            list: [],
            pageNo: 1,//当前页码
            pageSize: 10,//当前页显示数据的条数
            totalPage: 1,//总页数
        },{
            name: "tab2",
            isSelect: false,
            list: [],
            pageNo: 1,//当前页码
            pageSize: 10,//当前页显示数据的条数
            totalPage: 1,//总页数
        }],
        list:[],//只用于显示
        selectIndex:0,//当前选择的tab 为了hasEnd
        isCache:false,
        // lastIndex:0,//上次显示的tab
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.tabList.refresh();
        },
        tabListPage(page) {
            this.selectIndex = page.selectIndex;
            //如果已在当前页又点击了当前页tab则返回，也可根据项目需求进行刷新
            if(page.selectIndex == page.lastIndex){
                return;
            }
            this.isCache = true;
            page.showData();
        },
        getHasEnd() {
            return this.items[this.selectIndex].pageNo >= this.items[this.selectIndex].totalPage
        },
        getList(tabListT) {
            if(tabListT.isRefresh && this.isCache && this.items[this.selectIndex].list.length > 0){//刷新
                //当缓存中有数据时且是通过tab取缓存
                this.isCache = false;
                this.cache(tabListT);
            }else{//加载更多
                this.requestList(tabListT);
            }
        },
        cache(tabListT) {
            modal.toast('cache' + tabListT.selectIndex)
            this.list = this.items[tabListT.selectIndex].list;
            tabListT.lastIndex = tabListT.selectIndex;
            tabListT.end();
        },
        requestList(tabListT){
            let pageNo = tabListT.isRefresh
                ? 1 
                : this.items[tabListT.selectIndex].pageNo + 1;
            //模拟数据获取
            setTimeout(function() {
                //赋值total
                this.items[tabListT.selectIndex].totalPage = 2;
                //确定pageNo赋值 避免因为请求失败造成pageNo错误
                this.items[tabListT.selectIndex].pageNo = pageNo;
                if(pageNo == 1){//刷新判定
                    modal.toast('refresh' + tabListT.selectIndex)
                    //赋值list
                    this.list = [];
                    for (var i = 0; i < this.items[tabListT.selectIndex].pageSize; i++) {
                        this.list.push({
                            text:'text'+tabListT.selectIndex+i
                        })
                    }
                    //赋值cache
                    this.items[tabListT.selectIndex].list = this.list;
                }else{//加载判定
                    modal.toast('load' + tabListT.selectIndex)
                    //赋值list 一般为list的concat操作
                    for (var i = 0; i < this.items[tabListT.selectIndex].pageSize; i++) {
                        this.list.push({
                            text:'empty'+tabListT.selectIndex+i,
                        })
                    }
                    //赋值cache
                    this.items[tabListT.selectIndex].list = this.list;
                }
                
                //结束
                tabListT.end();
            }.bind(this), 1000);
        },
        // tabListBack(){//customBack为true时可用
        //     modal.alert("tabListBack");
        // },
        tabListDisappear(){

        },
        tabListRight(){
            // modal.alert("This is tabListRight");
        },
        tabListTitle(){
            // modal.alert("This is tabListTitle");
        }
    }
}
</script>