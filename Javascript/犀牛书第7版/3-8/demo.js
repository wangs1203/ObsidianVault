const testArr = [{ foo: "foo", bar: "bar" }, 2];

let testCloneArr = [];

for (let i = 0; i < testArr.length; i++) {
  testCloneArr[i] = testArr[i];
}

let testCloneArr2 = Array.from(testArr);

console.log(testCloneArr);
console.log(testCloneArr2);
testArr[0].foo = 'change foo';
console.log(testCloneArr);
console.log(testCloneArr2);
