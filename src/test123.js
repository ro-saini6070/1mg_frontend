// // let event = require('events');

// import { reject } from "lodash";

// // let eventEmitter = event.EventEmitter();




// // let someEvent = () => {
// //     console.log('this is the event');
// // }



// // eventEmitter.on('connection', someEvent)



// let a = [1, 2, 2, 2, 3, 4, 2, 3, 4, 5];

// let output = {};

// a.forEach((element) => {
//     // if (output)
// })

// s

// 1
// 5
// 3
// 2
// 4

// let x = 5;
// let obj = {
//     x: 2,
//     getX: () => {
//         console.log(this)
//         console.log(this.x)
//     }
// }
// obj.getX();

// let promise = new Promise(function (resolve, reject) {
//     reject('naah')
// })

// promise.then((success) => {

// }).catch((error) => {
//     console.log(error);
// })

let a = [1, 22, 44, 5, 22, 44, 44, 3, 4, 3, 4]

let output = {}

a.forEach((element) => {
    output[element] = (output[element] || 0) + 1
})

console.log(output);

console.log(0 || 0);


let filteredValu = a.filter((element) => element === 44)
console.log(filteredValu);



