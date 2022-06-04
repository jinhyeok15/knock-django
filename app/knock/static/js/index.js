import { PUT, LOCALHOST } from "./api.js";

const MAX_KEYWORD_LENGTH = 12;

const docId = JSON.parse(document.getElementById('doc-id').textContent);

function getKeywordsData() {
  return JSON.parse(document.getElementById('keywords-data').value);
}

function setKeywordsData(data) {
  document.getElementById('keywords-data').value = JSON.stringify(data);
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

  pushKeyword(keywordInfo);
  createKeywordBoxElement(keywordInfo);
}

const pushKeyword = (keywordInfo) => {
  const keywordsData = getKeywordsData().data;
  keywordsData.push(keywordInfo);
  setKeywordsData({data: keywordsData})
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
  PUT(`${LOCALHOST}${DOCUMENT_DETAIL_URI}`, getKeywordsData())
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
  getKeywordsData().data.map(createKeywordBoxElement)
}
