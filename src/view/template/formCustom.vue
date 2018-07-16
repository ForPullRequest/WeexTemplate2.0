<template>
    <div class="itemDiv">
        <div class="form">
            <text class="require" :style="{visibility:ifRequire?'visible':'hidden', 'font-size': titleSize}">*</text>
            <slot></slot>
        </div>
        <slot name="below"></slot>
    </div>
</template>

<style scoped>
.require {
    margin-left: 10;
    margin-right: 10;
    margin-top: 12;
    margin-bottom: 10;
    color: red;
}
.itemDiv{
    flex-direction: column;
}
.form {
    flex-direction:row;
    margin-right: 20;
}
</style>

<script>
const normal = require('./normal.js').normal;
export default{
    props:{
        //是否必填
        ifRequire:{default: false},
        titleSize:{default: 34},
    },
    components: {

    },
    data:()=>({
        titleSize:34,
    }),
    created(){

    },
    methods:{

    }
}
</script>