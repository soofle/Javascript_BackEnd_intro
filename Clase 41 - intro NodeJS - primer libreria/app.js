const calculator = require("./calculator.js");

let respuesta = calculator.dividir(12,6);

console.log(calculator.dividir(12,6));

const fs = require('fs');

let fd;

try {
  fd = fs.openSync('message.txt', 'a');
  fs.appendFileSync(fd, respuesta, 'utf8');
} catch (err) {
  /* Handle the error */
} finally {
  if (fd !== undefined)
    fs.closeSync(fd);
}
