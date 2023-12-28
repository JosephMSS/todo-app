import { JsonPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Task, UpdateTask } from '../../models/task.model';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, JsonPipe],
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
  changeHandler(e: Event) {
    const { value } = e.target as HTMLInputElement;
    const newTask = this.createTask(value);
    this.addTask(newTask);
    (e.target as HTMLInputElement).value = '';
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
        const updatedTask = {
          ...task,
          ...changes,
        };
        return updatedTask;
      });
    });
  }
}
