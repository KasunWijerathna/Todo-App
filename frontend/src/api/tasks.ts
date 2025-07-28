import axios from 'axios';
import type { Task } from '../types/task';

const API_URL = '/api/tasks';

export async function fetchTasks(): Promise<Task[]> {
  const res = await axios.get<Task[]>(API_URL);
  return res.data;
}

export async function addTask(title: string, description: string): Promise<Task> {
  const res = await axios.post<Task>(API_URL, { title, description });
  return res.data;
}

export async function completeTask(id: number): Promise<Task> {
  const res = await axios.patch<Task>(`${API_URL}/${id}/complete`);
  return res.data;
}
