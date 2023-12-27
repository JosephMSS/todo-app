import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    { title: 'Install Angular CLI', completed: true },
    { title: 'Style app', completed: true },
    { title: 'Finish service functionality', completed: false },
    { title: 'Setup API', completed: false },
  ]);
}
