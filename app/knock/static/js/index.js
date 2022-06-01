const docId = JSON.parse(document.getElementById('doc-id').textContent);
const keywords = JSON.parse(document.getElementById('keywords').textContent);
const keywordsHidden = document.querySelector('#keywords-hidden');
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
  keywordsHidden.value += (' ' + data.message);
  element = document.createElement("div");
  text = document.createTextNode(data.message);
  element.appendChild(text);
  element.classList.add("keyword-box");
  container.appendChild(element);
}

docSocket.onclose = function(e) {
  console.error('doc socket closed unexpectedly');
};

const keywordInput = document.querySelector('#keyword-input');
const keywordInputButton = document.querySelector('#keyword-input-button');

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
