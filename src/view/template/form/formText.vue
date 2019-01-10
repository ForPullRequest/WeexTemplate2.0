<!-- 
   text
 -->
<template>
    <!-- text -->
    <formCustom style="justify-content: center;" :ifRequire=ifRequire :titleSize=fontSize>
        <div :style="{'width': titleWidth+'px'}">
            <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text>
        </div>
        <div class="textDiv" v-if="!isBelow" @click="textClick">
            <text class="text" :style="{color:textColor,'text-align':isLeft?'left':'right','lines':lines, 'font-size': fontSize+'px'}">{{textValue}}</text>
        </div>
        <div class="padding" slot="below" v-if="!isBelow&&hasOpen" @appear="appear">
            <div class="open" @click="clickOpen">
                <text :style="{color:'#2F7DCD', 'font-size': fontSize+'px'}">{{open}}</text>
            </div>
        </div>
        <!-- below -->
        <div class="textDiv padding" slot="below" v-if="isBelow" @appear="appear">
            <text class="text" :style="{color:textColor,'lines':lines, 'font-size': fontSize+'px'}">{{textValue}}</text>
            <div class="open" @click="clickOpen">
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
            index: { type: Number, default: 0 },
            title: { type: String, default: '' },            //标题
            titleColor: { type: String, default: '#5f5f5f' },     //标题颜色
            textValue: { type: String, default: '' },            //内容
            textColor: { type: String, default: '#999999' },     //内容字体颜色
            lines: { type: Number, default: 3 },             //内容最大行数，超过会显示"..."
            // inputType:  {type: String, default: 'text'},
            ifRequire: { type: Boolean, default: false },        //是否必填（显示星号）
            isLeft: { type: Boolean, default: false },        //是否靠左
            hasOpen: { type: Boolean, default: false },        //是否有展开按钮
            lineNumber: { type: Number, default: -1 },            //最大显示字数，hasOpen填了必需
            titleWidth: { type: Number, default: 180 },           //标题宽度
            fontSize: { type: Number, default: 34 },            //文字大小
            isBelow: { type: Boolean, default: false },        //false：输入框在右侧  ture： 输入框在下方
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
                });
            },
            textClick() {
                this.$emit('textClick', {
                    title: this.title,
                    index: this.index,
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
                });
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .title {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .textDiv {
        flex: 1;
    }

    .text {
        margin-top: 10px;
        margin-bottom: 10px;
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