//const a = [1, 2, 3, 4, 8, 9, 10];

let month = new Date();
let m = month.getMonth() + 1;

const number = m < 10 ? ("0" + m).slice(-2) : m;

console.log(number);
console.log(Date.now().toLocaleString);
