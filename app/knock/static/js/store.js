export class DocumentStorage {
  constructor() {
    const defaultState = {
      state: {}
    }
    this.state = this.get();
    if (this.state===null) {
      this.store(defaultState);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem('document'));
  }

  store(json) {
    localStorage.setItem('document', JSON.stringify(json))
    this.state = json;
    return this;
  }
}
