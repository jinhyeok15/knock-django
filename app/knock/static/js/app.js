import { Note } from './components/note/index.js';

class App {
  constructor(props={}) {
    new Note(props).render();
  }
}

window.onload = () => {
  const noteId = JSON.parse(document.getElementById('note-id').textContent);
  const props = {noteId: noteId};
  new App(props);
}
