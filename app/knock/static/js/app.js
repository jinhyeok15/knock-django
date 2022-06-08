import { Component } from './view.js';
import { Document } from './document.js';

class App extends Component {
  render() {
    Document();
  }
}

window.onload = () => {
  new App();
}
