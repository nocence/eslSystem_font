// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = window.localStorage.getItem("token")
    if (token) {
        config.headers.accessToken = token;    //将token放到请求头发送给服务器
        return config;
        //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
        // config.headers['accessToken'] = Token;
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
/*封装发送axios的方法*/
var commonUrl="http://localhost:8080/eslsystem/";
function sendAxios(myUrl,myData){
    //创建加解密对象
    var encrypt = new JSEncrypt();
    //设置公钥
    encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaVvWsXQoGZCfZk1snIWivx0JGE3UQCzQfT7OJ" +
        "APDqBEKyslrM8ri4dlR9sVdcH1nzWR3XTk1reA0ATG4WUI+R1RaLp6+m6TNFxRPSibarFAZGryAQal4JEEN4q5G0KxwWvasF82G6epZTz7X" +
        "SPIqHywFTrR3RuEb0SGDbSurqkQIDAQAB");
    var nowtime = Date.parse(new Date());
    //获取密码加时间的密钥
    var mykey = "zssb" +"|"+ nowtime;
    var m = encrypt.encrypt(mykey);
    //向数据中添加签名
    myData.passSign = m;
    let token = sessionStorage.getItem("token")
    if (token !=null && token != "")this.Authorization = token;
    return new Promise((resolve, reject) => {
        //创建axios实例，把基本的配置放进去
        const instance = axios.create({
            method : "POST", //请求方式
            url : commonUrl+myUrl, //请求地址
            params : myData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            }

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
