import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, UpdateTask } from '../../models/task.model';
const INITIAL_FORM_STATE = '';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    this.createTask('Install Angular CLI'),
    this.createTask('Style app'),
    this.createTask('Finish service functionality'),
    this.createTask('Setup API'),
  ]);
  formCtrl = new FormControl(INITIAL_FORM_STATE, {
    nonNullable: true,
    validators: [Validators.required],
  });
  changeHandler() {
    if (this.formCtrl.valid && this.formCtrl.value.trim()) {
      const newTask = this.createTask(this.formCtrl.value);
      this.addTask(newTask);
    }
    this.formCtrl.setValue(INITIAL_FORM_STATE);
  }
  deleteHandler(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
  createTask(title: string) {
    const id = Date.now().toString();
    const newTask: Task = {
      id,
      title,
      completed: false,
      isEditable: true,
    };
    return newTask;
  }
  addTask(task: Task) {
    /**
     * *Los signals tienen métodos para actualizar sus valores,
     * *ademas de darnos el estado anterior, debemos retornar un
     * *nuevo estado y no mutar el anterior
     *  */
    this.tasks.update((tasks) => [...tasks, task]);
  }
  updateTask(index: number, changes: UpdateTask) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position != index) {
          return task;
        }
        if (!task.isEditable) {
          return task;
        }
        const updatedTask = {
          ...task,
          ...changes,
        };
        return updatedTask;
      });
    });
  }
}
