export const getNoteSocket = (noteId) => new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/note/'
    + noteId
    + '/'
  );
