# 🚀 N8N-Projects

A collection of advanced workflow automation projects built with [n8n](https://n8n.io/), featuring chat-based triggers, AI integration, and webhook bots.

---

## 📁 Project Structure

- [`Chat_Trigger/`](N8N-Projects/Chat_Trigger/)
  - **Floating AI Chat Widget**: Modern web chat UI powered by n8n workflows and AI agents.
  - `index.html`, `src/script.js`, `src/style.css`: Frontend widget and logic.
  - `Workflow/chat-trigger-workflow.json`: n8n workflow for chat automation.
  - [README](N8N-Projects/Chat_Trigger/README.md), [LICENSE](N8N-Projects/Chat_Trigger/LICENSE)

- [`Webhook_Chat_Bot/`](N8N-Projects/Webhook_Chat_Bot/)
  - **Webhook Chat Bot**: Webhook-driven chat bot with n8n backend.
  - `index.html`, `src/script.js`, `src/style.css`: Bot UI and scripts.
  - `Workflow/n8n.json`: n8n workflow for webhook automation.
  - [README](N8N-Projects/Webhook_Chat_Bot/README.md)

---

## ✨ Features

- **Multi-Platform Chat Triggers**: Telegram, Discord, Slack, WhatsApp, and more.
- **AI Assistant Integration**: Advanced AI agent for chat automation and programming help.
- **Smart Message Parsing**: Regex, keyword detection, and conditional logic.
- **IoT & API Integration**: Control devices and connect to external APIs.
- **Role-Based Access & Rate Limiting**: Secure, scalable workflows.
- **Modern UI/UX**: Responsive chat widgets with quick actions and notifications.

---

## 🛠️ Getting Started

1. **Clone the repository**
    ```sh
    git clone https://github.com/Jernish-FDO/N8N-Projects.git
    cd N8N-Projects
    ```

2. **Install n8n**
    ```sh
    npm install -g n8n
    ```

3. **Start n8n**
    ```sh
    n8n start
    ```

4. **Import Workflows**
    - Open n8n web interface (`http://localhost:5678`)
    - Go to **Workflows** → **Import from file**
    - Select the workflow JSON files from `Chat_Trigger/Workflow/` or `Webhook_Chat_Bot/Workflow/`

5. **Open the Web UI**
    - Open `index.html` in your browser for each project.

---

## 📄 License

This repository is licensed under the [MIT License](N8N-Projects/LICENSE).

---

**Made with ❤️ by Jernish**