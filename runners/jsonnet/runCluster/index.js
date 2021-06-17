const microseconds = require('microseconds');

const cluster = require('cluster');

const jsonnetCCluster = require('./jsonnetCCluster');
const jsonnetJSCluster = require('./jsonnetJSCluster');

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
    jsonnetJSCluster(message.processNumber);
    process.send({ processNumber: message.processNumber });
  });
};

(async () => {
  if (cluster.isMaster) {
    const beforeC = microseconds.now();
    jsonnetCCluster();
    const afterC = beforeC + microseconds.since(beforeC);

    const totalC = afterC - beforeC;
    const totalJS = await masterProcess();

    console.log(`(jsonnet) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
    console.log(`(jsonnet) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

    process.exit();
  } else {
    childProcess();
  }
})();