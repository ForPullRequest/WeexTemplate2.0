<!-- 
    checkbox
 -->
<template>
    <!-- 复选框 -->
    <formCustom :ifRequire="ifRequire" :title="title" :isRequireLeft="isRequireLeft" :titleSize="fontSize" :titleColor="titleColor" :isTitleRight="isTitleRight" :titleWidth="titleWidth">
        <!-- <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text> -->
        <div class="groupDiv" v-if="!isBelow">
            <checkbox-group class="group" :textColor="textColor" :style="{'justify-content':isLeft?'flex-start':'flex-end'}" :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @onCheckboxSelect="checkSelect">
            </checkbox-group>
        </div>

        <text class="title" v-if="isBelow&&rightTitle" :style="{flex: 1,'text-align':'left',color:rightTitleColor, 'font-size': fontSize+'px'}" @click="rightClick">{{rightTitle}}</text>
        <div slot="below" class="groupDiv" style="margin-top:10px" v-if="isBelow">
            <checkbox-group class="group" :textColor="textColor" :style="{'justify-content':isLeft?'flex-start':'flex-end'}" :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @onCheckboxSelect="checkSelect">
            </checkbox-group>
        </div>
    </formCustom>
</template>

<script>
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
        checkboxGroup: require('../UICheckboxGroup.vue'),
    },
    props:{
        index:      {type: Number, default: 0},             //该行的索引
        tag:        {type: String, default: ''},            //该行的标签
        title:      {type: String, default: ''},            //title
        rightTitle: {type: String, default: ''},            //右侧标题
        titleColor: {type: String, default: '#5f5f5f'},     //title颜色
        rightTitleColor: {type: String, default: '#5f5f5f'},//右侧title颜色
        textColor:  {type: String, default: '#666666'},     //内容字体颜色
        isCheck:    {type: String, default: ''},            //选中img
        unCheck:    {type: String, default: ''},            //未选中img
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isLeft:     {type: Boolean, default: false},        //是否靠左
        list:       {type: Array, default: []},             //列表
        titleWidth: {type: Number, default: 180},           //title宽度
        fontSize:   {type: Number, default: 34},            //文字大小
        rightFontSize:{type: Number, default: 34},          //右侧文字大小
        isBelow:    {type: Boolean, default: false},        //主体是否处于标题下方
    },
    watch: {
        textValue(val){
            
        }
    },
    data:()=> ({
        output:'',
        selectCheck:[],
        numColor:'#999999',
    }),
    methods:{
        checkSelect(val){
            this.selectCheck = val;
            let check = [];
            for (var i = 0; i < this.selectCheck.length; i++) {
                check.push({
                    text:this.list[this.selectCheck[i]].title,
                    code:this.selectCheck[i]
                })
            }
            this.$emit('checkSelect', {
                selected:val,
                index:this.index,
                tag:this.tag,
                check:check,
            });
            this.$emit('getOutPut', {
                selected:val,
                index:this.index,
                tag:this.tag,
                output:check,
            });
        },
        rightClick(){
            this.$emit('rightClick', {
                index:this.index,
                tag: this.tag
            });
        },
    },
    created(){
        
    }
}
</script>

<style scoped>
.title {
}
.groupDiv{
    flex: 1;
    flex-direction:row;
}
.group{
    flex-wrap: wrap;
    flex: 1;
}

</style>
