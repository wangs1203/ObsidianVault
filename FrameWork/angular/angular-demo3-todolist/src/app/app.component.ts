import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  todos = [
    { id: 1, name: '吃饭', done: true},
    { id: 2, name: '睡觉', done: true},
    { id: 3, name: '打豆豆', done: true}
  ];

  todoName = '';

  trackByTodo(index: number, todo): number {
    return todo.id;
  }

  addTodo(): void {
    console.log('addTodo :>> ');
    if (this.todoName.trim() === ''){
      return;
    }
    this.todos.push({
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      name: this.todoName,
      done: false
    });
    this.todoName = '';
  }

  deleteTodo(index: number, e: Event): void {
    console.log('deleteTodo :>> ');
    e.preventDefault();
    this.todos.splice(index, 1);
    console.log('this.todos :>> ', this.todos);
  }
}
