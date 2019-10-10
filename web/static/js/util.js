
/*封装发送axios的方法*/
var commonUrl="http://localhost:8080/bluetoothprice/";
function sendAxios(myUrl,myData){
    console.log(myData)
    return new Promise((resolve, reject) => {
        //创建axios实例，把基本的配置放进去
        const instance = axios.create({
            method : "POST", //请求方式
            url : commonUrl+myUrl, //请求地址
            params : myData,
            headers: {
                'Content-Type': 'application/json'
            },
            /*处理request数据*/
           /* transformRequest: [function (data) {
                if (options.contentType) {
                    return JSON.stringify(data);
                } else {
                    return qs.stringify(data, {arrayFormat: 'brackets'})
                }
            }],*/
        });
            //请求成功后执行的函数
        instance(commonUrl+myUrl, "POST", myData).then(res => {
            resolve(res);
        //失败后执行的函数
        }).catch(err => {
            reject(err);
        })
    })
}