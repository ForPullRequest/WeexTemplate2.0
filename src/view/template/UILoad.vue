<template>
    <!-- <loading  @loading="onloading"  class="loading" :display="showloading?'show':'hide'"  @pullingdown="onpullingdown">
        <image :src="imageLoad('tmp/components/loading.gif')" v-if="!isloadingall"
               class="refresh-icon"></image>
        <text class="loadingtext">{{loadmoretext}}</text>
    </loading> -->
    <cell @appear="onloading" class="loading" >
        <image :src="imageLoad('loading')" class="refresh-icon"></image>
        <text class="loadingtext">{{loadmoretext}}</text>
    </cell>
</template>
<style scoped>
    .loadingtext {
        font-size: 28px;
        color: #666666;
    }

    .loading {
        flex-direction: row;
        justify-content: center;
        /*width: 750px;*/
        height: 80px;
        background-color: #f6f6f6;
        align-items: center;
    }

    .refresh-icon {
        width: 40px;
        height: 40px;
        margin-right: 30px;
        align-self: center;
    }
</style>
<script>
    import { imageLoad } from "./imageUtil.js";
    const animation = weex.requireModule('animation');
    module.exports = {
        props: {
            loadstatus: {
                default: false
            },
            nomoreload: {
                default: false,
            }
        },
        data() {
            return {
                imageLoad,
                showloading: !this.loadstatus,
                isloadingall: this.nomoreload,
            }
        },
        watch: {
            loadstatus(val) {
                this.showloading = !val
            },
            nomoreload(val) {
                this.isloadingall = val
            }
        },
        components: {

        },
        computed: {
            loadmoretext() {
                return this.isloadingall ? "已加载完毕" : "正在加载"
            }
        },
        methods: {
            onloading(event) {
                // if (!this.showloading) {
                    this.showloading = true;
                    this.dispatchloadevent();
                // }
            },
            dispatchloadevent: function () {
                this.$emit('onload', this.showloading);
            },
        },
        created: function () {
        },
    }
</script>