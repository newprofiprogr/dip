function sendMessage() {
    var userInput = document.getElementById('user-input').value;

    if (userInput.trim() === '') {
        return; // Если пустой текст, не отправлять сообщение
    }
    
    addMessage('user', userInput);
    
    sendRequest(userInput);
    document.getElementById('user-input').value = ''; 
  }

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  
function addMessage(role, content) {
    var chatBox = document.getElementById('chat-box');
    var message = document.createElement('div');
    message.classList.add('chat-message');
    message.classList.add(role + '-message');
    message.textContent = content;
    chatBox.appendChild(message);
    message.scrollIntoView();
  }

function scrollToBottom() {
  var chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
}
// Подеючение API OpenAI  
function sendRequest(userInput) {
    var PROXY_API_KEY = 'sk-B2v88fGPTQALmZ28jzRL8XnEpmjTc7GF';
    var url = "https://api.proxyapi.ru/openai/v1/chat/completions";
    var headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + PROXY_API_KEY,
    };
    var data = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": userInput}],
      "max_tokens": 700
    };
    
fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      addMessage('bot', data.choices[0].message.content);
    })
    .catch(error => console.error('Error:', error));
  }
  