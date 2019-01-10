<!--
    本页以base为父类
    是多个可切换标签的单list页面的模板
 -->
<template>
<!-- <div> -->
    <baseT :backItemImage="backItemImage" :barBackGroundColor="barBackGroundColor" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemColor="rightItemColor" :rightItemImage="rightItemImage" :isIndex="isIndex" :customBack="customBack" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <!-- 搜索栏 -->
        <div v-if="hasSearch">
            <!-- show -->
            <div class="searchWrapper" v-if="!isSearch">
                <div class="searchContent" @click="showSearch">
                    <image :src="imageLoad('search',true)" style="height: 36px;width: 36px" ></image>
                    <text class="searchText">搜索</text>
                </div>
            </div>
            <!-- input -->
            <div class="searchWrapper" v-if="isSearch">
                <div class="inputContent">
                    <div style="margin-left: 16px;margin-right: 8px;">
                        <image :src="imageLoad('search',true)" style="height: 36px;width: 36px;" ></image>
                    </div>
                    <input ref="searchInput" class="input" :type="inputType" v-model="keyword" @input="input" :placeholder="placeholder"></input>
                    <div style="margin-right: 16px;margin-left: 16px;" @click="eraser">
                        <image :src="imageLoad('erase',true)" style="width:28px;height: 28px;"></image>
                    </div>
                </div>
                <div class="cancelDiv" @click="hideSearch">
                    <text class="cancelText">取消</text>
                </div>
            </div>
        </div>
        <div style="flex: 1">
            <slot name="middle"></slot>
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasEnd="hasEnd" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @mload="load" @mrefresh="refresh">
                <!-- 通过slot将item布局外放 -->
                <slot></slot>
            </tsl-refresh-list>
            <slot name="bottom"></slot>
        </div>
    </baseT>
<!-- </div> -->
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
    background-color: #f6f6f6;
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
    background-color: #ffffff;
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
    color: #467DB9;
    font-size: 34px;
}
.searchText {
    color: #9B9B9B;
    font-size: 28px;
    margin-left: 16px;
}
.list{
    flex: 1;
}
</style>

<script>
import {imageLoad} from './imageUtil.js';
const normal = require('./normal.js').normal;
export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'search'},
        //页面的标题颜色
        barTitleColor:  {default: 'white'},
        //页面的标题背景颜色
        barBackGroundColor:  {default: '#314D87'},
        //标题栏的返回图片
        backItemImage:  {default: imageLoad('back',true)},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧文字颜色
        rightItemColor: {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //是否自定义返回事件
        customBack:     {default: false},
        //用于在iOS中进行appear问题的修复
        isIndex:        {default: false},

        //第二部分是listT自有
        //用来控制“无数据页面”的显示和隐藏 通常为list.length!=0 因为listT不直接与list接触 所以由外部给
        hasData:        {default: 0},
        //用来控制是否能进行load操作 通常为pageNo >= totalPage（pageNo为当前的页码 totalPage为当前list的总页数）
        hasEnd:         {default: true},
        //是否启用刷新控件
        hasRefresh:     {default: true},
        //是否启用加载控件
        hasLoad:        {default: true},
        //无数据图片
        noContentImg:   {default: imageLoad('noContent',true)},
        //无数据文字
        noContentTxt:   {default: '暂无数据'},

        //第三部分来自search
        //input的类型
        placeholder:    {default: '请输入'},
        //是否存在搜索栏
        hasSearch:      {default: true},
    },
    components: {
        baseT: require('./base.vue'),
        'tsl-refresh-list': require('./UIRefreshList.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        imageLoad,
        // selectIndex:0,
        // lastIndex:0,
        isRefresh:false,
        isSearch:false,
        keyword:'',
    }),
    created(){

    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('searchBack',{});
            }else{
                normal.back(this);
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("searchAppear",{});
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('searchDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('searchRight',{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('searchTitle',{});
        },
        //继承自list
        refresh() {
            this.getList(true, function(){
                // this.isRefresh = false;
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        load() {
            this.getList(false, function(){
                // this.isRefresh = false;
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        getList(isRefresh, end){
            // this.isRefresh = true;
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("searchAdapter",{
                // selectIndex: this.selectIndex,
                // lastIndex: this.lastIndex,
                isRefresh: isRefresh,
                end: end,
                keyword: this.keyword,
            });
        },
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
        hideSearch(){
            // this.$refs.searchInput.blur();
            this.isSearch = false;
        },
        eraser(){
            this.keyword = '';
            this.refresh();
        },
        input(e){
            this.keyword = e.value;
            var tmp = function(){
                // this.$refs.searchInput.blur();
                this.refresh();
            }.bind(this);
            var refresh = normal.debounce(tmp, 1000);
            this.$emit("searchInput",{
                value:e.value,
                refresh:refresh,
            });
        }
    }
}
</script>
