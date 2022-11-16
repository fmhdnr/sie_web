import request from "@/js/request";

export function getSellList(data){
    return request({
        url:"http://localhost:8080/transaction/mysale",
        method: 'post',
        data
    })
}

export function addMer(data){
    request.defaults.headers['Content-Type'] = "multipart/form-data"
    return request({
        url:"http://localhost:8080/transaction/add",
        method: 'post',
        data
    })
}