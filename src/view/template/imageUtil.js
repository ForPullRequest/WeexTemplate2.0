var list = {
    arrow: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/arrow.png',
    back: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/back.png',
    erase: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/erase-normal.png',
    close: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_close.png',
    samplePic1: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_immune.png',
    samplePic2: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_image.png',
    noContent: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_no_content.png',
    search: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ic_search.png',
    radioSelected: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ico-radio-selected.png',
    radioUnselected: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/ico-radio-selected-gray.png',
    loading: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/loading.gif',
    pageNext: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/page-next.png',
    starUnselected: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/star.png',
    starSelected: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/star_select.png',
    upload: 'https://tesla-1251304050.picsh.myqcloud.com/tmp/upload.png',
}
var imageLoad = function (name, isTemplateRes) {
    return list[name];
}

export {
    imageLoad
};