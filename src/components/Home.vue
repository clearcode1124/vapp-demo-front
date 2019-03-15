<template>
  <div id="home">
    <h3>name: {{ name }}</h3>
    <Button color="primary" @click="getCookies" :no-border="true" text-color="black">读取cookies</Button>
    <div>
      <p>value:{{value}}</p>
      <DateRangePicker v-model="value" :startWeek="7"></DateRangePicker>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      value: {}
    };
  },
  mounted: function() {
    this.autoLogin();
  },
  methods: {
    autoLogin() {
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
            that.$dd.runtime.permission.requestAuthCode({
              corpId: "ding06e35a04569c475d35c2f4657eb6378f", // 企业id
              onSuccess: function(info) {
                // let code = info.code; // 通过该免登授权码可以获取用户身份
                // alert(info.code);
                that.$http
                  .post("/api/v1/auth/login?requestAuthCode=" + info.code)
                  .then(res => {
                    // that.name = res.data.name;
                    that.$cookies.set("username", res.data.name, 60 * 60 * 12);
                  });
              },
              onFail: function(err) {
                alert(JSON.stringify(error));
              }
            });
          });
          this.$dd.error(function(error) {
            alert("dd error: " + JSON.stringify(error));
          });
        },
        res => {
          console.info("调用失败");
        }
      );
    },
    getCookies() {
      this.name = this.$cookies.get("username");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
