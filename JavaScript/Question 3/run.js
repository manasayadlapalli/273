
require('babel-register')({
    presets: ['env']
});
module.exports = require('./Conversion.js')


class Dog {
  constructor(breed = 'Mutt') {
      this.BreedName = breed;
      this.regex = /Dog/i;
      this.Greeting = 'Dog says Awoo Awoo'
    }

    SayGreetingMessage() {
      return this.Greeting.replace(this.regex, this.BreedName);
    }

    static SayAngryMessage() {  
      return 'Grrr Grrr';
    } 
  }
  doggy = new Dog('Husky');
  console.log(doggy.BreedName);
  console.log(doggy.SayGreetingMessage())
  console.log(Dog.SayAngryMessage()); // will not raise an error
  