<template>
    <div class="container">
        <div class="wrap" v-for="(item,index) in labels" :key="index" :style="{'background-color': item.check?checkBgColor:normalBgColor,'border-color': item.check?checkBorderColor:normalBorderColor,'border-radius':borderRadius}" @click="touchItem(index)">
            <text class="text" :style="{'font-size': textSize, color: item.check?checkTextColor:normalTextColor}">{{item.name}}</text>
        </div>
    </div>
</template>

<style scoped>
.container {
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
}
.wrap{
    border-width: 1px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-right: 16px;
    margin-bottom: 24px;
    justify-content: center;
    align-items: center;
}
.text {
    margin-left: 24px;
    margin-right: 24px;
}
</style>

<script>
export default {
    props: {
        labels:           { default: [] },
        textSize:         { default: 28 },            // 文字大小
        checkTextColor:   { default: '#FFFFFF' },     // 选中时文字颜色
        normalTextColor:  { default: '#111111' },     // 未选中时文字颜色
        checkBgColor:     { default: '#4185F3' },     // 选中时背景颜色
        normalBgColor:    { default: '#F6F6F6' },     // 未选中时背景颜色
        checkBorderColor: { default: '#4185F3' },     // 选中时边框线颜色
        normalBorderColor:{ default: '#E2E2E2' },     // 未选中时边框线颜色
        borderRadius:     { default: '32' },          // 边角半径;
    },
    methods: {
        touchItem(index) {
            this.$emit('labelClick', index );
        }
    }
}
</script>
