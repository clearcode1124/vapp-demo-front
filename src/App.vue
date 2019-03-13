<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="test">测试</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "2.0",
      timeStamp: 0,
      signature: ""
    };
  },
  methods: {
    test() {
      let that = this;
      this.$http.get("/api/v1/signs/get-sign").then(
        res => {
          var data = res.data;
          var timeStamp = data.split(",")[0];
          var signature = data.split(",")[1];
          // alert(timeStamp + "," + signature);
          this.$dd.config({
            agentId: "232633030", // 必填，微应用ID
            corpId: "ding06e35a04569c475d35c2f4657eb6378f", //必填，企业ID
            timeStamp: timeStamp, // 必填，生成签名的时间戳
            nonceStr: "123456", // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              "runtime.info",
              "biz.contact.choose",
              "device.notification.confirm",
              "device.notification.alert",
              "device.notification.prompt",
              "biz.ding.post",
              "biz.util.openLink"
            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          this.$dd.userid = 0;
          this.$dd.ready(function() {
            // alert("已进入ready");
            // alert(that.$dd.runtime.permission.requestAuthCode);
            // that.$dd.runtime.info({
            //   onSuccess: function(info) {
            //     alert("runtime info: ");
            //   },
            //   onFail: function(err) {
            //     alert("fail: ");
            //   }
            // });
            that.$dd.runtime.permission.requestAuthCode({
              corpId: "ding06e35a04569c475d35c2f4657eb6378f", // 企业id
              onSuccess: function(info) {
                // let code = info.code; // 通过该免登授权码可以获取用户身份
                // alert(info.code);
                that.$http.post("/api/v1/auth/login?requestAuthCode=" + info.code).then(res => {
                  that.message = JSON.stringify(res);
                });
              },
              onFail: function(err) {
                alert("fail");
              }
            });
          });
          this.$dd.error(function(error) {
            /**
        {
           errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
           errorCode: "错误码"
        }
       **/
            alert("dd error: " + JSON.stringify(error));
            that.message = JSON.stringify(error);
          });
        },
        res => {
          console.info("调用失败");
        }
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
