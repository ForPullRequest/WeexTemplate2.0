<!-- 
    radio
 -->
<template>
    <!-- 单选框 -->
    <formCustom :ifRequire="ifRequire" :title="title" :isRequireLeft="isRequireLeft" :titleSize="fontSize" :titleColor="titleColor" :isTitleRight="isTitleRight" :titleWidth="titleWidth">
        <!-- <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text> -->
        <div class="groupDiv" v-if="!isBelow">
            <radio-group class="group" :textColor="textColor" :style="{justifyContent:isLeft?'flex-start':'flex-end'}" :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" :textSize=fontSize @onRadioSelect="radioSelect">
                <!--:key 多层嵌套时, 如果与外部key相同会导致在原生中重复bug-->
                <div v-for="(item,index) in list" :key="item">
                    <radio :label="item"></radio>
                </div>
            </radio-group>
        </div>
        <div slot="below" class="groupDiv" v-if="isBelow">
            <radio-group :textColor="textColor" :style="{justifyContent:isLeft?'flex-start':'flex-end'}" :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" :textSize=fontSize @onRadioSelect="radioSelect">
                <!--:key 多层嵌套时, 如果与外部key相同会导致在原生中重复bug-->
                <div v-for="(item,index) in list" :key="item">
                    <radio :label="item"></radio>
                </div>
            </radio-group>
        </div>
    </formCustom>
</template>

<script>
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
        radio: require('../UIRadio.vue'),
        radioGroup: require('../UIRadioGroup.vue'),
    },
    props:{
        index:      {type: Number, default: 0},         //该行的索引
        tag:        {type: String, default: ''},        //该行的标签
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        textColor:  {type: String, default: '#666666'}, //内容字体颜色
        isCheck:    {type: String, default: ''},        //选中img
        unCheck:    {type: String, default: ''},        //未选中img
        selectRadio:{type: Number, default: -1},        //默认选中（单选）
        ifRequire:  {type: Boolean, default: false},    //是否必填
        isLeft:     {type: Boolean, default: false},    //是否靠左
        list:       {type: Array, default: []},         //列表
        titleWidth: {type: Number, default: 180},       //title宽度
        fontSize:   {type: Number, default: 34},        //文字大小
        isBelow:    {type: Boolean, default: false},
    },
    watch: {
        selectRadio(val){
            
        },
        textValue(val){

        }
    },
    data:()=> ({
        output:'',
        fontSize:34,
        numColor:'#999999',
    }),
    methods:{
        radioSelect(val){
            if(this.selectRadio == val){
                return;
            }
            this.selectRadio = val;
            let radio = '';
            if(this.selectRadio==-1){
                radio = '';
            }else{
                radio = this.list[this.selectRadio];
            }
            this.$emit('radioSelect', {
                selected:this.selectRadio,
                index:this.index,
                tag:this.tag,
                radio:radio,
            });
            this.$emit('getOutPut', {
                selected:this.selectRadio,
                index:this.index,
                tag:this.tag,
                output:radio,
            });
        },
    },
    created(){
    
    },
    mounted(){
    }
}
</script>

<style scoped>
.title {
}
.groupDiv{
    flex: 1;
    flex-direction:row;
    margin-left: 20px;
}
.group{
    flex-wrap: wrap;
    flex: 1;
}
</style>
