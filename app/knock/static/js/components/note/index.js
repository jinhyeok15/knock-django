import { requestAddNoteKeyword, requestGetNoteData } from "../../api/request.js";

import { Component, ComponentView } from "../../view.js";
import { Keyword } from "./keyword.js";
import { getNoteSocket } from "../../socket.js";
import { NoteStorage } from "../../store.js";

function KeywordInput() {
  return Component
    .input('text', {
      autofocus: true
    }).setCls('keyword-input')
    .setId('keyword-input');
};

function KeywordInputButton() {
  return Component
    .button('button')
    .setId('keyword-input-button')
    .setCls('keyword-input-button')
    .text('입력');
};

function Container() {
  return new Component('div')
    .setId('container')
    .setCls('container');
}

export class Note extends ComponentView {
  constructor(props) {
    super(props);
    
    this.noteId = props.noteId;
    this.noteSocket = getNoteSocket(this.noteId);
    this.storage = new NoteStorage(this.noteId);

    this.structure = [
      KeywordInput(),
      KeywordInputButton(),
      Container()];

    this.keywordComponents = [];
  }

  render() {
    requestGetNoteData(this.noteId)
      .then(noteData => this.storage.store(noteData.data))
      .then(loc => loc.state.keywords
        .map(info => this.keywordComponents.push(
            (new Keyword({'info':info})).render(Container().getElem())
        )));

    super.render();
  }

  onListen() {
    this.noteSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const keywordValue = data.message;
      if (keywordValue === '') {
        return;
      }
      // keywordInfo는 API를 활용해서 데이터 가져오기
      requestAddNoteKeyword(this.noteId, keywordValue)
        .then(json => json.data)
        .then(data => {
          this.storage.addKeyword(data);
          this.keywordComponents.push((new Keyword({'info': data})).render(Container().getElem()));
        });
    }
  
    this.noteSocket.onclose = (e) => {
      console.error('note socket closed unexpectedly');
    };
  
    // enter key 눌렀을 때 버튼 클릭과 동일한 event로 만들기
    KeywordInput().getElem().onkeypress = (event) => {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        KeywordInputButton().getElem().click();
      }
    }
  
    KeywordInputButton().getElem().onclick = (event) => {
      event.preventDefault();
      const message = KeywordInput().getElem().value;
      this.noteSocket.send(JSON.stringify({
          'message': message
      }));
      KeywordInput().getElem().value = '';
    }
  }
}
