import { Class, CreateClassDto, UpdateClassEmailsDto } from '../types/class.types';
import { api } from './api';

export const dummyClasses: Class[] = [
  {
    id: "class-001",
    name: "Mathematics 101",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "class-002",
    name: "Physics 201",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-10T12:00:00Z",
  },
];


export const classesService = {
  getClasses: () => {
    return api.request<Class[]>('/classes');
  },

  getClassById: (id: string) => {
    return api.request<Class>(`/classes/${id}`);
  },

  createClass: (data: CreateClassDto) => {
    return api.request<Class>('/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateClass: (id: string, data: Partial<CreateClassDto>) => {
    return api.request<Class>(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updateClassEmails: (data: UpdateClassEmailsDto) => {
    return api.request<Class>(`/classes/${data.classId}/emails`, {
      method: 'PUT',
      body: JSON.stringify({ emails: data.emails }),
    });
  },

  deleteClass: (id: string) => {
    return api.request(`/classes/${id}`, {
      method: 'DELETE',
    });
  },
};

export const classesService_dev = {
  getClasses: () => {
    return Promise.resolve(dummyClasses);
  },

  getClassById: (id: string) => {
    const foundClass = dummyClasses.find((c) => c.id === id);
    if (foundClass) {
      return Promise.resolve(foundClass);
    }
    return Promise.reject(new Error("Class not found"));
  },

  // createClass: (data: CreateClassDto) => {
  //   const newClass: Class = {
  //     ...data,
  //     id: `class-${dummyClasses.length + 1}`,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     emails: data.emails || [],
  //   };
  //   dummyClasses.push(newClass);
  //   return Promise.resolve(newClass);
  // },

  // updateClassEmails: (data: UpdateClassEmailsDto) => {
  //   const foundClass = dummyClasses.find((c) => c.id === data.classId);
  //   if (foundClass) {
  //     foundClass.emails = data.emails;
  //     foundClass.updatedAt = new Date().toISOString();
  //     return Promise.resolve(foundClass);
  //   }
  //   return Promise.reject(new Error("Class not found"));
  // },

  deleteClass: (id: string) => {
    const index = dummyClasses.findIndex((c) => c.id === id);
    if (index !== -1) {
      dummyClasses.splice(index, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error("Class not found"));
  },
};

