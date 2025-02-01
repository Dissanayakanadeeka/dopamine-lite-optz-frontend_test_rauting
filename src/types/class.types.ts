export interface Class {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassDto {
  name: string;
  emails?: string[];
}

export interface UpdateClassEmailsDto {
  classId: string;
  emails: string[];
}

export interface ClassState {
  items: Class[];
  selectedClass: Class | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}