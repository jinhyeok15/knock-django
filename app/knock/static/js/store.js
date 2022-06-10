export class NoteStorage {
  constructor(noteId) {
    this.noteId = noteId;
    const defaultState = {}
    this.state = this.get();
    if (this.state===null) {
      this.store(defaultState);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.noteId));
  }

  store(data) {
    localStorage.setItem(this.noteId, JSON.stringify(data))
    this.state = data;
    return this;
  }

  addKeyword(keywordInfo) {
    this.state.keywords.push(keywordInfo);
    this.store(this.state);
    return this;
  }
}
