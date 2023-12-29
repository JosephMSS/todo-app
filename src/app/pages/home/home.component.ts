import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, UpdateTask } from '../../models/task.model';
const INITIAL_FORM_STATE = '';
//generate random unique id without date.now

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const create = (title: string) => {
  const id = generateId();
  const newTask: Task = {
    id,
    title,
    completed: false,
    isUpdatable: true,
    editing: false,
  };
  return newTask;
};
const INITIAL_TASK_STATE: Task[] = [
  create('Install Angular CLI'),
  create('Style app'),
  create('Finish service functionality'),
  create('Setup API'),
];
enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  All = 'all',
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  statusTask = TaskStatus;
  tasks = signal<Task[]>(INITIAL_TASK_STATE);
  selectedStatusTask = signal<TaskStatus>(this.statusTask.All);
  //Computed  retona un valor computado, es decir, un valor que se calcula en base a otros valores.
  /**
   * Esta pedniente de camnios en los signals que se le pasan como argumento
   */
  filteredTasks = computed(() => {
    const filter = this.selectedStatusTask();
    const tasks = this.tasks();
    if (filter === this.statusTask.Completed) {
      return tasks.filter((task) => task.completed);
    }
    if (filter == this.statusTask.Pending) {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  });
  formCtrl = new FormControl(INITIAL_FORM_STATE, {
    nonNullable: true,
    validators: [Validators.required],
  });
  editFormCrl = new FormControl(INITIAL_FORM_STATE, {
    nonNullable: true,
    validators: [Validators.required],
  });
  createHandler() {
    if (this.formCtrl.valid && this.formCtrl.value.trim()) {
    }
    this.formCtrl.setValue(INITIAL_FORM_STATE);
  }
  deleteHandler(id: string) {
    this.delete(id);
  }
  editHandler(id: string, changes: UpdateTask) {
    if (changes.title) this.editFormCrl.setValue(changes.title);
    this.update(id, changes);
  }
  updateHandler(id: string) {
    if (this.editFormCrl.valid && this.editFormCrl.value.trim()) {
      this.update(id, { title: this.editFormCrl.value, editing: false });
    }
  }
  changeStatus(changes: TaskStatus) {
    this.selectedStatusTask.update((_status) => changes);
  }
  delete(id: string) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
  counterLabel(itemsCount: number) {
    const label: { [key: number]: string } = {
      0: 'items left',
      1: 'item',
    };
    return label[itemsCount] || 'items';
  }
  create(title: string) {
    const id = Date.now().toString();
    const newTask: Task = {
      id,
      title,
      completed: false,
      isUpdatable: true,
      editing: false,
    };
    /**
     * *Los signals tienen métodos para actualizar sus valores,
     * *ademas de darnos el estado anterior, debemos retornar un
     * *nuevo estado y no mutar el anterior
     *  */
    this.tasks.update((tasks) => [...tasks, newTask]);
    return newTask;
  }
  update(id: string, changes: UpdateTask) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id != id) {
          return { ...task, editing: false };
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
