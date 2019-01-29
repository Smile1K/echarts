import fetch from '../utils/fecth'

//登录
export function getBrands(params) {
    return fetch({
        url: '/datahubApi/queryBrandInfoByPsId',
        method: 'post',
        data: params
    })
}


//获取右侧活动分类列表菜单
export function getCamCategory() {
    return fetch({
        url: '/datahubApi/getCatgory',
        method: 'get'
    })
}

//取得活动信息
export function getCampaignInfo(params) {
    return fetch({
        url: '/datahubApi/getTarget',
        method: 'post',
        data: params
    })
}

// 获取图片List
export function getImglist() {
    return fetch({
        url: '/datahubApi/queryImageInfo',
        method: 'post',
    })
}
