# 🤖 N8N-CHAT-TRIGGER

<div align="center">

![N8N](https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**An advanced n8n workflow automation system that triggers complex workflows through chat messages**


</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Platform Support**: Works with Telegram, Discord, Slack, WhatsApp, and more
- **Smart Parsing**: Advanced message parsing with regex and keyword detection
- **IoT Integration**: Direct control of IoT devices through chat commands
- **Conditional Logic**: Complex branching based on user roles, time, location
- **Rate Limiting**: Built-in protection against spam and abuse
- **Error Handling**: Comprehensive error recovery and logging

### 🔄 Advanced Workflows
- **Chainable Actions**: Link multiple workflows together
- **Database Integration**: Store and retrieve data from various databases
- **API Orchestration**: Connect to external services and APIs
- **File Processing**: Handle file uploads, downloads, and transformations
- **Scheduling**: Time-based triggers and delayed executions
- **User Management**: Role-based access control and permissions



## 📋 Prerequisites

### System Requirements
- **Node.js**: 16.x or higher
- **npm**: 7.x or higher
- **Memory**: Minimum 512MB RAM
- **Storage**: 100MB available space

### Dependencies
Core Dependencies
n8n >= 1.0.0
node >= 16.0.0

Optional Dependencies
redis >= 6.0.0 # For caching and rate limiting
postgresql >= 12 # For data persistence


## 🚀 Quick Start

### 1. Installation

Clone the repository
```
git clone https://github.com/Jernish-FDO/N8N-CHAT-TRIGGER.git
```
```
cd N8N-CHAT-TRIGGER
```


Install n8n globally
```
npm install -g n8n
```

Install project dependencies
```
npm install
```

Start n8n
```
n8n start
```

### 2. Import Workflow

1. Open n8n web interface (default: `http://localhost:5678`)
2. Go to **Workflows** → **Import from file**
3. Select the `chat-trigger-workflow.json` file
4. Configure your credentials

### 3. Basic Setup

// Example webhook configuration
```json
{
  "nodes": [
    {
      "parameters": {
        "public": true,
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.3,
      "position": [
        -16,
        -64
      ],
      "id": "24594056-ba9d-4416-98a9-19b4d9b6c2a1",
      "name": "When chat message received",
      "webhookId": "4a05f898-7296-4886-b2a6-b55250a6d0ca"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2.2,
      "position": [
        192,
        -64
      ],
      "id": "d23c2ba4-ff20-491d-a1a6-f0c223b27656",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [
        144,
        112
      ],
      "id": "323af0d3-66fa-49df-832a-85fbdbff3764",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "r6x3HfY6TJTM2P97",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [
        256,
        112
      ],
      "id": "9cf91849-b22b-4be7-9d23-37a6dc617d90",
      "name": "Simple Memory"
    }
  ],
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ac762d88c0646f4c1b2cb56f31b50ec61739154d706adbf289d192555a356ab7"
  }
}
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Jernish](https://github.com/Jernish-FDO)**

⭐ **Star this repo if you found it helpful!** ⭐

[Report Bug](https://github.com/Jernish-FDO/N8N-CHAT-TRIGGER/issues) • [Request Feature](https://github.com/Jernish-FDO/N8N-CHAT-TRIGGER/issues) • [Discussions](https://github.com/Jernish-FDO/N8N-CHAT-TRIGGER/discussions)

</div>
