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

export function KeywordDetailContainer() {
  return new Structure('div', {'style': 'display: none;'})
    .setCls('keyword-detail-container')
    .setId('keyword-detail-container');
}

function KeywordSpan() {
  return new Structure('span')
    .setCls('hyperspan');
}

export class Keyword extends Component {
  constructor(props) {
    super(props);

    this.structure = KeywordBox(this.props.info.title).child(
      KeywordClickable().child(KeywordSpan())
    );
  }

  onListen() {
    this.structure.getElem().onclick = (event) => {
      event.preventDefault();
      let onState;
      let KeywordDetailContainerElem = document.getElementById(
          KeywordDetailContainer().id
        );
      
      onState = KeywordDetailContainerElem.style.display==='none' ? false : true;
      if (onState) {
        KeywordDetailContainerElem.style.display = 'none';
      } else KeywordDetailContainerElem.style.display = 'inline';
    }
    return this;
  }
}
