<template>
  <div>
    <div class="contact-us">
      <!-- 原有的联系模块代码保持不变 -->
      <div class="contact-section">
        <h1>有需要我们帮助的地方吗？</h1>
        <p>如果您有任何问题或需求，请随时联系我们，我们会尽快为您解答。</p>
        <p>电子邮件: support@example.com</p>
        <p>电话: +123 456 7890</p>

        <!-- Online Support Button -->
        <button @click="toggleChat" class="chat-button">在线聊天</button>
      </div>
        <!-- 悬浮客服按钮 -->
      <div class="chat-float-button" @click="toggleChat">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-more"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
      </div>
      <!-- Customer Service Popup -->
      <div v-if="isChatOpen" class="chat-popup" ref="chatPopup">
        <div class="chat-header" @mousedown="startDrag" ref="chatHeader">
          <div class="header-content">
            <img src="@/assets/customer-avatar.png" alt="客服头像" class="customer-avatar" />
            <span>在线客服 - 声纹溯源</span>
          </div>
          <button @click="toggleChat" class="close-btn">×</button>
        </div>
        <div class="chat-body">
          <div class="chat-messages" ref="chatMessages">
            <div 
              v-for="(message, index) in messages" 
              :key="index" 
              class="message-container" 
              :class="{'user-message-container': message.isUser}">
              <div class="message" :class="{'user-message': message.isUser}">
                <img 
                  v-if="!message.isUser" 
                  src="@/assets/kefulogo.png" 
                  alt="客服头像" 
                  class="kefulogo" />
                <div class="message-content">
                  <p>{{ message.text }}</p>
                  <span class="timestamp">{{ message.time }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="input-section">
            <input v-model="userMessage" @keyup.enter="sendMessage" type="text" placeholder="输入您的问题..." class="chat-input" />
            <button @click="sendMessage" class="send-btn">发送</button>
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
      isChatOpen: false, // 控制客服弹窗显示与否
      userMessage: '', // 用户输入的消息
      messages: [
        { text: '您好！请问有什么可以帮到您的？', isUser: false, time: this.formatTime(new Date()) },
      ], // 消息列表
      isDragging: false, // 判断是否在拖动状态
      dragOffset: { x: 0, y: 0 }, // 存储鼠标相对聊天框的位置
    };
  },
  computed: {
    carouselStyle() {
  return {
    transform: `translateX(-${this.currentIndex * 100}%)`,
    transition: 'transform 0.5s ease-in-out',
  };
}
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    },
    startDrag(event) {
      event.preventDefault(); // 防止选中文本
      this.isDragging = true;
      this.dragOffset.x = event.clientX - this.$refs.chatPopup.offsetLeft;
      this.dragOffset.y = event.clientY - this.$refs.chatPopup.offsetTop;

      // 添加鼠标移动和松开事件监听
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(event) {
      if (this.isDragging) {
        const popup = this.$refs.chatPopup;
        const popupRect = popup.getBoundingClientRect(); // 获取弹窗的边界
        const viewportHeight = window.innerHeight; // 获取视口高度

        // 计算新的位置
        let newLeft = event.clientX - this.dragOffset.x;
        let newTop = event.clientY - this.dragOffset.y;

        // 限制弹窗不超过左侧和右侧边界
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - popupRect.width));

        // 限制弹窗不超过下边界
        newTop = Math.max(0, Math.min(newTop, viewportHeight - popupRect.height));

        // 设置弹窗的新位置
        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    sendMessage() {
      if (this.userMessage.trim()) {
        this.messages.push({ 
          text: this.userMessage, // 不加 "我：" 前缀，直接显示用户输入
          isUser: true, 
          time: this.formatTime(new Date()) 
        });
        this.userMessage = ''; // 清空输入框

        // 模拟自动回复
        setTimeout(() => {
          this.messages.push({ 
            text: '谢谢您的留言，我们会尽快处理您的问题！', 
            isUser: false, 
            time: this.formatTime(new Date()) 
          });
          this.scrollToBottom();
        }, 1000); // 1秒后自动回复
      }
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    formatTime(date) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
/* 悬浮客服按钮 */
.chat-float-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #641eb0;
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, background 0.3s ease;
}

.chat-float-button:hover {
  background: #3b0f74;
  transform: scale(1.1);
}

/* 联系我们模块 */
.contact-us {
  width: 90%; /* 让宽度自适应 */
  max-width: 600px; /* 最大宽度，避免超宽 */
  padding: 3vw; /* 内边距自适应 */
  margin: 20px auto;
  background: linear-gradient(145deg, #f2f0f5, #e9e2f0);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 标题自适应 */
.contact-us h1 {
  font-size: clamp(1.5rem, 4vw, 2.2rem); /* 自适应字体 */
  color: #333;
  margin-bottom: 15px;
}

/* 段落自适应 */
.contact-us p {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem); /* 随屏幕调整 */
  color: #666;
  margin: 8px 0;
}

/* 按钮自适应 */
.chat-button {
  padding: 10px 20px;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem); /* 按钮字体自适应 */
  background: linear-gradient(145deg, #877bcf, #47177a);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.chat-button:hover {
  background: linear-gradient(145deg, #551f8e, #7c6fc9);
  transform: translateY(-2px);
}

/* 客服弹窗样式 */
.chat-popup {
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 350px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  transition: all 0.3s ease;
  user-select: none; /* 防止选中文本 */
}

.chat-header {
  background: #641eb0;
  color: white;
  padding: 12px;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  cursor: move;
}

.header-content {
  display: flex;
  align-items: center;
}

.customer-avatar {
  width: 50px; /* 设置头像的宽度 */
  height: 50px; /* 设置头像的高度 */
  border-radius: 50%; /* 圆形头像 */
  border: 2px solid #641eb0; /* 添加边框 */
  object-fit: cover; /* 确保图片适应容器 */
  margin-right: 10px; /* 与聊天内容的间距 */
}
.kefulogo {
  width: 35px; /* 设置头像的宽度 */
  height: 35px; /* 设置头像的高度 */
  border-radius: 50%; /* 圆形头像 */
  border: 0px solid #641eb0; /* 添加边框 */
  object-fit: cover; /* 确保图片适应容器 */
  margin-right: 10px; /* 与聊天内容的间距 */
}
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

.chat-body {
  padding: 15px;
  font-size: 1rem;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat-messages {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.user-message-container {
  align-items: flex-end;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

/* 客服消息内容样式 */
.message:not(.user-message) .message-content {
  background: #e9f3ff; /* 淡蓝色背景 */
  color: #003366; /* 深蓝色字体 */
  font-size: 1.1rem; /* 字体大小 */
  line-height: 1.5; /* 行高增加可读性 */
}

/* 用户消息内容样式（保持不变） */
.user-message .message-content {
  background: #f3f1f1;
  color: #333;
  font-size: 1rem;
}

.message-content { /* 修改此值以调整消息内容字体大小 */
  background: #641eb0;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.timestamp {/* 修改此值以调整时间戳字体大小 */
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
  text-align: right;
}

.input-section {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 1rem;
  color: #444;
  background-color: #f8f8f8;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.chat-input:focus {
  border-color: #641eb0;
  box-shadow: 0 0 5px #641eb0;
  outline: none;
}

.send-btn {
  padding: 12px 20px;
  background-color: #641eb0;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.3s ease;
}

.send-btn:hover {
  background-color: #3b0f74;
  transform: translateY(-2px);
}

</style>
