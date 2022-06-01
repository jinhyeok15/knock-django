import { crypt, decrypt } from './utils.js';

// encrypting
const encrypted_text = crypt("salt", "Hello"); // -> 426f666665
console.log(encrypted_text)

// decrypting
const decrypted_string = decrypt("salt", "426f666665"); // -> Hello
console.log(decrypted_string)

const docId = JSON.parse(document.getElementById('doc-id').textContent);
const keywordsHidden = document.getElementById('keywords-hidden');
const container = document.getElementById('container');

const docSocket = new WebSocket(
  'ws://'
  + window.location.host
  + '/ws/doc/'
  + docId
  + '/'
);

docSocket.onmessage = function(e) {
  const data = JSON.parse(e.data);

  // saving keywords to send django server
  keywordsHidden.value += (' ' + data.message);

  let divElement = document.createElement("div");
  const textElement = document.createTextNode(data.message);
  divElement.appendChild(textElement);
  divElement.classList.add("keyword-box");
  container.appendChild(divElement);
}

docSocket.onclose = function(e) {
  console.error('doc socket closed unexpectedly');
};

const keywordInput = document.getElementById('keyword-input');
const keywordInputButton = document.getElementById('keyword-input-button');

// enter key 눌렀을 때 버튼 클릭과 동일한 event로 만들기
keywordInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    keywordInputButton.click();
  }
});

keywordInputButton.onclick = function(event) {
  event.preventDefault();
  const messageInputDom = keywordInput;
  const message = messageInputDom.value;
  docSocket.send(JSON.stringify({
      'message': message
  }));
  messageInputDom.value = '';
}
