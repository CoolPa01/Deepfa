<template>
  <div class="login-container">
    <div class="login-form">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">手机号/邮箱</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
      <p v-if="showForgotPassword" @click="forgotPassword" class="forgot-password-link">忘记密码？</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showForgotPassword: true, // Control visibility of forgot password link
    };
  },
  mounted() {
    // Check if auto-login is available (from localStorage)
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUsername && savedPassword) {
      this.username = savedUsername;
      this.password = savedPassword;
      this.handleLogin();
    }
  },
  methods: {
    handleLogin() {
      // In a real app, here you would make an API call to authenticate the user
      console.log("用户名:", this.username, "密码:", this.password);

      // Check for valid credentials (dummy check for demo)
      if (this.username && this.password) {
        // Store credentials in localStorage for auto-login next time
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        console.log("登录成功！");
        // Redirect to the main page or dashboard
        // this.$router.push('/dashboard');
      } else {
        console.log("登录失败，用户名或密码错误！");
      }
    },
    forgotPassword() {
      // Simulate a forgot password flow (e.g., opening a modal, navigating to reset page, etc.)
      console.log("触发忘记密码流程...");
      // Example: this.$router.push('/reset-password');
    }
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 82vh;
  width: 100vw;/*背景颜色*/
  background-color: rgba(230, 227, 234, 0.83);
}
.login-form {
  background-color: #eff3f5f4;/*登录框颜色*/ 
  color: white;/*登录小条框颜色*/
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(227, 209, 239, 0.951);/*框底阴影色*/ 
  max-width: 400px;
  width: 100%;
  position: relative;
  left: -350px;  /* 向左移动 px */
}

 @keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

h2 {
  font-family: 'Roboto', sans-serif;  /* 使用Google字体Roboto */
  font-size: 28px;  /* 设置字体大小 */
  font-weight: bold;  /* 设置字体加粗 */
  text-align: center;  /* 居中对齐 */
  margin-bottom: 20px;  /* 设置下边距 */
  font-weight: bold;
  color: #641eb0;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #641eb0;  /* 光标效果 */
  animation: typing 2s steps(50) 1s forwards;  /*逐字出现 */
} 


.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 1px;
  color: #c4b4da;  /* 改变标签字体颜色 */
}

.forgot-password-link {
  text-align: center;
  color:#641eb0;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
}

input {
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ffffff;
  border-radius: 4px;/*用户和密码框两头弧度*/
  color: #352057;  /* 改变输入框内的字体颜色 */
}

input {
  border: 2px solid #f4f1f1;  /* 默认边框颜色 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;  /* 添加过渡动画 */
}

input:focus {
  border: 1px solid #641eb0;  /* 设置点击后边框颜色 */
  box-shadow: 0 0 8px rgba(205, 193, 237, 0.903);  /* 添加光晕效果 */
  outline: none;  /* 移除默认的聚焦轮廓 */
}

button {
  width: 100%;
  padding: 10px;
  background-color:  #641eb0;/*登录键*/
  box-shadow: 0 0 8px #7e44bc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #47177a;/*按键后颜色*/
}
</style>
