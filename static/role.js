// Получаем все кнопки в шапке
const buttons = document.querySelectorAll('.glow-on-hover');

// Добавляем обработчик события на каждую кнопку
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Получаем текст кнопки
    const buttonText = this.textContent;
    
    // Создаем новый элемент для текста
    const textElement = document.createElement('p');
    textElement.textContent = buttonText;
    
    // Добавляем элемент на страницу внутрь чата
    document.getElementById('chat-box').appendChild(textElement);
  });
});
