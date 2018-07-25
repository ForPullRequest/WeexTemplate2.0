<!-- 
    image
 -->
<template>
    <div>
        <!-- 图片选择 -->
        <formCustom :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="group"><!--  :style="{'justify-content':isLeft?'flex-start':'flex-end'}" -->
                <div class="picBlock" v-for="item,index in list" >
                    <div @click="imgClick(index)">
                        <image class="img" :src="item"></image>
                    </div>
                    <div class="img-cancel" style="width:42;height:42;padding:6;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" :src="config.dir+'/images/tmp/components/erase-normal.png'"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="canCancel" @click="addPic(index)">
                    <image class="img" :src="config.dir+'/images/tmp/upload.png'"></image>
                </div>
            </div>
        </formCustom>
    </div>
</template>

<script>
import formCustom from '../formCustom.vue';
import config from '../config.js';
export default {
    components:{
        formCustom,
    },
    props:{
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        ifRequire:  {type: Boolean, default: false},    //是否必填
        canCancel:  {type: Boolean, default: false},    //图片是否可删除
        list:       {type: Array, default: []} 
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        config,
        output:'',
        fontSize:34,
        numColor:'#999999',
    }),
    methods:{
        getOutPut(){
            let output = this.textValue;
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.index,
            });
        },
        imgClick(index) {
            this.$emit('imgClick', {
                titile:this.title,
                index:index,
            });
        },
        imgCancel(index){
            this.$emit('imgCancel', {
                titile:this.title,
                index:index,
            });
        },
        addPic(index){
            this.$emit('addPic', {
                title:this.title,
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
.img-cancel{
    width: 30;
    height: 30;
    position: absolute;
    right: 0;
    top: 0;
}
.img{
    width: 100;
    height: 100;
    padding: 5;
}
.picBlock{
    margin-left: 10;
    margin-right: 10;
    justify-content: center;
}
.group{
    flex: 1;
    flex-direction:row;
    margin-left: 20;
}
</style>
