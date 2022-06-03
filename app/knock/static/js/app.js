import { index } from './index.js';

class App {
  constructor() {
    index();
  }
}

window.onload = () => {
  new App();
}
