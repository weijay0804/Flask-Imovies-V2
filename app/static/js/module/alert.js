// alert 處理函式庫

// 新增電影時的 alert (小方塊)
export function alert_movies(e, t = 1000) {
    let alert_block = document.querySelector('.flash-movies')
    let alert_html = `
        <div class="alert alert-dark" role="alert">
           ${e}
        </div>
        `
    alert_block.innerHTML = alert_html

    del_alert(t)
}

// 刪除新增電影時的 alert (小方塊)
function del_alert(t) {
    setTimeout( function() 
        {
            let alert_block = document.querySelector('.flash-movies')
            alert_block.innerHTML = ''
        }, 1000)
}

function del_alert_user(t) {
    setTimeout( function() 
        {
            let alert_block = document.querySelector('.flash-user')
            alert_block.innerHTML = ''
        }, 1000)
}

export function alert_users(e, t = 1000)
{
    let alert_block = document.querySelector('.flash-user')
    let alert_html = `
        <div class="alert alert-dark" role="alert">
           ${e}
        </div>
        `
    alert_block.innerHTML = alert_html

    del_alert_user(t)
}
