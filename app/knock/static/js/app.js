import { ComponentView, Component } from './view.js';
import { Note } from './components/document/index.js';

class App {
  constructor(props={}) {
    new Note(props).render();
  }
}

window.onload = () => {
  const docId = JSON.parse(document.getElementById('doc-id').textContent);
  const props = {docId: docId}
  new App(props);
}
