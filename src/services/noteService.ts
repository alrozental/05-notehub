import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
});

export default async function fetchNotes(
  search: string = "",
  page: number = 1,
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
    },
  });
  return response.data;
}

export async function createNote(
  createNoteRequest: CreateNoteRequest,
): Promise<Note> {
  const response = await api.post<Note>("/notes", createNoteRequest);
  return response.data;
}


export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}
