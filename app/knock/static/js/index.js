const docId = JSON.parse(document.getElementById('doc-id').textContent);
const keywords = JSON.parse(document.getElementById('keywords').textContent);

const docSocket = new WebSocket(
  'ws://'
  + window.location.host
  + '/ws/doc/'
  + docId
  + '/'
);

docSocket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  console.log(data.message)
}

docSocket.onclose = function(e) {
  console.error('doc socket closed unexpectedly');
};

document.querySelector('#keyword-submit').onclick = function(e) {
  e.preventDefault();
  const messageInputDom = document.querySelector('#keyword-input');
  const message = messageInputDom.value;
  docSocket.send(JSON.stringify({
      'message': message
  }));
  messageInputDom.value = '';
}
