import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() {}

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(title: string, time: string, priority: string): void {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now(),
      title,
      time,
      priority,
      completed: false,
      notified: false
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
  }

  toggleTaskCompletion(id: number): void {
    const tasks = this.getTasks();
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(tasks);
    }
  }

  deleteTask(id: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== id);
    this.saveTasks(tasks);
  }
}
