import request from "@/js/request";

export function login(data) {
    return request({
        url: "/user/login",
        method: 'post',
        data
    })
}

export function getUserInfo(userId) {
    return request({
        url: `/user/getUserInfo/${userId}`,
        method: 'get'
    })
}

