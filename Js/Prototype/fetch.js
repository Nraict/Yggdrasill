/**
 * fetch请求封装
 */
let fetchData = async (url, method, data) => {
    let options;
    let dataStr = '';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    // get 请求
    if (method === 'get') {
        if (typeof data === 'object') {
            Object.keys(data).forEach(key => {
                dataStr += `${key}=${data[key]}&`
            });
            if (dataStr) {
                dataStr = dataStr.substring(0, dataStr.length - 1)
            };
            url = `${url}?${dataStr}`;
        }
        options = {
            method: 'GET',
            headers,
        }
    } else {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key])
        }
        options = {
            method: 'POST',
            body: formData
        }
    }
    let response = await fetch(url, options);
    let res = await response.json();
    return res;
}