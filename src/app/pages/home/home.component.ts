import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, UpdateTask } from '../../models/task.model';
const INITIAL_FORM_STATE = '';
const FORM_CONFIG = {};
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
    this.create('Install Angular CLI'),
    this.create('Style app'),
    this.create('Finish service functionality'),
    this.create('Setup API'),
  ]);
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
      const newTask = this.create(this.formCtrl.value);
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

  delete(id: string) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => task.id !== id)
    );
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
