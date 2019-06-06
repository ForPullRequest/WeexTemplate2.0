<template>
    <div style="flex: 1;">
        <div style="flex: 1; flex-direction: row" :style="{width: items.length*750 + 'px'}" ref="contentRef">
            <slot></slot>
        </div>
        <div class="tabbar" :style="{height: tabBarHeight + 'px'}">
            <div class="tabbarItem" v-for="(item, index) in items" :key="index" @click="itemClick(index)">
                <image class="itemImage" :src="item.select? item.activeIcon:item.icon"></image>
                <text class="itemText" :style="{color: item.select?'#2089D3':'#ACACAC'}">{{item.title}}</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tabbar {
        flex-direction: row; 
        background-color: white;
        justify-content: space-around;
        border-top-width: 1px;
        border-top-color: #e2e2e2;
        padding: 0 10px;
    }
    .tabbarItem {
        height: 98px; 
        width: 98px; 
        justify-content: center;
        align-items: center;
    }
    .itemImage {
        height: 46px;
        width: 46px;
    }
    .itemText {
        font-size: 20px;
    }
</style>

<script>
    const animation = weex.requireModule('animation');
    export default {
        components: {

        },
        props: {
            items: {type: Array, required: true},
            defaultIndex: {type: Number, default: 0}
        },
        computed: {
            
        },
        data() {
            return {
                tabBarHeight: 98
            }
        },
        methods: {
            itemClick(index) {
                this.items.forEach((item, i) => {
                    item.select = (index == i ? true : false);
                });
                var temp = this.items;
                this.items = [];
                this.items = temp;
                var testEl = this.$refs.contentRef;
                animation.transition(testEl, {
                    styles: {
                        transform: 'translateX(-'+ index*750 + 'px)',
                    },
                    duration: 0,
                },() => {
                    this.$emit("itemClick", index);
                })
            }
        },
        created() {
            if (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6') {
                //iphoneX
                this.tabBarHeight    = 132;
            } else {
                this.tabBarHeight    = 98;
            }
        },
        mounted() {
            this.itemClick(this.defaultIndex);
        }
    }
</script>