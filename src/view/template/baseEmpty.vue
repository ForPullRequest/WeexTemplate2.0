<template>
    <base title="title" :isShow="isShow" @baseAppear="appear">
    
    </base>
</template>

<style scoped>

</style>

<script>
const normal = require('./normal.js').normal;
export default{
    components: {
        base: require('./base.vue'),
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