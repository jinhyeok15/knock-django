const docId = JSON.parse(document.getElementById('doc-id').textContent);

const docSocket = new WebSocket(
  'ws://'
  + window.location.host
  + '/ws/doc/'
  + docId
  + '/'
);

docSocket.onmessage = function(e) {
  const data = JSON.parse(e.data);
}

chatSocket.onclose = function(e) {
  console.error('Chat socket closed unexpectedly');
};
