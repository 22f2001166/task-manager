import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = 'All';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.checkForDueTasks();
    setInterval(() => this.checkForDueTasks(), 60000); // Check every 1 min
  }

  toggleTaskCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  get filteredTasks() {
    if (this.filter === 'Completed') {
      return this.tasks.filter((task) => task.completed);
    } else if (this.filter === 'Pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    return this.tasks;
  }

  checkForDueTasks(): void {
    const now = new Date();
    const tasks = this.taskService.getTasks();

    let updated = false;

    tasks.forEach((task) => {
      if (task.completed || task.notified) return;

      // Combine today's date with task.time (HH:mm)
      const [hours, minutes] = task.time.split(':').map(Number);
      const taskTime = new Date();
      taskTime.setHours(hours, minutes, 0, 0);

      if (taskTime <= now) {
        alert(`Task "${task.title}" is due!`);
        task.notified = true;
        updated = true;
      }
    });

    if (updated) {
      this.taskService.saveTasks(tasks);
      this.tasks = tasks;
    }
  }
}
