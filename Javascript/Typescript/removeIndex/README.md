# typescript - 如何使用映射类型删除索引签名

给定一个接口(interface)(来自无法更改的现有 .d.ts 文件)

```ts
interface Foo {
  [key: string]: any;
  bar(): void;
}
```

有没有办法使用映射类型(或其他方法)来派生没有索引签名的新类型？即它只有方法 bar(): void;

编辑:从 Typescript 4.1 开始，有一种方法可以直接使用 [Key Remapping](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-mapped-types) ，避免 Pick组合器。请查看 [the answer by Oleg where it's introduced](https://stackoverflow.com/a/66252656/2122734)
