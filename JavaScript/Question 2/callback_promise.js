"use strict";

function callback(){
    console.log("Hello"); 
    setTimeout(()=>{ console.log("User"); }, 500); 
    }
  callback();


let working = true;
const promiseExample = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (working) {
          resolve(console.log("Hello User"));
        } else {
          reject("Error");
        }
      }, 500);
    });
  
