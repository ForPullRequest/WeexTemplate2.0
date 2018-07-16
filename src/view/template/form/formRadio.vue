<!-- 
    radio
 -->
<template>
    <!-- 单选框 -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
        <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
            <radio-group :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" :textSize=fontSize @input="radioSelect">
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
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        isCheck:    {type: String, default: ''},        //选中img
        unCheck:    {type: String, default: ''},        //未选中img
        selectRadio:{type: Number, default: -1},        //默认选中（单选）
        ifRequire:  {type: Boolean, default: false},    //是否必填
        isLeft:     {type: Boolean, default: false},    //是否靠左
        list:       {type: Array, default: []},
    },
    watch: {
        selectRadio(val){
            this.getOutPut();
        },
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        fontSize:34,
        numColor:'#999999',
    }),
    methods:{
        radioSelect(val){
            this.selectRadio = val;
        },
        getOutPut(){
            let output = '';
            if(this.selectRadio==-1){
                output = '';
            }else{
                output = this.list[this.selectRadio];
            }
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.index,
            });
        }
    },
    created(){
    
    }
}
</script>

<style scoped>
.title {
    width: 180;
    margin-top: 10;
    margin-bottom: 10;
}
.group{
    flex: 1;
    flex-direction:row;
    margin-left: 20;
}
</style>
