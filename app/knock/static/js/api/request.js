import { LOCALHOST, POST, PUT, GET } from './http.js';

// uri
const DOCUMENT_KEYWORD_URI = (docId='') => `/api/document/${docId}/keyword/`;
const DOCUMENT_DETAIL_URI = (docId='') => `/api/document/${docId}/`;

// requests
export const requestAddDocumentKeyword = async (docId, title) => {
  const body = {
    "document": docId,
    "title": title
  };
  return await POST(`${LOCALHOST}${DOCUMENT_KEYWORD_URI(docId)}`, body);
}

export const requestGetDocumentData = async (docId) => {
  return await GET(`${LOCALHOST}${DOCUMENT_DETAIL_URI(docId)}`);
}
