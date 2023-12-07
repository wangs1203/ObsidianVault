import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',

  // template: '<div>内联模版</div>',

  // 属性绑定
  // template: `
  //   <a [href]="url">a链接{{ fn() }}</a>
  //   <input type="checkbox" [checked]="isChecked">
  // `,

  // 事件绑定
  // template: `
  //   <button (click)="handleClick()" (mouseenter)="handleMouseEnter()">click me</button>
  //   <input type="checkbox" [checked]="isChecked">
  //   <div>
  //     <a [href]="url" (click)="handleClick($event)">A CLICK</a>
  //   </div>
  // `,

  // 双向数据绑定
  // template: `
  //   <input type="text" [(ngModel)]="message" >
  //   <h1>{{ message }}</h1>
  // `,

  template: `
    <a [href]="url">a链接{{ fn() }}</a>
    <button (click)="handleClick()">click me</button>
    <p>{{ user.name }}</p>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-demo';
  url = 'https://google.com/ncr';
  isChecked = true;

  // 双向绑定的数据
  message = '输入文本';

  user = {
    name: 'jack'
  };

  fn(): string {
    return 'href';
  }
  // 事件
  handleClick(e?: Event): void {
    this.isChecked = !this.isChecked;
    console.log(this);
    console.log(e);
    e?.preventDefault();
    console.log(1111);
  }
  handleMouseEnter(): void {
    console.log(123);
  }
}
