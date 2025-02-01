export interface Lesson {
  id: string;
  classId: string;
  title: string;
  lesson: string;
  description: string;
  date: string;
  handler: string;
  tutor: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonDto {
  classId: string;
  title: string;
  lesson: string;
  description: string;
  tutor: string;
  date: string;
  handler: string;
}

export interface LessonState {
  items: Record<string, Lesson[]>; // Keyed by classId
  selectedLesson: Lesson | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}