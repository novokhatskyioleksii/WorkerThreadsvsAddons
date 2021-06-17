const Jsonnet = require('@rbicker/jsonnet');

const jsonnet = new Jsonnet();

(() => {
  const myTemplate = `
    {
        person1: {
            name: "Alice",
            welcome: "Hello " + self.name + "!",
        },
        person2: self.person1 { name: "Bob" },
    }`;

  const output = jsonnet.eval(myTemplate);
})();