<template>
    <div class="container">
        <div v-for="(checkbox,index) in  checkboxs" :key="index" :index="index" class="div-container" @click="onCheckboxSelect(index)">
            <image class="div-image" v-if="checkbox.selected" :src="selectImg"></image>
            <image  class="div-image" v-if="!checkbox.selected" :src="unselectImg"></image>
            <text class="radio-text" :style="{'font-size': textSize+'px'}">{{checkbox.title}}</text>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
.container{
    flex-direction: row;
}

.div-container{
    margin: 10px;
    flex-direction: row;
}

.div-image{
    width: 40px;
    height: 40px;
}

.radio-text{
    color: #666666;
    margin-left: 10px;
    align-self: center;
}
</style>
<script>
const dom = weex.requireModule('dom')
module.exports = {
    props: {
        checkboxs:{
            default: [],
        },
        value:{
            default: [],
        },
        selectImg:{
            default:'',//TODO
        },
        unselectImg:{
            default:'',//TODO
        },
        textSize:{
            default: 34,
        }
    },
    data(){
        return {
            // checkboxs: [],
            chcklists: this.value,
            textSize:34,
        }
    },
    methods: {
        onCheckboxSelect:function (index) {
            for(var i=0;i<this.checkboxs.length;i++){
                if(index==i){
                    this.checkboxs[i].selected=!this.checkboxs[i].selected
                }
            }
            this.$emit('onCheckboxSelect', this.getEmitData());
        },
        getEmitData:function () {
            var data = []
            for(var i=0;i<this.checkboxs.length;i++){
                if(this.checkboxs[i].selected){ data.push(i);}

            }
            return data;
        },
        addPanes: function (item, name) {
            const index = this.$slots.default.indexOf(item.$vnode);
            this.checkboxs.push({title: name,selected:this.chcklists[index]==index?true:false});
        }
    },
}
</script>