my-page
<template>
  <div class="my-page">
    <div class="modules">
      <div @click="openModal('phone')" class="module">
        <div class="module-content">
          <span class="module-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-forwarded"><polyline points="18 2 22 6 18 10"/><line x1="14" x2="22" y1="6" y2="6"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
          <h2 class="module-title">更换手机号绑定</h2>
          <span class="arrow">→</span>
        </div>
      </div>
      <div @click="openModal('password')" class="module">
        <div class="module-content">
          <span class="module-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg></span>
          <h2 class="module-title">修改密码</h2>
          <span class="arrow">→</span>
        </div>
      </div>
      <div @click="openModal('language')" class="module">
        <div class="module-content">
          <span class="module-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></span>
          <h2 class="module-title">语言更换</h2>
          <span class="arrow">→</span>
        </div>
      </div>
      <div @click="openModal('history')" class="module">
        <div class="module-content">
          <span class="module-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-clock"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="8" cy="16" r="6"/><path d="M9.5 17.5 8 16.25V14"/></svg></span>
          <h2 class="module-title">历史记录</h2>
          <span class="arrow">→</span>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop> <!-- 阻止弹窗点击外部关闭 -->
        <div class="modal-header">
          <span>{{ modalTitle }}</span> <!-- 弹窗标题 -->
          <button @click="closeModal" class="close-btn">×</button> <!-- 关闭弹窗按钮 -->
        </div>
        <div class="modal-body">
          <!-- 更换手机号绑定弹窗内容 -->
          <div v-if="currentModal === 'phone'">
            <label for="new-phone">新手机号：</label>
            <input id="new-phone" v-model="newPhone" type="tel" placeholder="请输入新手机号">
            <button @click="submitPhone">提交</button> <!-- 提交新手机号 -->
          </div>
          <!-- 修改密码弹窗内容 -->
          <div v-if="currentModal === 'password'">
            <label for="old-password">旧密码：</label>
            <input id="old-password" v-model="oldPassword" type="password" placeholder="请输入旧密码">
            <label for="new-password">新密码：</label>
            <input id="new-password" v-model="newPassword" type="password" placeholder="请输入新密码">
            <label for="confirm-password">确认密码：</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" placeholder="请重新输入新密码">
            <button @click="submitPassword">提交</button> <!-- 提交新密码 -->
          </div>
          <!-- 语言更换弹窗内容 -->
          <div v-if="currentModal === 'language'">
            <label for="language-select">选择语言：</label>
            <select id="language-select" v-model="selectedLanguage"> <!-- 选择语言 -->
              <option v-for="(language, index) in languages" :key="index" :value="language.code">
                {{ language.name }} <!-- 显示语言名称 -->
              </option>
            </select>
            <button @click="submitLanguage">提交</button> <!-- 提交选择的语言 -->
          </div>
          <!-- 历史记录弹窗内容 -->
          <div v-if="currentModal === 'history'">
            <p>历史记录内容展示...</p> <!-- 展示历史记录 -->
            <button @click="clearHistory">清除历史记录</button> <!-- 清除历史记录按钮 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false, // 控制弹窗显示与否
      currentModal: '', // 当前弹窗类型
      modalTitle: '', // 弹窗标题
      newPhone: '', // 新手机号
      newPassword: '', // 新密码
      oldPassword: '', // 旧密码
      confirmPassword: '', // 确认新密码
      selectedLanguage: 'cn', // 默认选择的语言
      languages: [ // 支持的语言列表
        { code: 'cn', name: '中文' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'it', name: 'Italiano' },
        { code: 'ru', name: 'Русский' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'pt', name: 'Português' },
        { code: 'ar', name: 'العربية' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'pl', name: 'Polski' },
        { code: 'tr', name: 'Türkçe' },
        { code: 'vi', name: 'Tiếng Việt' },
      ],
    };
  },
  methods: {
    openModal(modalType) {
      this.currentModal = modalType; // 设置当前弹窗类型
      this.modalVisible = true; // 显示弹窗
      this.modalTitle = this.getModalTitle(modalType); // 设置弹窗标题
    },
    closeModal() {
      this.modalVisible = false; // 关闭弹窗
    },
    getModalTitle(modalType) {
      switch (modalType) {
        case 'phone':
          return '更换手机号绑定';
        case 'password':
          return '修改密码';
        case 'language':
          return '语言更换';
        case 'history':
          return '历史记录';
        default:
          return '';
      }
    },
    submitPhone() {
      if (this.newPhone) {
        alert(`手机号 ${this.newPhone} 已成功绑定！`); // 提交手机号成功提示
        this.closeModal();
      } else {
        alert('请输入有效的手机号！'); // 提交手机号失败提示
      }
    },
    submitPassword() {
      if (!this.oldPassword) {
        alert('请输入旧密码！');
        return;
      }
      if (!this.newPassword) {
        alert('请输入新密码！');
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        alert('新密码与确认密码不一致，请重新输入！');
        return;
      }
      alert('密码已成功修改！'); // 提交密码成功提示
      this.closeModal();
    },
    submitLanguage() {
      alert(`已选择语言：${this.selectedLanguage}`); // 提交选择语言成功提示
      this.closeModal();
    },
    clearHistory() {
      alert('历史记录已清除！'); // 清除历史记录成功提示
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.my-page {
  padding: 400px 600px; /* 设置页面内边距 */
  background-color: #f0f0f0; /* 页面背景颜色 */
  height: 75vh; /* 页面高度填满屏幕 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* 设置字体 */
  color: #333; /* 设置字体颜色 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中对齐 */
}

.page-header {
  text-align: center; /* 居中文本 */
  margin-bottom: 40px; /* 底部间距 */
}

h1 {
  font-size: 2.5rem; /* 更大的标题字体 */
  font-weight: bold; /* 标题字体粗细 */
  color: #5a1a9e; /* 标题颜色 */
  overflow: hidden; /* 隐藏多余部分 */
  white-space: nowrap; /* 防止换行 */
  border-right: 4px solid #641eb0; /* 光标效果 */
  width: 0; /* 初始化宽度为 0，逐步增加 */
  animation: typing 3s steps(30) 1s forwards, blink 0.75s step-end infinite; /* 打字动画与光标闪烁 */
}

/* 打字效果动画 */
@keyframes typing {
  from {
    width: 0; /* 从 0 开始 */
  }
  to {
    width: 100%; /* 到达文本的完整宽度 */
  }
}

.modules {
  width: 600%; /* 调整条块横长 */
  display: flex;
  flex-direction: column; /* 垂直排列功能模块 */
  gap: 30px; /* 功能模块之间的间距 */
}

.module {
  background: linear-gradient(145deg, #641eb0, #8a7cb8); /* 背景渐变色 */
  padding: 20px; /* 内边距 */
  width: 100%; /* 宽度填满容器 */
  border-radius: 8px; /* 圆角 */
  display: flex;
  justify-content: space-between; /* 两侧对齐 */
  align-items: center; /* 中心对齐 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* 阴影 */
  cursor: pointer; /* 鼠标悬停显示手形光标 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 过渡效果 */
}

.module:hover {
  transform: scale(1.05); /* 鼠标悬停时缩放 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* 鼠标悬停时阴影加重 */
}

.module-content {
  display: flex;
  justify-content: space-between; /* 两侧对齐 */
  width: 100%; /* 宽度填满容器 */
  align-items: center; /* 垂直居中对齐 */
}

.module-title {
  font-size: 1rem; /* 字体大小 */
  color: rgb(255, 255, 255); /* 字体颜色 */
  font-weight: 600; /* 字体粗细 */
}

.arrow {
  font-size: 2.5rem; /* 箭头大小 */
  color: rgb(81, 31, 131); /* 箭头颜色 */
  transition: transform 0.3s ease; /* 过渡效果 */
}

.module:hover .arrow {
  transform: translateX(12px); /* 鼠标悬停时箭头水平移动 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(18, 18, 18, 0.6); /* 弹窗背景色 */
  display: flex;
  justify-content: center; /* 居中弹窗 */
  align-items: center; /* 居中弹窗 */
  animation: fadeInOverlay 0.3s ease-in-out; /* 弹窗背景渐显效果 */
}

.modal {
  background-color: #ffffff; /* 弹窗背景色 */
  padding: 40px; /* 弹窗内边距 */
  border-radius: 12px; /* 弹窗圆角 */
  width: 500px; /* 弹窗宽度 */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); /* 弹窗阴影 */
  animation: fadeInModal 0.4s ease-in-out; /* 弹窗显示效果 */
}

.modal-header {
  display: flex;
  justify-content: space-between; /* 标题左右分布 */
  align-items: center; /* 垂直居中对齐 */
  font-size: 1.5rem; /* 字体大小 */
  font-weight: bold; /* 字体粗细 */
  color: #641eb0; /* 标题颜色 */
}

.close-btn {
  background-color: #6a5db4; /* 设置圆点背景色 */
  border-radius: 50%; /* 使按钮变成圆形 */
  width: 30px; /* 设置按钮的宽度 */
  height: 30px; /* 设置按钮的高度 */
  display: flex; /* 使用 flex 来居中内容 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  font-size: 1.5rem; /* 设置字体大小 */
  color: white; /* 设置字体颜色 */
  cursor: pointer; /* 鼠标悬停时显示手形光标 */
  transition: background-color 0.3s ease; /* 添加背景色过渡效果 */
}

.close-btn:hover {
  background-color: #8f36f4; /* 鼠标悬停时背景色改变 */
}


.modal-body {
  margin-top: 20px; /* 弹窗内容顶部间距 */
}

input,
select {
  width: 100%; /* 输入框和下拉框宽度填满容器 */
  padding: 12px; /* 内边距 */
  margin-top: 10px; /* 顶部间距 */
  border-radius: 8px; /* 圆角 */
  border: 1px solid #ccc; /* 边框颜色 */
  font-size: 1rem; /* 字体大小 */
}

button {
  width: 100%; /* 按钮宽度填满容器 */
  padding: 15px; /* 按钮内边距 */
  margin-top: 20px; /* 按钮顶部间距 */
  background-color: #641eb0; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 无边框 */
  border-radius: 8px; /* 圆角按钮 */
  font-size: 1.2rem; /* 按钮字体大小 */
  cursor: pointer; /* 鼠标悬停显示手形光标 */
  transition: background 0.3s ease; /* 过渡效果 */
}

button:hover {
  background-color: #641eb0; /* 鼠标悬停时按钮颜色 */
}

@keyframes fadeInModal {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.module-icon {
  font-size: 1.5rem; /* 图标大小 */
  margin-right: 10px; /* 图标与标题之间的间距 */
  color: #fff; /* 图标颜色 */
}

</style>
