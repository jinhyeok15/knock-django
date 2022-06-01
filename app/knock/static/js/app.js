import * as index from './index.js';

class App {
  constructor() {
    this.index = index;
  }
}

window.onload = () => {
  new App();
}
