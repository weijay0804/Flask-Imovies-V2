alert_user('登出成功', 500)
setTimeout("window.location = '/'", 500)

// TODO 改成用 cookie
sessionStorage.removeItem('uid')
sessionStorage.removeItem('access_token')

function alert_user(e, t = 1000) {
    let alert_block = document.querySelector('.flash-user')
    let alert_html = `
        <div class="alert alert-dark" role="alert">
           ${e}
        </div>
        `
    alert_block.innerHTML = alert_html

    del_alert(t)
}

function del() {
    let alert_block = document.querySelector('.flash-user')
    alert_block.innerHTML = ''
}

function del_alert(t) {
    setTimeout('del()', t)
}