// Como yo lo hice - escribe de a una vez, en cada ejecución

//EN TERMINAL: npm i nodemon -l , luego npm i moment -l, luego npm i cool-images -l. Luego ejecuto node hola.js

const coolImages = require("cool-images");

let array = coolImages.many(600, 800, 10);
array.forEach(element => console.log(element));

const moment = require('moment');
let actual = moment().format("YYYY-MMM-DD, HH:mm");
console.log(actual);

const fs = require('fs');
let fd;

try {
  fd = fs.openSync('log.txt', 'a');
  fs.appendFileSync(fd, "\r\n" + actual + "\r\n" + array.join("\r\n"), 'utf8');
  
} catch (err) {
  /* Handle the error */
} finally {
  if (fd !== undefined)
    fs.closeSync(fd);
}

// Como lo hizo Lucas, va y escribe todo junto. Mejor performance

// const coolImages = require("cool-images")
// const fs = require("fs")
// const moment = require("moment")
// const date = moment().format("YYYY/MM/DD H:m:s")
// fs.appendFileSync("log.txt", `Ejecución ${date} \n`)
// coolImages.many(300,500,10).forEach( img => {
//   fs.appendFileSync("log.txt", `${img} \n`)
// })