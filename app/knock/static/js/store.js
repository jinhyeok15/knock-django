export class DocumentStorage {
  constructor(docId) {
    this.docId = docId;
    const defaultState = {}
    this.state = this.get();
    if (this.state===null) {
      this.store(defaultState);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.docId));
  }

  store(data) {
    localStorage.setItem(this.docId, JSON.stringify(data))
    this.state = data;
    return this;
  }

  addKeyword(keywordInfo) {
    this.state.keywords.push(keywordInfo);
    this.store(this.state);
    return this;
  }
}
