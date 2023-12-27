import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  message = 'todo-app';
  tasks = ['todo 1', 'todo 2', 'todo 3', 'todo 4', 'todo 5'];
}
