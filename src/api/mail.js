import request from "@/js/request";

export function sentMail(params) {
    return request({
        url: `/send/view/`,
        method: 'get',
        params
    })
}
export function receiveMail(params) {
    return request({
        url: `/send/select/`,
        method: 'get',
        params
    })
}
export function draftMail(params) {
    return request({
        url: `/send/view1/`,
        method: 'get',
        params
    })
}
export function deleteMail(params) {
    return request({
        url: `/send/view2/`,
        method: 'get',
        params
    })
}

export function countSent(params) {
    return request({
        url: `/send/count/`,
        method: 'get',
        params
    })
}
export function countDraft(params) {
    return request({
        url: `/send/count1/`,
        method: 'get',
        params
    })
}
export function countReceive(params) {
    return request({
        url: `/send/count2/`,
        method: 'get',
        params
    })
}
export function countDelete() {
    return request({
        url: `/send/count3/`,
        method: 'get'
    })
}
