// 静态类型检查

const message = "hello!";

message();
// ***********************

// Non-exception Failures
const user = {
  name: "Daniel",
  age: 26,
};
user.location;

// --------------------
const announcement = "Hello World!";
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
// We probably meant to write this...
announcement.toLocaleLowerCase();
// --------------------
// uncalled functions,
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
}
// --------------------
// basic logic errors
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
  // Oops, unreachable
}

// Types for Tooling
// import express from "express";
// const app = express();

// app.get("/", function (req, res) {
//   res.sen; // tab 代码提示
// });

// app.listen(3000);

// If we run tsc hello.ts again, notice that we get an error on the command line!
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet("Brendan"); // Expected 2 arguments, but got 1.

// Up until now, we haven’t told TypeScript what person or date are. Let’s edit the code to tell TypeScript that person is a string, and that date should be a Date object. We’ll also use the toDateString() method on date.
function greet1(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// Date() => date string
greet1("Maddison", Date()); // => Argument of type 'string' is not assignable to parameter of type 'Date'.
greet1("Maddison", new Date());
// Keep in mind, we don’t always have to write explicit type annotations. In many cases, TypeScript can even just infer (or “figure out”) the types for us even if we omit them.
let msg = "hello there!"; // => let msg: string
