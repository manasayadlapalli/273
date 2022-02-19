'use strict';
var alphabets = "a,b,c,d,e,f,g,h,i,j,k,l";
console.log(alphabets);
var slicedAlphabets = alphabets.slice(2,9);                     // slice
console.log("Slicing alphabets: "+ slicedAlphabets);
var splitAlphabets = alphabets.split("c,");                     //  split 
console.log("Splitting alphabets at 'c': "+ splitAlphabets);
console.log("Is 'c' included in alphabets? "+ alphabets.includes('c'));
console.log("Is 'c' included in splitAlphabets? "+ splitAlphabets.includes('c'));  //includes
console.log("Type of alphabets is a : "+ typeof(alphabets));    // typeof

const person = {
    name: "Sai",
    age: "25",
    email: "saimanasayadlapalli@sjsu.edu"
};
console.log(person)
var stringifyPerson = JSON.stringify(person);                 // JSON.stringify()
console.log("Stringify to JSON: "+ stringifyPerson);
var parsePerson = JSON.parse(stringifyPerson);                       
console.log("Parsed personname object: "+ parsePerson.name);   //Parsing stringifiedJSON object

const fruits = ['apple','banana','orange','watermelon','kiwi'];
const[a,b,...rest]= fruits;                        //Destructuring fruits array
console.log(a);
console.log(b);
console.log(rest);                                 //Using Rest operator
console.log(...fruits, ...alphabets);              //Spread operator

const myFavFruit = 'Watermelon';
function printMyFavFruit(){
    console.log(myFavFruit);
}
printMyFavFruit()                                  // Closure

const fruit = {
    shape : "round",
    fruitName: function(name, color){
        return name + " is " + color + " and "+ this.shape;  }
}
const fruit1 = {
    name: 'apple',
    color: 'red',
    shape : 'round'
}
const{shape,color} = fruit1;                // Object destructuring
console.log(shape);
console.log(color);
console.log(fruit.fruitName.apply(fruit, ["orange", "orange", "round"]));
console.log(fruit.fruitName.call(fruit, "apple", "red", "round"));
const bound= fruit.fruitName.bind(fruit);
console.log(bound(fruit.fruitName('guava','green')));
class Animal {
    constructor (name) {
        this.name = name;
    }
    makesSound () {
        console.log ("Animal made a sound"); }
}
class Cat extends Animal { 
    constructor (name) {
        super(name);
    }                                              // overriding makesSound method in Animal Class
    makesSound () {
        console.log("meow meow, Feed me !!"); }
}
let cat1 = new Cat("pinky");
let cat2 = new Cat("kitty");
console.log("cat2 name before assign", cat2.name)
cat2 = Object.assign(cat2, cat1);                     // Object.assign
console.log("cat2 name after assign", cat2.name)
var animal1 = new Animal("animal1");
animal1.makesSound();
cat1.makesSound();

