<!-- 
    radio
 -->
<template>
    <!-- 单选框 -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize, 'width': titleWidth}" :value="title"></text>
        <div class="groupDiv">
            <radio-group class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}" :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" :textSize=fontSize @input="radioSelect">
                <div v-for="item in list">
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
        index:      {type: Number, default: 0},
        tag:        {type: String, default: ''},
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        isCheck:    {type: String, default: ''},        //选中img
        unCheck:    {type: String, default: ''},        //未选中img
        selectRadio:{type: Number, default: -1},        //默认选中（单选）
        ifRequire:  {type: Boolean, default: false},    //是否必填
        isLeft:     {type: Boolean, default: false},    //是否靠左
        list:       {type: Array, default: []},         //列表
        titleWidth: {type: Number, default: 180},       //title宽度
        fontSize:   {type: Number, default: 34},        //文字大小
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
    
    }
}
</script>

<style scoped>
.title {
    margin-top: 10;
    margin-bottom: 10;
}
.groupDiv{
    flex: 1;
    flex-direction:row;
    margin-left: 20;
}
.group{
    flex-wrap: wrap;
    flex: 1;
}
</style>
