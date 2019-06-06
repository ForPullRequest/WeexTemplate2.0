<!-- 
   text
 -->
<template>
    <!-- text -->
    <formCustom style="justify-content: center;" :ifRequire="ifRequire" :title="title" :isRequireLeft="isRequireLeft" :titleSize="fontSize" :titleColor="titleColor" :isTitleRight="isTitleRight" :isTitleBold="isTitleBold" :titleWidth="titleWidth" >
        <!-- <div :style="{'width': titleWidth+'px'}">
            <text class="title" :style="{color:titleColor, 'text-align':isTitleRight?'right':'left', 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text>
        </div> -->
        <div class="textDiv" style="justify-content: center;" :style="{marginLeft:isTitleRight?40+'px':0+'px'}" v-if="!isBelow" @click="textClick">
            <text class="text" style="" :style="{color:textColor,'text-align':isLeft?'left':'right','lines':lines, 'font-size': fontSize+'px'}">{{textValue}}</text>
        </div>
        <div class="" slot="below" v-if="!isBelow&&hasOpen" @appear="appear">
            <div class="open" @click="clickOpen">
                <text :style="{color:'#2F7DCD', 'font-size': fontSize+'px'}">{{open}}</text>
            </div>
        </div>
        <!-- below -->
        <div class="textDiv" slot="below" v-if="isBelow" @appear="appear">
            <text class="text" :style="{color:textColor,'lines':lines, 'font-size': fontSize+'px'}">{{textValue}}</text>
            <div class="open" v-if="!isBelow" @click="clickOpen">
                <text :style="{color:'#2F7DCD', 'font-size': fontSize+'px'}">{{open}}</text>
            </div>
        </div>
    </formCustom>
</template>

<script>
    import formCustom from '../formCustom.vue';
    export default {
        components: {
            formCustom
        },
        props: {
            index:      {type: Number, default: 0},          //通用，该行的索引
            tag:        {type: String, default: ''},         //通用，该行的标签
            title: { type: String, default: '' },            //通用，标题
            titleColor: { type: String, default: '#5f5f5f' },//通用，标题颜色
            textValue: { type: String, default: '' },        //内容
            textColor: { type: String, default: '#999999' }, //内容字体颜色
            lines: { type: Number, default: 3 },             //内容最大行数，超过会显示"..."
            // inputType:  {type: String, default: 'text'},
            ifRequire: { type: Boolean, default: false },    //是否必填（显示星号）
            isLeft: { type: Boolean, default: false },       //是否靠左
            isTitleRight: { type: Boolean, default: false }, //是否标题靠右
            isTitleBold: { type: Boolean, default: false },  //标题是否粗体
            hasOpen: { type: Boolean, default: false },      //是否有展开按钮
            lineNumber: { type: Number, default: -1 },       //最大显示字数，hasOpen填了必需
            titleWidth: { type: Number, default: 180 },      //标题宽度
            fontSize: { type: Number, default: 34 },         //文字大小
            isBelow: { type: Boolean, default: false },      //false：输入框在右侧  ture： 输入框在下方
            isRequireLeft: { type: Boolean, default: false },
        },
        watch: {
            textValue(val) {
                this.getOutPut();
            }
        },
        data: () => ({
            output: '',
            open: '展开',
            tlines:3,
        }),
        methods: {
            getOutPut() {
                let output = this.textValue;
                this.$emit('getOutPut', {
                    output: output ? output : '',
                    index: this.index,
                    tag: this.tag
                });
            },
            textClick() {
                this.$emit('textClick', {
                    title: this.title,
                    index: this.index,
                    tag: this.tag
                });
            },
            appear() {
                if (this.lineNumber * this.tlines >= this.textValue.length) {
                    this.hasOpen = false;
                }
            },
            clickOpen() {
                if (this.open == '展开') {
                    this.tlines = this.lines
                    this.lines = 99
                    this.open = '收起';
                } else {
                    this.lines = this.tlines;
                    this.open = '展开';
                }

                this.$emit('clickOpen', {
                    titile: this.title,
                    index: this.index,
                    tag: this.tag
                });
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .title {
        flex: 1;
    }

    .textDiv {
        flex: 1;
    }

    .text {
        flex: 1;
        text-overflow: ellipsis;
    }

    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }

    .open {
        height: 50px;
        align-items: flex-end;
        justify-content: center;
    }
</style>