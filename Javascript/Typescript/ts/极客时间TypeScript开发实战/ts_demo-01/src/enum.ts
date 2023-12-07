// 数字枚举
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}
/*
 反响映射 枚举实现原理
"use strict";
var Role;
(function (Role) {
    Role[Role["Reporter"] = 0] = "Reporter";
    Role[Role["Developer"] = 1] = "Developer";
    Role[Role["Maintainer"] = 2] = "Maintainer";
    Role[Role["Owner"] = 3] = "Owner";
    Role[Role["Guest"] = 4] = "Guest";
})(Role || (Role = {}));
*/
console.log(Role.Reporter);
console.log('Role :>> ', Role);

// 字符串枚举
enum Message {
  Success = '恭喜你',
  Fail = 'sorry，failed too bad'
}
/*
  字符串枚举不可用 反响映射
var Message;
(function (Message) {
    Message["Success"] = "\u606D\u559C\u4F60";
    Message["Fail"] = "sorry\uFF0Cfailed too bad";
})(Message || (Message = {}));
*/

// 异构枚举 不推荐使用
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 2; // TS2540: Cannot assign to 'Reporter' because it is a read-only property.

enum Char {
  // const
  a,
  b = Char.a,
  c = 1 + 3,
  // computed  执行阶段计算
  d = Math.random(),
  e = '123'.length
}
/**
var Char;
(function (Char) {
    // const
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // computed  执行阶段计算
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
})(Char || (Char = {}));
 */

// 常量枚举
const enum Month {
  Jan,
  Feb,
  Mar
}

let month = [Month.Jan,Month.Feb,Month.Mar]

// 枚举类型
enum E {a,b}
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana'}

let e: E = 2
let f: F = 3

let e1: E.a
let e2: E.b
let e3: E.a

let g1: G
let g2: G.a