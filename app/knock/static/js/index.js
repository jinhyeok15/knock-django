import { PUT, LOCALHOST } from "./api.js";

const MAX_KEYWORD_LENGTH = 12;

const docId = JSON.parse(document.getElementById('doc-id').textContent);
const keywordList = document.getElementById('keyword-list');

function getKeywordData() {
  const keywordArray = [].slice.call(keywordList.children);

  // div를 생성할 수 있게 해주는 data
  const keywordData = {data: keywordArray.map(e => JSON.parse(e.value))}

  return keywordData;
}

const keywordSubmitFormElement = document.getElementById('keyword-submit-form');
const containerElement = document.getElementById('container');

const docSocket = new WebSocket(
  'ws://'
  + window.location.host
  + '/ws/doc/'
  + docId
  + '/'
);

docSocket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  const keywordValue = data.message;
  if (keywordValue === '') {
    return
  }
  const keywordInfo = {
    doc_id: docId,
    value: keywordValue,
    left: 0,
    top: 0
  }

  pushKeywordElement(keywordInfo);
  createKeywordBoxElement(keywordInfo);
}

const pushKeywordElement = (keywordInfo) => {
  let optionElement = document.createElement("option");
  optionElement.value = JSON.stringify(keywordInfo);
  keywordList.appendChild(optionElement);
}

const createKeywordBoxElement = (keywordInfo) => {
  let divElement = document.createElement("div");
  const textElement = document.createTextNode(keywordInfo.value);
  divElement.appendChild(textElement);
  divElement.classList.add("keyword-box");
  divElement.style.left = keywordInfo.left;
  divElement.style.top = keywordInfo.top;
  containerElement.appendChild(divElement);
}

docSocket.onclose = (e) => {
  console.error('doc socket closed unexpectedly');
};

const keywordInputElement = document.getElementById('keyword-input');
const keywordInputButtonElement = document.getElementById('keyword-input-button');

// enter key 눌렀을 때 버튼 클릭과 동일한 event로 만들기
keywordInputElement.addEventListener("keypress", (event) => {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    keywordInputButtonElement.click();
  }
});

keywordInputButtonElement.onclick = (event) => {
  event.preventDefault();
  const messageInputDom = keywordInputElement;
  const message = messageInputDom.value;
  docSocket.send(JSON.stringify({
      'message': message
  }));
  messageInputDom.value = '';
}

const DOCUMENT_DETAIL_URI = `/api/document/${docId}/`

keywordSubmitFormElement.onsubmit = (event) => {
  event.preventDefault();
  PUT(`${LOCALHOST}${DOCUMENT_DETAIL_URI}`, getKeywordData())
    .then(response => {
      if (response.status===200) {
        console.log('SUCCESS')
      } else if (response.status===404) {
        console.log('NOT FOUND')
      }
    });
}

export const index = () => {
  // keywordData 기반 div 생성
  getKeywordData().data.map(createKeywordBoxElement)
}
