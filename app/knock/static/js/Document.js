import { requestAddDocumentKeyword, requestGetDocumentData } from "./api/request.js";
import { render } from "./view.js";
import {
  KeywordInput,
  KeywordInputButton,
  Container,
} from "./components/document/index.js";
import { DocumentStorage } from "./store.js";
import { Keyword } from "./components/document/Keyword.js";
import { getDocSocket } from "./socket.js";

// props
const docId = JSON.parse(document.getElementById('doc-id').textContent);

// store
const storage = new DocumentStorage(docId);

// socket
const docSocket = getDocSocket(docId);

// rendering
const keywordInputElement = render(KeywordInput());
const keywordInputButtonElement = render(KeywordInputButton());
const containerElement = render(Container());

const keywordComponents = [];

requestGetDocumentData(docId)
  .then(docData => storage.store(docData.data))
  .then(loc => loc.state.keywords
    .map(info => keywordComponents.push(
        (new Keyword(info)).render(containerElement)
      )));

// on-listening
export const Document = () => {

  docSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    const keywordValue = data.message;
    if (keywordValue === '') {
      return;
    }
    // keywordInfo는 API를 활용해서 데이터 가져오기
    requestAddDocumentKeyword(docId, keywordValue)
      .then(json => json.data)
      .then(data => {
        storage.addKeyword(data);
        keywordComponents.push((new Keyword(data)).render(containerElement));
      });
  }

  docSocket.onclose = (e) => {
    console.error('doc socket closed unexpectedly');
  };

  // enter key 눌렀을 때 버튼 클릭과 동일한 event로 만들기
  keywordInputElement.onkeypress = (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      keywordInputButtonElement.click();
    }
  }

  keywordInputButtonElement.onclick = (event) => {
    event.preventDefault();
    const message = keywordInputElement.value;
    docSocket.send(JSON.stringify({
        'message': message
    }));
    keywordInputElement.value = '';
  }
}
