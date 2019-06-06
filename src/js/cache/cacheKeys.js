
const salt = 'YC-';

const makeSaltKey = function(name) {
    return salt + name;
}

var userInfo = makeSaltKey('userInfo');
var token = makeSaltKey('token');
var url = makeSaltKey('url');
var moduleInfo = makeSaltKey('moduleInfo');
var appcode = makeSaltKey('appcode');
var consultationType = makeSaltKey('consultationType');
var priceTypeId = makeSaltKey('priceTypeId');
var imInfo = 'ZSYY-imInfo';
var env = makeSaltKey('env');

var cacheKeys = {
    userInfo: userInfo,
    token: token,
    url: url,
    moduleInfo: moduleInfo,
    appcode: appcode,
    consultationType: consultationType,
    priceTypeId: priceTypeId,
    imInfo: imInfo,
    env:env
}


export default cacheKeys;