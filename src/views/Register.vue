<template>
  <div class="register-container">
    <div class="register-form">
      <h2>手机号码注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="phone">手机号</label>
          <input type="text" id="phone" v-model="phone" placeholder="请输入手机号" required />
        </div>
        <div class="form-group verification-group">
          <input type="text" v-model="verificationCode" placeholder="请输入验证码" required />
          <button type="button" @click="sendVerificationCode">获取验证码</button>
        </div>
        <div class="form-group">
          <label for="password">设置密码</label>
          <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="请再次输入密码" required />
        </div>
          <div class="form-group agree-group">
          <label>
            <input type="checkbox" v-model="agree" required />
            已阅读并接受 <a href="#">服务协议与隐私政策</a>
          </label>
        </div>
        <button type="submit">立即注册</button>
      </form>
      <p class="login-link">已有账号？<a href="#">去登录</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      agree: false,
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("两次输入的密码不一致！");
        return;
      }
      console.log("手机号:", this.phone, "验证码:", this.verificationCode, "密码:", this.password);
      alert("注册成功！");
    },
    sendVerificationCode() {
      console.log("发送验证码到:", this.phone);
      alert("验证码已发送！");
    }
  }
};
</script>

<style scoped>
.agree-label {
  display: flex;
  gap: 5px; /* 控制复选框与文字的间距 */
}
.agree-group label {
  display: flex;
  align-items: center;  /* 让 label 内部的内容对齐 */
  font-size: 14px;
  color: #333;
}
.agree-group input[type="checkbox"] {
  width: 16px; /* 控制复选框大小 */
  height: 16px;
  margin: 2; /* 避免额外的间距 */
}
.register-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 82vh;
  width: 100vw;
  background-color: rgba(230, 227, 234, 0.83);
}
.register-form {
  background-color: #eff3f5f4;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(227, 209, 239, 0.951);
  max-width: 400px;
  width: 100%;
  position: relative;
  left: -350px;
}

h2 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #641eb0;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  color: #c4b4da;
}

input {
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #352057;
}

input:focus { /* 设置点击后边框颜色 */
  border: 1.4px solid #641eb0; 
  box-shadow: 0 0 8px rgba(205, 193, 237, 0.903);  /* 添加光晕效果 */
  outline: none;  /* 移除默认的聚焦轮廓 */
}

.verification-group {
  display: flex;
  gap: 10px;
}
.verification-group input {
  flex: 1;
}
.verification-group button {
  flex: 0.5;
  background-color: #641eb0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #641eb0;
  box-shadow: 0 0 8px #7e44bc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #47177a;
}

.login-link {
  text-align: center;
  margin-top: 10px;
  color: #641eb0;
}
</style>
