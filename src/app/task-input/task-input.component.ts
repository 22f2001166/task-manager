import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css'],
})
export class TaskInputComponent {
  title: string = '';
  time: string = '';
  priority: string = 'Low';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.title && this.time) {
      this.taskService.addTask(this.title, this.time, this.priority);
      this.title = '';
      this.time = '';
      this.priority = 'Low';
    }
  }
}
