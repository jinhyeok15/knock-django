import { Component } from "../../view.js";
import {render as viewRender} from "../../view.js";

function KeywordBox(title) {
  return (new Component(
    null,
    'div',
    {
      class: 'keyword-box',
    }
  )).text(title);
}

function KeywordClickable() {
  return new Component(
    null,
    'a',
    {
      href: '',
      class: 'keyword-clickable',
    }
  );
}

function KeywordSpan() {
  return new Component(
    null,
    'span',
    {
      class: 'hyperspan'
    }
  );
}

export class Keyword {
  constructor(info) {
    this.info = info;
    this.structure = KeywordBox(info.title).child(
      KeywordClickable().child(
        KeywordSpan()
      )
    );
  }

  render(parent) {
    viewRender(this.structure, parent=parent);
    this.onListen();
    return this;
  }

  onListen() {
    this.structure.elem.onclick = (event) => {
      event.preventDefault();
      console.log(this.info.id);
    }
    return this;
  }
}
