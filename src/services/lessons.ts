import { Lesson, CreateLessonDto } from '../types/lesson.types';
import { api } from './api';

export const dummyLessons: Lesson[] = [
  {
    id: "lesson-001",
    classId: "class-001",
    title: "Introduction to Algebra",
    lesson: "Biology 101",
    description: "This lesson covers the basics of algebra, including variables, expressions, and simple equations.",
    date: "2024-01-10",
    handler: "thevidHandler",
    tutor: "Prof. John Doe",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "lesson-002",
    classId: "class-002",
    title: "Newton's Laws of Motion",
    lesson: "Biology 102",
    description: "In this lesson, we dive into Newton's three laws of motion with practical examples and experiments.",
    date: "2024-02-15",
    handler: "thevidhandler-002",
    tutor: "Prof. Michael Brown",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-10T12:00:00Z",
  },{
    id: "lesson-003",
    classId: "class-002",
    title: "Newton's Laws of Motion - 2",
    lesson: "Bio 103",
    description: "In this lesson, we dive into Newton's three laws of motion with practical examples and experiments.",
    date: "2024-02-15",
    handler: "thevidhandler-003",
    tutor: "Prof. Michael Brown",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-10T12:00:00Z",
  },
];

export const lessonsService = {
  getLessonsByClassId: (classId: string) => {
    return api.request<Lesson[]>(`/classes/${classId}/lessons`);
  },

  getLesson: (classId: string, lessonId: string) => {
    return api.request<Lesson>(`/classes/${classId}/lessons/${lessonId}`);
  },

  createLesson: (data: CreateLessonDto) => {
    return api.request<Lesson>(`/classes/${data.classId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateLesson: (classId: string, lessonId: string, data: Partial<CreateLessonDto>) => {
    return api.request<Lesson>(`/classes/${classId}/lessons/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteLesson: (classId: string, lessonId: string) => {
    return api.request(`/classes/${classId}/lessons/${lessonId}`, {
      method: 'DELETE',
    });
  },
};

export const lessonsService_dev = {
  getLessonsByClassId: (classId: string) => {
    const lessons = dummyLessons.filter((l) => l.classId === classId);
    return Promise.resolve(lessons);
  },

  getLesson: (classId: string, lessonId: string) => {
    const lesson = dummyLessons.find((l) => l.classId === classId && l.id === lessonId);
    if (lesson) {
      return Promise.resolve(lesson);
    }
    return Promise.reject(new Error("Lesson not found"));
  },

  createLesson: (data: CreateLessonDto) => {
    const newLesson: Lesson = {
      ...data,
      id: `lesson-${dummyLessons.length + 1}`,
      tutor: "Prof. Jane Doe",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dummyLessons.push(newLesson);
    return Promise.resolve(newLesson);
  },

  updateLesson: (classId: string, lessonId: string, data: Partial<CreateLessonDto>) => {
    const lesson = dummyLessons.find((l) => l.classId === classId && l.id === lessonId);
    if (lesson) {
      Object.assign(lesson, data);
      lesson.updatedAt = new Date().toISOString();
      return Promise.resolve(lesson);
    }
    return Promise.reject(new Error("Lesson not found"));
  },

  deleteLesson: (classId: string, lessonId: string) => {
    const index = dummyLessons.findIndex((l) => l.classId === classId && l.id === lessonId);
    if (index !== -1) {
      dummyLessons.splice(index, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error("Lesson not found"));
  },
};
