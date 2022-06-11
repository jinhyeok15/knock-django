import { Component, Structure } from "../../view.js";

function KeywordBox(title) {
  return new Structure('div')
    .setCls('keyword-box')
    .text(title);
}

function KeywordClickable() {
  return new Structure('a', {
      'href': ''
    })
    .setCls('keyword-clickable');
}

function KeywordSpan() {
  return new Structure('span')
    .setCls('hyperspan');
}

function KeywordCheckBox() {
  return new Structure('input', {
    'type': 'checkbox',
    'name': 'keywordCheckBox'
  })
}

export class Keyword extends Component {
  constructor(props) {
    super(props);

    this.structure = KeywordBox(this.props.info.title).child(
      [KeywordClickable().child(
        [KeywordSpan()]
      )]
    );
  }

  onListen() {
    const keywordId = this.props.info.id;
    this.structure.getElem().onclick = (event) => {
      event.preventDefault();
      console.log(keywordId);
    }
    return this;
  }
}
