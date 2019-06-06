<!-- 
    component: 点击切换栏目 靠左显示
    developer: zhengweibin
 -->

<template>
    <div class="page" :style="{'background-color':itemViewColor, height: itemViewHeight+'px'}">
        <scroller style="flex-direction: row;" :style="{height: itemViewHeight+'px'}" scroll-direction="horizontal" showScrollbar=false ref="scr">
            <div class="row" 
                :style="{
                    borderBottomColor: item.isSelect ? itemSelectColor : 'transparent',
                    borderBottomWidth: lineHeight + 'px',
                    paddingLeft:isWideMode?'30px':'0',
                    paddingRight:isWideMode?'30px':'0',
                    marginLeft:isWideMode?'0':'30px',
                    marginRight:isWideMode?'0':'30px',
                }" 
                v-for="(item, index) in items" :key="index" :ref="'tabItem'+index" @click="touchPage(item,index)">
                <text :style="{'font-size': itemTextFont + 'px', color: item.isSelect?itemSelectColor:itemNormolColor}">{{item.name}}</text>
                <div v-if="item.hasRP" class="redPoint"></div>
                <!-- <div v-if="item.isSelect" class="line" :style="{'background-color':itemSelectColor, height:lineHeight+'px'}"></div> -->
            </div>
        </scroller>
    </div>
</template>

<style scoped>
        /* border-bottom-width: 2px;
        border-bottom-color: #D4D4D4; */
    .redPoint{
        background-color:red;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        margin-top: -28px;
    }
    .page {
        width: 750px;
        justify-content: space-around;
    }
    .row {
        flex-direction: row;
        align-items: center;
        padding-bottom: 10px;
    }
    .line {
        position: absolute;
        left: 15px;
        right: 15px;
        bottom: 0px;
    }
</style>

<script>
// const dom = weex.requireModule('dom');

export default {
    components: {
        
    },
    props: {
        //背景色
        itemViewColor:    {type: String, default: '#FAFAFA'},
        //item高度
        itemViewHeight:   {type: String, default: '96'},
        //item字体颜色
        itemTextFont:     {type: String, default: '34'},
        //item平常颜色
        itemNormolColor:  {type: String, default: '#000000'},
        //item选择颜色
        itemSelectColor:  {type: String, default: '#1c97fc'},
        //线的高度
        lineHeight:       {type: String, default: '6'},
        //是否宽的模式
        isWideMode:       {type: Boolean, default: true},
        //此处数据格式必须为 [{name: "value",isSelect: true/false,其他自定义属性}]
        items:            {type: Array,  default: []}
    },
    data() {
        return {
            
        }
    },
    methods: {
        tabHeight(){
            return parseInt(this.itemViewHeight)+10+'px';
        },
        touchPage(item, index) {
            var ui = function(){
                //更改选中状态
                for (var i in this.items) {
                    this.items[i].isSelect = false;
                }
                item.isSelect = true;
                // item.hasRP = false;
                //切换tab
                // var key = 'tabItem'+(index);
                // if (this.$refs[key]) {
                    //TODO 安卓中无效果 iOS崩溃
                    // dom.scrollToElement(this.$refs[key],{});
                // }
            }.bind(this);
            //传递事件
            this.$emit("touchPage",{value: item, index: index, ui: ui});
        }
    },
    created() {
    },
    mounted() {
        // for (var i in this.items) {
        //     if (this.items[i].isSelect) {
        //         // this.touchPage(this.items[i], i);
        //         return;
        //     }
        // }
    }
}
</script>