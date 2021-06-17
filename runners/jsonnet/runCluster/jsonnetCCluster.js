const jsonnet = require('@unboundedsystems/jsonnet');

const jsonnetVm = new jsonnet.Jsonnet();

const jsonnetC = () => {
  for (let i = 0; i < 7; i++) {
    const myTemplate = `
    {
        person1: {
            name: "Alice",
            welcome: "Hello " + self.name + "!",
        },
        person2: self.person1 { name: "Bob" },
    }`;

    const output = jsonnetVm.eval(myTemplate);
  }
};

module.exports = jsonnetC;