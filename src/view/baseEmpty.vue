<template>
    <div title="title" :isShow="isShow" @baseAppear="appear">
        <text>123</text>
    </div>
</template>

<style scoped>

</style>

<script>
import {modal} from "../template/js/modal"
import {hotfix} from 'tesla-native-js'
// import {imageLoad} from '../template/imageUtil.js';
// import { getThemeObj, setModuleName, setTheme } from '../template/config.js';
export default{
    components: {
        // baseT: require('../template/base.vue'),
    },
    data:()=>({
        // imageLoad,
        isShow:true,
    }),
    created(){
        modal.log(hotfix.sucCode)
        // setModuleName('index');
        // let obj = getThemeObj();
        // obj.barTitleColor = 'yellow'
        // obj.barBackGroundColor = 'gray'
        // obj.backItemImage = imageLoad('logo.png')
        // obj.noContentImg = imageLoad('logo.png')
        // obj.noContentTxt = '暂无pp'
        // obj.contentBackGroundColor = 'white'
        // obj.barHasBaseline = false
        // obj.barTitleWeight = 'bold'
        // setTheme(obj);
    },
    methods:{
        appear(){

        },
    }
}
</script>