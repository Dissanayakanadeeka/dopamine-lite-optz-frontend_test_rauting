import { api } from './api';

export interface Note {
  id: string;
  classId: string;
  title: string;
  fileName: string;
  description: string;
  size: string;
  uploadDate: string;
  createdAt: string;
  updatedAt: string;
  handler: string;
}

export interface CreateNoteDto {
  classId: string;
  title: string;
  fileName: string;
  description: string;
  size: string;
  handler: string;
}

export const dummyNotes: Note[] = [
  {
    id: "note-001",
    classId: "class-001",
    title: "Cell Structure Notes",
    fileName: "cell_structure.pdf",
    description: "Comprehensive notes covering cell structure and organelles with detailed diagrams",
    size: "2.4 MB",
    uploadDate: "2024-03-15",
    handler: "Dr. Emily Watson",
    createdAt: "2024-03-15T08:00:00Z",
    updatedAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "note-002",
    classId: "class-001",
    title: "DNA Replication Guide",
    fileName: "dna_replication.pdf",
    description: "Detailed guide on DNA replication process and key enzymes involved in the process",
    size: "1.8 MB",
    uploadDate: "2024-03-16",
    handler: "Prof. Michael Brown",
    createdAt: "2024-03-16T09:00:00Z",
    updatedAt: "2024-03-16T09:00:00Z"
  },
  {
    id: "note-003",
    classId: "class-002",
    title: "Photosynthesis Overview",
    fileName: "photosynthesis.pdf",
    description: "Complete overview of photosynthesis including light and dark reactions",
    size: "3.1 MB",
    uploadDate: "2024-03-17",
    handler: "Dr. Sarah Johnson",
    createdAt: "2024-03-17T10:00:00Z",
    updatedAt: "2024-03-17T10:00:00Z"
  }
];

export const notesService = {
  getNotesByClassId: (classId: string) => {
    return api.request<Note[]>(`/classes/${classId}/notes`);
  },

  getNote: (classId: string, noteId: string) => {
    return api.request<Note>(`/classes/${classId}/notes/${noteId}`);
  },

  createNote: (data: CreateNoteDto) => {
    return api.request<Note>(`/classes/${data.classId}/notes`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateNote: (classId: string, noteId: string, data: Partial<CreateNoteDto>) => {
    return api.request<Note>(`/classes/${classId}/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteNote: (classId: string, noteId: string) => {
    return api.request(`/classes/${classId}/notes/${noteId}`, {
      method: 'DELETE',
    });
  },

  // downloadNote: (classId: string, noteId: string) => {
  //   return api.request(`/classes/${classId}/notes/${noteId}/download`, {
  //     method: 'GET',
  //     responseType: 'blob'
  //   });
  // }
};

export const notesService_dev = {
  getNotesByClassId: (classId: string) => {
    const notes = dummyNotes.filter((n) => n.classId === classId);
    return Promise.resolve(notes);
  },

  getNote: (classId: string, noteId: string) => {
    const note = dummyNotes.find((n) => n.classId === classId && n.id === noteId);
    if (note) {
      return Promise.resolve(note);
    }
    return Promise.reject(new Error("Note not found"));
  },

  createNote: (data: CreateNoteDto) => {
    const newNote: Note = {
      ...data,
      id: `note-${dummyNotes.length + 1}`,
      uploadDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dummyNotes.push(newNote);
    return Promise.resolve(newNote);
  },

  updateNote: (classId: string, noteId: string, data: Partial<CreateNoteDto>) => {
    const note = dummyNotes.find((n) => n.classId === classId && n.id === noteId);
    if (note) {
      Object.assign(note, data);
      note.updatedAt = new Date().toISOString();
      return Promise.resolve(note);
    }
    return Promise.reject(new Error("Note not found"));
  },

  deleteNote: (classId: string, noteId: string) => {
    const index = dummyNotes.findIndex((n) => n.classId === classId && n.id === noteId);
    if (index !== -1) {
      dummyNotes.splice(index, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error("Note not found"));
  },

  downloadNote: (classId: string, noteId: string) => {
    // Simulate download in development
    console.log(`Downloading note ${noteId} from class ${classId}`);
    return Promise.resolve(new Blob(['Dummy PDF content'], { type: 'application/pdf' }));
  }
};