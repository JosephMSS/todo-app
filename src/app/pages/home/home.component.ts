import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
interface Task {
  title: string;
  completed: boolean;
}
class Task implements Task {
  constructor(title: string, completed: boolean) {
    this.title = title;
    this.completed = completed;
  }
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    { title: 'Install Angular CLI', completed: true },
    { title: 'Style app', completed: true },
    { title: 'Finish service functionality', completed: false },
    { title: 'Setup API', completed: false },
  ]);
  changeHandler(e: Event) {
    const { value } = e.target as HTMLInputElement;
    const newTask = new Task(value, false);
    /**
     * *Los signals tienen métodos para actualizar sus valores,
     * *ademas de darnos el estado anterior, debemos retornar un
     * *nuevo estado y no mutar el anterior
     *  */
    this.tasks.update((tasks) => {
      return [...tasks, newTask];
    });
  }
  deleteHandler(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}
