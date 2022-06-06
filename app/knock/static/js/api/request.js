import { LOCALHOST, POST, PUT, GET } from './http.js';

// requests
export const requestAddDocumentKeyword = async (docId, title) => {
  const DOCUMENT_KEYWORD_URI = `/api/document/${docId}/keyword/`;
  const body = {
    "document": docId,
    "title": title
  };
  return await POST(`${LOCALHOST}${DOCUMENT_KEYWORD_URI}`, body);
}

export const requestGetDocumentData = async (docId) => {
  const DOCUMENT_DETAIL_URI = `/api/document/${docId}/`;
  return await GET(`${LOCALHOST}${DOCUMENT_DETAIL_URI}`);
}