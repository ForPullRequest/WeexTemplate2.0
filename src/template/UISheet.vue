<template>
    <div v-if="isShow" class="content" @click="touchView">
        <div v-if="model=='bottom'" class="common_type">
            <div ref="view_actionsheet_ref"
                 class="botton_actionsheet"
                 :style="{'background-color':backgroundColor, height:height+'px', bottom: -height+'px', 'border-color':borderColor, 'border-top-left-radius':borderRadius+'px', 'border-top-right-radius':borderRadius+'px', 'border-width':borderWidth+'px'}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="model=='top'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="top_actionsheet"
                 :style="{'background-color':backgroundColor, height:height+'px', top: -height+'px', 'border-color':borderColor, 'border-bottom-left-radius':borderRadius+'px', 'border-bottom-right-radius':borderRadius+'px', 'border-width':borderWidth+'px'}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="model=='left'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="left_actionsheet"
                 :style="{'background-color':backgroundColor, height:height+'px', width:width+'px', left: -width+'px', 'border-color':borderColor, 'border-top-right-radius':borderRadius+'px', 'border-bottom-right-radius':borderRadius+'px', 'border-width':borderWidth+'px'}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="model=='right'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="right_actionsheet"
                 :style="{'background-color':backgroundColor, height:height+'px', width:width+'px',right: -width+'px', 'border-color':borderColor, 'border-top-left-radius':borderRadius+'px', 'border-bottom-left-radius':borderRadius+'px', 'border-width':borderWidth+'px'}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background-color: RGBA(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
    }
    .common_type {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
    .botton_actionsheet {
        position: absolute;
        left: 0px;
        right: 0px;
    }
    .top_actionsheet {
        position: absolute;
        left: 0px;
        right: 0px;
    }
    .left_actionsheet {
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
    .right_actionsheet {
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
</style>

<script>
const animation = require('./alert-anim').animation;
export default {
    components: {

    },
    props: {
        isShow:         {default:false},
        backgroundColor:{default:'white'},
        width:          {default:500},       //左右显示时宽度
        height:         {default:500},       //上下显示时高度
        model:          {default:'top'},     //top bottom left right
        borderRadius:   {default:0},
        borderColor:    {default:'#F3F3F3'},
        borderWidth:    {default:0},
    },
    computed: {
        isShowActionSheet() {
            setTimeout(function () {
                //执行动画
                this.animationToShow();
            }.bind(this),10);
            return this.isShow;
        }
    },
    data:()=> ({

    }),
    methods: {
        touchView() {
            this.$emit('touchBg',{});
        },
        touchActionSheet() {

        },
        animationToShow() {
            var view_ref        = this.$refs.view_actionsheet_ref;  //组件引用
            var view_distance   = 0;          //移动距离
             if (this.model === 'bottom' || this.model === 'top') {
                 view_distance = this.height;
             }  else if (this.model === 'left' || this.model === 'right'){
                 view_distance = this.width;
             }
            animation.animation_actionSheet(view_ref,this.model,view_distance,function () {
                
            });
        }
    },
    created() {

    }
}
</script>
