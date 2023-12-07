type Records<K extends keyof any, T> = {
  [P in K]: T;
};
type Test = {
  id: string;
  name: string;
};
const recordsObj: Records<string, Test> = {
  fieldA: {
    name: "fieldA",
    id: "fieldA",
  },
  // fieldB: { // error
  //   name: "fieldB",
  // },
};

// 如果我应该给satisfies运算符一个简短的定义，它应该是这样的：
// satisfies运算符检查一个类型，如Record<string, A | B>，并为每个键缩小A | B之间的正确类型。
type Colors = "red" | "green" | "blue";
// type RGB = [red: number, green: number, blue: number];
// const palette: Record<Colors, string | RGB> = {
//   red: [255, 0, 0],
//   green: "#00ff00",
//   blue: [0, 0, 255],
// };
// const redComponent = palette.red.at(0); // Property 'at' does not exist on type 'string | RGB'.

// type RGB = [red: number, green: number, blue: number];
// const palette = {
//   red: [255, 0, 0],
//   green: "#00ff00",
//   blue: [0, 0, 255],
// } satisfies Record<Colors, string | RGB>;
// const redComponent = palette.red.at(0);
// palette.red是RGB，不是[255, 0, 0]。这很正常，因为我们可以用另一个RGB值来编辑palette.red，比如[255, 255, 255] !
// palette.red = [255, 255, 0]

// If you need to have the strict value type, you can use as const.
// We use Readonly utils type for using as const
type RGB = Readonly<[red: number, green: number, blue: number]>

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
} as const satisfies Record<Colors, string | RGB>

// palette.red // [255, 0, 0]
// palette.red = [255, 255, 0] // throw error since we cannot edit an property that is constant