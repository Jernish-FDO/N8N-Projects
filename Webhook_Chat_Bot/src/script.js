// Generate unique session ID
const sessionId = "session_" + Math.random().toString(36).substr(2, 9);

// Your N8N webhook URL
const webhookUrl =
  "https://n8n-zwnkwasy.ap-southeast-1.clawcloudrun.com/webhook/webhook";

function addCopyButtonsToCodeBlocks() {
  const codeBlocks = document.querySelectorAll("pre:not(.copy-added)");

  codeBlocks.forEach((codeBlock) => {
    codeBlock.classList.add("copy-added");

    // Create container for positioning
    const container = document.createElement("div");
    container.className = "code-container";

    // Wrap the code block
    codeBlock.parentNode.insertBefore(container, codeBlock);
    container.appendChild(codeBlock);

    // Create copy button
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";

    copyBtn.addEventListener("click", async () => {
      const codeContent = codeBlock.querySelector("code");
      const textToCopy = codeContent
        ? codeContent.textContent
        : codeBlock.textContent;

      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");

        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");

        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      }
    });

    container.appendChild(copyBtn);
  });
}

function addMessage(content, isUser = false) {
  const chatContainer = document.getElementById("chatContainer");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;

  if (isUser) {
    messageDiv.textContent = content;
  } else {
    messageDiv.innerHTML = content;

    // Add copy buttons after content is rendered
    setTimeout(() => {
      addCopyButtonsToCodeBlocks();
    }, 100);
  }

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
  const chatContainer = document.getElementById("chatContainer");
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.id = "typing";
  typingDiv.style.display = "block";
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
  const typingDiv = document.getElementById("typing");
  if (typingDiv) {
    typingDiv.remove();
  }
}

async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const message = userInput.value.trim();

  if (!message) return;

  // Add user message
  addMessage(message, true);
  userInput.value = "";
  sendBtn.disabled = true;
  showTypingIndicator();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
        sessionId: sessionId,
      }),
    });

    const data = await response.json();
    hideTypingIndicator();

    // Add AI response
    addMessage(data.answer || "Sorry, I could not process your request.");
  } catch (error) {
    hideTypingIndicator();
    addMessage(
      "Sorry, there was an error processing your request. Please try again."
    );
    console.error("Error:", error);
  }

  sendBtn.disabled = false;
  userInput.focus(); // Return focus to input after sending
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  // Send button click event
  sendBtn.addEventListener("click", sendMessage);

  // Enter key press event - FIXED
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent form submission or new line
      sendMessage();
    }
  });

  // Focus on input when page loads
  userInput.focus();

  // Add copy buttons to existing code blocks
  addCopyButtonsToCodeBlocks();
});
