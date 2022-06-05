import { LOCALHOST, POST, PUT } from './http.js';

// requests
export const requestAddDocumentKeyword = async (docId, title) => {
  const DOCUMENT_KEYWORD_URI = `/api/document/${docId}/keyword/`;
  const body = {
    "doc_id": docId,
    "title": title
  };
  return await POST(`${LOCALHOST}${DOCUMENT_KEYWORD_URI}`, body);
}

export const requestSaveDocument = async (docId, keywordsData) => {
  const DOCUMENT_DETAIL_URI = `/api/document/${docId}/`;
  return await PUT(`${LOCALHOST}${DOCUMENT_DETAIL_URI}`, keywordsData);
}
