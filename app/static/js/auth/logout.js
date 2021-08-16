import { alert_users } from "../module/alert.js"

alert_users('登出成功', 500)
setTimeout("window.location = '/'", 500)

// TODO 改成用 cookie
sessionStorage.removeItem('uid')
sessionStorage.removeItem('access_token')
sessionStorage.removeItem('refresh_token')

