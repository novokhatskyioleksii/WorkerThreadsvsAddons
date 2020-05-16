const microseconds = require('microseconds');

const cluster = require('cluster');

const file = require('../../../helpers/file');

const hashBcryptCCluster = require('./hashBcryptCCluster');
const hashBcryptJSCluster = require('./hashBcryptJSCluster');

const workers = [];

const masterProcess = () => new Promise((resolve, reject) => {
  let count = 0;
  let start = 0;
  // Fork workers
  for (let i = 0; i < 8; i++) {
    const worker = cluster.fork();
    workers.push(worker);

    // Listen for messages from worker
    worker.on('message', (message) => {
      count++;
      if (count === 7) resolve(microseconds.since(start));
    });
  }

  start = microseconds.now();
  workers[0].send({ processNumber: 0 });
  workers[1].send({ processNumber: 1 });
  workers[2].send({ processNumber: 2 });
  workers[3].send({ processNumber: 3 });
  workers[4].send({ processNumber: 4 });
  workers[5].send({ processNumber: 5 });
  workers[6].send({ processNumber: 6 });
  // workers[7].send({ processNumber: 7 });
});

const childProcess = () => {
  process.on('message', (message) => {
    (async () => {
      await hashBcryptJSCluster(message.processNumber);
      process.send({ processNumber: message.processNumber });
    })();
  });
};

(async () => {
  if (cluster.isMaster) {
    const beforeC = microseconds.now();
    await hashBcryptCCluster();
    const afterC = beforeC + microseconds.since(beforeC);

    const totalC = afterC - beforeC;
    const totalJS = await masterProcess();

    console.log(`(bcrypt) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
    console.log(`(bcrypt) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

    process.exit();
  } else {
    childProcess();
  }
})();