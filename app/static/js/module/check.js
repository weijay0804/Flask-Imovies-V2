// 檢查回傳的資料

import { alert_movies } from "./alert.js"

export function check_user_movies(datas)
{
    var callback = JSON.parse(datas.responseText)

    if (datas.status == 401)
    {
        alert_movies('登入逾時')
        return 'expired'

    }

    if (callback.status)
    {
        alert_movies('加入成功')
        return 'success'
        
    }
    else 
    {
        if (callback.message == 'exist')
        {
            alert_movies('已存在電影清單中', 2000)
            
            return false
        }

        else if (callback.message == 'exist_watched')
        {
            alert_movies('你已經看過這個電影', 2000)
    
            return false
        }

        else
        {
            alert_movies('加入失敗')
        } 

    }
 
}