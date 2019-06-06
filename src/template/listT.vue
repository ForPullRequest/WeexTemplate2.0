<!--
    本页以base为父类
    是单list页面的模板
 -->
<template>
    <!-- <div > -->
        <baseT :backItemImage="backItemImage" :barBackGroundColor="barBackGroundColor" :barTitleColor="barTitleColor" :barTitleWeight="barTitleWeight" :contentBackGroundColor="contentBackGroundColor" :rightItemColor="rightItemColor" 
        :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :barBorderColor="barBorderColor" :barHasBaseline="barHasBaseline"
        :rightItemText2nd="rightItemText2nd" :rightItemColor2nd="rightItemColor2nd" :rightItemImage2nd="rightItemImage2nd" 
        :isShow="isShow" :isIndex="isIndex" :customBack="customBack" @baseAppear="appear" @baseRight2nd="right2nd" 
        @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
            <slot name="top"></slot>
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" 
            :hasData="hasData" :hasEnd="hasEnd" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @mload="load" @mrefresh="refresh">
                <div slot="noContentAction">
                    <slot name="noContentAction"></slot>
                </div>
            <!-- 通过slot将item布局外放 -->
                <slot></slot>
            </tsl-refresh-list>
            <div>
                <slot name="action"></slot>
            </div>
        </baseT>
    <!-- </div> -->
</template>

<style scoped>
.item {
    height: 88px;
    align-items: center;
}
.list {
    display: flex;
    flex:1;
}
.itemDiv {
    padding: 20px;
}
</style>
<script>
import { imageLoad } from "./imageUtil.js";
import { getTheme } from "./config.js";
import { navigator, modal } from "./normal.js";

export default {
    props: {
        //第一部分继承自base
        //页面的标题
        title: { default: "list" },
        //页面的标题背景颜色
        barBackGroundColor: { default: "" },
        //页面的标题是否有底线
        barHasBaseline: { default: false },
        //页面的标题底线颜色
        barBorderColor: { default:  ""},
        //页面的标题颜色
        barTitleColor: { default: "" },
        //页面的标题粗细程度
        barTitleWeight: { default: "" },
        //标题栏的返回图片
        backItemImage: { default: '' },
        //标题栏的右侧文字
        rightItemText: { default: "" },
        //标题栏的右侧文字颜色
        rightItemColor: { default: "" },
        //标题栏的右侧图片
        rightItemImage: { default: "" },
        //标题栏的右侧第二个按钮文字
        rightItemText2nd        : {default: ''},
        //标题栏的右侧第二个按钮文字颜色
        rightItemColor2nd       : {default: '#666666'},
        //标题栏的右侧第二个按钮图片
        rightItemImage2nd       : {default: ''},
        //主体背景色
        contentBackGroundColor: { default: "" },
        //是否自定义返回事件 配合事件listBack
        customBack: { default: false },
        //用于在iOS中进行appear问题的修复
        isIndex: { default: false },

        //第二部分是listT自有
        //用来控制“无数据页面”的显示和隐藏 通常为list.length!=0 因为listT不直接与list接触 所以由外部给
        hasData: { default: 0 },
        //用来控制是否能进行load操作 通常为pageNo >= totalPage（pageNo为当前的页码 totalPage为当前list的总页数）
        hasEnd: { default: true },
        //是否启用刷新控件
        hasRefresh: { default: true },
        //是否启用加载控件
        hasLoad: { default: true },
        //无数据图片
        noContentImg: { default: '' },
        //无数据文字
        noContentTxt: { default: "" },
        //是否显示nav
        isShow: { default: true }
    },
    components: {
        "tsl-refresh-list": require("./UIRefreshList.vue"),
        baseT: require("./base.vue"),
    },
    data: () => ({
        imageLoad
    }),
    created() {
        let theme = getTheme();
        this.barTitleWeight = this.barTitleWeight?this.barTitleWeight:theme.barTitleWeight
        this.barTitleColor = this.barTitleColor?this.barTitleColor:theme.barTitleColor
        this.barBackGroundColor = this.barBackGroundColor?this.barBackGroundColor:theme.barBackGroundColor
        this.backItemImage = this.backItemImage?this.backItemImage:theme.backItemImage
        this.barBorderColor = this.barBorderColor?this.barBorderColor:theme.barBorderColor
        this.barHasBaseline = this.barHasBaseline?this.barHasBaseline:theme.barHasBaseline
        this.noContentImg = this.noContentImg?this.noContentImg:theme.noContentImg
        this.noContentTxt = this.noContentTxt?this.noContentTxt:theme.noContentTxt
        this.contentBackGroundColor = this.contentBackGroundColor?this.contentBackGroundColor:theme.contentBackGroundColor
    },
    methods: {
        //继承自base
        back() {
            if (this.customBack) {
                //页面自定义退出事件
                this.$emit("listBack", {});
            } else {
                navigator.back(this);
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("listAppear", {});
            //显示刷新事件 谁用谁管 不逾矩
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit("listDisappear", {});
        },
        right() {
            //右侧点击通用事件
            this.$emit("listRight", {});
        },
        right2nd() {
            this.$emit("listRight2nd", {});
        },
        titleClick() {
            //页面标题点击事件
            this.$emit("listTitle", {});
        },
        //继承自list
        refresh() {
            this.getList(
                true,
                function(e) {
                    if (!e || e.isClick == false) {
                        this.$refs.mlist.endRefresh();
                    }
                }.bind(this)
            );
        },
        load() {
            this.getList(
                false,
                function() {
                    this.$refs.mlist.endLoad();
                }.bind(this)
            );
        },
        getList(isRefresh, end) {
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("listAdapter", {
                isRefresh: isRefresh,
                end: end
            });
        }
    }
};
</script>
