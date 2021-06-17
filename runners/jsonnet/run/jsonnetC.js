const jsonnet = require('@unboundedsystems/jsonnet');

const microseconds = require('microseconds');

const jsonnetVm = new jsonnet.Jsonnet();

const jsonnetC = () => {
  const beforeAll = microseconds.now();

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

  const afterAll = beforeAll + microseconds.since(beforeAll);

  return afterAll - beforeAll;
};

module.exports = jsonnetC;