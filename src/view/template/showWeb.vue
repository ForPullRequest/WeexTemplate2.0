<template>
    <base :title="title" contentBackGroundColor="white" @backItemAction="back">
         <tsl-web class="content" ref="webc" :src="pageUrl"  @pagestart="webload"  @pagefinish="loadfinish"   @event="notice" ></tsl-web>
    </base>
</template>


<style lang="css">
    .content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
</style>

<script>
    // import  base     from '../../../components/navgationBar/navgationBar.vue';
    var     modal       = weex.requireModule('modal');
    import  { container,navigator ,cache} from "tesla-native-js";
    const   web         = weex.requireModule('tsl-webview');
    // import userInfo     from '../../../js/cache/userInfo.js';
    export default {
        components: {
            base: require('./base.vue'),
        },
        computed: {

        },
        data(){
            return {
                urlSrc:'',
                cangoback: false,
                isShow: false,
                pageUrl: '',
                titleShow: false,
                title: '查看页面',
                dofinish:false,
                // titleheight:80,
                leftUrl:"",
                rightUrl:"",
                rightIcon:"",
                chatroom:"https://hlwyyview.zwjk.com/doctor/#/chatRoom",
            }
        },
        created() {
            // modal.alert({message:decodeURI(this.urlSrc)})
            this.gobackresigter();
            this.isShow = weex.config.env.platform === "iOS" ? true : false;
            this.pageUrl = this.urlSrc;
            // this.titleheight = 46*750/weex.config.env.deviceWidth;

        },
        methods: {
            rightclick:function(){
                // modal.alert({message:this.rightUrl+"======"+this.pageUrl})
                // this.$refs['webc'].loadUrl(this.rightUrl);
                if(this.rightUrl&&this.rightUrl!=""){
                    if(weex.config.env.platform === "iOS"){
                        this.pageUrl = this.rightUrl;
                    }else{
                        web.loadUrl(this.$refs.webc,this.rightUrl);
                    }
                }
                // this.$refs.webview.loadUrl(this.rightUrl);

            },
            back:function () {
                if (!this.cangoback) {
                    navigator.pop({
                        delta:1
                    });
                } else {
                    // this.titleShow = false;
                    web.goBack(this.$refs.webc)
                }
            },
            gobackresigter: function () {
                var self = this;
                // if (weex.config.env.platform != "iOS") {
                    container.registerBack(function (e) {
                        // modal.alert({message:JSON.stringify(self.cangoback)})
                        if (!self.cangoback) {
                            navigator.pop({
                                delta:1
                            });
                        } else {
                            web.goBack(self.$refs.webc)
                        //    self.titleShow= false
                        }
                    })
                // }
            },
            loadfinish: function (e) {
                // this.isInConversation(e);
            },
            getUrlParm:function (url,name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = url.substring(url.indexOf("?")+1, url.length).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            webload: function(e) {
                // modal.alert({message:"pagestart==========="+e.url})
                // if(e.canGoBack){this.cangoback = e.canGoBack;}
                // // this.titleShow = false;
                // var self = this;
                // var url = e.url;
                // var mxtitle = self.getUrlParm(decodeURI(url),"title")
                // this.pageUrl = e.url;
                // modal.alert({message:this.pageUrl})
                
            },
            isInConversation:function(e){
                // modal.alert({message:e.url})
                // if(e.url.indexOf(this.chatroom)==-1){
                //     cache.setStorageSync("inConversation", false);
                // }
                // if(e.url.indexOf(this.chatroom)>-1){
                //     cache.setStorageSync("inConversation",true);
                // }
            },
            notice: function(e){
                // modal.alert({message:JSON.stringify(e)})
                // if(e.action=='gotoUserInfo'){
                //     var url = {
                //         url : '../../me/me-information',
                // //   option: {
                // //     hospital_id : id,
                // //   },
                //     };
                //     navigator.push(url,function(e){

                //     });
                // }
                // if(e.action == 'titleShow'){
                //     this.titleShow = true;
                //     // if(e.param&&e.param.title){
                //     //     this.title = e.param.title;
                //     // }

                //     if(JSON.parse(e.param).title){
                //         this.title = JSON.parse(e.param).title;
                //     }
                //     if(JSON.parse(e.param).leftUrl){
                //         this.leftUrl = JSON.parse(e.param).leftUrl;
                //     }
                //     if(JSON.parse(e.param).rightUrl){
                //         this.rightUrl = JSON.parse(e.param).rightUrl;
                //     }else{
                //         this.rightUrl = "";
                //     }
                //     if(JSON.parse(e.param).rightIcon){
                //         this.rightIcon = JSON.parse(e.param).rightIcon;
                //     }else{
                //         this.rightIcon = "";
                //     }
                // }
                // if(e.action == 'titleHidden'){
                //     this.titleShow = false;
                // }
                
                // if(e.param&&JSON.parse(e.param).isIndex){
                //     this.cangoback = JSON.parse(e.param).isIndex !="yes"
                // }
                // // modal.alert({message:"action==="+e.action+"title====="+e.param.title+"cangoback"+this.cangoback})
                // // modal.alert({message:"action==="+e.action+"title====="+e.param.title+"isIndex"+e.param.isIndex})
                // //退出登录
                // if (e.action == 'loginout') {
                //     userInfo.clear();
                //     navigator.push({
                //         url:"/index/view/login"
                //     })
                // }
            },
        }
    }

</script>

