var dir = require('./config.js').dir;

var imageLoad = function(name, isTemplateRes) {
    if (!isTemplateRes) {
        return dir + '/images/' + name;
    }else{
        return dir + '/view/template/images/' + name;
    }
}

export { imageLoad };