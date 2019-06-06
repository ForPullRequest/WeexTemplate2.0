<template>
    <div class="item" :index="index" :style="{backgroundColor:background, borderLeftColor:borderLeftColor, borderLeftWidth:borderLeftWidth+'px'}" @click="itemClick(index)">
        <text class="item-title" :style="{fontSize:titleSize+'px', color:titleColor, margin: margin+'px'}">{{title}}</text>
    </div>
</template>
<style scoped>
.item {
    justify-content: center;
    align-items: center;
    border-bottom-width:1px;
    border-bottom-color:#dddddd;
}
.item-title {
    text-align: center;
    text-overflow: ellipsis;
    lines:2;
}
</style>
<script>
module.exports = {
    props: {
        background: {default: "#ffffff"},
        title: {default: ""},
        // itemStyleName: {default: ""},
        index: '',
        titleColor: {default: "#333333"},
        titleSize: {default: 36},
        borderLeftColor: {default: "#1c98fc"},
        borderLeftWidth: {default: 0},
        margin:20,
    },
    methods:{
        itemClick(index){
            this.$emit('itemClick', index);
        }
    }
};
</script>
