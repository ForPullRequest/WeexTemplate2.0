<template>
    <baseT title="title" :isShow="isShow" @baseAppear="appear">
    
    </baseT>
</template>

<style scoped>

</style>

<script>
const normal = require('./normal.js').normal;
export default{
    components: {
        baseT: require('./base.vue'),
    },
    data:()=>({
        isShow:true,
    }),
    created(){
        
    },
    methods:{
        appear(){

        },
    }
}
</script>