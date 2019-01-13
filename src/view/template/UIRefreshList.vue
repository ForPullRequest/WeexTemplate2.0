<template>
    <div>
        <list class="list" v-if="hasData" id="list">
            <!-- 当myWidth不写时 在column的场景中refresh和load在iOS会出问题 -->
            <!-- <page-refresh :style="{width:myWidth+'px'}" v-if="hasRefresh" ref="pageR" :refreshstatus="refreshliststatus"
                v-on:onrefresh="refresh"></page-refresh> -->
            <refresh @refresh="refresh" @pullingdown="onpullingdown" :display="mRefreshStatus" ref="pageR" :style="{width:myWidth+'px'}"
                class="refresh" v-if="hasRefresh">
                <image ref="imgs" :src="imageLoad('loading',true)" class="refresh-icon"></image>
                <div class="refresh-div">
                    <text class="refresh-text-1">{{refreshTitle}}</text>
                    <text class="refresh-text-2">最后更新: {{lastRefreshDate}}</text>
                </div>
            </refresh>
            <slot></slot>
            <page-load :style="{width:myWidth+'px'}" v-if="hasLoad&!hasEnd" :loadstatus="loadliststatus" :nomoreload="hasEnd"
                v-on:onload="load"></page-load>
        </list>
        <div v-if="!hasData" class="frame center" @click="clickRefresh">
            <!-- <image style="flex: 1;position: absolute;top: 0;bottom: 0;left: 0;right: 0;" src="back_detail_no_content"></image> -->
            <image class="noContentImg" :src="noContentImg"></image>
            <text class="noContentTxt">{{noContentTxt}}</text>
        </div>
    </div>
</template>
<style scoped>
    .refresh {
        height: 100px;
        background-color: #f6f6f6;
        align-items: center;
        justify-content: center;
        flex-direction: row
    }

    .refresh-text-1 {
        color: #666666;
        text-align: center;
        font-size: 28px;
    }

    .refresh-text-2 {
        color: #666666;
        text-align: center;
        font-size: 26px;
        margin-top: 10px;
    }
    .refresh-icon{
        width: 40px;height: 40px;margin-right: 30px;align-self: center;
    }
    .direction-icon{
        width: 40px;height: 45px;margin-right: 30px;align-self: center;
    }

    .list {
        flex: 1;
    }

    .frame {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .center {
        justify-content: center;
        align-items: center;
    }

    .noContentImg {
        height: 320px;
        width: 320px;
    }

    .noContentTxt {
        margin-top: 56px;
        font-size: 34px;
        color: #6c7d8f;
    }
</style>
<script>
    import { imageLoad } from "./imageUtil.js";
    const animation = weex.requireModule("animation");
    const normal = require('./normal.js').normal;
    module.exports = {
        props: {
            hasEnd: {
                default: true
            },
            hasData: {
                default: true
            },
            hasRefresh: {
                default: true
            },
            hasLoad: {
                default: true
            },
            noContentImg: {
                default: imageLoad("noContent", true)
            },
            noContentTxt: {
                default: "暂无数据"
            },
            myWidth: {
                default: 750
            }
        },
        data() {
            return {
                imageLoad,
                refreshliststatus: 0,
                loadliststatus: false,
                mRefreshStatus: "hide",
                refreshstatus: 1,
                refreshTitle: "下拉以刷新",
                lastRefreshDate: '暂无数据',
                isloading:false,
            };
        },
        components: {
            // pageRefresh: require("./UIRefresh.vue"),
            pageLoad: require("./UILoad.vue")
        },
        watch: {
            refreshstatus(val) {
                switch (val) {
                    case 1: this.refreshTitle = '下拉以刷新'; break;
                    case 2: this.refreshTitle = '释放立即刷新'; break;
                    case 3: this.refreshTitle = '正在加载'; break;
                    case 4: this.refreshTitle = '加载完毕'; break;
                }
            },
        },
        methods: {
            getCacheTime() {
                normal.get('lastRefreshTime', function (ret) {
                    if (ret.data == null) {
                        return '';
                    } else {
                        this.lastRefreshDate = ret.data;
                        if (this.getToday() == this.lastRefreshDate.substring(0, this.lastRefreshDate.indexOf(" "))) {
                            this.lastRefreshDate = '今天 ' + this.lastRefreshDate.substring(this.lastRefreshDate.indexOf(" "), this.lastRefreshDate.length);
                        }
                        if (this.getYesterDay() == this.lastRefreshDate.substring(0, this.lastRefreshDate.indexOf(" "))) {
                            this.lastRefreshDate = '昨天  ' + this.lastRefreshDate.substring(this.lastRefreshDate.indexOf(" "), this.lastRefreshDate.length);
                        }
                    }
                }.bind(this))
            },
            getYesterDay() {
                var date = new Date();
                return date.getFullYear() + '-' + this.setZero(date.getMonth() + 1) + '-' + this.setZero(date.getDate() - 1);
            },
            getToday() {
                var date = new Date();
                return date.getFullYear() + '-' + this.setZero(date.getMonth() + 1) + '-' + this.setZero(date.getDate());
            },
            saveTime() {
                var date = new Date();
                var onlyDate = date.getFullYear() + '-' + this.setZero(date.getMonth() + 1) + '-' + this.setZero(date.getDate()) + ' ' + this.setZero(date.getHours()) + ':' + this.setZero(date.getMinutes());
                normal.save('lastRefreshTime', onlyDate, function () { });
            },
            setZero: function (val) {
                if (val < 10) {
                    return "0" + val;
                } else {
                    return val;
                }
            },
            onpullingdown: function (event) {
                if (this.mRefreshStatus == "show") {
                    return;
                }
                this.mRefreshStatus = "show";
                this.refreshstatus = 1;
                this.getCacheTime();
                console.log("pullingDistance=======" + event.pullingDistance)
                if (Math.abs(event.pullingDistance) > event.viewHeight) {
                    this.refreshstatus = 2;
                    this.rotate();
                }
                if (Math.abs(event.pullingDistance) <= event.viewHeight && this.status == 2) {
                    this.refreshstatus = 1;
                    this.removeAnimal();
                }
            },
            clickRefresh: function () {
                var self = this;
                setTimeout(() => {
                    self.$emit("mrefresh", { isClick: true });
                }, 200);
            },
            // onrefresh: function () {
            //     this.refreshstatus = 3;
            //     this.mRefreshStatus = 'show';
            // },
            refresh: function (val) {
                var self = this;
                this.refreshstatus = 3;
                this.refreshliststatus = val;
                setTimeout(() => {
                    self.$emit("mrefresh", { isClick: false });
                }, 200);
            },
            load: function (val) {
                var self = this;
                this.loadliststatus = true;
                setTimeout(() => {
                    if (!self.hasEnd&&!self.isloading) {
                        self.isloading = true
                        self.$emit("mload",val);
                    } else {
                        self.loadliststatus = false;
                    }
                }, 200);
            },
            endLoad: function () {
                this.isloading = false;
                this.loadliststatus = false;
            },
            endRefresh: function () {
                this.mRefreshStatus = "hide"
                this.refreshstatus = 1
                this.saveTime()
                // if (this.$refs.pageR) {
                //     this.$refs.pageR.endRefresh();
                // }
            },
            rotate() {
                var images = this.$refs.imgs;
                animation.transition(images, {
                    styles: {
                        transform: 'rotate(-3.15)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                }, function () {
                }.bind(this))
            },
        },
        created() { },
    };
</script>