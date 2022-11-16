import request from "@/js/request";

export function merchList(data){
    return request({
        url:"http://localhost:8080/transaction/show",
        method:"post",
        data
    })
}
export function buy(data){
    return request({
        url:"http://localhost:8080/transaction/buy",
        method:"post",
        data
    })
}
export function exchange(data){
    return request({
        url:"http://localhost:8080/transaction/exchange",
        method:"post",
        data
    })
}