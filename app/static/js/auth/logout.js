alert('登出成功')
window.location = '/'
// TODO 改成用 cookie
sessionStorage.removeItem('uid')
sessionStorage.removeItem('access_token')