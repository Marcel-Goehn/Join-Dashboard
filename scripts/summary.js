let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

console.log(hours + ' : ' + minutes.toString().padStart(2, '0'));
