// 给定一个接口(interface)(来自无法更改的现有 .d.ts 文件):
interface Foo {
  [key: string]: any;
  bar(): void;
}

export type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

type OnlyBarType = RemoveIndex<Foo>;

// ------------------------------
