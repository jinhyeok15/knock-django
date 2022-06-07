import { Component } from './view.js';
import { Document } from './Document.js';

class App extends Component {
  render() {
    Document();
  }
}

window.onload = () => {
  new App();
}
