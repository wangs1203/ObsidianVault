import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  classList = {
    redColor: true, // false
    fz: true,
  };

  isTest = true;
  // NgStyle 指令可以作为 [style] 绑定的替代指令。但是，应该把上面这种 [style] 样式绑定语法作为首选，因为随着 Angular 中样式绑定的改进，NgStyle 将不再提供重要的价值，并最终在未来的某个版本中删除。
  styleList = {
    color: 'red',
    fontSize: '50px',
    backgroundColor: 'rgba(0,0,0, 0.3)'
  };

  fontsize = '50px';

  isShow = true;

  colors = ['red', 'green', 'blue', 'pink'];

  colorArr = [
    {id: 1, name: 'red'},
    {id: 2, name: 'green'},
    {id: 3, name: 'blue'},
    {id: 4, name: 'pink'},
  ];

  fetchColors(): void {
    setTimeout(() => {
      this.colorArr = [
        {id: 1, name: 'pink'},
        {id: 2, name: 'red'},
        {id: 3, name: 'blue'},
        {id: 4, name: 'green'},
      ];
    }, 500);
  }

  fetchColorList(): void {
    setTimeout(() => {
      this.colors = ['green', 'red', 'blue', 'pink'];
    }, 1);
  }

  trackById(index: number, color): number {
    return color.id;
  }
}
