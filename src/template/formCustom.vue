<template>
    <div class="itemDiv">
        <div class="form">
            <div style="flex-direction:row;flex-wrap:wrap;" :style="{width: titleWidth+'px'}">
                <text class="require" v-if="isRequireLeft" :style="{visibility:ifRequire?'visible':'hidden', fontSize: titleSize+'px'}">*</text>
                <text class="title" :style="{color:titleColor, textAlign:isTitleRight?'right':'left', fontSize: titleSize+'px', fontWeight:isTitleBold?'bold':'normal'}">{{title}}</text>
                <text class="require" v-if="!isRequireLeft" :style="{visibility:ifRequire?'visible':'hidden', fontSize: titleSize+'px'}">*</text>
            </div>
            <slot></slot>
        </div>
        <slot name="below"></slot>
    </div>
</template>

<style scoped>
.title {
    flex-wrap:wrap;
    flex:1;
}
.require {
    padding-top:8px;
    margin-left: 10px;
    margin-right: 10px;
    color: red;
}
.itemDiv{
    flex-direction: column;
}
.form {
    flex-direction:row;
}
</style>

<script>
export default{
    props:{
        //是否必填
        ifRequire:{default: false},
        titleSize:{default: 34},
        titleWidth:{default: 180},
        isTitleRight:{default: false},
        isTitleBold:{default: false},
        titleColor:{default: '#5f5f5f'},
        title:{default: ''},
        isRequireLeft:{default: false},
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