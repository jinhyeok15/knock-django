export const getDocSocket = (docId) => new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/doc/'
    + docId
    + '/'
  );
