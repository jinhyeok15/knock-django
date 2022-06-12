import { LOCALHOST, POST, PUT, GET } from './http.js';

// uri
const NOTE_KEYWORD_URI = (noteId='') => `/api/note/${noteId}/keyword/`;
const NOTE_DETAIL_URI = (noteId='') => `/api/note/${noteId}/`;

// requests
export const requestAddNoteKeyword = async (noteId, title) => {
  const body = {
    "note": noteId,
    "title": title
  };
  return await POST(`${LOCALHOST}${NOTE_KEYWORD_URI(noteId)}`, body);
}

export const requestGetNoteData = async (noteId) => {
  return await GET(`${LOCALHOST}${NOTE_DETAIL_URI(noteId)}`);
}
