class FloatingChatWidget {
    constructor() {
        this.config = {
            webhookUrl: 'https://n8n-ziipvmpn.ap-southeast-1.clawcloudrun.com/webhook/59649b30-0d3a-44de-a98b-0dea0f8a5bcb/chat',
            sessionId: this.generateSessionId(),
            autoOpen: false,
            enableSound: true,
            maxMessages: 50
        };
        this.isOpen = false;
        this.messageHistory = [];
        this.isTyping = false;
        this.init();
    }
    init() {
        this.bindElements();
        this.attachEventListeners();
        this.setWelcomeTime();
        if (this.config.autoOpen) setTimeout(() => this.openChat(), 1000);
    }
    bindElements() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.notificationBadge = document.getElementById('notificationBadge');
        this.quickActions = document.getElementById('quickActions');
        this.charCounter = document.getElementById('charCounter');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
    }
    attachEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
        });
        this.messageInput.addEventListener('input', () => { this.autoResizeTextarea(); this.updateCharCounter(); });
        this.quickActions.addEventListener('click', (e) => {
            if (e.target.closest('.quick-btn')) {
                const btn = e.target.closest('.quick-btn');
                const message = btn.getAttribute('data-message');
                this.sendQuickMessage(message);
            }
        });
    }
    generateSessionId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    setWelcomeTime() {
        const welcomeTime = document.getElementById('welcomeTime');
        if (welcomeTime) welcomeTime.textContent = this.getCurrentTime();
    }
    toggleChat() { this.isOpen ? this.closeChat() : this.openChat(); }
    openChat() {
        this.chatContainer.classList.add('open');
        this.isOpen = true;
        this.hideNotificationBadge();
        this.focusInput();
        this.scrollToBottom();
    }
    closeChat() {
        this.chatContainer.classList.remove('open');
        this.isOpen = false;
    }
    minimizeChat() {
        this.closeChat();
        this.showNotification('Chat minimized');
    }
    focusInput() { setTimeout(() => { this.messageInput.focus(); }, 300); }
    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        const maxHeight = 120;
        const scrollHeight = Math.min(this.messageInput.scrollHeight, maxHeight);
        this.messageInput.style.height = scrollHeight + 'px';
    }
    updateCharCounter() {
        const length = this.messageInput.value.length;
        this.charCounter.textContent = `${length}/1000`;
        if (length > 900) { this.charCounter.style.color = 'var(--error-color)'; }
        else if (length > 800) { this.charCounter.style.color = 'var(--warning-color)'; }
        else { this.charCounter.style.color = 'var(--text-muted)'; }
    }
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;
        this.messageInput.value = '';
        this.updateCharCounter();
        this.autoResizeTextarea();
        this.sendButton.disabled = true;
        this.addMessage(message, 'user');
        this.hideQuickActions();
        this.showTypingIndicator();
        try {
            const response = await this.callN8NWebhook(message);
            this.hideTypingIndicator();
            const botMessage = response.output || response.text || response.message || 'I apologize, but I encountered an error.';
            this.addMessage(botMessage, 'bot');
            if (!this.isOpen && this.config.enableSound) this.playNotificationSound();
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I\'m having trouble connecting right now. Please try again in a moment.', 'bot', 'error');
        } finally {
            this.sendButton.disabled = false;
            this.focusInput();
        }
    }
    async sendQuickMessage(message) { this.messageInput.value = message; await this.sendMessage(); }
    async callN8NWebhook(message) {
        const payload = {
            chatInput: message,
            sessionId: this.config.sessionId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        const response = await fetch(this.config.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    }
    addMessage(content, sender, type = 'normal') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        if (type === 'error') messageDiv.classList.add('error');
        if (type === 'success') messageDiv.classList.add('success');
        const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(content)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.messageHistory.push({ content, sender, type, timestamp: new Date().toISOString() });
        if (this.messageHistory.length > this.config.maxMessages) {
            this.messageHistory.shift();
            const firstMessage = this.chatMessages.querySelector('.message:not(.welcome-message)');
            if (firstMessage) firstMessage.remove();
        }
        this.scrollToBottom();
        if (!this.isOpen && sender === 'bot') this.showNotification();
    }
    formatMessage(content) {
        return this.escapeHtml(content)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.07);padding:2px 4px;border-radius:3px;font-family:monospace;">$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:var(--primary-color);text-decoration:underline;">$1</a>');
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }
    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.classList.remove('show');
    }
    showNotification(message = null) {
        this.notificationBadge.style.display = 'flex';
        this.notificationBadge.textContent = '1';
        this.chatToggle.classList.add('bounce');
        setTimeout(() => { this.chatToggle.classList.remove('bounce'); }, 500);
    }
    hideNotificationBadge() {
        this.notificationBadge.style.display = 'none';
    }
    hideQuickActions() {
        if (this.messageHistory.filter(m => m.sender === 'user').length > 0) this.quickActions.style.display = 'none';
    }
    playNotificationSound() {
        if (!this.config.enableSound) return;
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {}
    }
    scrollToBottom() { setTimeout(() => { this.chatMessages.scrollTop = this.chatMessages.scrollHeight; }, 100); }
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    clearHistory() {
        this.messageHistory = [];
        this.chatMessages.innerHTML = `
            <div class="message bot-message welcome-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        Hi there! 👋 I'm your AI assistant. How can I help you today?
                    </div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
        this.quickActions.style.display = 'flex';
    }
    updateConfig(newConfig) { this.config = { ...this.config, ...newConfig }; }
    sendProgrammaticMessage(message) { this.messageInput.value = message; this.sendMessage(); }
}

// Initialize the floating chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.floatingChat = new FloatingChatWidget();
    window.openChat = () => window.floatingChat.openChat();
    window.closeChat = () => window.floatingChat.closeChat();
    window.clearChatHistory = () => window.floatingChat.clearHistory();
    window.sendChatMessage = (message) => window.floatingChat.sendProgrammaticMessage(message);
});
