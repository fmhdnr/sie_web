import request from "@/js/request";

export function login(data) {
    localStorage.removeItem("userInfo")
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

export function forgetPassword(data) {
    localStorage.removeItem("userInfo")
    return request({
        url: "/user/forgetPassword",
        method: 'put',
        data
    })


}

