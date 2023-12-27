import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
interface Person {
  name: string;
  age: number;
  imageUrl: string;
  imageAlt: string;
}
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  private message = 'todo-app'; // en este caso sei es privado el html no va a poder acceder a la variable
  tasks = ['todo 1', 'todo 2', 'todo 3', 'todo 4', 'todo 5'];
  name = 'John Doe';
  disabled = true;
  person: Person = {
    name: 'John Doe',
    age: 30,
    imageUrl: 'https://picsum.photos/200',
    imageAlt: 'John Doe image',
  };
  // los parámetros de los eventos y su detección de
  // cambios dependen del tipo de evento que se define
  // en el  html
  keyDownHandler(event: KeyboardEvent) {
    console.log('key down', event);
    const input = event.target as HTMLInputElement;
    console.log(
      '🚀 ~ file: labs.component.ts:30 ~ LabsComponent ~ keyDownHandler ~ input:',
      input.value
    );
  }
  handleClick() {
    console.log('click', this.person);
    this.person.name = 'Jane Doe';
  }
  handleDbClick() {
    console.log('double click');
  }
  changeHandler(event: Event) {
    console.log(
      '🚀 ~ file: labs.component.ts:35 ~ LabsComponent ~ changeHandler ~ event:',
      event
    );
  }
}
