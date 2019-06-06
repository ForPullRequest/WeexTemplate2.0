<template>
<!-- <div> -->
    <baseT :backItemImage="backItemImage" :barTitleColor="barTitleColor" :barBackGroundColor="barBackGroundColor" :title="title" :barTitleWeight="barTitleWeight" :contentBackGroundColor="contentBackGroundColor" :rightItemText="rightItemText" :rightItemColor="rightItemColor" :rightItemImage="rightItemImage" :rightItemText2nd="rightItemText2nd" :rightItemColor2nd="rightItemColor2nd" :rightItemImage2nd="rightItemImage2nd" :barBorderColor="barBorderColor" :barHasBaseline="barHasBaseline" :isIndex="isIndex" :customBack="customBack" :isShow="isShow" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseRight2nd="right2nd" @baseDisappear="disappear">
        <slot name="middle"></slot>
        <div style="flex: 1">
            <columnview :selectColor="selectColorCol" :unSelectColor="unSelectColorCol" :titleSize="titleSizeCol" :selectTitleColor="selectTitleColorCol" :unSelectTitleColor="unSelectTitleColorCol" :borderLeftWidth="borderLeftWidthCol" :borderLeftColor="borderLeftColorCol" :items="items" :leftColumnWidth="leftColumnWidthCol" @touchPage="touchPage">
                <!-- myWidth必须要填 为了iOS中的显示问题 -->
                <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" :myWidth="750-leftColumnWidthCol" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @mload="load" @mrefresh="refresh">
                    <!-- <cell v-for="itemData, index in list" :key="itemData">
                        <listitem class="itemDiv" v-on:onclick="itemClick(index)">
                            <text class="text">{{itemData}}</text>
                        </listitem>
                    </cell> -->
                    <slot></slot>
                </tsl-refresh-list>
            </columnview>
        </div>
    </baseT>
<!-- </div> -->
</template>

<style scoped>
.row{
    flex-direction: row;
}
.column{
    flex-direction: column;
}
.jcCenter{
    justify-content: center;
}
.aiCenter{
    align-items: center;
}
.flex{
    flex: 1;
}
.red{
    background-color:red;
}
.yellow{
    background-color:yellow;
}
.white{
    background-color: white;
}
.line{
    background-color: #e5e5e5;
    height: 1px;
    width: 750px;
}

.text {
    font-size: 36px;
    align-self: center;
}
.list{
    flex: 1;
}
.itemDiv{
    padding: 20px;
}
</style>

<script>
import {imageLoad} from './imageUtil.js';
import { getTheme } from "./config.js";
import { navigator, modal } from "./normal.js";
export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'column'},
        //页面的标题背景颜色
        barBackGroundColor:  {default: ''},
        //页面的标题颜色
        barTitleColor:  {default: ''},
        //页面的标题粗细程度
        barTitleWeight: { default: "" },
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
        noContentTxt:   {default:''},

        //第三部分来自于columnview
        //左列表数据
        items:            { default: [] },
        //左列表宽度
        leftColumnWidthCol: { default: 250 },
        //已选背景色
        selectColorCol:        { default: '#ffffff' },
        //未选背景色
        unSelectColorCol:      { default: '#f5f5f5' },
        //标题字号
        titleSizeCol:          { default: '36' },
        //已选标题颜色
        selectTitleColorCol:   { default: '#333333' },
        //未选标题颜色
        unSelectTitleColorCol: { default: '#8f8f8f' },
        //已选标记宽度
        borderLeftWidthCol:    { default: '1' },
        //已选标记颜色
        borderLeftColorCol:    { default: '#1c98fc' },
        //是否显示nav
        isShow:         {default: true},
    },
    data:()=> ({
        // //主列表数据集
        // list:[],
        imageLoad,
        selectIndex:0,//columnView的index
        lastIndex:0,
        isRefresh:false,
    }),
    components: {
        baseT: require('./base.vue'),
        columnview: require('./UIColumnView.vue'),
        'tsl-refresh-list': require('./UIRefreshList.vue'),
    },
    methods: {
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('columnBack',{});
            }else{
                navigator.back(this);
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("columnAppear",{});
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('columnDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('columnRight',{});
        },
        right2nd() {
            this.$emit("columnRight2nd",{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('columnTitle',{});
        },
        //继承自tab
        touchPage(page){
            var showData = function(){
                this.refresh();
            }.bind(this);

            setTimeout(() => {
                if(this.isRefresh){
                    modal.toast('正在获取数据中..')
                    return;
                }else{
                    let temp = this.selectIndex;
                    this.lastIndex = temp;
                    page.ui();
                    this.selectIndex = page.index;
                    this.$emit("columnPage",{
                        selectIndex: page.index,
                        lastIndex: temp,
                        showData: showData,
                    });
                }
            }, 400)
        },
        //继承自column
        load() {
            this.getList(false, function(){
                this.isRefresh = false;
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        refresh(){
            this.getList(true, function(){
                this.isRefresh = false;
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        getList(isRefresh, end){
            this.isRefresh = true;
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("columnAdapter",{
                selectIndex:this.selectIndex,
                isRefresh:isRefresh,
                end:end
            });
        },
    },
    created: function () {
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
    }
}
</script>
