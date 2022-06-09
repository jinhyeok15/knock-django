import { Component, ComponentView } from "../../view.js";

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

function KeywordShow() {
  return new Component();
}

export class Keyword extends ComponentView {
  constructor(props) {
    super(props);
    this.structure = KeywordBox(this.props.info.title).child(
      KeywordClickable().child(
        KeywordSpan()
      )
    );
  }

  onListen() {
    this.structure.elem.onclick = (event) => {
      event.preventDefault();
      console.log(this.props.info.id);
    }
    return this;
  }
}
