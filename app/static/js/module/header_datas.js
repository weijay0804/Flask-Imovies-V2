// 要放在 header 中的資料

import { getCookie } from "./parse.js"

var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token 
var uid = getCookie('uid')
var access_token = getCookie('access_token')
var refresh_token = getCookie('refresh_token')

export var header_datas = {'csrftoken' : csrftoken, 'uid' : uid, 'access_token' : access_token, 'refresh_token' : refresh_token}


