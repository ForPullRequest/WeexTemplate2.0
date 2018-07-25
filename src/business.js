import myCache from './js/cache/myCache.js';
import netUtil from './js/net/baseNet.js';
// import api from './api.js';
const normal = require('./view/template/normal.js').normal;

var fail = function(error){
    
};

var requestBackAll = function(option) {//methods, host, url, params, success
    netUtil.request({
        host:    option.host ? option.host : '',
        method:  option.methods ? option.methods : 'post',
        url:     option.url ? option.url : '',
        params:  option.params,
        backAll: true,
        contentType: option.contentType?option.contentType:'',//不传默认application/x-www-form-urlencoded
        success: (response) => {
            // normal.alert(response)
            // if(typeof(res) == 'object' && res.data != undefined){
            //     res = JSON.parse(res.data);
            // }
            option.success(response);
        },
        fail: (error) => {
            fail(error);
        }
    });
};

var request = function(option) {//methods, host, url, params, success
    netUtil.request({
        host:    option.host ? option.host : '',
        method:  option.methods ? option.methods : 'post',
        url:     option.url ? option.url : '',
        params:  option.params,
        contentType: option.contentType?option.contentType:'',//不传默认application/x-www-form-urlencoded
        success: (response) => {
            option.success(response);
        },
        fail: (error) => {
            fail(error);
        }
    });
};

var req = function(methods, api, params, success){
    request({
        host: myCache.getUrl().url,
        url: api,
        params: params,
        success: success,
        methods: methods,
        contentType: 'application/x-www-form-urlencoded'
    });
};

var reqVisit = function(methods, api, params, success){
    request({
        host: myCache.getUrl().visiturl,
        url: api,
        params: params,
        success: success,
        methods: methods,
        contentType: 'application/x-www-form-urlencoded'
    });
};

const api = {

};

var business = {
    api: api,
    req: req,
    reqVisit: reqVisit,
};

export default business;