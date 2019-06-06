<!--
    本页以base为父类
    是多个可切换标签的单list页面的模板
 -->
<template>
<!-- <div> -->
    <baseT :backItemImage="backItemImage" :barBackGroundColor="barBackGroundColor" :barTitleColor="barTitleColor" :title="title" :barTitleWeight="barTitleWeight" :contentBackGroundColor="contentBackGroundColor" :rightItemText="rightItemText" :rightItemColor="rightItemColor" :rightItemImage="rightItemImage" :rightItemText2nd="rightItemText2nd" :rightItemColor2nd="rightItemColor2nd" :rightItemImage2nd="rightItemImage2nd" :barBorderColor="barBorderColor" :barHasBaseline="barHasBaseline" :isIndex="isIndex" :customBack="customBack" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseRight2nd="right2nd" @baseDisappear="disappear">
        <!-- 搜索栏 -->
        <search v-if="hasSearch" :searchDisplayTxt="searchDisplayTxt" :placeholder="placeholder" :searchOutBackground="searchOutBackground" :searchInnerBackground="searchInnerBackground" 
            @searchShow="searchShow" @searchInput="input" @hideSearch="hideSearch" @returnClick="returnClick" @eraser="eraser"></search>
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
.list{
    flex: 1;
}
</style>

<script>
import {imageLoad} from './imageUtil.js';
import { getTheme } from "./config.js";
import { util } from "./js/util.js"
import { navigator, modal } from "./normal.js";
export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'search'},
        //页面的标题颜色
        barTitleColor:  {default: ''},
        //页面的标题粗细程度
        barTitleWeight: { default: "" },
        //页面的标题背景颜色
        barBackGroundColor:  {default: ''},
        //页面的标题是否有底线
        barHasBaseline: { default: false },
        //页面的标题底线颜色
        barBorderColor: { default:  ""},
        //标题栏的返回图片
        backItemImage:  {default: ''},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧文字颜色
        rightItemColor: {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //标题栏的右侧第二个按钮文字
        rightItemText2nd        : {default: ''},
        //标题栏的右侧第二个按钮文字颜色
        rightItemColor2nd       : {default: '#666666'},
        //标题栏的右侧第二个按钮图片
        rightItemImage2nd       : {default: ''},
        //主体背景色
        contentBackGroundColor: { default: "" },
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
        noContentImg:   {default: ''},
        //无数据文字
        noContentTxt:   {default: ''},

        //第三部分来自search
        //input的缺省文字
        placeholder:    {default: '请输入'},
        //是否存在搜索栏
        hasSearch:      {default: true},
        //搜索处展示文字
        searchDisplayTxt:      {default: '搜索'},
        //搜索栏外背景色
        searchOutBackground:   {default: '#f6f6f6'},
        //搜索栏内背景色
        searchInnerBackground:   {default: 'white'},
        //从输入到自动搜索的等待时间
        searchWait:     {default: 800},
        //是否开启自动搜索
        isAutoSearch:   {default: true},

    },
    components: {
        baseT: require('./base.vue'),
        'tsl-refresh-list': require('./UIRefreshList.vue'),
        'list-item': require('./UIListItem.vue'),
        'search': require('./UISearch.vue'),
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
        let theme = getTheme();
        this.barTitleColor = this.barTitleColor?this.barTitleColor:theme.barTitleColor
        this.barBackGroundColor = this.barBackGroundColor?this.barBackGroundColor:theme.barBackGroundColor
        this.backItemImage = this.backItemImage?this.backItemImage:theme.backItemImage
        this.noContentImg = this.noContentImg?this.noContentImg:theme.noContentImg
        this.noContentTxt = this.noContentTxt?this.noContentTxt:theme.noContentTxt
        this.contentBackGroundColor = this.contentBackGroundColor?this.contentBackGroundColor:theme.contentBackGroundColor
        this.barTitleWeight = this.barTitleWeight?this.barTitleWeight:theme.barTitleWeight
        this.barHasBaseline = this.barHasBaseline?this.barHasBaseline:theme.barHasBaseline
        this.barBorderColor = this.barBorderColor?this.barBorderColor:theme.barBorderColor
    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('searchBack',{});
            }else{
                navigator.back(this);
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
        right2nd() {
            this.$emit("searchRight2nd", {});
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
            this.isSearch = true;
            this.$emit("searchShow",{
                isSearch: this.isSearch
            });
        },
        hideSearch(){
            // this.$refs.searchInput.blur();
            this.isSearch = false;
        },
        returnClick(e){
            this.keyword = e.value;
            this.refresh();
            this.$emit("returnClick",{
                value:e.value,
            });
        },
        input(e){
            this.keyword = e.value;
            var tmp = function(){
                // this.$refs.searchInput.blur();
                this.refresh();
            }.bind(this);
            if(this.isAutoSearch){
                util.debounce(tmp, this.searchWait)()
            }
            // var refresh = this.isAutoSearch?util.debounce(tmp, this.searchWait):tmp;
            this.$emit("searchInput",{
                value:e.value,
            });
        },
        eraser() {
            this.keyword = '';
            this.refresh();
        }
    }
}
</script>
