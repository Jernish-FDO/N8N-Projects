# N8N Webhook Chat-Bot

A versatile chat-bot implementation using N8N webhooks that enables seamless integration between messaging platforms and automated workflows. This project demonstrates how to create intelligent conversational interfaces powered by N8N's workflow automation capabilities.

## 🚀 Features

- **Webhook-based Architecture**: Utilizes N8N webhooks for real-time message processing
- **Multi-platform Support**: Compatible with various messaging platforms (Telegram, Discord, etc.)
- **Session Management**: Maintains conversation context across multiple interactions
- **Modular Design**: Easy to extend and customize for different use cases
- **IoT Integration Ready**: Perfect for automating IoT device interactions through chat


## 📋 Prerequisites

Before getting started, ensure you have the following:

- N8N instance (self-hosted or cloud)
- Node.js (v16 or higher)
- Basic understanding of webhook concepts
- API credentials for your chosen messaging platform


## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Jernish-FDO/N8N_Webhook_Chat-Bot.git
cd N8N_Webhook_Chat-Bot
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```


## ⚙️ Configuration

### N8N Webhook Setup

1. **Create a new workflow** in your N8N instance
2. **Add a Webhook node** as the trigger with these settings:
    - HTTP Method: `POST`
    - Response Mode: `Using 'Respond to Webhook' node`
    - Authentication: Configure as needed
3. **Configure the webhook endpoint**:

```json
{
  "httpMethod": "POST",
  "responseMode": "responseNode"
}
```


### Expected Webhook Payload

The chatbot expects the following JSON structure:

```json
{
  "chatInput": "User message text",
  "sessionId": "unique-session-identifier",
  "userId": "user-identifier",
  "platform": "telegram|discord|whatsapp",
  "metadata": {
    "timestamp": "2025-08-23T18:02:00Z",
    "additional_data": "value"
  }
}
```


### Response Format

Your N8N workflow should return:

```json
{
  "output": "Chatbot response message",
  "sessionId": "session-identifier",
  "actions": ["optional-action-array"]
}
```


## 🔧 Usage

### Basic Workflow Structure

1. **Webhook Trigger** → Receives incoming messages
2. **Message Processing** → Parse and validate input
3. **Logic Layer** → Your custom automation logic
4. **Response Generation** → Format the reply
5. **Webhook Response** → Send back to messaging platform

### Example N8N Workflow

```javascript
// Message processing node
const message = $json.body.chatInput;
const sessionId = $json.body.sessionId || generateUUID();

// Your logic here
const response = processMessage(message);

// Return formatted response
return {
  json: {
    output: response,
    sessionId: sessionId
  }
};
```


## 🔌 Platform Integration

### Telegram Bot

```bash
# Set webhook URL in Telegram
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-n8n-instance.com/webhook/your-webhook-id"}'
```


### Discord Bot

Configure your Discord application with the webhook endpoint for slash commands or message events.

### WhatsApp Integration

Use WhatsApp Business API or third-party services like Green-API to forward messages to your N8N webhook.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Chat Platform  │───▶│  N8N Webhook │───▶│  Your Workflow  │
│   (Telegram,    │    │              │    │   (Processing,  │
│   Discord, etc) │    │              │    │   AI, IoT, etc) │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │                        │
                              ▼                        │
                       ┌──────────────┐               │
                       │   Response   │◀──────────────┘
                       │   Handler    │
                       └──────────────┘
```


## 📁 Project Structure

```
N8N_Webhook_Chat-Bot/
├── src/
│   ├── handlers/          # Message handlers for different platforms
│   ├── middleware/        # Authentication and validation
│   ├── utils/            # Helper functions
│   └── config/           # Configuration files
├── workflows/            # N8N workflow templates
├── docs/                # Additional documentation
├── examples/            # Usage examples
├── tests/               # Test files
├── .env.example         # Environment variables template
├── package.json         # Project dependencies
└── README.md           # This file
```


## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm test

# Integration tests  
npm run test:integration

# Test specific platform
npm run test:telegram
```


## 🔐 Security Considerations

- **Validate all incoming webhook data**
- **Implement rate limiting** to prevent abuse
- **Use HTTPS** for all webhook endpoints
- **Sanitize user inputs** before processing
- **Store sensitive data** in environment variables


## 🚀 Deployment

### Docker Deployment

```bash
# Build the container
docker build -t n8n-webhook-chatbot .

# Run the container
docker run -p 3000:3000 --env-file .env n8n-webhook-chatbot
```


### Cloud Deployment

The project is compatible with:

- Heroku
- Railway
- Vercel (serverless functions)
- AWS Lambda
- Google Cloud Functions


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Examples

Check the `/examples` directory for:

- Basic echo bot
- AI-powered assistant
- IoT device controller
- Multi-platform setup


## 🐛 Troubleshooting

### Common Issues

**Webhook not receiving data**

- Check N8N workflow is active
- Verify webhook URL is correct
- Ensure proper CORS settings

**Session management issues**

- Verify sessionId generation
- Check session storage configuration

**Platform-specific problems**

- Review platform documentation
- Verify API credentials
- Check webhook registration


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Author

**Jernish** - Electronics \& Communication Engineering

- GitHub: [@Jernish-FDO](https://github.com/Jernish-FDO)
- Specialization: IoT Automation, Workflow Automation

## 🙏 Acknowledgments

- N8N community for workflow automation inspiration
- Various chat platform APIs and documentation
- Open source contributors and examples

***
