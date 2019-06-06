<!--
    本页以base为父类
    是带筛选条件的list页面的模板
 -->
<template>
<!-- <div> -->
    <baseT :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :barTitleWeight="barTitleWeight" :contentBackGroundColor="contentBackGroundColor" :rightItemText="rightItemText" :rightItemColor="rightItemColor" :rightItemImage="rightItemImage" :rightItemText2nd="rightItemText2nd" :rightItemColor2nd="rightItemColor2nd" :rightItemImage2nd="rightItemImage2nd" :barBorderColor="barBorderColor" :barHasBaseline="barHasBaseline" :isIndex="isIndex" :customBack="customBack" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseRight2nd="right2nd" @baseDisappear="disappear">
        <div class="under-line">
            <div style="flex: 1;" v-for="(item,index) in items" :key="index">
                <div style="flex-direction: row;flex: 1" @click="sheetClick(item,index)">
                    <text class = "sheetTitle" >{{item.text}}</text><text class="arrow"> ▼</text>
                    <text class = "line"></text>
                </div>
            </div>
        </div>
        <div style="flex: 1;">
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasEnd="hasEnd" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @mload="load" @mrefresh="refresh">
                <slot></slot>
            </tsl-refresh-list>
            <sheet :isShow="showSelect" :width="sheetWidth" :height="sheetHeight" :model="sheetModel" borderWidth="1" borderRadius="sheetBorderRadius" @touchBg="actionSheet">
                <!-- <slot name="section"></slot> -->
                <select-section :tag="tag" :list="sheetList" :itemHeight="sheetItemHeight" :scrollerHeight="sheetHeight" :selectedIndex="selectedIndex" @itemClick="itemClick"></select-section>
            </sheet>
        </div>
    </baseT>
<!-- </div> -->
</template>

<script>
import {imageLoad} from './imageUtil.js';
import { getTheme } from "./config.js";
import { navigator, modal } from "./normal.js";

export default {
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'sheet'},
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
        rightItemColor: {default: '#666666'},
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
        //是否自定义返回事件 配合事件listBack
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

        //第三部分来自自身
        //sheet显示的位置 top bottom left right
        sheetModel:        {default: 'top'},
        //sheet的底部左右的圆角
        sheetBorderRadius: {default: 18},
        //sheet的最大显示数量
        maxShowNum:        {default: 5},
        //sheet的显示高度
        sheetHeight:       {default: 580},
        //sheet单项的高度
        sheetItemHeight:   {default: 100},
        //sheet内容
        items:             {default: []},
        //sheetSelection中√的位置
        selected:          {default:[]},
    },
    components: {
        baseT: require('./base.vue'),
        'tsl-refresh-list':require('./UIRefreshList.vue'),
        'sheet':require('./UISheet.vue'),
        'select-section':require('./UISelectSection.vue'),
    },
    data:()=> ({
        imageLoad,
        items:[],
        showSelect:false,//内部
        sheetList:[],//内部
        tag:'',//内部
        sheetWidth:750,//定死
        sheetIndex:0,//内部
        selectedIndex:0,
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
        for(var i=0;i<this.items.length;i++){
            this.items[i].text=this.items[i].list[this.selected[i]].text;
        }
    },
    methods: {
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('sheetBack',{});
            }else{
                navigator.back(this);
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("sheetAppear",{});
            //显示刷新事件 谁用谁管 不逾矩
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('sheetDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('sheetRight',{});
        },
        right2nd() {
            this.$emit("sheetRight2nd", {});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('sheetTitle',{});
        },
        //用于sheet
        sheetFinish(tag, index) {
            this.items[this.sheetIndex].text = this.items[this.sheetIndex].list[index];
        },
        sheetClick(item, index) {
            this.sheetIndex = index;
            //sheet样式
            this.sheetList = item.list;
            this.tag = item.tag;
            if(this.sheetList.length >= this.maxShowNum){
                this.sheetHeight = this.maxShowNum * this.sheetItemHeight;
            }else{
                this.sheetHeight = this.sheetList.length * this.sheetItemHeight;
            };
            this.selectedIndex=this.selected[index];
            this.actionSheet();
        },
        actionSheet() {
            this.showSelect = !this.showSelect;
        },
        itemClick(item){
            this.items[this.sheetIndex].text=item.text;
            this.selected[this.sheetIndex]=item.index;
            this.actionSheet();
            this.$emit("itemClick",item);
        },
        //继承自list
        refresh() {
            this.getList(true, function(){
                this.$refs.mlist.endRefresh();
            }.bind(this));
            // this.getList(true);
        },
        load() {
            this.getList(false, function(){
                this.$refs.mlist.endLoad();
            }.bind(this));
            // this.getList(false);
        },
        getList(isRefresh, end){
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("sheetAdapter",{
                isRefresh:isRefresh,
                end:end
            });
        },
    },
}
</script>

<style scoped>
.list{
    width: 750px;
    flex: 1;
}
.itemDiv{
    padding: 20px;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32px;
}
.sheetTitle {
    margin-top: 20px;
    flex: 1;
    margin-left: 20px;
    height: 60px;
    color: #999999;
    font-size: 28px;
    text-align: center;
    lines: 1;
    text-overflow: end;
}
.arrow{
    margin-top: 20px;
    margin-right: 20px;
    color: #999999;
    font-size: 28px;
    text-align: center;
}
.line {
    margin-top: 20px;
    width: 1px;
    height: 40px;
    background-color: #999999;
}
.under-line {
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
    flex-direction: row;
    background-color: white;
}
</style>
