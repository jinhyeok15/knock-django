import { Component, ComponentView } from "../../view.js";

function KeywordBox(title) {
  return new Component('div')
    .setCls('keyword-box')
    .text(title);
}

function KeywordClickable() {
  return Component.a()
    .setCls('keyword-clickable');
}

function KeywordSpan() {
  return new Component('span')
    .setCls('hyperspan');
}

function KeywordShow() {
  return new Component();
}

export class Keyword extends ComponentView {
  constructor(props) {
    super(props);
    this.structure = [KeywordBox(this.props.info.title).child(
      KeywordClickable().child(
        KeywordSpan()
      )
    )];
  }

  onListen() {
    this.structure[0].elem.onclick = (event) => {
      event.preventDefault();
      console.log(this.props.info.id);
    }
    return this;
  }
}
