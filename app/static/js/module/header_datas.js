// 要放在 header 中的資料

var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token 
var uid = sessionStorage.uid
var access_token = sessionStorage.access_token
var refresh_token = sessionStorage.refresh_token

export var header_datas = {'csrftoken' : csrftoken, 'uid' : uid, 'access_token' : access_token, 'refresh_token' : refresh_token}


